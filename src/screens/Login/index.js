import React, { Component } from "react";
import { StyleSheet, View, ActivityIndicator, ImageBackground } from "react-native";
import firebase from "firebase";
// import console = require("console");

class LoadingScreen extends Component {

    componentDidMount = () => {
        this.checkIfLoggedIn();
    }

    checkIfLoggedIn = () => {
        firebase.auth().onAuthStateChanged(user => {
            //console.log(user);
            if (user) {
                this.props.navigation.navigate("Drawer");
            } else {
                this.props.navigation.navigate("LoginScreen");
            }
        });
    }

  render() {
    const uri = "https://miro.medium.com/max/1280/1*wQ7Sfh98orBJWrU9itR1hA.jpeg";
    return (

        <ImageBackground source={{uri: uri}} style={{width: '100%', height: '100%'}}>
    <View style={styles.container}>
        <ActivityIndicator size = "large"/>
      </View>
  </ImageBackground>

      
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default LoadingScreen;
