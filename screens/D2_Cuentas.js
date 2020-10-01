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


export default function D2_Cuentas (props) {
  const [datos, setDatos] = React.useState(null);
      const [cuenta, setCuenta]= useState("");
  
  const navigation = props.navigation;
  const arrayCuentas1 = [
    { value: 1, label: "Cuenta1" },
    { value: 2, label: "Cuenta2" },
    { value: 3, label: "Cuenta3" },
    { value: 4, label: "Cuenta4" },
  ];

  useEffect(() => {
    getCuentas(1, successArrayCuentas);
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
        <Text p style={{ marginBottom: theme.SIZES.BASE / 2 }}>Cuenta a Eliminar</Text>
        <ModalPersonalizado
        data={arrayCuentas}
        initValue="Seleccione una Cuenta"
        onSelected={handleOnChangeCuenta}
      />
      </Block>
    );
  }

  function eliminarCuenta() {
    const user_id = 1;
    deleteCuenta(cuenta.slice(cuenta.search("-")+2,-5));
    navigation.navigate("Cuentas");
  }
  
  const [arrayCuentas, setArrayCuentas] = useState([]);
  //arrayCuentas
  function successCallback(rows) {
    var datosTemporales = [];
    rows.forEach((cuenta, index) => {
      datosTemporales.push(<Cuenta cuenta={cuenta} key={index} horizontal />);
    });

    setDatos(datosTemporales);
  }
  useFocusEffect(() => {
    getCuentas(successCallback);
  })

  const renderCuentas = () => {
    
    return (
      <Block style={{ paddingHorizontal: theme.SIZES.BASE, paddingVertical: theme.SIZES.BASE }}>   
      {DropdownCuenta()} 
      <Block style={{ paddingHorizontal: theme.SIZES.BASE, paddingVertical: theme.SIZES.BASE }}>  
      <Button shadowless color="red" style={[styles.button, styles.shadow]}>
        Eliminar
      </Button>
      </Block>
      </Block>
      
      
    );
  
};
return (
  <Block flex center style={styles.home}>
    {renderCuentas()}
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