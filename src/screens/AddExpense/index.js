import React, { Component } from "react";
import {
  Container,
  Header,
  Title,
  Content,
  Text,
  Button,
  Icon,
  Left,
  Right,
  Body,
  Input,
  Item,
  Form,
  Card,
  Label,
  Toast,
  Picker
} from "native-base";
import {
  StyleSheet,
  View,
  Alert,
  TouchableOpacity
} from "react-native";

import firebase from "firebase";
import "firebase/firestore";
class AddExpense extends Component {
  state = {
    CurrEmail: "",
    email: "",
    title: "",
    amount: "",
    payer: "YOU",
    splitShare: 0,
    split: "EQUALLY",
    members: ["YOU"],
    share: [],
    selectedPerson: 0,
    modalVisible: false,
    selectedSplit: "EQUALLY",
    selectedFriend: "0",
    friends: []
  };
  componentDidMount() {
    this.getFriends();
  }
  getFriends = async () => {
    const db = firebase.firestore().collection("users");
    const userId = firebase.auth().currentUser.uid;
    const UserEmail = this.getFriendEmail(userId);
    let friends = [];
    let userData = await db.docs(userId).collection("Friends").get();
    userData.map(async (item) => {
      let friendEmail = await this.getFriendEmail(item.id);
      friends.push(friendEmail);
    });
    this.setState({ friends: friends, currEmail: UserEmail });
  }
  getFriendEmail = async (friendId) => {
    const db = firebase.firestore().collection("users");
    const temp = await db.get();
    let friendEmail;
    temp.docs.forEach(item => {
      if (item.id.Email === friendId) {
        friendEmail = item.data().Email;
      }
    });
    return friendEmail;
  }
  sendData = async () => {
    const members = [...this.state.members];
    members[0] = this.state.CurrEmail;
    if (
      this.state.title &&
      this.state.amount &&
      this.state.selectedSplit === "EQUALLY"
    ) {
      const updatedShare = this.state.members.map(() => {
        return this.state.amount / this.state.members.length;
      });
      const paidBy = members[this.state.selectedPerson];
      this.setState({ share: updatedShare });
      const transaction = {
        title: this.state.title,
        amount: this.state.amount,
        members: members,
        share: updatedShare,
        paidBy: paidBy
      };
      let addExpense = await this.updateOrAddTransaction(transaction);
      Toast.show({
        text: "Expense saved!",
        // buttonText: "Okay",
        duration: 3000
      });
      this.goBack();
    } else if (
      this.state.title &&
      this.state.amount &&
      this.state.selectedSplit !== "EQUALLY"
    ) {
      const paidBy = members[this.state.selectedPerson];
      const transaction = {
        title: this.state.title,
        amount: this.state.amount,
        members: members,
        share: this.state.share,
        paidBy: paidBy
      };
      let addExpense = await this.updateOrAddTransaction(transaction);
      Toast.show({
        text: "Expense saved!",
        duration: 3000
      });
      this.goBack();
    } else {
      Alert.alert("Please fill out all the fields!");
    }
  };
  updateOrAddTransaction = async (obj) => {
    const db = firebase.firestore().collection("users");
    const paidByUserId = await this.getFriendId(obj.Paid_by);
    let newObj = {};
    for (let i = 0; i < obj.members.length; i++){
      newObj[obj.members[i]] = obj.Share[i];
    }
    Object.keys(newObj).forEach(async (item) => {
      if (item !== obj.Paid_by){
        const currentElementId = await this.getFriendId(item);
        const check = await this.checkIfTheTransactionExists(paidByUserId, currentElementId);
        let transObj = {
          Title: obj.Title,
          Amount: obj.Amount,
          Paid_by: obj.Paid_by,
          Share: newObj[item]
        };
        if (check) {
          db.doc(paidByUserId).collection("Transaction").doc(currentElementId).update({
            Expense: firebase.firestore.FieldValue.arrayUnion(transObj)
        });
          db.doc(currentElementId).collection("Transaction").doc(paidByUserId).update({
            Expense: firebase.firestore.FieldValue.arrayUnion(transObj)
          });
        } else {
          let temporary = [transObj];
          db.doc(paidByUserId).collection("Transaction").doc(currentElementId).set({
            Expense: temporary
          });
          db.doc(currentElementId).collection("Transaction").doc(paidByUserId).set({
            Expense: temporary
          });
        }
      }
    });
   }
  splitAmount = text => {
    const splitShare = parseFloat(text, 10) / 2;
    this.setState({ amount: text, splitShare: splitShare });
  };

