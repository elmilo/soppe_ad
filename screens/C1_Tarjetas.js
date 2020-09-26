import React, { useState } from 'react';
import { ImageBackground, Image, StyleSheet, StatusBar, Dimensions, Platform, ScrollView } from 'react-native';
import { Block, Button, Text, theme, Input } from 'galio-framework';
import { LinearGradient } from 'expo-linear-gradient';
const { height, width } = Dimensions.get('screen');
import { Images, materialTheme } from '../constants';
import { HeaderHeight } from "../constants/utils";
import { Icon, Product, Header, Select } from '../components';
import ModalSelector from 'react-native-modal-selector';
import products from '../constants/products';

export default function C1_Tarjetas(props) {
  //variable para setear fecha
  let index = 0;
  const entidad = [
    // { key: index++, section: true, label: 'Fruits' },
    { key: index++, label: 'Banco Galicia' },
    { key: index++, label: 'Banco BBVA' },
    { key: index++, label: 'Ualá' },

  ];
  const emisor = [
    // { key: index++, section: true, label: 'Fruits' },
    { key: index++, label: 'Visa' },
    { key: index++, label: 'Mastercard' },
    { key: index++, label: 'Cabal' },
    { key: index++, label: 'American Express' },
    { key: index++, label: 'CMR' },
    { key: index++, label: 'Maestro' },
    { key: index++, label: 'Visa Electrón' },
    { key: index++, label: 'Mercado Pago' },

  ];
  const monedas = [
    { key: index++, label: 'Pesos Argentinos' },
    { key: index++, label: 'Dolares' },
    { key: index++, label: 'Euros' },
  ];
  const tipo = [
    { key: index++, label: 'Débito' },
    { key: index++, label: 'Crédito' },
  ];
  const cuentadebito = [
    { key: index++, label: 'Banco Galicia 453/5265988' },
  ];

  return (
    <Block style={{ paddingHorizontal: theme.SIZES.BASE, paddingVertical: theme.SIZES.BASE }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.products}>
        <Text p style={{ marginBottom: theme.SIZES.BASE / 2 }}>Entidad</Text>
        <ModalSelector flex style={styles.group}
          data={entidad}
          initValue="Entidad Emisora"
        // onChange={(option)=>{ alert(`${option.label} (${option.key}) nom nom nom`) }} 
        />
        <Text></Text><Text></Text>
        <Text p style={{ marginBottom: theme.SIZES.BASE / 2 }}>Emisor</Text>
        <ModalSelector flex style={styles.group}
          data={emisor}
          initValue="Emisor"
        // onChange={(option)=>{ alert(`${option.label} (${option.key}) nom nom nom`) }} 
        />
        <Text></Text><Text></Text>
        <Text p style={{ marginBottom: theme.SIZES.BASE / 2 }}>Tipo de tarjeta</Text>
        <ModalSelector flex style={styles.group}
          data={tipo}
          initValue="Tipo"
        // onChange={(option)=>{ alert(`${option.label} (${option.key}) nom nom nom`) }} 
        />
        <Text></Text><Text></Text>
        <Text p style={{ marginBottom: theme.SIZES.BASE / 2 }}>Cuenta a debitar</Text>
        <ModalSelector flex style={styles.group}
          data={cuentadebito}
          initValue="Debito"
        // onChange={(option)=>{ alert(`${option.label} (${option.key}) nom nom nom`) }} 
        />
        <Text></Text><Text></Text>
        <Text p style={{ marginBottom: theme.SIZES.BASE / 2 }}>últimos 4 digitos</Text>
        <Block flex style={styles.group}>
          <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
            <Input
              right
              placeholder="Solo Números"
              placeholderTextColor={materialTheme.COLORS.DEFAULT}
              style={{ borderRadius: 1, borderColor: materialTheme.COLORS.INPUT }}
            />
          </Block>
        </Block>
        <Block flex>
          <Text p style={{ marginBottom: theme.SIZES.BASE / 2 }}>Fecha de vencimiento</Text>
          <Block flex style={styles.group}>
            <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
              <Input
                right
                placeholder="Solo Números"
                placeholderTextColor={materialTheme.COLORS.DEFAULT}
                style={{ borderRadius: 1, borderColor: materialTheme.COLORS.INPUT }}
              />
            </Block>
          </Block>
          <Text p style={{ marginBottom: theme.SIZES.BASE / 2 }}>Fecha de cierre</Text>
          <Block flex style={styles.group}>
            <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
              <Input
                right
                placeholder="Solo Números"
                placeholderTextColor={materialTheme.COLORS.DEFAULT}
                style={{ borderRadius: 1, borderColor: materialTheme.COLORS.INPUT }}
              />
            </Block>
          </Block>
          <Text p style={{ marginBottom: theme.SIZES.BASE / 2 }}>Fecha de vencimiento de resumen</Text>
          <Block flex style={styles.group}>
            <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
              <Input
                right
                placeholder="Solo Números"
                placeholderTextColor={materialTheme.COLORS.DEFAULT}
                style={{ borderRadius: 1, borderColor: materialTheme.COLORS.INPUT }}
              />
            </Block>
          </Block>
          <Text p style={{ marginBottom: theme.SIZES.BASE / 2 }}>Saldo</Text>
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
