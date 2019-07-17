import React from "react";
import { Root } from "native-base";
import { createDrawerNavigator, createStackNavigator, createAppContainer } from "react-navigation";

import Home from "./screens/home/";
import Anatomy from "./screens/anatomy/";
import SideBar from "./screens/sidebar";

const Drawer = createDrawerNavigator(
  {
    Home: { screen: Home },
    Anatomy: { screen: Anatomy },
    Anatomy1: { screen: Anatomy },
    Anatomy2: { screen: Anatomy }
  },
  {
    initialRouteName: "Home",
    contentOptions: {
      activeTintColor: "#e91e63"
    },
    contentComponent: props => <SideBar {...props} />
  }
);

const AppNavigator = createStackNavigator(
  {
    Drawer: { screen: Drawer },
  },
  {
    initialRouteName: "Drawer",
    headerMode: "none"
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default () =>
  <Root>
    <AppContainer />
  </Root>;
