import React, { useState, useEffect } from "react";
import { useFocusEffect } from '@react-navigation/native'
import { ImageBackground, Image, StyleSheet, TouchableWithoutFeedback , StatusBar, Dimensions, Platform } from 'react-native';
import { Block, Button, Text, theme } from 'galio-framework';
import { LinearGradient } from 'expo-linear-gradient';
import { Icon, Cuenta, Header } from '../components';
const { height, width } = Dimensions.get('screen');
import { Images, materialTheme } from '../constants';
import { HeaderHeight } from "../constants/utils";
import * as SQLite from "expo-sqlite";
import { deleteCuenta, getCuentas } from "../Database/Database";
import ModalPersonalizado from '../components/ModalPersonalizado';
import { getTodo } from '../Database/SelectTables';


export default function D2_Cuentas (props) {
  const [user_id, setUser_id] = useState(1);
  const [cuenta, setCuenta] = useState("");
  const [arrayCuentas, setArrayCuentas] = useState([]);
  const navigation = props.navigation;
  
  function successCallbackUserID(rowDB) {
    setUser_id(rowDB.idExt);
    getCuentas(rowDB.idExt, successArrayCuentas);
  }

  useEffect(() => {
    getTodo("Usuarios", successCallbackUserID);    
  }, []);

  function handleOnChangeCuenta (unaCuenta){
    console.log('handleOnChangeCuenta: ' + unaCuenta);
    setCuenta(unaCuenta);
  }

  function successArrayCuentas(rows) {
    var datosFinales = [];
    rows.forEach((elemento, key) => {
      datosFinales.push({
        key: elemento.id + elemento.nro_cuenta ,
        label: elemento.entidad_id  + ' - ' + elemento.nro_cuenta + ' (' + elemento.moneda + ')',
      });
    });

    setArrayCuentas(datosFinales);
  }


 function DropdownCuenta(props) {
    return (
      <Block>
        <Text p style={{ marginBottom: theme.SIZES.BASE / 2 }}>Cuenta Origen / Destino</Text>
        <ModalPersonalizado
        data={arrayCuentas}
        initValue="Seleccione una Cuenta"
        onSelected={handleOnChangeCuenta}
      />
      </Block>
    );
  }

  const arrayCuentas1 = [
    { value: 1, label: "Cuenta1" },
    { value: 2, label: "Cuenta2" },
    { value: 3, label: "Cuenta3" },
    { value: 4, label: "Cuenta4" },
  ];

  

  function eliminarCuenta() {
    deleteCuenta(user_id, cuenta.slice(cuenta.search("-")+2,-6));
    navigation.navigate("Cuentas");
  }
  
    
  return (
    <Block style={{ paddingHorizontal: theme.SIZES.BASE, paddingVertical: theme.SIZES.BASE }}>  
    {DropdownCuenta()}
      <Block style={{ paddingHorizontal: theme.SIZES.BASE, paddingVertical: theme.SIZES.BASE }}>
      <Button
            shadowless
            color="red"
            style={[styles.button, styles.shadow]}
            onPress={() => {eliminarCuenta();}}
          >
          Eliminar
          </Button>
          </Block>
          </Block>      
  );
}





const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.COLORS.WHITE,
      marginTop: Platform.OS === 'android' ? -HeaderHeight : 0,
    },
    padded: {
      paddingHorizontal: theme.SIZES.BASE * 2,
      zIndex: 3,
      position: 'absolute',
      bottom: Platform.OS === 'android' ? theme.SIZES.BASE * 2 : theme.SIZES.BASE * 3,
    },
    button: {
      width: width - theme.SIZES.BASE * 4,
      height: theme.SIZES.BASE * 3,
      shadowRadius: 0,
      shadowOpacity: 0,
    },
    pro: {
      backgroundColor: materialTheme.COLORS.LABEL,
      paddingHorizontal: 8,
      marginLeft: 12,
      borderRadius: 2,
      height: 22
    },
    gradient: {
      zIndex: 1,
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: 66,
    },
  });