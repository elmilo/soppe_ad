import React, { useEffect, useState } from 'react';
import { ImageBackground, Image, StyleSheet, TouchableWithoutFeedback , StatusBar, Dimensions, Platform } from 'react-native';
import { Block, Button, Text, theme,Input  } from 'galio-framework';
import { LinearGradient } from 'expo-linear-gradient';
import { Icon, Inversion, Header } from '../components';
const { height, width } = Dimensions.get('screen');
import { Images, materialTheme } from '../constants';
import { HeaderHeight } from "../constants/utils";
import inversiones from '../constants/inversiones.js';
import ModalPersonalizado from "../components/ModalPersonalizado";

import { setIngresoVentaInversion } from "../Database/Ingresos";
import { updateVentaMontoInversion } from "../Database/Database";

export default function D2_Inversiones(props) {
    const { navigation, inversion } = props;
    const [inversionId, SetInversionId] = useState("");
    const [arrayInversiones, setArrayInversiones] = useState([]);

    const arrayInversiones1 = [
      { value: 1, label: "Inversion1" },
      { value: 2, label: "Inversion2" },
      { value: 3, label: "Inversion3" },
      { value: 4, label: "Inversion4" },
    ];

    function handleOnChangeInversionId(elemento) {
      SetInversionId(elemento);
    }

    function renderDropdown(lista, texto, handle) {
      return (
        <ModalPersonalizado data={lista} initValue={texto} onSelected={handle} />
      );
    }

    function successArrayInversiones(rows) {
      var datosFinales = [];
      rows.forEach((elemento, key) => {
        datosFinales.push({
          key: elemento.id,
          label: elemento.tipo  + ' - ' + elemento.descripcion,
        });
      });
  
      setArrayInversiones(datosFinales);
    }

    function saveUpdateMonto() {
      updateVentaMontoInversion(inversionId, ventaMonto)

    }

    return (
      <Block style={{ paddingHorizontal: theme.SIZES.BASE, paddingVertical: theme.SIZES.BASE }}>
      
      <TouchableWithoutFeedback >
          <Block flex  style={styles.inversionDescription}>
          {renderDropdown(
          arrayInversiones,
          "Inversion a Actualizar",
          handleOnChangeInversionId
        )}
            <Text size={15} >Valor de venta:</Text>
            <Block flex style={styles.group}>
            <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
              <Input
                right
                placeholder="$"
                placeholderTextColor={materialTheme.COLORS.DEFAULT}
                style={{ borderRadius: 1, borderColor: materialTheme.COLORS.INPUT }}
              />
            </Block>
            </Block>
            

          </Block>
        </TouchableWithoutFeedback>
        <Text></Text><Text></Text><Text></Text><Text></Text><Text></Text><Text></Text>
        <Text></Text><Text></Text><Text></Text><Text></Text><Text></Text><Text></Text>
        <Text></Text><Text></Text><Text></Text><Text></Text><Text></Text><Text></Text>
        <Text></Text>
        <Block style={{ paddingHorizontal: theme.SIZES.BASE, paddingVertical: theme.SIZES.BASE }}>
        <Button shadowless color="green" style={[styles.button, styles.shadow]}>
              Actualizar
            </Button>
            <Text></Text>
        <Button shadowless color="red" style={[styles.button, styles.shadow]}>
              Vender y Eliminar
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