import React from 'react';
import { ImageBackground, Image, StyleSheet, TouchableWithoutFeedback , StatusBar, Dimensions, Platform } from 'react-native';
import { Block, Button, Text, theme,Input } from 'galio-framework';
import { LinearGradient } from 'expo-linear-gradient';
import { Icon, Tarjeta, Header } from '../components';
const { height, width } = Dimensions.get('screen');
import { Images, materialTheme } from '../constants';
import { HeaderHeight } from "../constants/utils";
import tarjetasjs from '../constants/tarjetas.js';

export default class C2_Tarjetas extends React.Component {
  render() {
    const { navigation } = this.props;
    const { tarjeta } = this.props;
    
    return (
      <Block style={{ paddingHorizontal: theme.SIZES.BASE, paddingVertical: theme.SIZES.BASE }}>
       <TouchableWithoutFeedback >
          <Block flex  style={styles.tarejtaDescription}>
          <Text size={18} style={styles.tarjetaEntidad}>últimos 4 dígitos:</Text>
          <Text size={20} style={styles.tarjetaEntidad}>{tarjeta}</Text>
          <Text size={18} style={styles.tarjetaEntidad}>Fecha de cierre:</Text>
           <Block flex style={styles.group}>
          <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
            <Input
              right
              placeholder="01/10/2020"
              placeholderTextColor={materialTheme.COLORS.DEFAULT}
              style={{ borderRadius: 1, borderColor: materialTheme.COLORS.INPUT }}
            />
          </Block>
          </Block>
          <Text></Text><Text></Text><Text></Text>
          <Text size={18} style={styles.tarjetaEntidad}>Fecha de vencimiento:</Text>
          <Block flex style={styles.group}>
          <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
            <Input
              right
              placeholder="15/10/2020"
              placeholderTextColor={materialTheme.COLORS.DEFAULT}
              style={{ borderRadius: 1, borderColor: materialTheme.COLORS.INPUT }}
            />
            <Text></Text><Text></Text><Text></Text>
             <Button shadowless color="success" style={[styles.button, styles.shadow]}>
              Actualizar fechas
            </Button>
          </Block>
          </Block>
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