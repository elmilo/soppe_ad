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
import { getPrestamos } from "../Database/Database";


export default function Prestamo(props) {

  const [pantallaInicial, setPantallaInicial] = React.useState(true);
  const toggleDetalle = () =>
    setPantallaInicial((previousState) => !previousState);

  const {
    prestamo,
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
  
  

  function renderInsidePrestamo(props) {
    return (
      <Block
        row={horizontal}
        card
        flex
        style={[styles.prestamo, styles.shadow, style]}
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
                name="delete"
                family="MaterialIcons"
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
            <Text size={17} style={styles.prestamoEntidad}>{prestamo.descripcion}</Text>
            <Text size={9} muted={!saldoColor} color={saldoColor}>Tipo de prestamo:</Text>
            <Text size={15} style={styles.prestamoEntidad}>{prestamo.tipo}</Text>
            <Text size={15} style={styles.prestamoEntidad}>{prestamo.prestamo_a_tercero_descripcion}</Text>
            <Text size={9} muted={!saldoColor} color={saldoColor}>Cuenta:</Text>
            <Text size={14} style={styles.prestamoEntidad}>{prestamo.cuenta_id}</Text>
            <Text size={9} muted={!saldoColor} color={saldoColor}>Valor de cuota:</Text>
            <Text size={17} style={styles.prestamoEntidad}>{prestamo.cuotas_monto}</Text>
            <Text size={9} muted={!saldoColor} color={saldoColor}>Cuotas restantes:</Text>
            <Text size={17} style={styles.prestamoEntidad}>{prestamo.cuotas_restantes}</Text>
            <Text size={9} muted={!saldoColor} color={saldoColor}>Fecha próximo vencimiento:</Text>
            <Text size={17} style={styles.prestamoEntidad}>{prestamo.cuotas_fecha_proximo_vencimiento}</Text>
            <Text size={9} muted={!saldoColor} color={saldoColor}>Valor del Préstamo:</Text>
            <Text size={17} style={styles.prestamoEntidad}>{prestamo.prestamo_monto}</Text>
          </Block>

        </TouchableWithoutFeedback>
      </Block>
    )
  }

 

  function renderPrestamo(props) {

    const b = 1;

    if (prestamo.tomado=== b) {
      return (
        
              <Block
            row={horizontal}
            card
            flex
            style={[styles.prestamo, styles.shadow, style]}
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
                    name="leaf"
                    family="Entypo"
                    iconColor={theme.COLORS.WHITE}
                    size={80}
                    color={theme.COLORS.FACEBOOK}
                    style={[styles.social, styles.shadow]}
                  ></Icon>
                  <Text></Text><Text></Text><Text></Text>
                  <Text size={9} muted={!saldoColor} color={saldoColor}>Prestamo:</Text>
                  <Text size={15} style={styles.prestamoEntidad}>TOMADO</Text>
                               </Block>
              </Block>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() =>
                toggleDetalle()
              }
            >
              <Block flex space="between" style={styles.prestamoDescription}>
                <Text size={17} style={styles.prestamoEntidad}>{prestamo.descripcion}</Text>
                <Text size={9} muted={!saldoColor} color={saldoColor}>Cuenta:</Text>
                <Text size={14} style={styles.prestamoEntidad}>{prestamo.cuenta_id}</Text>
                <Text size={9} muted={!saldoColor} color={saldoColor}>Valor de cuota:</Text>
                <Text size={17} style={styles.prestamoEntidad}>{prestamo.cuotas_monto}</Text>
                <Text size={9} muted={!saldoColor} color={saldoColor}>Fecha próximo vencimiento:</Text>
                <Text size={17} style={styles.prestamoEntidad}>{prestamo.cuotas_fecha_proximo_vencimiento}</Text>
              </Block>
            </TouchableWithoutFeedback>
          </Block>
        );
      }
    
      else return (
      <Block
        row={horizontal}
        card
        flex
        style={[styles.prestamo, styles.shadow, style]}
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
                name="leaf"
                family="Entypo"
                iconColor={theme.COLORS.WHITE}
                size={80}
                color={theme.COLORS.FACEBOOK}
                style={[styles.social, styles.shadow]}
              ></Icon>
              <Text></Text><Text></Text><Text></Text>
              <Text size={9} muted={!saldoColor} color={saldoColor}>Prestamo:</Text>
              <Text size={15} style={styles.prestamoEntidad}>OTORGADO</Text>
              
            </Block>
          </Block>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() =>
            toggleDetalle()
          }
        >
          <Block flex space="between" style={styles.prestamoDescription}>
            <Text size={17} style={styles.prestamoEntidad}>{prestamo.descripcion}</Text>
            <Text size={9} muted={!saldoColor} color={saldoColor}>Cuenta:</Text>
            <Text size={17} style={styles.prestamoEntidad}>{prestamo.cuenta_id}</Text>
            <Text size={9} muted={!saldoColor} color={saldoColor}>Valor de cuota:</Text>
            <Text size={17} style={styles.prestamoEntidad}>{prestamo.cuotas_monto}</Text>
            <Text size={9} muted={!saldoColor} color={saldoColor}>Fecha próximo vencimiento:</Text>
            <Text size={17} style={styles.prestamoEntidad}>{prestamo.cuotas_fecha_proximo_vencimiento}</Text>
          </Block>
        </TouchableWithoutFeedback>
      </Block>
    );
  }
 
      
  return (
    
    pantallaInicial ? renderPrestamo() : renderInsidePrestamo()
    
  );
 
 }

/* 
 <Block style={{ paddingHorizontal: theme.SIZES.BASE, paddingVertical: theme.SIZES.BASE }}>
       <Button shadowless color="green" style={[styles.button, styles.shadow]}>
             Finalizar
           </Button>
           <Text></Text>
      
           </Block>
<Button shadowless color="red" style={[styles.button, styles.shadow]}>
             Eliminar
           </Button>*/


const styles = StyleSheet.create({
  prestamo: {
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE,
    borderWidth: 0,
    minHeight: 80,
  },
  prestamoEntidad: {
    flex: 2,
    flexWrap: "wrap",
    paddingBottom: 6,
  },
  prestamoDescription: {
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