  split = text => {
    this.setState({ split: text });
  };

  submitHandler = () => {
    if (!(this.state.email.includes("@") && this.state.email.includes("."))) {
      Alert.alert("Please enter a valid email id");
    } else {
      const members = [...this.state.members];
      members.push(this.state.email);
      // console.log(members);
      return this.setState({ members: members, email: "" });
    }
  };

  onValueChange(value) {
    this.setState({
      selectedPerson: value
    });
  }
  goBack=()=>{
    const { navigation } = this.props;
      navigation.goBack();
      navigation.state.params.update();
  }
  getFriendId = async (email) => {
    const db = firebase.firestore().collection("users");
    const temp = await db.get();
    let friendId;
    temp.docs.forEach(item => {
        if (item.data().Email === email) {
            friendId = item.id;
        }
    });
    return friendId;
   }
  onFriendChange(value) {
    if (value !== "0") {
      const members = [...this.state.members];
      members.push(value);
      const index = this.state.friends.indexOf(value);
      if (index !== -1) {
        this.state.friends.splice(index, 1);
      }
      this.setState({ members: members });
    }
  }

  onSplitValueChange(value) {
    if (value !== "EQUALLY") {
      this.setState(prevState => {
        return { selectedSplit: value, modalVisible: !prevState.modalVisible };
      });
    } else {
      this.setState({ selectedSplit: value, modalVisible: false });
    }
  }

  handleShares = (idx, value) => {
    if (this.state.share.length === 0) {
      let updatedShare = this.state.members.map(() => {
        return 0;
      });
      this.setState({ share: updatedShare });
    } else {
      let updatedShare = [...this.state.share];
      updatedShare[idx] = value;
      this.setState({ share: updatedShare });
    }
  };

  handleShareSubmit = () => {
    const totalAmount = this.state.share.reduce((total, currShare) => {
      total += parseFloat(currShare);
      return total;
    }, 0);
    if (totalAmount !== parseFloat(this.state.amount)) {
      Alert.alert("The math doesn't really add up!");
    } else {
      Alert.alert("Well Calculated!");
      this.setState({ modalVisible: !this.state.modalVisible });
    }
  };

  toggleModal = () => {
    this.setState({ modalVisible: !this.state.modalVisible });
  };

  popMember = () => {
    console.log("popping");
    if (this.state.members.length >= 2) {
      let members = this.state.members;
      members.pop();
      this.setState({ members: members });
    }
  };

