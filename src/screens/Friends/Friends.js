import React from "react";
import { StyleSheet, Text, View, Alert } from "react-native";
import { Button, Thumbnail, Card, CardItem } from "native-base";
// import console = require("console");
import firebase from "firebase";
import "firebase/firestore";

const getAllTransactionDetails = async friendId => {
  const db = firebase.firestore().collection("users");
  const signedInUser = firebase.auth().currentUser.uid;
  const temp = await db
    .doc(signedInUser)
    .collection("Transaction")
    .docs(friendId)
    .get();
  const result = temp.docs.map(item => item.data());
  return result;
};

export default function Friends(props) {
  // const data = [...props.data];

  return (
    <React.Fragment>
      {props.data.friends.map(friend => {
        return (
          <Card transparent key={friend.name}>
            <CardItem
              button
              onPress={() =>
                props.screenProps.navigation.navigate("Transaction", {
                  data: getAllTransactionDetails(friend.email)
                })}
              key={friend.name}
              style={[styles.paddingBottom0]}
            >
              <Thumbnail
                style={styles.thumbnailSecondary}
                source={{
                  uri: `https://api.adorable.io/avatars/100/${friend.name}`
                }}
              />
              <View key={friend.name} style={styles.marginLeft}>
                <Text style={styles.mediumFont}>
                  {friend.name}
                </Text>
              </View>
              {friend.balance === 0
                ? <View style={styles.marginLeftAuto}>
                    <Text
                      style={[
                        styles.textAlignRight,
                        styles.gray,
                        styles.smallFont
                      ]}
                    >
                      Settled up
                    </Text>
                  </View>
                : friend.balance < 0
                  ? <View style={styles.marginLeftAuto}>
                      <Text
                        style={[
                          styles.textAlignRight,
                          styles.primary,
                          styles.smallFont
                        ]}
                      >
                        you are owed
                      </Text>
                      <Text
                        style={[
                          styles.bigFont,
                          styles.textAlignRight,
                          styles.primary
                        ]}
                      >
                        {"\u20B9"}
                        {friend.balance - 2 * friend.balance}
                      </Text>
                    </View>
                  : <View style={styles.marginLeftAuto}>
                      <Text
                        style={[
                          styles.orange,
                          styles.textAlignRight,
                          styles.smallFont
                        ]}
                      >
                        you owe
                      </Text>
                      <Text
                        style={[
                          styles.bigFont,
                          styles.textAlignRight,
                          styles.orange
                        ]}
                      >
                        {"\u20B9"}
                        {friend.balance}
                      </Text>
                    </View>}
            </CardItem>
          </Card>
        );
      })}
      <Button
        onPress={() =>
          props.screenProps.navigation.navigate("AddFriend", {
            update: props.update
          })}
        block
        light
        style={[styles.button, styles.grayBackGround]}
      >
        <Text style={styles.primaryFont}>+ ADD MORE FRIENDS</Text>
      </Button>
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  button: {
    margin: 23,
    height: 35
  },
  rowFlex: {
    flexDirection: "row"
  },
  alignItemsCenter: {
    alignItems: "center"
  },
  columnFlex: {
    flexDirection: "column",
    alignItems: "flex-start"
  },
  thumbnailPrimary: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 4,
    borderColor: "#5AC5A7"
  },
  thumbnailSecondary: {
    width: 40,
    height: 40,
    borderRadius: 22.5
  },
  justifyEnd: {
    marginLeft: "auto"
  },
  grayBackGround: {
    backgroundColor: "#EEEEEE"
  },
  primaryFont: {
    fontSize: 14
    // fontFamily: "encoded-sans-regular"
  },
  secondaryFont: {
    fontSize: 12
    // fontFamily: "encoded-sans-regular"
  },
  topCardHeader: {
    marginBottom: 4
  },
  paddingTop0: {
    paddingTop: 0
  },
  paddingLeft0: {
    paddingLeft: 0
  },
  paddingRight0: {
    paddingRight: 0
  },
  marginAuto: {
    margin: "auto"
  },
  marginLeft: {
    marginLeft: 15
  },
  marginLeft30: {
    marginLeft: 53
  },
  marginLeftAuto: {
    marginLeft: "auto"
  },
  margin0: {
    margin: 0
  },
  marginTop20: {
    marginTop: 20
  },
  paddingBottom0: {
    paddingBottom: 0
  },
  paddingBottom: {
    paddingBottom: 10
  },
  gray: {
    color: "#868686"
  },
  lightGray: {
    color: "#A6A6A6"
  },
  orange: {
    color: "#FF692C"
  },
  primary: {
    color: "#5AC5A7"
  },
  bigFont: {
    fontSize: 20
  },
  mediumFont: {
    fontSize: 15
    // fontFamily: "encoded-sans-regular"
  },
  smallFont: {
    fontSize: 13
    // fontFamily: "encoded-sans-regular"
  },
  textAlignRight: {
    textAlign: "right"
  }
});
