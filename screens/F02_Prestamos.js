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
          <Text size={18} style={styles.prestamoEntidad}>Número de Prestamo:</Text>
          <Text size={20} style={styles.prestamoEntidad}>{prestamo}</Text>
          <Text size={18} style={styles.prestamoEntidad}>Número de Cbu:</Text>
          <Text size={20} style={styles.prestamoEntidad}>{prestamo}</Text>
          <Text size={18} style={styles.prestamoEntidad}>Alias:</Text>
          <Text size={20} style={styles.prestamoEntidad}>{prestamo}</Text>
          </Block>
        </TouchableWithoutFeedback>

                     
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