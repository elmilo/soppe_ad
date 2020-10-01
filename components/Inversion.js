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
const { width } = Dimensions.get("screen"); import inversiones from '../constants/inversiones';
import { getInversiones } from "../Database/Database";



export default function Inversion(props) {

  const [pantallaInicial, setPantallaInicial] = React.useState(true);
  const toggleDetalle = () =>
    setPantallaInicial((previousState) => !previousState);

  const {
    inversion,
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

  function renderInsideInversion() {
    return (
      <Block
        row={horizontal}
        card
        flex
        style={[styles.inversion, styles.shadow, style]}
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
          <Block flex space="between" style={styles.inversionDescription}>
            <Text size={9} muted={!saldoColor} color={saldoColor}>Rubro:</Text>
            <Text size={17} style={styles.inversionEntidad}>{inversion.tipo}</Text>
            <Text size={15} style={styles.inversionEntidad}>{inversion.descripcion}</Text>
            <Text size={9} muted={!saldoColor} color={saldoColor}>Cuenta:</Text>
            <Text size={14} style={styles.inversionEntidad}>{inversion.cuenta_id}</Text>
            <Text size={9} muted={!saldoColor} color={saldoColor}>Valor de compra:</Text>
            <Text size={17} style={styles.inversionEntidad}>${inversion.compra_monto}</Text>
            <Text size={9} muted={!saldoColor} color={saldoColor}>Vencimiento:</Text>
            <Text size={17} style={styles.inversionEntidad}>{inversion.fecha_vencimiento}</Text>
            <Text size={9} muted={!saldoColor} color={saldoColor}>Valor venta:</Text>
            <Text size={17} style={styles.inversionEntidad}>${inversion.venta_monto}</Text>


          </Block>

        </TouchableWithoutFeedback>
      </Block>
    )
  }

  function renderInversion() {
    return (
      <Block
        row={horizontal}
        card
        flex
        style={[styles.inversion, styles.shadow, style]}
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
                name="area-graph"
                family="Entypo"
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

          <Block flex space="between" style={styles.inversionDescription}>
            <Text size={17} style={styles.inversionEntidad}>{inversion.tipo}</Text>
            <Text size={15} style={styles.inversionEntidad}>{inversion.descripcion}</Text>
            <Text size={9} muted={!saldoColor} color={saldoColor}>Cuenta:</Text>
            <Text size={14} style={styles.inversionEntidad}>{inversion.cuenta_id}</Text>
            <Text size={9} muted={!saldoColor} color={saldoColor}>Valor de compra:</Text>
            <Text size={17} style={styles.inversionEntidad}>${inversion.compra_monto}</Text>
            <Text size={9} muted={!saldoColor} color={saldoColor}>Vencimiento:</Text>
            <Text size={17} style={styles.inversionEntidad}>{inversion.fecha_vencimiento}</Text>
          </Block>
        </TouchableWithoutFeedback>
      </Block>
    );
  }


  return (
    pantallaInicial ? renderInversion() : renderInsideInversion()
  );

}



/*
   <Block>
              <Input
                right
                placeholder="$"
                placeholderTextColor={materialTheme.COLORS.DEFAULT}
                style={{ borderRadius: 1, borderColor: materialTheme.COLORS.INPUT }}
              />
            </Block>
<Block flex space="between" style={styles.inversionDescription}>
              <Button shadowless color="green" style={[styles.button, styles.shadow]}>
                Actualizar
            </Button>
              <Text></Text>
              <Button shadowless color="red" style={[styles.button, styles.shadow]}>
                Vender y Eliminar
            </Button>
            </Block>*/



const styles = StyleSheet.create({
  inversion: {
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE,
    borderWidth: 0,
    minHeight: 80,
  },
  inversionEntidad: {
    flex: 2,
    flexWrap: "wrap",
    paddingBottom: 6,
  },
  inversionoDescription: {
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