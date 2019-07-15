// import * as WebBrowser from "expo-web-browser";
import React from "react";
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
// import { MonoText } from "../components/StyledText";
// import { H1, Container, , Icon } from "native-base";

export default function HomeScreen() {
  return (
    <React.Fragment>
      <ScrollView style={styles.container}>
        <TopCard />
        <Friends />
      </ScrollView>
      {/* <Button style={[styles.backGroundOrange, styles.addExpensesBtn]}>
        <Text style={styles.plus}>+</Text>
      </Button> */}
    </React.Fragment>
  );
}

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
    fontSize: 14,
    // fontFamily: "encoded-sans-medium"
  },
  container: {
    flex: 1
  },
  backGroundOrange: {
    backgroundColor: "#FF692C"
  }
});
