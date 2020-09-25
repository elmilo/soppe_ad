import React from 'react';
import { withNavigation } from '@react-navigation/compat';
import { StyleSheet, Dimensions, Image, TouchableWithoutFeedback } from 'react-native';
import { Block, Text, theme } from 'galio-framework';
import { Icon } from '../components';
import materialTheme from '../constants/Theme';
const { width } = Dimensions.get('screen');

class Inversion extends React.Component {
  render() {
    const { navigation, inversion, horizontal, full, style, saldoColor, imageStyle } = this.props;
    const imageStyles = [styles.image, full ? styles.fullImage : styles.horizontalImage, imageStyle];

    return (
      <Block row={horizontal} card flex style={[styles.inversion, styles.shadow, style]}>
        <TouchableWithoutFeedback onPress={() => navigation.navigate('Descripcion Inversion', { inversion: inversion })}>
          <Block flex style={[styles.imageContainer, styles.shadow]}>
            <Block style={{ paddingHorizontal: theme.SIZES.BASE, paddingVertical: theme.SIZES.BASE }}>
              <Icon name="area-graph" family="Entypo" iconColor={theme.COLORS.WHITE} size={120} color={theme.COLORS.FACEBOOK} style={[styles.social, styles.shadow]}></Icon>
            </Block>
          </Block>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => navigation.navigate('Descripcion Inversion', { inversion: inversion })}>
          <Block flex space="between" style={styles.inversionDescription}>
            <Text size={23} style={styles.inversionEntidad}>{inversion.descripcion}</Text>
            <Text size={15} muted={!saldoColor} color={saldoColor}>Tipo:</Text>
            <Text size={15} style={styles.inversionEntidad}>{inversion.tipo}</Text>
            <Text size={15} muted={!saldoColor} color={saldoColor}>Cuenta:</Text>
            <Text size={15} style={styles.inversionEntidad}>{inversion.cuenta}</Text>
            <Text size={15} muted={!saldoColor} color={saldoColor}>Valor de venta:</Text>
            <Text size={22} style={styles.inversionEntidad}>${inversion.valorVenta}</Text>
            <Text size={15} muted={!saldoColor} color={saldoColor}>Vencimiento:</Text>
            <Text size={22} style={styles.inversionEntidad}>{inversion.fechaVencimiento}</Text>
          </Block>
        </TouchableWithoutFeedback>
      </Block>
    );
  }
}

//<Image source={{ uri: inversion.image }} style={imageStyles} />
export default withNavigation(Inversion);

//if ({inversion.entidad}!={"efectivo"}) 

const styles = StyleSheet.create({
  inversion: {
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE,
    borderWidth: 0,
    minHeight: 80,
  },
  inversionEntidad: {
    flex: 2,
    flexWrap: 'wrap',
    paddingBottom: 12,
  },
  inversionDescription: {
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