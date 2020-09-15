import React from 'react';
import { withNavigation } from '@react-navigation/compat';
import { StyleSheet, Dimensions, Image, TouchableWithoutFeedback } from 'react-native';
import { Block, Text, theme } from 'galio-framework';
import { Icon } from '../components';
import materialTheme from '../constants/Theme';

const { width } = Dimensions.get('screen');

class Cuenta extends React.Component {
  render() {
    const { navigation, cuenta, horizontal, full, style, saldoColor, imageStyle } = this.props;
    const imageStyles = [styles.image, full ? styles.fullImage : styles.horizontalImage, imageStyle];

    return (
      <Block row={horizontal} card flex style={[styles.cuenta, styles.shadow, style]}>
        <TouchableWithoutFeedback onPress={() => navigation.navigate('Pro', { cuenta: cuenta })}>
          <Block flex style={[styles.imageContainer, styles.shadow]}>
          <Icon name="bank" family="font-awesome" iconColor={theme.COLORS.WHITE} size={115} color={theme.COLORS.FACEBOOK} style={[styles.social, styles.shadow]}></Icon>
          </Block>
        </TouchableWithoutFeedback>  
        <TouchableWithoutFeedback onPress={() => navigation.navigate('Pro', { cuenta: cuenta })}>
          <Block flex space="between" style={styles.cuentaDescription}>
            <Text size={23} style={styles.cuentaEntidad}>{cuenta.entidad}</Text>
            <Text size={11} muted={!saldoColor} color={saldoColor}>Número de Cuenta: </Text>
            <Text size={11} style={styles.cuentaOtros}>{cuenta.nroCuenta}</Text>
            <Text size={11} muted={!saldoColor} color={saldoColor}>Moneda: {cuenta.moneda} </Text>
            <Text size={22} style={styles.cuentaEntidad}>${cuenta.saldo}</Text>
          </Block>
        </TouchableWithoutFeedback>
        
      </Block>
      );
  }
}
//<Image source={{ uri: cuenta.image }} style={imageStyles} />
export default withNavigation(Cuenta);


//if ({cuenta.entidad}!={"efectivo"}) 
   




const styles = StyleSheet.create({
  cuenta: {
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE,
    borderWidth: 0,
    minHeight: 120,
  },
  cuentaEntidad: {
    flex: 2,
    flexWrap: 'wrap',
    paddingBottom: 12,
  },
  cuentaDescription: {
    padding: theme.SIZES.BASE / 6,
  },
  imageContainer: {
    elevation: 1,
  },
  image: {
    borderRadius: 3,
    marginHorizontal: theme.SIZES.BASE /1,
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