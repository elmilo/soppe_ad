import React, { useState } from 'react';
import { StyleSheet, Dimensions, ScrollView } from 'react-native';
import { Button, Block, Text, Input, theme } from 'galio-framework';
import { materialTheme } from '../constants';
import { registerUser} from '../Database/Database'
import { register } from "../external/UserAPI"


const { width } = Dimensions.get('screen');

export default function A1_Registrarse(props){
 
    const navigation = props.navigation;
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");


    function goToInicio(){
      navigation.navigate("Login");
    }

    function doRegister(){
      register(name, lastName, email, password).then(id => {
        console.log("id", id)
        if (id == -1){
          alert("Error creando la cuenta por favor probar de nuevo")
        } else {
          registerUser(email, name, lastName, password, id);
          goToInicio();
        }
      })
    }

    return (
      <Block style={styles.container}>
      <Block style={styles.padded}>
        <Text> Email*</Text>
        <Input
          style={styles.textInput}
          placeholder="Email"
          autoFocus={true}
          onChangeText={(email) => setEmail(email)}
        />
        <Text> Nombre* </Text>
        <Input
          style={styles.textInput}
          placeholder="Nombre"
          onChangeText={(name) => setName(name)}
        />
        <Text> Apellido* </Text>
        <Input
          style={styles.textInput}
          placeholder="Apellido"
          onChangeText={(lastName) => setLastName(lastName)}
        />
        <Text> Password* </Text>
         <Input
            style={styles.textInput}
            placeholder="Password" 
            secureTextEntry={true}
            onChangeText={(pass) => setPassword(pass)}
          />
          <Button
            shadowless
            style={styles.button}
            color={materialTheme.COLORS.INFO}
            onPress={() => doRegister()}
          >
            Register
          </Button>
      </Block>
      </Block>
    )
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.COLORS.GRAY,
  },
  padded: {
    paddingHorizontal: theme.SIZES.BASE * 2,
    position: 'relative',
    bottom: theme.SIZES.BASE,
    paddingVertical: theme.SIZES.BASE * 5,
  },
  button: {
    width: width - theme.SIZES.BASE * 4,
    height: theme.SIZES.BASE * 3,
    shadowRadius: 0,
    shadowOpacity: 0,
    top: theme.SIZES.BASE ,
  },
});
