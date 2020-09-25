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
        <TouchableWithoutFeedback onPress={() => navigation.navigate('Descripcion Cuenta', { cuenta })}>
          <Block flex style={[styles.imageContainer, styles.shadow]}>
            <Block style={{ paddingHorizontal: theme.SIZES.BASE * 2, paddingVertical: theme.SIZES.BASE }}>
              <Icon name="account-balance-wallet" family="MaterialIcons" iconColor={theme.COLORS.WHITE} size={80} color={theme.COLORS.FACEBOOK} style={[styles.social, styles.shadow]}></Icon>
            </Block>
          </Block>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => navigation.navigate('Descripcion Cuenta', { cuenta: cuenta })}>
          <Block flex space="between" style={styles.cuentaDescription}>
          <Text size={23} style={styles.cuentaEntidad}>{cuenta.entity}</Text>
            <Text size={15} muted={!saldoColor} color={saldoColor}>Moneda:</Text>
            <Text size={15} style={styles.cuentaEntidad}>{cuenta.currency}</Text>
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