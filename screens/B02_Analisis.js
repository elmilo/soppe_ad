import React, { useState, useEffect } from "react";
import { ImageBackground, Image, StyleSheet, ScrollView, Dimensions, Platform } from 'react-native';
import { Block, Button, Text, theme } from 'galio-framework';
import { LinearGradient } from 'expo-linear-gradient';

const { height, width } = Dimensions.get('screen');
import { Images, materialTheme } from '../constants/';
import { HeaderHeight } from "../constants/utils";
import { getMovimientosUltimoMes } from "../Database/Movimientos";
//import { getEgresos } from "../Database/Egresos";
import  Movimiento  from "../components/Movimiento";

export default function B02_Analisis (props) {
  const [user_id, setUser_id]               = useState(1);
  const [datos, setDatos]                   = useState([]);

  const { navigation } = props;


  function successCallback(rows) {
    
    var datosTemporales = [];
    rows.forEach((elemento, index) => {
      datosTemporales.push(<Movimiento unMovimiento={elemento}/>);
    });

    setDatos(datosTemporales);
  }
  

  useEffect(() => {
    getMovimientosUltimoMes(user_id, successCallback);
  });

   

    return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.cuentas}
    >
      <Block flex>
        <Block dense>{datos}</Block>
        </Block>
        </ScrollView>
    );
  }


const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.COLORS.BLACK,
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
