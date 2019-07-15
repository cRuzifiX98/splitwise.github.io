// import * as WebBrowser from "expo-web-browser";
import React from "react";
import { StyleSheet, Image, Text, View } from "react-native";
import Touchable from "react-native-platform-touchable";
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
import { ScrollView } from "react-native-gesture-handler";

const data = {
  userId: 1,
  firstName: "Souma",
  lastName: "Ghosh",
  youOwe: 200,
  youAreOwed: 100,
  groups: [
    {
      name: "Pub",
      balance: 200,
      members: [
        {
          name: "Vijay",
          balance: 50
        },
        {
          name: "Shanmuk",
          balance: -80
        }
      ]
    },
    {
      name: "Holiday",
      balance: -200,
      members: [
        {
          name: "Dhruvil",
          balance: -50
        },
        {
          name: "Ram",
          balance: 80
        }
      ]
    },
    {
      name: "Lunch",
      balance: 50,
      members: [
        {
          name: "Aman",
          balance: -25
        },
        {
          name: "Kunal",
          balance: 40
        }
      ]
    }
  ]
};

export default function Groups() {
  return (
    <Container>
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
        <CardItem
          style={[
            styles.justifyEnd,
            styles.grayBackGround,
            styles.paddingRight0
          ]}
        >
          <Icon type="Ionicons" name="menu" style={styles.lightGray} />
        </CardItem>
      </Card>
      {data.groups.map(group => {
        return (
          <Card
            transparent
            key={group.name}
            // style={[styles.card, styles.margin0]}
          >
            <CardItem key={group.name} style={styles.paddingBottom0}>
              <Thumbnail
                style={styles.thumbnailSecondary}
                source={{
                  uri: `https://api.adorable.io/avatars/100/${group.name}`
                }}
              />
              <View key={group.name} style={styles.marginLeft}>
                <Text style={styles.mediumFont}>{group.name}</Text>
              </View>
              {group.balance < 0 ? (
                <View style={styles.marginLeftAuto}>
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
                    {group.balance - 2 * group.balance}
                  </Text>
                </View>
              ) : (
                <View style={styles.marginLeftAuto}>
                  <Text style={[styles.orange, styles.smallFont]}>you owe</Text>
                  <Text
                    style={[
                      styles.bigFont,
                      styles.textAlignRight,
                      styles.orange
                    ]}
                  >
                    {"\u20B9"}
                    {group.balance}
                  </Text>
                </View>
              )}
            </CardItem>
            <CardItem
              key={"balanceHighlight"}
              style={[
                styles.columnFlex,
                styles.marginLeft30,
                styles.paddingBottom0,
                styles.paddingTop0
              ]}
            >
              {group.members.map(member => {
                return member.balance < 0 ? (
                  <View key={member.name} style={styles.rowFlex}>
                    <Text style={[styles.smallFont, styles.gray]}>
                      {member.name} owes you {""}
                    </Text>
                    <Text style={styles.primary}>
                      {"\u20B9"}
                      {member.balance - 2 * member.balance}
                    </Text>
                  </View>
                ) : (
                  <View key={member.name} style={styles.rowFlex}>
                    <Text style={[styles.smallFont, styles.gray]}>
                      You owe {member.name} {""}
                    </Text>
                    <Text style={styles.orange}>
                      {"\u20B9"}
                      {member.balance}
                    </Text>
                  </View>
                );
              })}
            </CardItem>
          </Card>
        );
      })}
      <Button block light style={[styles.button]}>
        <Text style={styles.primaryFont}>+ START NEW GROUP</Text>
      </Button>
    </Container>
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
    fontSize: 14,
    // fontFamily: "encoded-sans-medium"
  },
  secondaryFont: {
    fontSize: 12,
    // fontFamily: "encoded-sans-regular"
  },
  primaryFontBold: {},
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
    fontSize: 20,
    // fontFamily: "encoded-sans-regular"
  },
  mediumFont: {
    fontSize: 17,
    // fontFamily: "encoded-sans-regular"
  },
  smallFont: {
    fontSize: 13,
    // fontFamily: "encoded-sans-regular"
  },
  textAlignRight: {
    textAlign: "right"
  }
});
