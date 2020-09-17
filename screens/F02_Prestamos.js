import React from 'react';
import { ImageBackground, Image, StyleSheet, TouchableWithoutFeedback , StatusBar, Dimensions, Platform } from 'react-native';
import { Block, Button, Text, theme } from 'galio-framework';
import { LinearGradient } from 'expo-linear-gradient';
import { Icon, Cuenta, Header } from '../components';
const { height, width } = Dimensions.get('screen');
import { Images, materialTheme } from '../constants';
import { HeaderHeight } from "../constants/utils";
import prestamos from '../constants/prestamos.js';

export default class F02_Prestamos extends React.Component {
  render() {
    const { navigation } = this.props;
    const { prestamo } = this.props;
    
    return (
      <Block flex style={styles.group}>
      
      <TouchableWithoutFeedback >
          <Block flex  style={styles.prestamoDescription}>
          <Text size={23} style={styles.prestamoEntidad}>{prestamo}</Text>
            <Text size={15} >Cuenta:</Text>
            <Text size={22} style={styles.prestamoEntidad}>Banco Galicia ARS</Text>
            <Text size={15} >Valor de Préstamo:</Text>
            <Text size={22} style={styles.prestamoEntidad}>$70.000</Text>
            <Text size={15} >Valor de cuota:</Text>
            <Text size={22} style={styles.prestamoEntidad}>$12.000</Text>
            <Text size={15} >Día de vencimiento:</Text>
            <Text size={22} style={styles.prestamoEntidad}>31 de cada mes</Text>
            <Text size={15} >Cuotas restantes:</Text>
            <Text size={22} style={styles.prestamoEntidad}>7</Text>
          </Block>
        </TouchableWithoutFeedback>
        <Block style={{ paddingHorizontal: theme.SIZES.BASE, paddingVertical: theme.SIZES.BASE }}>
            <Button color="red" style={[styles.button, styles.shadow]}>
              Eliminar
            </Button>
            </Block>
                     
        </Block>
      
    );
  }
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