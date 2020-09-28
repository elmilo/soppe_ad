import React from 'react';
import { StyleSheet, Dimensions, ScrollView } from 'react-native';
import { Button, Block, Text, Input, theme } from 'galio-framework';

import { Icon, Product } from '../components';

const { width } = Dimensions.get('screen');
import products from '../constants/products';
//import AsyncStorage from "@react-native-community/async-storage";

export default class A0_Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
  }


  render() {
    const { navigation } = this.props;
    const USER_STORAGE = 'USER_STORAGE';
    async function loadUser() {
      try {
        const user = await AsyncStorage.getItem(USER_STORAGE);        

        console.log(user + " loaded");
        return user;

      } catch (e) {
        console.error(e);
      }
    }

    

    if(loadUser()){
     // navigation.navigate("App")
    }

    return (
      <Block flex space="evenly" style={styles.container}>
        <Block style={styles.padded}>
          <TextInput
            value={this.username}
            style={styles.textInput}
            placeholder="Username"
            autoFocus={true}
            onChangeText={(user) => this.setState({ username: user })}
          />
        </Block>
        <Block style={styles.padded}>
          <TextInput
            style={styles.textInput}
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={(pass) => this.setState({ password: pass })}
          />
        </Block>
        <Block center>
          <Button
            shadowless
            style={styles.button}
            color={materialTheme.COLORS.BUTTON_COLOR}
            onPress={() => navigation.navigate("App")}
          >
            Login
          </Button>
        </Block>
        <Block center>
          <Button
            shadowless
            style={styles.button}
            color={materialTheme.COLORS.INFO}
            onPress={() => console.log("go to register")}
          >
            Register
          </Button>
        </Block>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  home: {
    width: width,    
  },
  search: {
    height: 48,
    width: width - 32,
    marginHorizontal: 16,
    borderWidth: 1,
    borderRadius: 3,
  },
  header: {
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    elevation: 4,
    zIndex: 2,
  },
  tabs: {
    marginBottom: 24,
    marginTop: 10,
    elevation: 4,
  },
  tab: {
    backgroundColor: theme.COLORS.TRANSPARENT,
    width: width * 0.50,
    borderRadius: 0,
    borderWidth: 0,
    height: 24,
    elevation: 0,
  },
  tabTitle: {
    lineHeight: 19,
    fontWeight: '300'
  },
  divider: {
    borderRightWidth: 0.3,
    borderRightColor: theme.COLORS.MUTED,
  },
  products: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE * 2,
  },
});
