import React, { Component } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";
import TopCard from "./TopCard";
import Friends from "./Friends";
class HomeScreen extends Component {
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
            this.props.screenProps.navigation.navigate("AddExpense", {
              update: this.props.update
            })}
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
    flex: 1,
    paddingTop: 0
  },
  backGroundOrange: {
    backgroundColor: "#FF692C"
  }
});
