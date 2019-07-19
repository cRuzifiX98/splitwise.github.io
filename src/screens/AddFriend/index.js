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
  Toast
} from "native-base";
import { StyleSheet, Alert, TouchableOpacity } from "react-native";
import { MenuProvider } from "react-native-popup-menu";
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
import firebase from "firebase";
import "firebase/firestore";

class AddFriend extends Component {
  state = {
    email: ""
  };
  addFriend = async email => {
    try {
      const signedInUser = firebase.auth().currentUser.uid;
      const db = firebase.firestore().collection("users");
      let currEmail;
      let currName;
      db.doc(signedInUser).onSnapshot(item => {
        currEmail = item.data().Email;
        currName = item.data().Name;
      });
      const temp = await db.get();
      let friendName;
      let friendId;
      temp.docs.forEach(item => {
        if (item.data().Email === email) {
          friendName = item.data().Name;
          friendId = item.id;
        } else {
          friendName = email;
          friendId = email;
          firebase.firestore().collection("/users").doc(email).set({
            Email: email,
            Name: email,
            registration_status: false,
            Total_Balance: 0
          });
        }
      });
      db.doc(friendId).collection("Friends").doc(signedInUser).set({
        Name: currName,
        Balance: 0
      });
      db.doc(signedInUser).collection("Friends").doc(friendId).set({
        Name: friendName,
        Balance: 0
      });
    } catch (error) {
      console.log(error);
    }
  };
  sendData = async () => {
    if (this.state.email.includes("@")) {
      let insertFriend = await this.addFriend(this.state.email);
      console.log(insertFriend);
      Toast.show({
        text: "Friend Added!",
        // buttonText: "Okay",
        duration: 3000
      });
      const { navigation } = this.props;
      console.log("going back", this.props);

      navigation.goBack();
      navigation.state.params.update();
    } else {
      Alert.alert("Please fill out all the fields!");
    }
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
      <MenuProvider>
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
              <Title>Add Friend</Title>
            </Body>
            <Right>
              <TouchableOpacity onPress={this.sendData}>
                <Text style={styles.save}>Add</Text>
              </TouchableOpacity>
            </Right>
          </Header>

          <Content padder>
            <Card>
              <Form searchBar>
                <Item last>
                  <Text>Your Friend Email </Text>
                  <Input
                    id="email"
                    placeholder="Enter email"
                    value={this.state.email}
                    onChangeText={text => this.setState({ email: text })}
                  />
                </Item>
              </Form>
            </Card>
          </Content>
        </Container>
      </MenuProvider>
    );
  }
}

export default AddFriend;
