import React, { useEffect, useState } from 'react';
import { ImageBackground, Image, StyleSheet, TouchableWithoutFeedback , StatusBar, Dimensions, Platform } from 'react-native';
import { Block, Button, Text, theme } from 'galio-framework';
import { LinearGradient } from 'expo-linear-gradient';
import { Icon, Cuenta, Header } from '../components';
const { height, width } = Dimensions.get('screen');
import { Images, materialTheme } from '../constants';
import { HeaderHeight } from "../constants/utils";
import prestamos from '../constants/prestamos.js';
import { deletePrestamo } from '../Database/Database';
import ModalPersonalizado from "../components/ModalPersonalizado";


const arrayTipo = [
  { value: 1, label: "Con Tercero" },
  { value: 2, label: "En Cuenta" },
 ];


export default function F02_Prestamos (props) {
  const [tipoPrestamo, setTipoPrestamo] = useState("");
  function eliminarPrestamo() {
    deletePrestamo(id);
    navigation.navigate("Prestamo");
      }

      function handleOnChangeTipo(unTipo) {
        setTipoPrestamo(unTipo);
      }
     
      function DropdownTipoPrestamo(props) {
        return (
          <ModalPersonalizado
            data={arrayTipo}
            initValue="Préstamo"
            onSelected={handleOnChangeTipo}
          />
        );
      };
    
    return (
      <Block style={{ paddingHorizontal: theme.SIZES.BASE, paddingVertical: theme.SIZES.BASE }}>
      {DropdownTipoPrestamo()}
        <Block style={{ paddingHorizontal: theme.SIZES.BASE, paddingVertical: theme.SIZES.BASE }}>
             <Text></Text>
            <Button
              shadowless
              color="red"
              style={[styles.button, styles.shadow]}
             // onPress={() => {eliminarPrestamo();}}

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