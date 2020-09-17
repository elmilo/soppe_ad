import React from 'react';
import { withNavigation } from '@react-navigation/compat';
import { StyleSheet, Dimensions, Image, TouchableWithoutFeedback } from 'react-native';
import { Block, Text, theme } from 'galio-framework';
import { Icon } from '.';
import materialTheme from '../constants/Theme';

const { width } = Dimensions.get('screen');

class Tarjeta extends React.Component {
  render() {
    const { navigation, tarjeta, horizontal, full, style, saldoColor, imageStyle } = this.props;
    const imageStyles = [styles.image, full ? styles.fullImage : styles.horizontalImage, imageStyle];

    return (
      <Block row={horizontal} card flex style={[styles.tarjeta, styles.shadow, style]}>
        <TouchableWithoutFeedback onPress={() => navigation.navigate('Descripcion Tarjeta', { tarjeta: tarjeta })}>
          <Block flex style={[styles.imageContainer, styles.shadow]}>
          <Icon name="credit-card" family="Entypo" iconColor={theme.COLORS.WHITE} size={120} color={theme.COLORS.FACEBOOK} style={[styles.social, styles.shadow]}></Icon>
          </Block>
        </TouchableWithoutFeedback>  
        <TouchableWithoutFeedback onPress={() => navigation.navigate('Descripcion Tarjeta', { tarjeta: tarjeta })}>
          <Block flex space="between" style={styles.tarjetaDescription}>
            <Text size={23} style={styles.tarjetaEntidad}>{tarjeta.entidad}</Text>
            <Text size={15} muted={!saldoColor} color={saldoColor}>Ultimos 4 dig tarjeta:</Text>
            <Text size={15} style={styles.tarjetaEntidad}>{tarjeta.nroTarjeta}</Text>
            <Text size={15} muted={!saldoColor} color={saldoColor}>Fecha dePago:</Text>
            <Text size={22} style={styles.tarjetaEntidad}>{tarjeta.pago}</Text>
          </Block>
        </TouchableWithoutFeedback>
        
      </Block>
      );
  }
  }


export default withNavigation(Tarjeta);


   




const styles = StyleSheet.create({
  tarjeta: {
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE,
    borderWidth: 0,
    minHeight: 80,
  },
  tarjetaEntidad: {
    flex: 2,
    flexWrap: 'wrap',
    paddingBottom: 12,
  },
  tarjetaDescription: {
    padding: theme.SIZES.BASE / 15,
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