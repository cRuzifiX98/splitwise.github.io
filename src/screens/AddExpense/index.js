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
  TouchableOpacity} from "react-native";
// import Modal from "react-native-modal";
// import styles from "./styles";

let friends = [
  "sghosh.souma@gmail.com",
  "shannusrinu@gmail.com",
  "antaradey25@gmail.com",
  "vijaysah1995@gmail.com",
  "sreyaG@gmail.com",
  "hassanRafi@gmail.com"
];

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

const currEmail = "souma.ghosh@mountblue.io"; // EMAIL OF THE CURRENT LOGGED IN USER -----------------------

class AddExpense extends Component {
  state = {
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
    selectedFriend: "0"
  };

  // getTimeStamp = async () => {
  //   const currentDate = await new Date();
  //   const timeArray = [
  //     currentDate.getHours(),
  //     currentDate.getMinutes(),
  //     currentDate.getSeconds(),
  //     currentDate.getDate(),
  //     currentDate.getMonth(),
  //     currentDate.getFullYear()
  //   ];
  //   return `${timeArray[0]}:${timeArray[1]}:${timeArray[2]} ${timeArray[3]}-${timeArray[4] +
  //     1}-${timeArray[5]}`;
  // };

  sendData = async () => {
    const members = [...this.state.members];
    members[0] = currEmail;
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
      console.log(transaction);
      Toast.show({
        text: "Expense saved!",
        // buttonText: "Okay",
        duration: 3000
      });
      this.props.navigation.navigate("Home");
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
      console.log(transaction);
      Toast.show({
        text: "Expense saved!",
        // buttonText: "Okay",
        duration: 3000
      });
      this.props.navigation.navigate("Home");
    } else {
      Alert.alert("Please fill out all the fields!");
    }
  };

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
    // console.log(value);
    this.setState({
      selectedPerson: value
    });
  }

  onFriendChange(value) {
    // this.setState({
    //   selectedFriend: value
    // });
    if (value !== "0") {
      const members = [...this.state.members];
      members.push(value);
      const index = friends.indexOf(value);
      if (index !== -1) {
        friends.splice(index, 1);
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
                  {friends.map((friend) => {
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

export default AddExpense;