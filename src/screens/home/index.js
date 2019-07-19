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
  Tabs,
  Picker
} from "native-base";
import HomeScreen from "../Friends";
import firebase from "firebase";
import "firebase/firestore";
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
      firstName: "Souma",
      youOwe: 200,
      youAreOwed: 100,
      friends: []
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
  };
  toggleFriendTransaction = () => {
    console.log("toggling");
    this.setState({ showFriendTransaction: !this.state.showFriendTransaction });
  };
  // componentWillUnmount(){
  //   this.setState({currData:{}});
  // }
  updateCurrData = () => {
    this.updateState();
  };
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
          <Right style={styles.more}>
            <TouchableOpacity onPress={this.showMore}>
              <Icon name="more" style={{ color: "#fff" }} />
            </TouchableOpacity>
          </Right>
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
