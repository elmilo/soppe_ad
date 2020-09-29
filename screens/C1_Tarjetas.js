import React, { useEffect, useState } from 'react';
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
import * as SQLite from 'expo-sqlite';
import { setTarjeta } from '../Database/Database';
const db = SQLite.openDatabase("db.db");

const arrayEmisorIngreso = [
  { value: 1, label: "Visa" },
  { value: 2, label: "Mastercard" },
  { value: 3, label: "Cabal" },
  { value: 4, label: "American Express" },
  { value: 5, label: "CMR" },
  { value: 6, label: "Maestro" },
  { value: 7, label: "Visa Electrón" },
  { value: 8, label: "Mercado Pago" },
];
const arrayTipoTarjeta1Ingreso = [
  { value: 1, label: "Débito" },
  { value: 2, label: "Crédito" },
];
const arrayCuentaDebitoIngreso = [
  { value: 1, label: "Banco Galicia 453/5265988" },
];

export default function C1_Tarjetas(props) {
  const [entidad, SetEntidad] = useState('');
  const [emisor, SetEmisor] = useState('');
  const [cuentaDebito, SetCuentaDebito] = useState('');
  const [tipoTarjeta, setTipoTarjeta] = useState("");
  const [ultimos4Digitos, setUltimos4Digitos] = useState();
  const [fechaVencePlastico, setFechaVencePlastico] = useState("");
  const [fechaVenceResumen, setFechaVenceResumen] = useState("");
  const [saldo, setSaldo] = useState(0);
  const navigation = props.navigation;
  let index = 0;
       
  function handleOnChangeEmisor(unEmisor) {
    SetEmisor(unEmisor);
  }
  function handleOnChangeTipo(unTipo) {
    setTipoTarjeta(unTipo);
  }
  function handleOnChangeCuentaDebito(unaCuentaDebito) {
    SetCuentaDebito(unaCuentaDebito);
  }

  function saveTarjeta() {
    const user_id = 1;
    setTarjeta(user_id, cuentaDebito, ultimos4Digitos, emisor,  tipoTarjeta, fechaVencePlastico,fechaVenceResumen, saldo);
    navigation.navigate("Tarjetas");
  }

  function DropdownEmisor(props) {
    return (
      <ModalPersonalizado
        data={arrayEmisorIngreso}
        initValue="Emisor"
        onSelected={handleOnChangeEmisor}
      />
    );
  };

  function DropdownTipoTarjeta(props) {
    return (
      <ModalPersonalizado
        data={arrayTipoTarjeta1Ingreso}
        initValue="Tipo de Tarjeta"
        onSelected={handleOnChangeTipo}
      />
    );
  };
  

  function DropdownCuentaDebito(props) {
    return (
      <ModalPersonalizado
        data={arrayCuentaDebitoIngreso}
        initValue="Cuenta Origen"
        onSelected={handleOnChangeCuentaDebito}
      />
    );
  };

  return (
    <Block style={{ paddingHorizontal: theme.SIZES.BASE, paddingVertical: theme.SIZES.BASE }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.products}>
        {DropdownCuentaDebito ()}
        {DropdownEmisor()}
        {DropdownTipoTarjeta()}
        

        <Text></Text><Text></Text>
        <Text p style={{ marginBottom: theme.SIZES.BASE / 2 }}>últimos 4 digitos</Text>
        <Block flex style={styles.group}>
          <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
          <Input
                right
                placeholder="Solo Números"
                placeholderTextColor={materialTheme.COLORS.DEFAULT}
                style={{
                  borderRadius: 1,
                  borderColor: materialTheme.COLORS.INPUT,
                }}
                onChangeText={(text) => {setUltimos4Digitos(text);}}
              />
          </Block>
        </Block>
        <Block flex>
          <Text p style={{ marginBottom: theme.SIZES.BASE / 2 }}>Fecha de vencimiento plástico</Text>
          <Block flex style={styles.group}>
            <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
            <Input
                right
                placeholder="Solo números ej 25052020"
                placeholderTextColor={materialTheme.COLORS.DEFAULT}
                style={{
                  borderRadius: 1,
                  borderColor: materialTheme.COLORS.INPUT,
                }}
                onChangeText={(text) => {setFechaVencePlastico(text);}}
              />
            </Block>
          </Block>
          <Text p style={{ marginBottom: theme.SIZES.BASE / 2 }}>Fecha de cierre</Text>
          <Block flex style={styles.group}>
            <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
            <Input
                right
                placeholder="Solo números ej 25052020"
                placeholderTextColor={materialTheme.COLORS.DEFAULT}
                style={{
                  borderRadius: 1,
                  borderColor: materialTheme.COLORS.INPUT,
                }}
                onChangeText={(text) => {setFechaVenceResumen(text);}}
              />
           </Block>
          </Block>
          <Text p style={{ marginBottom: theme.SIZES.BASE / 2 }}>Fecha de vencimiento de resumen</Text>
          <Block flex style={styles.group}>
            <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
            <Input
                right
                placeholder="Solo números ej 25052020"
                placeholderTextColor={materialTheme.COLORS.DEFAULT}
                style={{
                  borderRadius: 1,
                  borderColor: materialTheme.COLORS.INPUT,
                }}
                onChangeText={(text) => {setFechaVenceResumen(text);}}
              />
             
            </Block>
          </Block>
         <Block style={{ paddingHorizontal: theme.SIZES.BASE, paddingVertical: theme.SIZES.BASE }}>
          <Button
              shadowless
              color="success"
              style={[styles.button, styles.shadow]}
              onPress={() => {saveTarjeta();}}
            >
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
