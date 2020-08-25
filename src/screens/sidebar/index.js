import React, { Component } from "react";
import { Image } from "react-native";
import firebase from "firebase";
import {
  Content,
  Text,
  List,
  ListItem,
  Icon,
  Container,
  Left,
  Right,
  Badge,
  Card,
  CardItem,
  Thumbnail
} from "native-base";
import styles from "./style";

const name = "Souma Ghosh";
const email = "sghosh.souma@gmail.com";

const drawerCover = require("../../../assets/drawer-cover.png");
const drawerImage = require("../../../assets/logo-kitchen-sink.png");
const datas = [
  {
    name: "Home",
    route: "Home",
    icon: "phone-portrait",
    bg: "#C5F442"
  },
  {
    name: "Profile",
    route: "Anatomy",
    icon: "phone-portrait",
    bg: "#C5F442"
  },
  {
    name: "Setting",
    route: "Anatomy1",
    icon: "settings",
    bg: "#C5F442"
  }
];

class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shadowOffsetWidth: 1,
      shadowRadius: 4
    };
  }

  render() {
    return (
      <Container style={styles.Container}>
        <Content
          bounces={false}
          style={{ flex: 1, backgroundColor: "#fff", top: -1, margin: 0 }}
        >
          {/* <Image source={drawerCover} style={styles.drawerCover} />
          <Image square style={styles.drawerImage} source={drawerImage} /> */}
          <Card style={styles.Card}>
            <CardItem style={styles.sidebarInfo}>
              <Thumbnail
                style={styles.thumbnailPrimary}
                source={{
                  uri: "https://api.adorable.io/avatars/100/ghosh"
                }}
              />
              <Text>
                {name}
              </Text>
              <Text>
                {email}
              </Text>
            </CardItem>
          </Card>
          <List
            dataArray={datas}
            renderRow={data =>
              <ListItem
                button
                noBorder
                onPress={() => this.props.navigation.navigate(data.route)}
              >
                <Left>
                  <Icon
                    active
                    name={data.icon}
                    style={{ color: "#777", fontSize: 26, width: 30 }}
                  />
                  <Text style={styles.text}>
                    {data.name}
                  </Text>
                </Left>
                {data.types &&
                  <Right style={{ flex: 1 }}>
                    <Badge
                      style={{
                        borderRadius: 3,
                        height: 25,
                        width: 72,
                        backgroundColor: data.bg
                      }}
                    >
                      <Text
                        style={styles.badgeText}
                      >{`${data.types} Types`}</Text>
                    </Badge>
                  </Right>}
              </ListItem>}
          />
          <ListItem button noBorder onPress={() => firebase.auth().signOut()}>
            <Left>
              <Icon
                active
                name="disc"
                style={{ color: "#777", fontSize: 26, width: 30 }}
              />
              <Text style={styles.text}>Logout</Text>
            </Left>
          </ListItem>
        </Content>
      </Container>
    );
  }
}

export default SideBar;
