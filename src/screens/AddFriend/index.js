import React, { Component } from "react";
import {
  Container,
  Header,
  Title,
  Content,
  Text,
  Button,
  Icon,
  Footer,
  FooterTab,
  Left,
  Right,
  Body,
  Input,
  Item,
  Form,
  Card,
  Label
} from "native-base";
import { StyleSheet, View, Alert, TouchableOpacity } from "react-native";
import { MenuProvider } from "react-native-popup-menu";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger
} from "react-native-popup-menu";

// import styles from "./styles";
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff"
  },
  selector: {
    paddingTop: 10,
    paddingLeft: 20,
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  currency: {
    fontSize: 25
  },
  paddingRight0: {
    paddingRight: 0
  },
  save: {
    textAlign: "right",
    color: "#fff"
  },
  selectorBtn: {
    width: "auto",
    paddingHorizontal: 5,
    display: "flex",
    justifyContent: "center"
  },
  menu: {
    width: 100
  }
});

const userId = 1;
const friendId = 4;
class AddFriend extends Component {
  state = {
    email: "",
    title: "",
    amount: "",
    payer: "YOU",
    paidBy: userId, // need access to user id and friend id to set paidBy and paidTo fields
    paidTo: friendId,
    splitShare: 0
  };

  getTimeStamp = async () => {
    const currentDate = await new Date();
    // console.log(typeof currentDate);
    const timeArray = [
      currentDate.getHours(),
      currentDate.getMinutes(),
      currentDate.getSeconds(),
      currentDate.getDate(),
      currentDate.getMonth(),
      currentDate.getFullYear()
    ];
    // const timeArray = await Promise.all(promiseArray);
    return `${timeArray[0]}:${timeArray[1]}:${timeArray[2]} ${timeArray[3]}-${timeArray[4] +
      1}-${timeArray[5]}`;
  };

  sendData = async () => {
    if (this.state.email.includes("@") && this.state.amount) {
      const timeStamp = await this.getTimeStamp();
      this.setState;
      const transactionData = {
        title: this.state.title,
        amount: this.state.amount,
        splitShare: this.state.splitShare,
        paidBy: this.state.paidBy,
        paidTo: this.state.paidTo,
        timeStamp: timeStamp
      };
      console.log(transactionData);
    } else {
      Alert.alert("Invalid Input");
    }
  };

  friendPays = () => {
    this.setState({ payer: "FRIEND", paidBy: friendId, paidTo: userId });
  };

  youPay = () => {
    this.setState({ payer: "YOU", paidBy: userId, paidTo: friendId });
  };

  splitAmount = text => {
    const splitShare = parseInt(text, 10) / 2;
    console.log(splitShare);
    this.setState({ amount: text, splitShare: splitShare });
  };

  render() {
    return (
      <MenuProvider>
        <Container style={styles.container}>
          <Header>
            <Left>
              <Button
                transparent
                onPress={() => this.props.navigation.actions.goBack()}
              >
                <Icon name="arrow-back" />
              </Button>
            </Left>
            <Body>
              <Title>Add expense</Title>
            </Body>
            <Right>
              <TouchableOpacity onPress={this.sendData}>
                <Text style={styles.save}>SAVE</Text>
              </TouchableOpacity>
            </Right>
          </Header>

          <Content padder>
            <Card>
              <Form searchBar>
                <Item last>
                  <Text>With you and:</Text>
                  <Input
                    id="email"
                    placeholder="Enter email"
                    value={this.state.email}
                    onChangeText={text => this.setState({ email: text })}
                  />
                </Item>
              </Form>
            </Card>
            <Form>
              <Item underline>
                <Input
                  id="title"
                  placeholder="Enter a description"
                  value={this.state.title}
                  onChangeText={text => this.setState({ title: text })}
                />
              </Item>
              <Item inlineLabel>
                <Label style={styles.currency}>
                  {"\u20B9"}
                </Label>
                <Input
                  id="amount"
                  placeholder="0.00"
                  value={this.state.amount}
                  onChangeText={text => this.splitAmount(text)}
                />
              </Item>
            </Form>
            <View style={styles.selector}>
              <Text>Paid by </Text>
              <Button small light style={styles.selectorBtn}>
                <Menu>
                  <MenuTrigger text={this.state.payer} />
                  <MenuOptions style={styles.menu}>
                    <MenuOption style={styles.menu} onSelect={this.youPay}>
                      <Text> YOU </Text>
                    </MenuOption>
                    <MenuOption onSelect={this.friendPays}>
                      <Text> FRIEND </Text>
                    </MenuOption>
                  </MenuOptions>
                </Menu>
              </Button>
              <Text style={styles.disabledBtn}> Split </Text>
              <Button small light disabled>
                <Text>Equally</Text>
              </Button>
            </View>
          </Content>
        </Container>
      </MenuProvider>
    );
  }
}

export default AddFriend;
