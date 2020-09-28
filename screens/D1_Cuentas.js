import React, { useState } from "react";
import {
  ImageBackground,
  Image,
  StyleSheet,
  StatusBar,
  Dimensions,
  Platform,
  ScrollView,
} from "react-native";
import { Block, Button, Text, theme, Input } from "galio-framework";
import { LinearGradient } from "expo-linear-gradient";
const { height, width } = Dimensions.get("screen");
import { Images, materialTheme } from "../constants";
import { HeaderHeight } from "../constants/utils";
import { Icon, Product, Header, Select } from "../components";
import ModalSelector from "react-native-modal-selector";
import ModalPersonalizado from "../components/ModalPersonalizado";
import { setCuentaUnica, get2Cuentas } from "../Database/Database";
import products from "../constants/products";
import * as SQLite from "expo-sqlite";

const arrayCuentaIngreso = [
  { value: 1, label: "Banco Galicia ARS" },
  { value: 2, label: "Banco Galicia USD" },
  { value: 3, label: "Mercado Pago" },
  { value: 4, label: "BBVA ARS" },
];

const arrayMonedaIngreso = [
  { value: 1, label: "Pesos Argentinos" },
  { value: 2, label: "Dolares" },
  { value: 3, label: "Euros" },
  { value: 4, label: "CNY" },
];

export default function D1_Cuentas(props) {
  const [entity, setEntity] = useState("");
  const [accNumber, setAccNumber] = useState("");
  const [cbu, setCbu] = useState(0);
  const [alias, setAlias] = useState("");
  const [saldo, setSaldo] = useState(0.0);
  const [cuenta, SetCuenta] = useState("");
  const [moneda, SetMoneda] = useState("");
  const navigation = props.navigation;
  let index = 0;

  function handleOnChangeCuenta(unaCuenta) {
    SetCuenta(unaCuenta);
  }

  function handleOnChangeMoneda(unaMoneda) {
    SetMoneda(unaMoneda);
  }

  function saveAccount() {
    setCuentaUnica(cbu, cuenta, moneda, accNumber, alias, saldo);
    navigation.navigate("Cuentas");
  }

  function DropdownCuenta(props) {
    return (
      <ModalPersonalizado
        data={arrayCuentaIngreso}
        initValue="Seleccione una Cuenta"
        onSelected={handleOnChangeCuenta}
      />
    );
  }

  function DropdownMoneda(props) {
    return (
      <ModalPersonalizado
        data={arrayMonedaIngreso}
        initValue="Seleccione una Moneda"
        onSelected={handleOnChangeMoneda}
      />
    );
  }

  return (
    <Block
      style={{
        paddingHorizontal: theme.SIZES.BASE,
        paddingVertical: theme.SIZES.BASE,
      }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.products}
      >
        <Text p style={{ marginBottom: theme.SIZES.BASE / 2 }}>
          Entidad
        </Text>
        {DropdownCuenta()}

        <Block />
        <Text p style={{ marginBottom: theme.SIZES.BASE / 2 }}>
          Moneda
        </Text>
        {DropdownMoneda()}
        <Block />
        <Text></Text>

        <Block flex>
          <Text p style={{ marginBottom: theme.SIZES.BASE / 2 }}>
            Número de Cuenta
          </Text>
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
                onChangeText={(text) => {
                  setAccNumber(text);
                }}
              />
            </Block>
          </Block>

          <Text p style={{ marginBottom: theme.SIZES.BASE / 2 }}>
            Número de Cbu
          </Text>
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
                onChangeText={(text) => {
                  setCbu(text);
                }}
              />
            </Block>
          </Block>

          <Text p style={{ marginBottom: theme.SIZES.BASE / 2 }}>
            Alias
          </Text>
          <Block flex style={styles.group}>
            <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
              <Input
                right
                placeholder=""
                placeholderTextColor={materialTheme.COLORS.DEFAULT}
                style={{
                  borderRadius: 1,
                  borderColor: materialTheme.COLORS.INPUT,
                }}
                onChangeText={(text) => {
                  setAlias(text);
                }}
              />
            </Block>
          </Block>

          <Text h5 style={{ marginBottom: theme.SIZES.BASE / 2 }}>
            Saldo
          </Text>
          <Block flex style={styles.group}>
            <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
              <Input
                right
                placeholder="$"
                placeholderTextColor={materialTheme.COLORS.DEFAULT}
                style={{
                  borderRadius: 1,
                  borderColor: materialTheme.COLORS.INPUT,
                }}
                onChangeText={(text) => {
                  setSaldo(text);
                }}
              />
            </Block>
          </Block>
          <Block
            style={{
              paddingHorizontal: theme.SIZES.BASE,
              paddingVertical: theme.SIZES.BASE,
            }}
          >
            <Button
              shadowless
              color="success"
              style={[styles.button, styles.shadow]}
              onPress={() => {
                saveAccount();
              }}
            >
              +
            </Button>
          </Block>
          <Text></Text>
        </Block>
      </ScrollView>
    </Block>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.COLORS.BLACK,
    marginTop: Platform.OS === "android" ? -HeaderHeight : 0,
  },
  padded: {
    paddingHorizontal: theme.SIZES.BASE * 2,
    zIndex: 3,
    position: "absolute",
    bottom:
      Platform.OS === "android" ? theme.SIZES.BASE * 2 : theme.SIZES.BASE * 3,
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
    height: 22,
  },
  gradient: {
    zIndex: 1,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 66,
  },
});
