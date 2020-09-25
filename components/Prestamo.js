import React from 'react';
import { withNavigation } from '@react-navigation/compat';
import { StyleSheet, Dimensions, Image, TouchableWithoutFeedback } from 'react-native';
import { Block, Text, theme } from 'galio-framework';
import { Icon } from '../components';
import materialTheme from '../constants/Theme';
const { width } = Dimensions.get('screen');

class Prestamo extends React.Component {
  render() {
    const { navigation, prestamo, horizontal, full, style, saldoColor, imageStyle } = this.props;
    const imageStyles = [styles.image, full ? styles.fullImage : styles.horizontalImage, imageStyle];

    return (
      <Block row={horizontal} card flex style={[styles.prestamo, styles.shadow, style]}>
        <TouchableWithoutFeedback onPress={() => navigation.navigate('Descripcion Prestamo', { prestamo: prestamo })}>
          <Block flex style={[styles.imageContainer, styles.shadow]}>
            <Block style={{ paddingHorizontal: theme.SIZES.BASE * 2, paddingVertical: theme.SIZES.BASE }}>
              <Icon name="leaf" family="Entypo" iconColor={theme.COLORS.WHITE} size={80} color={theme.COLORS.FACEBOOK} style={[styles.social, styles.shadow]}></Icon>
            </Block>
          </Block>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => navigation.navigate('Descripcion Prestamo', { prestamo: prestamo })}>
          <Block flex space="between" style={styles.prestamoDescription}>
            <Text size={20} style={styles.prestamoEntidad}>{prestamo.descripcion}</Text>
            <Text size={15} muted={!saldoColor} color={saldoColor}>Cuenta:</Text>
            <Text size={15} style={styles.prestamoEntidad}>{prestamo.cuenta}</Text>
            <Text size={15} muted={!saldoColor} color={saldoColor}>Valor de cuota:</Text>
            <Text size={15} style={styles.prestamoEntidad}>{prestamo.valorCuota}</Text>
            <Text size={15} muted={!saldoColor} color={saldoColor}>Cuotas restantes:</Text>
            <Text size={15} style={styles.prestamoEntidad}>{prestamo.cuotas}</Text>
            <Text size={15} muted={!saldoColor} color={saldoColor}>Fecha próximo vencimiento:</Text>
            <Text size={15} style={styles.prestamoEntidad}>{prestamo.diaVencimiento} de Septiembre</Text>
            <Text size={15} style={styles.prestamoEntidad}></Text>
          </Block>
        </TouchableWithoutFeedback>
      </Block>
    );
  }
}
//<Image source={{ uri: prestamo.image }} style={imageStyles} />
export default withNavigation(Prestamo);

//if ({prestamo.entidad}!={"efectivo"}) 

const styles = StyleSheet.create({
  prestamo: {
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE,
    borderWidth: 0,
    minHeight: 80,
  },
  prestamoEntidad: {
    flex: 2,
    flexWrap: 'wrap',
    paddingBottom: 12,
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