import React, { Component } from "react";
import { StyleSheet, View, Button, ImageBackground } from "react-native";
import firebase from "firebase";
import * as Expo from "expo";
import "firebase/firestore";

class LoginScreen extends Component {

    isUserEqual = (googleUser, firebaseUser) => {
        if (firebaseUser) {
            var providerData = firebaseUser.providerData;
            for (var i = 0; i < providerData.length; i++) {
                if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
                    providerData[i].uid === googleUser.getBasicProfile().getId()) {
                    // We don't need to reauth the Firebase connection.
                    return true;
                }
            }
        }
        return false;
    }

    onSignIn = (googleUser) => {
        // console.log("Google Auth Response", googleUser);
        // We need to register an Observer on Firebase Auth to make sure auth is initialized.
        var unsubscribe = firebase.auth().onAuthStateChanged(function (firebaseUser) {
            unsubscribe();
            // Check if we are already signed-in Firebase with the correct user.
            if (!this.isUserEqual(googleUser, firebaseUser)) {
                // Build Firebase credential with the Google ID token.
                var credential = firebase.auth.GoogleAuthProvider.credential(
                    // googleUser.getAuthResponse().id_token);
                    googleUser.idToken,
                    googleUser.accessToken
                );
                // Sign in with credential from the Google user.
                firebase.auth().signInWithCredential(credential)
                    .then(async (result) => {
                        if (result.additionalUserInfo.isNewUser) {
                            let temp = await firebase.firestore().collection("/users").get();
                            temp.docs.forEach(item=>{
                                if (item.id === result.user.email)
                                {
                                    let userData=item.data();
                                    firebase.firestore().collection("/users").doc(result.user.email).delete();
                                    firebase.firestore().collection("/users").doc(result.user.uid).set(userData);
                                    firebase.firestore().collection("/users").doc(result.user.uid).update({
                                    Name:result.additionalUserInfo.profile.given_name,
                                    registration_status:true
                                    });
                                }
                            });

                            firebase.firestore().collection("/users").doc(result.user.uid).set({
                                Email: result.user.email,
                                Name: result.additionalUserInfo.profile.given_name,
                                registration_status:true,
                                Total_Balance: 0
                            });
                        }

                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            } else {
                console.log("User already signed-in Firebase.");
            }
        }.bind(this));
    }

    signInWithGoogleAsync = async () => {
        try {
            const result = await Expo.Google.logInAsync({
                androidClientId: "800905166300-7nco6j2se6dd7ej439vs6u1fivott1lg.apps.googleusercontent.com",
                // iosClientId: YOUR_CLIENT_ID_HERE,
                scopes: ["profile", "email"],
            });
            if (result.type === "success") {
                this.onSignIn(result);
                return result.accessToken;
            } else {
                return { cancelled: true };
            }
        } catch (e) {
            return { error: true };
        }
    }
    render() {
        const uri = "https://miro.medium.com/max/1280/1*wQ7Sfh98orBJWrU9itR1hA.jpeg";

        return (

            <ImageBackground source={{ uri: uri }} style={{ width: "100%", height: "100%" }}>
                <View style={styles.container}>

                    <Button
                        title="Sign in with Google"
                        onPress={() => this.signInWithGoogleAsync()}
                    />

                </View>
            </ImageBackground>

        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
});

export default LoginScreen;
