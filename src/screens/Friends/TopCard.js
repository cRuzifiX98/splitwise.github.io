import React from "react";
import { StyleSheet, Image, Text, View } from "react-native";
import {
  Container,
  Header,
  Button,
  H1,
  H2,
  Thumbnail,
  Icon,
  Card,
  CardItem,
  Right
} from "native-base";

const data = {
  userId: 1,
  firstName: "Souma",
  lastName: "Ghosh",
  youOwe: 200,
  youAreOwed: 100,
  //   groups: [
  //     {
  //       name: "Pub",
  //       balance: 200,
  //       members: [
  //         {
  //           name: "Vijay",
  //           balance: 50
  //         },
  //         {
  //           name: "Shanmuk",
  //           balance: -80
  //         }
  //       ]
  //     },
  //     {
  //       name: "Holiday",
  //       balance: -200,
  //       members: [
  //         {
  //           name: "Dhruvil",
  //           balance: -50
  //         },
  //         {
  //           name: "Ram",
  //           balance: 80
  //         }
  //       ]
  //     }
  //   ]
  friends: [
    { name: "Shubham", balance: 150 },
    { name: "Yatin", balance: -500 },
    { name: "Vivek", balance: 0 },
    { name: "Hassaan", balance: 1024 }
  ]
};

export default function TopCard() {
  return (
    <Card
      transparent
      style={[
        styles.rowFlex,
        styles.alignItemsCenter,
        styles.grayBackGround,
        styles.margin0,
        styles.paddingBottom
      ]}
    >
      <CardItem key={"primaryThumbnail"} style={styles.grayBackGround}>
        <Thumbnail
          style={styles.thumbnailPrimary}
          source={{
            uri: `https://api.adorable.io/avatars/100/${data.firstName}`
          }}
        />
      </CardItem>
      <CardItem
        key={"balanceOverview"}
        style={[styles.grayBackGround, styles.paddingLeft0]}
      >
        <View>
          <Text
            style={[styles.gray, styles.topCardHeader, styles.secondaryFont]}
          >
            TOTAL BALANCE
          </Text>
          <Text style={[styles.orange, styles.primaryFont]}>
            you owe {"\u20B9"}
            {data.youOwe}
          </Text>
          <Text style={[styles.primary, styles.primaryFont]}>
            you are owed {"\u20B9"}
            {data.youAreOwed}
          </Text>
        </View>
      </CardItem>
      {/* <CardItem
        style={[styles.justifyEnd, styles.grayBackGround, styles.paddingRight0]}
      >
        <Icon type="Ionicons" name="menu" style={styles.lightGray} />
      </CardItem> */}
    </Card>
  );
}

const styles = StyleSheet.create({
  button: {
    margin: 23
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
    // fontFamily: "encoded-sans-medium"
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
    marginTop: 0
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
    fontSize: 17
  },
  smallFont: {
    fontSize: 13
  },
  textAlignRight: {
    textAlign: "right"
  }
});
