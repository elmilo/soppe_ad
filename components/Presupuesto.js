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
const { width } = Dimensions.get("screen"); import presupuestos from '../constants/presupuestos';
import { getPresupuestos } from "../Database/Database";



export default function Presupuesto(props) {

  const [pantallaInicial, setPantallaInicial] = React.useState(true);
  const toggleDetalle = () =>
    setPantallaInicial((previousState) => !previousState);

  const {
    presupuesto,
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

  function renderInsidePresupuesto() {
    return (
      <Block
        row={horizontal}
        card
        flex
        style={[styles.presupuesto, styles.shadow, style]}
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
            <Text size={17} style={styles.presupuestoEntidad}>{presupuesto.descripcion}</Text>
            <Text size={9} muted={!saldoColor} color={saldoColor}>Categoria:</Text>
            <Text size={17} style={styles.presupuestoEntidad}>{presupuesto.categoria_id}</Text>
            <Text size={9} muted={!saldoColor} color={saldoColor}>Valor:</Text>
            <Text size={17} style={styles.presupuestoEntidad}>{presupuesto.monto_mensual}</Text>
          </Block>
        </TouchableWithoutFeedback>
      </Block>
    )
  }

  function renderPresupuesto() {
    return (
      <Block
        row={horizontal}
        card
        flex
        style={[styles.presupuesto, styles.shadow, style]}
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
                name="indent-left"
                family="AntDesign"
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
          <Block flex space="between" style={styles.presupuestoDescription}>
            <Text size={17} style={styles.presupuestoEntidad}>
              {presupuesto.rubro_id}
            </Text>
            <Text size={15} style={styles.presupuestoEntidad}>
              {presupuesto.categoria_id}
            </Text>
            <Text size={22} style={styles.presupuestoEntidad}>
              ${presupuesto.monto_mensual}
            </Text>

          </Block>
        </TouchableWithoutFeedback>
      </Block>
    );
  }


  return (
    pantallaInicial ? renderPresupuesto() : renderInsidePresupuesto()
  );

}

/*  
   <Button shadowless color="red" style={[styles.button, styles.shadow]}>
              Eliminar
            </Button>*/

const styles = StyleSheet.create({
  presupuesto: {
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE,
    borderWidth: 0,
    minHeight: 80,
  },
  presupuestoEntidad: {
    flex: 2,
    flexWrap: "wrap",
    paddingBottom: 6,
  },
  presupuestoDescription: {
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