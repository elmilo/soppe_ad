import React, { useState } from "react";
import {
  ImageBackground,
  Image,
  StyleSheet,
  StatusBar,
  Dimensions,
  Platform,
  ScrollView,
  Switch, 
} from "react-native";
import { Block, Button, Text, theme, Input } from "galio-framework";
import { LinearGradient } from "expo-linear-gradient";
const { height, width } = Dimensions.get("screen");
import { Images, materialTheme } from "../constants";
import { HeaderHeight } from "../constants/utils";
import { Icon, Product, Header, Select } from "../components";
import ModalSelector from "react-native-modal-selector";
import ModalPersonalizado from "../components/ModalPersonalizado";
import { setPrestamo, get2Cuentas } from "../Database/Database";
import products from "../constants/products";
import * as SQLite from "expo-sqlite";

const arrayCuentaIngreso = [
  { value: 1, label: "Banco Galicia ARS" },
  { value: 2, label: "Banco Galicia USD" },
  { value: 3, label: "Mercado Pago" },
  { value: 4, label: "BBVA ARS" },
];
const arrayTipo = [
  { value: 1, label: "En Cuenta" },
  { value: 2, label: "Con Tercero" },
 ];


export default function F01_Prestamos(props) {
  const [tipoPrestamo, setTipoPrestamo] = useState("");
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const [proxCuota, setProxCuota] = useState(0);
  const [terceroDesc, setTerceroDesc] = useState(null);
  const [descripcion, setDescripcion] = useState("");
  const [cuotas, setCuotas] = useState(0.0);
  const [fechaVencimiento, setFechaVencimiento] = useState(0.0);
  const [valorCuota, setValorCuota] = useState(0.0);
  const [valorPrestamo, setValorPrestamo] = useState(0.0);
  const [cuenta, SetCuenta] = useState(null);
  
  const navigation = props.navigation;
  let index = 0;

  function handleOnChangeCuenta(unaCuenta) {
    SetCuenta(unaCuenta);
  }

  function handleOnChangePrestamo(unPrestamo) {
    SetPrestamo(unPrestamo);
  }
  function handleOnChangeTipo(unTipo) {
    setTipoPrestamo(unTipo);
  }



  function savePrestamo() {
    setPrestamo(cuenta, tipoPrestamo,  terceroDesc, valorCuota, proxCuota, cuotas,valorPrestamo, descripcion, isEnabled );
    //cambiar null por terceroDesc
    navigation.navigate("Préstamos");
  }

  function DropdownCuenta(props) {
    return (
      <Block>
        <Text p style={{ marginBottom: theme.SIZES.BASE / 2 }}>Cuenta Origen / Destino</Text>
        <ModalPersonalizado
        data={arrayCuentaIngreso}
        initValue="Seleccione una Cuenta"
        onSelected={handleOnChangeCuenta}
      />
      </Block>
    );
  }
  function DropdownTipoPrestamo(props) {
    return (
      <ModalPersonalizado
        data={arrayTipo}
        initValue="Tipo de Préstamo"
        onSelected={handleOnChangeTipo}
      />
    );
  };

  function TerceroDescripcion(props) {
    return (
      <Block>
        <Text h5 style={{ marginBottom: theme.SIZES.BASE / 2 }}>Descripción del Tercero</Text>
        <Block flex style={styles.group}>
          <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
            <Input
              right
              placeholder="Nombre"
              placeholderTextColor={materialTheme.COLORS.DEFAULT}
              style={{ borderRadius: 1, borderColor: materialTheme.COLORS.INPUT }}
              onChangeText={(text) => {setTerceroDesc(text); }}
            />
          </Block>
        </Block>
      </Block>
    );
  };
 
  return (
   
      <Block style={{ paddingHorizontal: theme.SIZES.BASE, paddingVertical: theme.SIZES.BASE }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.products}>
        <Text p style={[styles.text, { textAlign: 'right' }]}>Otorgado / Tomado</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#FF8000" }}
          thumbColor={isEnabled ? "#FF8000" : "#f4f3f4"}
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
        <Block />
        <Text p style={{ marginBottom: theme.SIZES.BASE / 2 }}>Tipo de Préstamo</Text>
        {DropdownTipoPrestamo()}
        {/* {tipoPrestamo = 'En Cuenta' ? DropdownCuenta(): TerceroDescripcion()}; */}
        {DropdownCuenta()}
        {TerceroDescripcion()}
        <Text p style={{ fontSize: 15, marginBottom: theme.SIZES.BASE }}>Se utilizará la moneda de esta cuenta</Text>
        <Block flex>
          <Text h5 style={{ marginBottom: theme.SIZES.BASE / 2 }}>Valor de Préstamo</Text>
          <Block flex style={styles.group}>
            <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
              <Input
                right
                placeholder="$"
                placeholderTextColor={materialTheme.COLORS.DEFAULT}
                style={{ borderRadius: 1, borderColor: materialTheme.COLORS.INPUT }}
                onChangeText={(text) => {setValorPrestamo(text); }}
              />
            </Block>
          </Block>
          <Text h5 style={{ marginBottom: theme.SIZES.BASE / 2 }}>Valor de Cuota</Text>
          <Block flex style={styles.group}>
            <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
              <Input
                right
                placeholder="$"
                placeholderTextColor={materialTheme.COLORS.DEFAULT}
                style={{ borderRadius: 1, borderColor: materialTheme.COLORS.INPUT }}
                onChangeText={(text) => {setValorCuota(text); }}
              />
            </Block>
          </Block>
          <Text h5 style={{ marginBottom: theme.SIZES.BASE / 2 }}>Fecha próxima cuota</Text>
          <Block flex style={styles.group}>
            <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
              <Input
                right
                placeholder="Solo números ej 25052020"
                placeholderTextColor={materialTheme.COLORS.DEFAULT}
                style={{ borderRadius: 1, borderColor: materialTheme.COLORS.INPUT }}
                onChangeText={(text) => {setProxCuota(text); }}
              />
            </Block>
          </Block>
          <Text h5 style={{ marginBottom: theme.SIZES.BASE / 2 }}>Cuotas restantes</Text>
          <Block flex style={styles.group}>
            <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
              <Input
                right
                placeholder="Solo números"
                placeholderTextColor={materialTheme.COLORS.DEFAULT}
                style={{ borderRadius: 1, borderColor: materialTheme.COLORS.INPUT }}
                onChangeText={(text) => {setCuotas(text); }}
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
          <Button
              shadowless
              color="success"
              style={[styles.button, styles.shadow]}
              onPress={() => {savePrestamo();}}
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
