import React, { Component } from "react";
// import { ImageBackground, View, StatusBar,StyleSheet } from "react-native";
import {
  Container,
  H3,
  Text,
  Header,
  TabHeading,
  Title,
  Button,
  Icon,
  Left,
  Right,
  Body,
  Tab,
  Tabs
} from "native-base";
// import { Grid, Col } from "react-native-easy-grid";
import styles from "./styles";
import HomeScreen from "../Friends";
import Groups from "../Groups";

class Home extends Component {
  toggleFriendTransaction = () => {
    console.log("toggling");
    this.setState({ showFriendTransaction: !this.state.showFriendTransaction });
  };
  render() {
    return (
      <Container>
        {/* <StatusBar barStyle="light-content" /> */}
        <Header hasTabs>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.openDrawer()}
            >
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>Splitwise</Title>
          </Body>
          <Right />
        </Header>

        <Tabs>
          <Tab
            heading={
              <TabHeading>
                <Icon name="person" />
                <Text>Friends</Text>
              </TabHeading>
            }
          >
            <HomeScreen screenProps={this.props} />
          </Tab>
          <Tab
            heading={
              <TabHeading>
                <Icon name="people" />
                <Text>Group</Text>
              </TabHeading>
            }
          >
            {/* <GroupsPage /> */}
            <Groups />
          </Tab>
          <Tab
            heading={
              <TabHeading>
                <Icon name="paper-plane" />
                <Text>Notifications</Text>
              </TabHeading>
            }
          >
            <H3 style={styles.text}>Hello world</H3>
          </Tab>
        </Tabs>
      </Container>
    );
  }
}

export default Home;
