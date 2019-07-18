import React, { Component } from "react";
import {
  Container,
  Header,
  Title,
  Content,
  Text,
  Button,
  Icon,
  Footer,
  FooterTab,
  Left,
  Right,
  Body,
  Input,
  Item,
  Form,
  Card,
  Label,
  Toast,
  Badge,
  Picker,
  Modal
} from "native-base";
import {
  StyleSheet,
  View,
  Alert,
  TouchableOpacity,
  TouchableHighlight
} from "react-native";
import { MenuProvider } from "react-native-popup-menu";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger
} from "react-native-popup-menu";

// import styles from "./styles";

const friends = [
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
    paddingLeft: 20,
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
    backgroundColor: "#A6A6A6",
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

const currEmail = "souma.ghosh@mountblue.io";

const userId = 1;
const friendId = 4;
class AddFriend extends Component {
  state = {
    email: "",
    title: "",
    amount: "",
    payer: "YOU",
    // paidBy: userId, // need access to user id and friend id to set paidBy and paidTo fields
    splitShare: 0,
    split: "EQUALLY",
    members: ["YOU"],
    share: [],
    selectedPerson: "0",
    modalVisible: false,
    selectedSplit: 0,
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
    if (this.state.title && this.state.amount) {
      // const timeStamp = await this.getTimeStamp();
      // this.setState;
      const paidBy = this.state.members[
        parseInt(this.state.selectedPerson, 10)
      ];
      const transactionData = {
        title: this.state.title,
        amount: this.state.amount,
        share: this.state.share,
        paidBy: paidBy,
        paidTo: this.state.paidTo
        // timeStamp: timeStamp
      };
      Toast.show({
        text: "Expense saved!",
        // buttonText: "Okay",
        duration: 3000
      });
      this.props.navigation.navigate("Home");
    } else {
      Alert.alert("Please fill out all the fields");
    }
  };

  // friendPays = () => {
  //   this.setState({ payer: "FRIEND", paidBy: friendId, paidTo: userId });
  // };

  youPay = () => {
    this.setState({ payer: "YOU", paidBy: userId, paidTo: friendId });
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
      this.setState({ members: members });
    }
  }

  onSplitValueChange(value) {
    // console.log(value);
    this.setState(prevState => {
      return { selectedSplit: value, modalVisible: !prevState.modalVisible };
    });
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  handleShares = (idx, value) => {
    // /console.log(idx, value);
    console.log("editing done");
    // const updatedShare = [...this.state.share];
    // if (updatedShare.length === this.state.members.length) {
    //   updatedShare[idx] = value;
    // }

    // if (updatedShare.length < this.state.members.length) {
    //   updatedShare[idx] = value;
    // }
    // this.setState({ share: updatedShare });
  };
  shareHandler = (idx, value) => {
    if (this.state.share.length === 0) {
      var updatedShare = Array(this.state.members.length).fill(0);
      updatedShare[idx] = value;
      console.log("length 0");
      console.log("inside on submit" + updatedShare);
      this.setState({ share: updatedShare });
    } else {
      console.log("length 1");
      var updatedShare = [...this.state.share];
      updatedShare[idx] = value;
      console.log(updatedShare);
      this.setState({ share: updatedShare });
    }
  };
  handleShareSubmit = () => {
    console.log("inside on done" + this.state.share);
    // const totalAmount = this.state.share.reduce((total, currAmt) => {
    //   console.log(currAmt);
    //   total += currAmt;
    //   return total;
    // }, 0);
    // console.log(this.state.amount);
    console.log(this.state.amount);
    this.setState(prevState => {
      return { modalVisible: !prevState.modalVisible };
    });
  };

  closeModal = () => {
    this.setState(prevState => {
      return { modalVisible: !prevState.modalVisible };
    });
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
                  placeholder="email"
                  value={this.state.email}
                  onChangeText={text => this.setState({ email: text })}
                  onSubmitEditing={this.submitHandler}
                />
                <Picker
                  note
                  mode="dropdown"
                  style={{ width: 20 }}
                  selectedValue={this.state.selectedFriend}
                  onValueChange={this.onFriendChange.bind(this)}
                >
                  <Picker.Item label={""} value={"0"} />
                  {friends.map((friend, idx) => {
                    return <Picker.Item label={friend} value={friend} />;
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
                    return (
                      <Picker.Item label={member} value={idx.toString()} />
                    );
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
                  <Picker.Item key={0} label="EQUALLY" value="0" />
                  <Picker.Item key={1} label="Split By Share" value="1" />
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
                          // defaultValue={"0"}
                          keyboardType={"numeric"}
                          // onChangeText={value => this.handleShares(idx, value)}
                          onSubmitEditing={value =>
                            this.shareHandler(idx, value)}
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

export default AddFriend;
