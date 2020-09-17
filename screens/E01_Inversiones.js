import React, { useState } from 'react';
import { ImageBackground, Image, StyleSheet, StatusBar, Dimensions, Platform, ScrollView } from 'react-native';
import { Block, Button, Text, theme,Input } from 'galio-framework';
import { LinearGradient } from 'expo-linear-gradient';
const { height, width } = Dimensions.get('screen');
import { Images, materialTheme } from '../constants';
import { HeaderHeight } from "../constants/utils";
import { Icon, Product, Header, Select } from '../components';
import ModalSelector from 'react-native-modal-selector';

import products from '../constants/products';

export default function E01_Inversiones(props){
  //variable para setear fecha
 
  let index = 0;
    const tipo = [
        // { key: index++, section: true, label: 'Fruits' },
        { key: index++, label: 'Plazo Fijo' },
        { key: index++, label: 'Compra Título' },
        { key: index++, label: 'Compra Acción' },
    ];
    const cuenta = [
      { key: index++, label: 'Banco Galicia ARS' },
      { key: index++, label: 'Banco Galicia USD' },
      { key: index++, label: 'Mercado Pago' },
     ];

    const monedas = [
      { key: index++, label: 'Pesos Argentinos' },
      { key: index++, label: 'Dolares' },
      { key: index++, label: 'Euros' },
     ];

    return (
      <Block style={{ paddingHorizontal: theme.SIZES.BASE, paddingVertical: theme.SIZES.BASE }}>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.products}>

            <Text p style={{marginBottom: theme.SIZES.BASE / 2}}>Tipo de Inversion</Text>
              <ModalSelector flex style={styles.group}
              data={tipo}
              initValue="Seleccione un tipo"
              // onChange={(option)=>{ alert(`${option.label} (${option.key}) nom nom nom`) }} 
              />
          <Block/>

            <Text p style={{marginBottom: theme.SIZES.BASE / 2}}>Fecha de Vencimiento</Text>
            <Block flex style={styles.group}>
              <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                <Input
                  right
                  placeholder="Ingrese una fecha"
                  placeholderTextColor={materialTheme.COLORS.DEFAULT}
                  style={{ borderRadius: 1, borderColor: materialTheme.COLORS.INPUT }}
                />
              </Block>
          
              <Block/>
                <Text p style={{marginBottom: theme.SIZES.BASE / 2}}>Cuenta Origen / Destino</Text>
                  <ModalSelector flex style={styles.group}
                  data={cuenta}
                  initValue="Seleccione una de sus cuentas"
                  // onChange={(option)=>{ alert(`${option.label} (${option.key}) nom nom nom`) }} 
                  />
                  <Text p style={{fontSize: 15, marginBottom: theme.SIZES.BASE}}>Se utilizará la moneda de esta cuenta</Text>
          </Block>
          
          <Block flex>  

          <Text p style={{marginBottom: theme.SIZES.BASE / 2}}>Valor invertido a debitar</Text>
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
          
            <Text p style={{marginBottom: theme.SIZES.BASE / 2}}>Valor de venta</Text>
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

          <Text p style={{marginBottom: theme.SIZES.BASE / 2}}>Descripción</Text>
          <Block flex style={styles.group}>
          <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
            <Input
              right
              placeholder=""
              placeholderTextColor={materialTheme.COLORS.DEFAULT}
              style={{ borderRadius: 1, borderColor: materialTheme.COLORS.INPUT }}
            />
          </Block>
          </Block>

          <Block style={{ paddingHorizontal: theme.SIZES.BASE, paddingVertical: theme.SIZES.BASE }}>
            <Button shadowless color="success" style={[styles.button, styles.shadow]}>
              +
            </Button>
            </Block>
          <Text></Text>
          </Block>
          </ScrollView>
        </Block>
    )
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
