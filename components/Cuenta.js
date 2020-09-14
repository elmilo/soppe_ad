import React from 'react';
import { withNavigation } from '@react-navigation/compat';
import { StyleSheet, Dimensions, Image, TouchableWithoutFeedback } from 'react-native';
import { Block, Text, theme } from 'galio-framework';

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
            <Image source={{ uri: cuenta.image }} style={imageStyles} />
          </Block>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => navigation.navigate('Pro', { cuenta: cuenta })}>
          <Block flex space="between" style={styles.cuentaDescription}>
            <Text size={22} style={styles.cuentaTitle}>{cuenta.title}</Text>
            <Text size={18} muted={!saldoColor} color={saldoColor}>${cuenta.saldo}</Text>
          </Block>
        </TouchableWithoutFeedback>
        
      </Block>
      );
  }
}

export default withNavigation(Cuenta);

const styles = StyleSheet.create({
  cuenta: {
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE,
    borderWidth: 0,
    minHeight: 114,
  },
  cuentaTitle: {
    flex: 1,
    flexWrap: 'wrap',
    paddingBottom: 6,
  },
  cuentaDescription: {
    padding: theme.SIZES.BASE / 2,
  },
  imageContainer: {
    elevation: 1,
  },
  image: {
    borderRadius: 3,
    marginHorizontal: theme.SIZES.BASE /2,
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