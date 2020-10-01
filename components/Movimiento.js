import React from 'react';
import { withNavigation } from '@react-navigation/compat';
import { StyleSheet, Dimensions, Image, TouchableWithoutFeedback } from 'react-native';
import { Block, Text, theme } from 'galio-framework';
import { Icon } from '.';
import materialTheme from "../constants/Theme";
const colors = [materialTheme.COLORS.ACTIVE, 
  , 
  materialTheme.COLORS.INFO, 
  materialTheme.COLORS.WARNING, 
  materialTheme.COLORS.ERROR];

const { width } = Dimensions.get('screen');

export default function Movimiento (props) {
  
  const { unMovimiento } = props;
  //const fecha_formateada = unMovimiento.fecha.substring(0, 10);
  
  /*{
    cols: [{ name: "A", key: 0 }, { name: "B", key: 1 }, { name: "C", key: 2 }],
    data: [
      [ "id",    "name", "value" ],
      [    1, "sheetjs",    7262 ],
      [    2, "js-xlsx",    6969 ]
    ]
  }*/

  function renderIcon(origen){

    return(
      <Icon 
        name= {origen == 'Ingreso' ? 'call-received' : 'call-made'}
        color= {origen == 'Ingreso' ? materialTheme.COLORS.INFO : materialTheme.COLORS.WARNING}
        family="MaterialIcons" 
        iconColor={theme.COLORS.WHITE} 
        size={30}        
        style={[styles.social, styles.shadow]}></Icon>
      )
  }
    return (
      <Block row flex style={[styles.cuenta, styles.shadow]}>


            <Block style={{ paddingHorizontal: theme.SIZES.BASE * 2, paddingVertical: theme.SIZES.BASE }}>
              {renderIcon(unMovimiento.origen)}
            </Block>

          <Block flex space="between" >
          <Text size={15} style={styles.cuentaEntidad}>{unMovimiento.fecha}</Text>
            <Text size={14} style={styles.cuentaEntidad}>{unMovimiento.descripcion}</Text>
            <Text size={20} style={styles.cuentaEntidad}>$ {unMovimiento.monto}</Text>
          </Block>

      </Block>
    );

}


//if ({cuenta.entidad}!={"efectivo"}) 

const styles = StyleSheet.create({
  cuenta: {
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE,
    borderWidth: 0,
    minHeight: 80,
  },
  cuentaEntidad: {
    flex: 2,
    flexWrap: 'wrap',
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
    width: 'auto',
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