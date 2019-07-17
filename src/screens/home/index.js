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
  async componentDidMount(){
    const signedInUser = firebase.auth().currentUser.uid;
    const db = firebase.firestore().collection("users");
    let data = {
      userId: 1,
      firstName: "Souma",
      youOwe: 200,
      youAreOwed: 100,
      friends: [
        { name: "Hassaan", balance: 1024 },
        { name: "Yatin", balance: -500.36 },
      ]
    };
    data.userId = signedInUser;
    db.doc(signedInUser).onSnapshot(item => {
      data.firstName = item.data().Name;
    });
    const friends = await db.doc(signedInUser).collection("Friends").get();
    friends.docs.forEach(item=>{
      let friend = {};
      friend.name = item.data().Name;
      friend.balance = item.data().Balance;
      data.friends.push(friend);
    });
    this.setState({currData:data});

  }
  toggleFriendTransaction = () => {
    console.log("toggling");
    this.setState({ showFriendTransaction: !this.state.showFriendTransaction });
  };
  updateCurrData=()=>{
    
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
            {Object.keys(this.state.currData).length > 0 && <HomeScreen screenProps={this.props} data={this.state.currData}/>}
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
