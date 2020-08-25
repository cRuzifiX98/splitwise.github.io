const React = require("react-native");
const { Dimensions, Platform } = React;
const deviceHeight = Dimensions.get("window").height;

export default {
  imageContainer: {
    flex: 1,
    width: null,
    height: null
  },
  header: {
    backgroundColor: "#5AC5A7"
  },
  headerBody: {
    padddingLeft: 10,
    backgroundColor: "#5AC5A7",
    marginLeft: 0
  },
  logoContainer: {
    flex: 1,
    marginTop: deviceHeight / 8,
    marginBottom: 30
  },
  logo: {
    position: "absolute",
    left: Platform.OS === "android" ? 40 : 50,
    top: Platform.OS === "android" ? 35 : 60,
    width: 280,
    height: 100
  },
  text: {
    color: "#D8D8D8",
    bottom: 6,
    marginTop: 5
  },
  headerTitle: {
    backgroundColor: "#5AC5A7",
    fontFamily: "SansBold"
  },
  TabHeading: {
    backgroundColor: "#5AC5A7"
  }
};
