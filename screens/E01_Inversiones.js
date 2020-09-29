import React, { useState } from 'react';
import { ImageBackground, Image, StyleSheet, StatusBar, Dimensions, Platform, ScrollView } from 'react-native';
import { Block, Button, Text, theme, Input } from 'galio-framework';
import { LinearGradient } from 'expo-linear-gradient';
const { height, width } = Dimensions.get('screen');
import { Images, materialTheme } from '../constants';
import { HeaderHeight } from "../constants/utils";
import { Icon, Product, Header, Select } from '../components';
import ModalSelector from 'react-native-modal-selector';
import ModalPersonalizado from '../components/ModalPersonalizado';
import products from '../constants/products';
import { setInversion} from "../Database/Database";
import * as SQLite from "expo-sqlite";

const arrayTipoIngreso = [
  { value: 1, label: "Plazo Fijo" },
  { value: 2, label: "Compra Título" },
  { value: 3, label: "Compra Acción" },
  { value: 4, label: "Fondo de Inversion" },
];

const arrayCuentaIngreso = [
  { value: 1, label: "Banco Galicia ARS" },
  { value: 2, label: "Banco Galicia USD" },
  { value: 3, label: "Mercado Pago" },
  { value: 4, label: "BBVA ARS" },
];


export default function E01_Inversiones(props) {
   
  const [tipo, SetTipo] = useState('');
  const [cuentaIn, SetCuentaIn] = useState('');
  const [vencimiento, setVencimiento] = useState(0.0);
  const [valorInv, setValorInv] = useState(0.0);
  const [descripcion, setDescripcion] = useState("");
 
  const navigation = props.navigation;
  let index = 0;

  function DropdownTipo(props) {
    return (
      <ModalPersonalizado
        data={arrayTipoIngreso}
        initValue="Seleccione un Tipo de Inversion"
        onSelected={handleOnChangeTipo}
      />
    );
  };

  function DropdownCuenta(props) {
    return (
      <ModalPersonalizado
        data={arrayCuentaIngreso}
        initValue="Seleccione una Cuenta"
        onSelected={handleOnChangeCuenta}
      />
    );
  };

  function handleOnChangeTipo(unTipo) {
    SetTipo(unTipo);
  }

  function handleOnChangeCuenta(unaCuentaIn) {
    SetCuentaIn(unaCuentaIn);
  }

  function saveInversion() {
    setInversion(cuentaIn,1 ,tipo, vencimiento, valorInv,1,descripcion);
    navigation.navigate("Inversiones");
  }
    
 
  return (
    <Block style={{ paddingHorizontal: theme.SIZES.BASE, paddingVertical: theme.SIZES.BASE }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.products}>
        <Text p style={{ marginBottom: theme.SIZES.BASE / 2 }}>Tipo de Inversion</Text>
        {DropdownTipo()}
        <Block />
        <Text p style={{ marginBottom: theme.SIZES.BASE / 2 }}>Fecha de Vencimiento</Text>
        <Block flex style={styles.group}>
          <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
            <Input
              right
              placeholder="Solo números ej 25052020"
              placeholderTextColor={materialTheme.COLORS.DEFAULT}
              style={{ borderRadius: 1, borderColor: materialTheme.COLORS.INPUT }}
              onChangeText={(text) => {setVencimiento(text); }}
            />
          </Block>
          <Block />
          <Text p style={{ marginBottom: theme.SIZES.BASE / 2 }}>Cuenta Origen / Destino</Text>
          {DropdownCuenta()}
          <Text p style={{ fontSize: 15, marginBottom: theme.SIZES.BASE }}>Se utilizará la moneda de esta cuenta</Text>
        </Block>
        <Block flex>
          <Text p style={{ marginBottom: theme.SIZES.BASE / 2 }}>Valor invertido</Text>
          <Block flex style={styles.group}>
            <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
              <Input
                right
                placeholder="$"
                placeholderTextColor={materialTheme.COLORS.DEFAULT}
                style={{ borderRadius: 1, borderColor: materialTheme.COLORS.INPUT }}
                onChangeText={(text) => {setValorInv(text); }}
              />
            </Block>
          </Block>
          <Text p style={{ marginBottom: theme.SIZES.BASE / 2 }}>Descripción</Text>
          <Block flex style={styles.group}>
            <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
              <Input
                right
                placeholder=""
                placeholderTextColor={materialTheme.COLORS.DEFAULT}
                style={{ borderRadius: 1, borderColor: materialTheme.COLORS.INPUT }}
                onChangeText={(text) => {setDescripcion(text); }}
              />
            </Block>
          </Block>
          <Block style={{ paddingHorizontal: theme.SIZES.BASE, paddingVertical: theme.SIZES.BASE }}>
            <Button shadowless color="success" style={[styles.button, styles.shadow]}onPress={() => {
                saveInversion();
              }}>
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
