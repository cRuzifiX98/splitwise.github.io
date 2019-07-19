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
import styles from "./styles";
// import Groups from "../Groups";
class Home extends Component {
  state = {
    addExpenses: false,
    currData: {}
  };
  componentDidMount() {
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
      friends: []
    };
    data.userId = signedInUser;
    db.doc(signedInUser).onSnapshot(item => {
      data.firstName = item.data().Name;
    });
    const friends = await db.doc(signedInUser).collection("Friends").get();
    if (friends != undefined) {
      friends.docs.forEach(item => {
        let friend = {};
        friend.name = item.data().Name;
        friend.balance = item.data().Balance;
        friend.email = item.data().email;
        data.friends.push(friend);
      });
      this.setState({ currData: data });
    }
  };
  toggleFriendTransaction = () => {
    console.log("toggling");
    this.setState({ showFriendTransaction: !this.state.showFriendTransaction });
  };
  updateCurrData = () => {
    this.updateState();
  };

  getFriendId = async email => {
    const db = firebase.firestore().collection("users");
    const temp = await db.get();
    let friendId;
    temp.docs.forEach(item => {
      if (item.data().Email === email) {
        friendId = item.id;
      }
    });
    return friendId;
  };
  render() {
    return (
      <Container>
        <Header hasTabs style={styles.header}>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.openDrawer()}
            >
              <Icon name="menu" />
            </Button>
          </Left>
          <Body style={styles.headerBody}>
            <Title style={styles.headerTitle}>Splitwise</Title>
          </Body>
          <Right />
        </Header>

        <Tabs>
          <Tab
            heading={
              <TabHeading style={styles.TabHeading}>
                <Icon name="person" />
                <Text>Friends</Text>
              </TabHeading>
            }
          >
            {Object.keys(this.state.currData).length > 0 &&
              <HomeScreen
                update={this.updateCurrData}
                screenProps={this.props}
                data={this.state.currData}
              />}
          </Tab>
          {/* <Tab
            heading={
              <TabHeading>
                <Icon name="people" />
                <Text>Group</Text>
              </TabHeading>
            }
          >
            <Groups />
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