  render() {
    return (
      <Container style={styles.container}>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate("Drawer")}
            >
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Add expense</Title>
          </Body>
          <Right>
            <TouchableOpacity onPress={this.sendData}>
              <Text style={styles.save}>SAVE</Text>
            </TouchableOpacity>
          </Right>
        </Header>

        <Content padder>
          <Card style={styles.topCard}>
            <Form searchBar>
              <Item last style={styles.flexWrap}>
                <Text>With you and:</Text>
                {this.state.members.map((member, idx) => {
                  if (idx !== 0) {
                    const name = member.slice(0, member.indexOf("@"));
                    return (
                      <View key={idx} style={styles.memberInput}>
                        <Text>
                          {" "}{name}{" "}
                        </Text>
                      </View>
                    );
                  }
                })}
                <Input
                  id="email"
                  value={this.state.email}
                  onChangeText={text => this.setState({ email: text })}
                  onSubmitEditing={this.submitHandler}
                  onKeyPress={({ nativeEvent }) => {
                    if (
                      nativeEvent.keyCode === "Backspace" ||
                      nativeEvent.keyCode === 8 ||
                      nativeEvent.key === 8
                    ) {
                      this.popMember;
                    }
                  }}
                />
                <Picker
                  note
                  mode="dropdown"
                  style={{ width: 20 }}
                  selectedValue={this.state.selectedFriend}
                  onValueChange={this.onFriendChange.bind(this)}
                >
                  <Picker.Item label={""} value={"0"} />
                  {this.state.friends.map((friend) => {
                    return <Picker.Item key={friend} label={friend} value={friend} />;
                  })}
                </Picker>
              </Item>
            </Form>
          </Card>
          <Form>
            <Item underline>
              <Input
                id="title"
                placeholder="Enter a description"
                value={this.state.title}
                onChangeText={text => this.setState({ title: text })}
              />
            </Item>
            <Item inlineLabel>
              <Label style={styles.currency}>
                {"\u20B9"}
              </Label>
              <Input
                id="amount"
                placeholder="0.00"
                value={this.state.amount}
                onChangeText={text => this.splitAmount(text)}
                keyboardType={"numeric"}
              />
            </Item>
          </Form>
          <View style={styles.selector}>
            <Text>Paid by </Text>
            <Button small light style={styles.selectorBtn}>
              <Form>
                <Picker
                  note
                  mode="dropdown"
                  style={{ width: 120 }}
                  selectedValue={this.state.selectedPerson}
                  onValueChange={this.onValueChange.bind(this)}
                >
                  {this.state.members.map((member, idx) => {
                    return <Picker.Item label={member} value={idx} />;
                  })}
                </Picker>
              </Form>
            </Button>
            <Text style={styles.disabledBtn}> Split </Text>
            <Button small light style={styles.selectorBtn}>
              <Form>
                <Picker
                  note
                  mode="dropdown"
                  style={{ width: 100 }}
                  selectedValue={this.state.selectedSplit}
                  onValueChange={this.onSplitValueChange.bind(this)}
                >
                  <Picker.Item key={0} label="EQUALLY" value="EQUALLY" />
                  <Picker.Item
                    key={1}
                    label="Split By Share"
                    value="Split By Share"
                  />
                </Picker>
              </Form>
            </Button>
          </View>
          {this.state.modalVisible &&
            <Card>
              <Form>
                {this.state.members.map((member, idx) => {
                  return (
                    <Item style={styles.splitForm} key={idx}>
                      <Text>
                        {member}
                      </Text>
                      <Right>
                        <Input
                          id={idx}
                          placeholder={"0.00"}
                          keyboardType={"numeric"}
                          onChangeText={value => this.handleShares(idx, value)}
                        />
                      </Right>
                    </Item>
                  );
                })}
                <Right>
                  <Button
                    style={styles.done}
                    small
                    light
                    onPress={this.handleShareSubmit}
                  >
                    <Text>Done</Text>
                  </Button>
                </Right>
              </Form>
            </Card>}
        </Content>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff"
  },
  selector: {
    paddingTop: 10,
    paddingLeft: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  currency: {
    fontSize: 25
  },
  paddingRight0: {
    paddingRight: 0
  },
  save: {
    textAlign: "right",
    color: "#fff"
  },
  selectorBtn: {
    width: "auto",
    paddingHorizontal: 5,
    display: "flex",
    justifyContent: "center"
  },
  menu: {
    width: "100"
  },
  flexWrap: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    borderBottomColor: "#fff"
  },
  topCard: {
    paddingTop: 10,
    paddingBottom: 10
  },
  memberInput: {
    padding: 5,
    backgroundColor: "#DCDCDC",
    borderRadius: 20,
    marginHorizontal: 5
  },
  flexBetween: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  splitForm: {
    borderBottomColor: "#fff",
    paddingRight: 10
  },
  done: {
    marginBottom: 20
  }
});
export default AddExpense;
