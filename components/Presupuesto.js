import React from 'react';
import { withNavigation } from '@react-navigation/compat';
import { StyleSheet, Dimensions, Image, TouchableWithoutFeedback } from 'react-native';
import { Block, Text, theme } from 'galio-framework';
import { Icon } from '../components';
import materialTheme from '../constants/Theme';

const { width } = Dimensions.get('screen');

class Presupuesto extends React.Component {
  render() {
    const { navigation, presupuesto, horizontal, full, style, saldoColor, imageStyle } = this.props;
    const imageStyles = [styles.image, full ? styles.fullImage : styles.horizontalImage, imageStyle];

    return (
      <Block row={horizontal} card flex style={[styles.presupuesto, styles.shadow, style]}>
        <TouchableWithoutFeedback onPress={() => navigation.navigate('Descripcion Presupuesto', { presupuesto: presupuesto })}>
          <Block flex style={[styles.imageContainer, styles.shadow]}>
          <Icon name="indent-left" family="AntDesign" iconColor={theme.COLORS.WHITE} size={120} color={theme.COLORS.FACEBOOK} style={[styles.social, styles.shadow]}></Icon>
          </Block>
        </TouchableWithoutFeedback>  
        <TouchableWithoutFeedback onPress={() => navigation.navigate('Descripcion Presupuesto', { presupuesto: presupuesto })}>
          <Block flex space="between" style={styles.presupuestoDescription}>
            <Text size={15} muted={!saldoColor} color={saldoColor}>Rubro:</Text>
            <Text size={23} style={styles.presupuestoRubro}>{presupuesto.rubro}</Text>
            <Text size={15} muted={!saldoColor} color={saldoColor}>Categoria:</Text>
            <Text size={23} style={styles.presupuestoRubro}>{presupuesto.categoria}</Text>
            <Text size={15} muted={!saldoColor} color={saldoColor}>Descripcion:</Text>
            <Text size={23} style={styles.presupuestoRubro}>{presupuesto.descripcion}</Text>
            <Text size={15} muted={!saldoColor} color={saldoColor}>Valor:</Text>
            <Text size={23} style={styles.presupuestoRubro}>{presupuesto.valor}</Text>
          
          </Block>
        </TouchableWithoutFeedback>
        
      </Block>
      );
  }
  }


export default withNavigation(Presupuesto);

const styles = StyleSheet.create({
    presupuesto: {
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE,
    borderWidth: 0,
    minHeight: 80,
  },
  presupuestoRubro: {
    flex: 2,
    flexWrap: 'wrap',
    paddingBottom: 12,
  },
  presupuestoDescription: {
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
    height: 80,
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