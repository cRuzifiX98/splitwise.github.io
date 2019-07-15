import React, { Component } from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
// import Groups from "../Groups";
import Groups from "./Groups";
import { Button, Icon } from "native-base";
import { whileStatement } from "@babel/types";

export default function GroupsPage()  {
  
    return (
      <React.Fragment>
        <ScrollView style={styles.container}>
          <Groups />
        </ScrollView>
        {/* <Button style={[styles.backGroundOrange, styles.addExpensesBtn]}>
          <Text style={styles.plus}>+</Text>
        </Button> */}
      </React.Fragment>
    );
  
}

// export default GroupsPage;

// GroupsPage.navigationOptions = {
//   title: "Groups"
// };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
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
  backGroundOrange: {
    backgroundColor: "#FF692C"
  }
});
