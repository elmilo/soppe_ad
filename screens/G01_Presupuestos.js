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

export default function G01_Presupuestos(props){
  //variable para setear fecha
 
  let index = 0;
  const rubro = [
    { key: index++, label: 'Servicios' },
    { key: index++, label: 'Impuestos' },
    { key: index++, label: 'Salud' },
    { key: index++, label: 'Viáticos' },
    { key: index++, label: 'Comidas' },
    { key: index++, label: 'Entretenimiento' },
    { key: index++, label: 'Otros' },
];
const categorias= [
    { key: index++, label: 'Luz' },
    { key: index++, label: 'Gas' },
    { key: index++, label: 'Agua' },
    { key: index++, label: 'Tv por Cable' },
    { key: index++, label: 'Internet' },
    { key: index++, label: 'Teléfono Fijo' },
    { key: index++, label: 'Teléfono Movil' },
    { key: index++, label: 'Nacional' },
    { key: index++, label: 'Provincial' },
    { key: index++, label: 'Municipal' },
    { key: index++, label: 'Otros' },
     ];

    return (
      <Block style={{ paddingHorizontal: theme.SIZES.BASE, paddingVertical: theme.SIZES.BASE }}>

            <Text p style={{marginBottom: theme.SIZES.BASE / 2}}>Valor Mensual</Text>
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
          <Text></Text>
          <Text></Text>
          <Text></Text>
          <Text></Text>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.products}>
          <Text p style={{marginBottom: theme.SIZES.BASE / 2}}>Rubro</Text>
          <ModalSelector flex style={styles.group}
          data={rubro}
          initValue="Seleccione un Rubro"
          />

          <Block/>
          <Text p style={{marginBottom: theme.SIZES.BASE / 2}}>Categoria</Text>
          <ModalSelector
          data={categorias}
          initValue="Seleccione una Categoría"
          />
          <Block/>
          <Text></Text>
          
          <Block flex>  
                
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
