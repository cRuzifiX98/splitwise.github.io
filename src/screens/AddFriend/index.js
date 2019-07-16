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
import { StyleSheet, View, Alert } from "react-native";

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
  }
});

class AddFriend extends Component {
  state = {
    userId: 0,
    friendId: 0,
    email: "",
    title: "",
    amount: "",
    paidBy: "you",
    split: "equally",
    timeStamp: ""
  };

  sendData = () => {
    const date = new Date();
    var timestamp = date.getTime();
    const transactionData = { ...this.state, timeStamp: timestamp };
    console.log(transactionData);
  };

  render() {
    return (
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
            <Title>Add Expenses</Title>
          </Body>
          <Right style={styles.paddingRight0}>
            <Button onPress={this.sendData} transparent>
              <Text>SAVE</Text>
            </Button>
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
                onChangeText={text => this.setState({ amount: text })}
              />
            </Item>
          </Form>
          <View style={styles.selector}>
            <Text>Paid by </Text>
            <Button small light>
              <Text>You</Text>
            </Button>
            <Text> Split </Text>
            <Button small light>
              <Text>Equally</Text>
            </Button>
          </View>
        </Content>
      </Container>
    );
  }
}

export default AddFriend;
