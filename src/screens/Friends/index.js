// import * as WebBrowser from "expo-web-browser";
import React, { Component } from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  Button,
  TouchableOpacity,
  View,
  Alert
} from "react-native";
import TopCard from "./TopCard";
import Friends from "./Friends";
// import console = require("console");
// import { MonoText } from "../components/StyledText";
// import { H1, Container, , Icon } from "native-base";
class HomeScreen extends Component {
  state = {
    addExpenses: false,
    data: {
      userId: 1,
      firstName: "Souma",
      lastName: "Ghosh",
      youOwe: 200,
      youAreOwed: 100,
      // groups: [
      //   {
      //     name: "Pub",
      //     balance: 200,
      //     members: [
      //       {
      //         name: "Vijay",
      //         balance: 50
      //       },
      //       {
      //         name: "Shanmuk",
      //         balance: -80
      //       }
      //     ]
      //   },
      //   {
      //     name: "Holiday",
      //     balance: -200,
      //     members: [
      //       {
      //         name: "Dhruvil",
      //         balance: -50
      //       },
      //       {
      //         name: "Ram",
      //         balance: 80
      //       }
      //     ]
      //   }
      // ],
      friends: [
        { name: "Hassaan", balance: 1024 },
        { name: "Yatin", balance: -500.36 },
        { name: "Vivek", balance: 0 },
        { name: "Madhu", balance: 100.88 },
        { name: "Rizwan", balance: -200.55 },
        { name: "Shanmuk", balance: 300.5 },
        { name: "Shubham", balance: 150 },
        { name: "Deepak", balance: 1024 },
        { name: "Vikash", balance: 2000000 }
      ]
    }
  };

  toggleAddExpenses = () => {
    this.setState(prevState => {
      return { addExpenses: !prevState.addExpenses };
    });
  };

  render() {
    return (
      <React.Fragment>
        <ScrollView style={styles.container}>
          <TopCard />
          <Friends />
        </ScrollView>
        <TouchableOpacity
          onPress={() =>
            this.props.screenProps.navigation.navigate("AddFriend")}
          style={[styles.backGroundOrange, styles.addExpensesBtn]}
        >
          <Text style={styles.plus}>+</Text>
        </TouchableOpacity>
      </React.Fragment>
    );
  }
}

export default HomeScreen;

const styles = StyleSheet.create({
  addExpensesBtn: {
    position: "absolute",
    right: 17,
    bottom: 17,
    width: 55,
    height: 55,
    borderRadius: 27.5,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  plus: {
    color: "white",
    fontSize: 40,
    // fontFamily: "encoded-sans-light",
    position: "relative",
    top: -2
  },
  grayBackGround: {
    backgroundColor: "#EEEEEE"
  },
  primaryFont: {
    fontSize: 14
    // fontFamily: "encoded-sans-medium"
  },
  container: {
    flex: 1
  },
  backGroundOrange: {
    backgroundColor: "#FF692C"
  }
});
