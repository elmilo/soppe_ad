import React, { useState , useEffect } from "react";
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
import  InsertMaestros  from "../Database/InsertMaestros";
import { setCuentaUnica } from "../Database/Database";
import { getTodo } from "../Database/SelectTables";

const arrayEntidades      = InsertMaestros.ENTIDADES;
const arrayMonedaIngreso  = InsertMaestros.MONEDAS;

export default function D1_Cuentas(props) {
  const [user_id, setUser_id] = useState(1);
  const [accNumber, setAccNumber] = useState("");
  const [cbu, setCbu] = useState(0);
  const [alias, setAlias] = useState("");
  const [saldo, setSaldo] = useState(0.0);
  const [cuenta, SetCuenta] = useState("");
  const [moneda, SetMoneda] = useState("");
  const navigation = props.navigation;
  
  function successCallback(rowDB) {
    setUser_id(rowDB.idExt);
  }

  useEffect(() => {
    getTodo("Usuarios", successCallback);
  }, []);

  function handleOnChangeEntidad(unaCuenta) {
    SetCuenta(unaCuenta);
  }

  function handleOnChangeMoneda(unaMoneda) {
    SetMoneda(unaMoneda);
  }
  
  
  function saveAccount() {
    setCuentaUnica(cbu, user_id, cuenta, moneda, accNumber, alias, saldo);
    navigation.navigate("Cuentas");
  }

  function DropdownCuenta(props) {
    return (
      <ModalPersonalizado
        data={arrayEntidades}
        initValue="Seleccione una entidad"
        onSelected={handleOnChangeEntidad}
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

  function renderDebajoCuentas (){

  if (cuenta != 'EFECTIVO'){
    return(
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
            onChangeText={(text) => {setAccNumber(text);}}
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
      <Block
        style={{
          paddingHorizontal: theme.SIZES.BASE,
          paddingVertical: theme.SIZES.BASE,
        }}
      >

      </Block>
      
    </Block>
    )
  }
    
  return(
      <Block flex style={styles.group}>
        <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
          <Input
            right
            placeholder="Descripción cuenta"
            placeholderTextColor={materialTheme.COLORS.DEFAULT}
            style={{
              borderRadius: 1,
              borderColor: materialTheme.COLORS.INPUT,
            }}
            onChangeText={(text) => {setAccNumber(text);}}
          />
        </Block></Block>)

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
        {DropdownCuenta()}

        <Block />
        {DropdownMoneda()}

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

        <Block />
        {renderDebajoCuentas()}

        <Block style={{ paddingHorizontal: theme.SIZES.BASE, paddingVertical: theme.SIZES.BASE }}>
        <Button
          shadowless
          color="success"
          style={[styles.button, styles.shadow]}
          onPress={() => {saveAccount();}}
        >
          +
        </Button>
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
