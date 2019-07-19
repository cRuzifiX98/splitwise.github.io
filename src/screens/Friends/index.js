import React, { Component } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";
import TopCard from "./TopCard";
import Friends from "./Friends";
class HomeScreen extends Component {
  state = {
    addExpenses: false,
    data: {
      userId: 1,
      firstName: "Souma",
      lastName: "Ghosh",
      youOwe: 200,
      youAreOwed: 100,
      friends: [
        { name: "Hassaan", balance: 1024 },
        { name: "Yatin", balance: -500.36 }
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
          <Friends
            update={this.props.update}
            data={this.props.data}
            screenProps={this.props.screenProps}
          />
        </ScrollView>
        <TouchableOpacity
          onPress={() =>
            this.props.screenProps.navigation.navigate("AddExpense")}
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
