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
import { Icon, Cuenta, Header, Prestamo } from "../components";
import { getPrestamos } from "../Database/Database";
import { getTodo } from "../Database/SelectTables";
import { getCuentas } from "../Database/Database";
import { getTodoSinFiltro } from "../Database/SelectTables";

export default function F00_Prestamos(props) {
  const [datos, setDatos] = React.useState(null);
  const [user_id, setUser_id] = useState(1);
  
 
  function successCallbackUserID(rowDB) {
    setUser_id(rowDB.idExt);
    getTodoSinFiltro('Prestamos', successCallback);
  }

  useEffect(() => {
    getTodo("Usuarios", successCallbackUserID);    
  })

  function successCallback(rows) {
    var datosTemporales = [];
    rows.forEach((prestamo, index) => {
      datosTemporales.push(<Prestamo prestamo={prestamo} key={index} horizontal />);
    });

    setDatos(datosTemporales);
  }
 
 
  const renderPrestamos = () => {

    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.cuentas}
      >
        <Block flex>
        <Text></Text>
          <Block dense>{datos}</Block>
          <Button
            shadowless
            color="success"
            style={[styles.button, styles.shadow]}
            onPress={() => props.navigation.navigate("Nuevo Prestamo")}
          >
            + Agregar nuevo prestamo
          </Button>
          <Text></Text>
          <Button
            shadowless
            color="success"
            style={[styles.button, styles.shadow]}
            onPress={() => props.navigation.navigate("Descripcion Prestamo")}
          >
              Actualizar y Eliminar
          </Button>
          <Text></Text>
        </Block>
      </ScrollView>
    );
  };

  return (
    <Block flex center style={styles.home}>
      {renderPrestamos()}
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
