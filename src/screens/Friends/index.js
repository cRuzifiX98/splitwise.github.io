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
    addExpenses: false
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
    fontSize: 36,
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
