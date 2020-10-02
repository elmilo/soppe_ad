import React, { useState } from "react";
import { withNavigation } from "@react-navigation/compat";
import {
  StyleSheet,
  Dimensions,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import { Block, Text, theme, Button } from "galio-framework";
import { Icon } from "../components";
import materialTheme from "../constants/Theme";
import { dropAll } from "../Database/Database";
const { width } = Dimensions.get("screen");


export default function Cuenta(props) {

  const [pantallaInicial, setPantallaInicial] = React.useState(true);
  const toggleDetalle = () =>
    setPantallaInicial((previousState) => !previousState);

  const {
    cuenta,
    horizontal,
    full,
    style,
    saldoColor,
    imageStyle,
  } = props;

  const imageStyles = [
    styles.image,
    full ? styles.fullImage : styles.horizontalImage,
    imageStyle,
  ];

  function renderInsideCuenta() {
    return (
      <Block
        row={horizontal}
        card
        flex
        style={[styles.cuenta, styles.shadow, style]}
      >
        <TouchableWithoutFeedback
          onPress={() => toggleDetalle()}
        >
          <Block flex style={[styles.imageContainer, styles.shadow]}>
            <Block
              style={{
                paddingHorizontal: theme.SIZES.BASE * 2,
                paddingVertical: theme.SIZES.BASE,
              }}
            >
              <Icon
               name="book"
               family="AntDesign"
                iconColor={theme.COLORS.WHITE}
                size={30}
                color={theme.COLORS.RED}
                style={[styles.social, styles.shadow]}
              ></Icon>
            </Block>
          </Block>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() =>
            toggleDetalle()
          }
        >
          <Block flex space="between" style={styles.cuentaDescription}>
            <Text size={9} muted={!saldoColor} color={saldoColor}>Número de Cuenta:</Text>
            <Text size={17} style={styles.cuentaEntidad}>{cuenta.nro_cuenta}</Text>
            <Text size={9} muted={!saldoColor} color={saldoColor}>Número de Cbu:</Text>
            <Text size={14} style={styles.cuentaEntidad}>{cuenta.cbu}</Text>
            <Text size={9} muted={!saldoColor} color={saldoColor}>Alias:</Text>
            <Text size={17} style={styles.cuentaEntidad}>{cuenta.alias}</Text>
          </Block>
        </TouchableWithoutFeedback>
      </Block>
    )
  }

  function renderCuenta() {
    return (
      <Block
        row={horizontal}
        card
        flex
        style={[styles.cuenta, styles.shadow, style]}
      >
        <TouchableWithoutFeedback
          onPress={() => toggleDetalle()}
        >
          <Block flex style={[styles.imageContainer, styles.shadow]}>
            <Block
              style={{
                paddingHorizontal: theme.SIZES.BASE * 2,
                paddingVertical: theme.SIZES.BASE,
              }}
            >
              <Icon
                name="account-balance-wallet"
                family="MaterialIcons"
                iconColor={theme.COLORS.WHITE}
                size={80}
                color={theme.COLORS.FACEBOOK}
                style={[styles.social, styles.shadow]}
              ></Icon>
            </Block>
          </Block>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() =>
            toggleDetalle()
          }
        >
          <Block flex space="between" style={styles.cuentaDescription}>
            <Text size={14} style={styles.cuentaEntidad}>{cuenta.entidad_id}</Text>
            <Text size={13} style={styles.cuentaEntidad}>{cuenta.moneda}</Text>
            <Text size={20} style={styles.cuentaEntidad}>${cuenta.saldo}</Text>
          </Block>
        </TouchableWithoutFeedback>
      </Block>
    );
  }


  return (
    pantallaInicial ? renderCuenta() : renderInsideCuenta()
  );

}



const styles = StyleSheet.create({
  cuenta: {
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE,
    borderWidth: 0,
    minHeight: 80,
  },
  cuentaEntidad: {
    flex: 2,
    flexWrap: "wrap",
    paddingBottom: 6,
  },
  cuentaDescription: {
    padding: theme.SIZES.BASE / 15,
  },
  imageContainer: {
    elevation: 1,
  },
  image: {
    borderRadius: 3,
    marginHorizontal: theme.SIZES.BASE / 1,
    marginTop: 0,
  },
  horizontalImage: {
    height: 122,
    width: "auto",
  },
  fullImage: {
    height: 215,
    width: width - theme.SIZES.BASE * 3,
  },
  shadow: {
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.1,
    elevation: 2,
  },
});