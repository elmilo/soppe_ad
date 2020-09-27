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
const db = SQLite.openDatabase("db.db");

const arrayEntidadIngreso = [
  { value: 1, label: "Banco Galicia" },
  { value: 2, label: "Banco Patagonia" },
  { value: 3, label: "Banco Provincia" },
  { value: 4, label: "BBVA ARS" },
];

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
  const [tipoTarjeta1, SetTipoTarjeta1] = useState('');
  const [cuentaDebito, SetCuentaDebito] = useState('');
  const [cuentaSeleccionada, setCuentaSeleccionada] = useState(0);
  const [entidadEmisora, setEntidadEmisora] = useState("");
  const [tipoTarjeta, setTipoTarjeta] = useState("");
  const [ultimos4Digitos, setUltimos4Digitos] = useState();
  const [fechaCierre, setFechaCierre] = useState("");
  const [fechaVenc, setFechaVenc] = useState("");
  const [saldo, setSaldo] = useState(0);
  const navigation = props.navigation;

  let index = 0;
  const [cuentas, setCuentas] = useState([]);
  
  function renderDropdown(lista, texto) {
    return <ModalPersonalizado data={lista} initValue={texto} />;
  }

  function DropdownEmisor(props) {
    return (
      <ModalPersonalizado
        data={arrayEmisorIngreso}
        initValue="Seleccione un Emisor"
        value={emisor}
        onChange={e => SetEmisor(e.target.value)}
      />
    );
  };

  function DropdownEntidad(props) {
    return (
      <ModalPersonalizado
        data={arrayEntidadIngreso}
        initValue="Seleccione una Entidad"
        value={entidad}
        onChange={e => SetEntidad(e.target.value)}
      />
    );
  };
  function DropdownTipoTarjeta1(props) {
    return (
      <ModalPersonalizado
        data={arrayTipoTarjeta1Ingreso}
        initValue="Seleccione un Tipo de Tarjeta"
        value={tipoTarjeta1}
        onChange={e => setTipoTarjeta1(e.target.value)}
      />
    );
  };function DropdownCuentaDebito(props) {
    return (
      <ModalPersonalizado
        data={arrayCuentaDebitoIngreso}
        initValue="Seleccione una cuenta"
        value={cuentaDebito}
        onChange={e => SetCuentaDebiro(e.target.value)}
      />
    );
  };

  return (
    <Block style={{ paddingHorizontal: theme.SIZES.BASE, paddingVertical: theme.SIZES.BASE }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.products}>
        <Text p style={{ marginBottom: theme.SIZES.BASE / 2 }}>Entidad</Text>
        <DropdownEntidad/>
        <Text></Text><Text></Text>
        <Text p style={{ marginBottom: theme.SIZES.BASE / 2 }}>Emisor</Text>
        <DropdownEmisor/>
        <Text></Text><Text></Text>
        <Text p style={{ marginBottom: theme.SIZES.BASE / 2 }}>Tipo de tarjeta</Text>
        <DropdownTipoTarjeta1/>
        <Text></Text><Text></Text>
        <Text p style={{ marginBottom: theme.SIZES.BASE / 2 }}>Cuenta a debitar</Text>
        <DropdownCuentaDebito />
        <Text></Text><Text></Text>
        <Text p style={{ marginBottom: theme.SIZES.BASE / 2 }}>últimos 4 digitos</Text>
        <Block flex style={styles.group}>
          <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
            <Input
              right
              placeholder="Solo Números"
              placeholderTextColor={materialTheme.COLORS.DEFAULT}
              style={{ borderRadius: 1, borderColor: materialTheme.COLORS.INPUT }}
              onChangeText={(text) => setUltimos4Digitos(text)}
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
                onChangeText={(text) => setFechaVenc(text)}
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
                onChangeText={(text) => setFechaCierre(text)}
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
            <Button shadowless color="success" style={[styles.button, styles.shadow]} >
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
