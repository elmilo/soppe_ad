import React, { useState, useEffect } from "react";
import { useFocusEffect } from '@react-navigation/native'
import {
  ImageBackground,
  Image,
  StyleSheet,
  StatusBar,
  Dimensions,
  Platform,
  ScrollView,
} from "react-native";
import { Block, Button, Text, theme } from "galio-framework";
import { LinearGradient } from "expo-linear-gradient";
const { height, width } = Dimensions.get("screen");
import { Images, materialTheme } from "../constants";
import { HeaderHeight } from "../constants/utils";
import { Tarjeta } from "../components";
import { getTarjetas} from "../Database/Database";

export default function C0_Tarjetas(props) {
  const [datos, setDatos] = React.useState(null);

  function successCallback(rows) {
    var datosTemporales = [];
    rows.forEach((tarjeta, index) => {
      datosTemporales.push(<Tarjeta tarjeta={tarjeta} key={index} horizontal />);
    });

    setDatos(datosTemporales);
  }
  useFocusEffect(() => {
    const id_usuario  = 1;
    getTarjetas(id_usuario, successCallback);
  })

  const renderTarjetas = () => {

    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.cuentas}
      >
        <Block flex>
        <Text></Text>
          <Block dense>{datos}</Block>
          <Text></Text>
          <Button
            shadowless
            color="success"
            style={[styles.button, styles.shadow]}
            onPress={() => props.navigation.navigate("Nueva Tarjeta")}
          >
            + Agregar nueva tarjeta
          </Button>
          <Text></Text>
        </Block>
      </ScrollView>
    );
  };

  return (
    <Block flex center style={styles.home}>
      {renderTarjetas()}
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
