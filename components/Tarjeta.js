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
import { getTarjetas } from "../Database/Database";



export default function Tarjeta(props) {

  const [pantallaInicial, setPantallaInicial] = React.useState(true);
  const toggleDetalle = () =>
    setPantallaInicial((previousState) => !previousState);

  const {
    tarjeta,
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

  function renderInsideTarjeta() {
    return (
      <Block
        row={horizontal}
        card
        flex
        style={[styles.tarjeta, styles.shadow, style]}
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
          <Block flex space="between" style={styles.tarjetaDescription}>
            <Text size={17} style={styles.tarjetaEntidad}>{tarjeta.emisor}</Text>
            <Text size={9} muted={!saldoColor} color={saldoColor}>Cuenta:</Text>
            <Text size={14} style={styles.tarjetaEntidad}>{tarjeta.cuenta_id} </Text>
            <Text size={9} muted={!saldoColor} color={saldoColor}>Ultimos 4 dig tarjeta:</Text>
            <Text size={17} style={styles.tarjetaEntidad}>{tarjeta.ultimos_4_digitos}</Text>
            <Text size={9} muted={!saldoColor} color={saldoColor}>Cierre:</Text>
            <Text size={17} style={styles.tarjetaEntidad}>{tarjeta.fecha_cierre_resumen}</Text>
            <Text size={9} muted={!saldoColor} color={saldoColor}>Venc del resumen:</Text>
            <Text size={17} style={styles.tarjetaEntidad}>{tarjeta.fecha_vencimiento_resumen}</Text>
            <Text size={9} muted={!saldoColor} color={saldoColor}>Venc del Plastico:</Text>
            <Text size={17} style={styles.tarjetaEntidad}>{tarjeta.fecha_vencimiento_tarjeta}</Text>
          </Block>
        </TouchableWithoutFeedback>
      </Block>
    )
  }

  function renderTarjeta() {
    return (
      <Block
        row={horizontal}
        card
        flex
        style={[styles.Tarjeta, styles.shadow, style]}
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
                name="credit-card"
                family="Entypo"
                iconColor={theme.COLORS.WHITE}
                size={80}
                color={theme.COLORS.FACEBOOK}
                style={[styles.social, styles.shadow]}
              ></Icon>
              <Text></Text><Text></Text><Text></Text>
              <Text size={10} muted={!saldoColor} color={saldoColor}>Saldo a vencer:</Text>
              <Text size={22} style={styles.tarjetaEntidad}>$ {tarjeta.saldo}</Text>
            </Block>
          </Block>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() =>
            toggleDetalle()
          }
        >
          
          <Block flex space="between" style={styles.tarjetaDescription}>
            <Text size={22} style={styles.tarjetaEntidad}>{tarjeta.emisor}</Text>
            <Text size={14} muted={!saldoColor} color={saldoColor}>Ultimos 4 dig tarjeta:</Text>
            <Text size={17} style={styles.tarjetaEntidad}>{tarjeta.ultimos_4_digitos}</Text>
            <Text size={14} muted={!saldoColor} color={saldoColor}>Cierre:</Text>
            <Text size={17} style={styles.tarjetaEntidad}>{tarjeta.fecha_cierre_resumen}</Text>
          </Block>
        </TouchableWithoutFeedback>
      </Block>
    );
  }


  return (
    pantallaInicial ? renderTarjeta() : renderInsideTarjeta()
  );

}

/*
<Block flex style={styles.group}>
              <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                <Input
                  right
                  placeholder="15/10/2020"
                  placeholderTextColor={materialTheme.COLORS.DEFAULT}
                  style={{ borderRadius: 1, borderColor: materialTheme.COLORS.INPUT }}
                />
                <Text></Text><Text></Text><Text></Text>
                <Button shadowless color="success" style={[styles.button, styles.shadow]}>
                  Actualizar fechas
            </Button>
                <Text></Text><Text></Text><Text></Text>
                <Button shadowless color="red" style={[styles.button, styles.shadow]}>
                  Eliminar
            </Button>
              </Block>
            </Block>

            */

           const styles = StyleSheet.create({
            tarjeta: {
              backgroundColor: theme.COLORS.WHITE,
              marginVertical: theme.SIZES.BASE,
              borderWidth: 0,
              minHeight: 80,
            },
            tarjetaEntidad: {
              flex: 2,
              flexWrap: "wrap",
              paddingBottom: 2,
            },
            tarjetaDescription: {
              padding: theme.SIZES.BASE / 4,
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