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
import { getCuentas } from "../Database/Database";


export default function D2_Cuentas (props) {
  const [datos, setDatos] = React.useState(null);
   

  
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
      <TouchableWithoutFeedback >
          <Block flex  style={styles.cuentaDescription}>
          

          <Text size={18} style={styles.cuentaEntidad}>Número de Cuenta:</Text>
          <Text size={20} style={styles.cuentaEntidad}>{}</Text>
          <Text size={18} style={styles.cuentaEntidad}>Número de Cbu:</Text>
          <Text size={20} style={styles.cuentaEntidad}>{}</Text>
          <Text size={18} style={styles.cuentaEntidad}>Alias:</Text>
          <Text size={20} style={styles.cuentaEntidad}>{}</Text>
          </Block>
      </TouchableWithoutFeedback>     
      <Block style={{ paddingHorizontal: theme.SIZES.BASE, paddingVertical: theme.SIZES.BASE }}>  
      <Text></Text><Text></Text><Text></Text><Text></Text><Text></Text><Text></Text>
      <Text></Text><Text></Text><Text></Text><Text></Text><Text></Text><Text></Text>
      <Text></Text><Text></Text><Text></Text><Text></Text><Text></Text><Text></Text>
      <Text></Text><Text></Text><Text></Text><Text></Text>
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