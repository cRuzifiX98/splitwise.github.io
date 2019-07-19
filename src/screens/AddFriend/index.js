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
    width: 100
  }
});
import firebase from "firebase";
import "firebase/firestore";

class AddFriend extends Component {
  state = {
    email: ""
  };
  getFriendId = async (email) => {
    // const signedInUser = firebase.auth().currentUser.uid;
    const db = firebase.firestore().collection("users");
    const temp = await db.get();
    let friendId = 0;
    temp.docs.forEach(item => {
        if (item.data().Email === email) {
            friendId = item.id;
        }
    });
    return friendId;
   }
  addFriend = async (friendId) => {
    try {
    const signedInUser = firebase.auth().currentUser.uid;
    const db = firebase.firestore().collection("users");
    let currName;
    db.doc(signedInUser).onSnapshot(item => {
      currName = item.data().Name;
    });
    const temp = await db.get();
    let friendName;
    temp.doc(friendId).onSnapshot(item => {
      friendName = item.data().Name;
    });
    db.doc(friendId).collection("Friends").doc(signedInUser).set({
      Name: currName,
      Balance: 0
    });
    db.doc(signedInUser).collection("Friends").doc(friendId).set({
      Name: friendName,
      Balance: 0
    });
  }
  catch (error){
    console.log(error);
  }
  };
  sendData = async () => {
    if (this.state.email.includes("@")) {
      let friendId = this.getFriendId(this.state.email);
      if (!friendId === 0){
      let insertFriend = await this.addFriend(friendId);
      Toast.show({
        text: "Friend Added!",
        duration: 3000
      });
      this.goBack();
      }
      else {
        Alert.alert("Your friend email not Registered with SplitWise");
      }
    }
    else {
      Alert.alert("Invalid Input");
      }
  };
  goBack=()=>{
    const { navigation } = this.props;
      navigation.goBack();
      navigation.state.params.update();
  }

  render() {
    return (
      <MenuProvider>
        <Container style={styles.container}>
          <Header>
            <Left>
              <Button
                transparent
                onPress={() => this.goBack}
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
