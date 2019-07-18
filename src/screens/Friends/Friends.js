import React from "react";
import {
  StyleSheet,
  Image,
  Text,
  View,
  TouchableHighlight,
  TouchableOpacity,
  Alert
} from "react-native";
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
    { Id: 6, name: "Shanmuk", balance: 300.5 },
    { Id: 7, name: "Shubham", balance: 150 },
    { Id: 8, name: "Deepak", balance: 1024 },
    { Id: 9, name: "Vikash", balance: 200 }
  ]
};

const updateExpenses = () => {
  data.friends.reduce((youAreOwed, friend) => {
    if (friend.balance < 0) {youAreOwed += friend.balance;}
  }, 0);
};

export default function Friends(props) {
  return (
    <React.Fragment>
      {data.friends.map(friend => {
        return (
          <Card transparent key={friend.name}>
            <CardItem
              button
              onPress={() =>
                Alert.alert(
                  "Want to view transactions? We will be addding this feature soon!!"
                )}
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
              {friend.balance < 0
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
          Alert.alert("Want to add friends? We will add this feature soon!!")}
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
