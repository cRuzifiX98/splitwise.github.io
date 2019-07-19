import React, { Component } from "react";
// import { ImageBackground, View, StatusBar,StyleSheet } from "react-native";
import {
  Container,
  Text,
  Header,
  TabHeading,
  Title,
  Button,
  Icon,
  Left,
  Right,
  Body,
  Tab,
  Tabs
} from "native-base";
import HomeScreen from "../Friends";
import firebase from "firebase";
import "firebase/firestore";
class Home extends Component {
  state = {
    addExpenses: false,
    currData: {}
  }
  componentDidMount() {
    this.updateBalance();
    this.updateState();

  }
  updateState = async () => {
    const signedInUser = firebase.auth().currentUser.uid;
    const db = firebase.firestore().collection("users");
    let data = {
      userId: 1,
      firstName: "",
      youOwe: 200,
      youAreOwed: 100,
      friends: [
      ]
    };
    data.userId = signedInUser;
    db.doc(signedInUser).onSnapshot(item => {
      data.firstName = item.data().Name;
    });
    const friends = await db.doc(signedInUser).collection("Friends").get();
    friends.docs.forEach(item => {
      let friend = {};
      friend.name = item.data().Name;
      friend.balance = item.data().Balance;
      friend.email = item.data().email;
      data.friends.push(friend);
    });
    this.setState({ currData: data });
  }
  toggleFriendTransaction = () => {
    console.log("toggling");
    this.setState({ showFriendTransaction: !this.state.showFriendTransaction });
  };
  updateCurrData = () => {
    this.updateBalance();
    this.updateState();

  }
  updateBalance = async (obj) => {
    const db = firebase.firestore().collection("users");
    const newObj = {};
    for (let i = 0; i < obj.members.length; i++) {
      if (obj.members[i] !== obj.Paid_by) {
        newObj[obj.members[i]] = obj.Share[i];
      }
    }
    const paidByUserId = await this.getFriendId(obj.Paid_by);
    Object.keys(newObj).forEach(async (item) => {
      const currentUserId = await this.getFriendId(item);
      const temp = await db.doc(paidByUserId).collection("Friends").doc(currentUserId).get();
      if (temp.data() === undefined) {
        await this.makeFriends(obj.Paid_by, item);
      }
      const temp2 = await db.doc(paidByUserId).collection("Friends").doc(currentUserId).get();
      const temp3 = await db.doc(currentUserId).collection("Friends").doc(paidByUserId).get();
      db.doc(paidByUserId).collection("Friends").doc(currentUserId).update({
        Balance: temp2.data().Balance + newObj[item]
      });
      db.doc(currentUserId).collection("Friends").doc(paidByUserId).update({
        Balance: temp3.data().Balance - newObj[item]
      });
    });
  }
  makeFriends = async (friend1Email, friend2Email) => {
    const db = firebase.firestore().collection("users");
    let friendId1 = await this.getFriendId(friend1Email);
    let friendId2 = await this.getFriendId(friend2Email);
     db.doc(friendId1).onSnapshot(item => {
      db.doc(friendId2).collection("Friends").doc(friendId1).set({
        Name: item.data().Name,
        Balance: 0
    });
   });
    db.doc(friendId2).onSnapshot(item => {
      db.doc(friendId1).collection("Friends").doc(friendId2).set({
        Name: item.data().Name,
        Balance: 0
    });
    });
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
  render() {
    return (
      <Container>
        <Header hasTabs>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.openDrawer()}
            >
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>Splitwise</Title>
          </Body>
          <Right />
        </Header>

        <Tabs>
          <Tab
            heading={
              <TabHeading>
                <Icon name="person" />
                <Text>Friends</Text>
              </TabHeading>
            }
          >
            {Object.keys(this.state.currData).length > 0 && <HomeScreen update={this.updateCurrData} screenProps={this.props} data={this.state.currData} />}
          </Tab>
          {/* <Tab
            heading={
              <TabHeading>
                <Icon name="people" />
                <Text>Group</Text>
              </TabHeading>
            }
          > */}
          {/* <GroupsPage /> */}
          {/* <Groups />
          </Tab> */}
          {/* <Tab
            heading={
              <TabHeading>
                <Icon name="paper-plane" />
                <Text>Notifications</Text>
              </TabHeading>
            }
          > */}
          {/* <H3 style={styles.text}>Hello world</H3>
          </Tab> */}
        </Tabs>
      </Container>
    );
  }
}

export default Home;
