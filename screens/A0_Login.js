import React, { useEffect, useState } from 'react';
import { StyleSheet, Dimensions, ScrollView } from 'react-native';
import { Button, Block, Text, Input, theme } from 'galio-framework';
import { Images, materialTheme } from '../constants';
import { getCompletoFormateado } from "../Database/SelectTables";
import {login} from "../external/UserAPI"
import { registerUser} from '../Database/Database'

const { width } = Dimensions.get('screen');

export default function A0_Login (props) {
  const navigation = props.navigation;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function goToInicio(){
    navigation.navigate("Inicio");
  }

  function goToRegistrarse(){
    navigation.navigate("Registrarse")
  }

  function getUsersCallback(rows){
    if(rows.length > 0){
      goToInicio();
    }
  }

  function validateLogin(){
    return login(username, password).then(loginData => doLogin(loginData));
  }

  function doLogin(loginData){
    if(loginData){
      registerUser(loginData.email, loginData.nombre, loginData.apellido, loginData.password, loginData._id);
      goToInicio();
    } else {
      alert("Invalid user or password");
      setPassword("");
    }
  }
    getCompletoFormateado("Usuarios", getUsersCallback);
    return (
      <Block flex space="evenly" style={styles.container}>
        <Block style={styles.padded}>
          <Input
            value={username}
            style={styles.textInput}
            type ='email-address'
            placeholder="Dirección de email"
            autoFocus={true}
            onChangeText={(user) => setUsername(user)}
          />
        </Block>
        <Block style={styles.padded}>
          <Input
            style={styles.textInput}
            value={password}
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={(pass) => setPassword(pass)}
          />
        </Block>
        <Block center>
          <Button
            shadowless
            style={styles.button}
            color={materialTheme.COLORS.BUTTON_COLOR}
            onPress={() => validateLogin()}
          >
            Login
          </Button>
        </Block>
        <Block center>
          <Button
            shadowless
            style={styles.button}
            color={materialTheme.COLORS.INFO}
            onPress={() => goToRegistrarse()}
          >
            Register
          </Button>
        </Block>
      </Block>
    );
  }

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.COLORS.GRAY,
  },
  padded: {
    paddingHorizontal: theme.SIZES.BASE * 2,
    position: 'relative',
    bottom: theme.SIZES.BASE,
    
  },
  button: {
    width: width - theme.SIZES.BASE * 4,
    height: theme.SIZES.BASE * 3,
    shadowRadius: 0,
    shadowOpacity: 0,
  },
});

