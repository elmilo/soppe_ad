import React from 'react';
import { ImageBackground, Image, StyleSheet, StatusBar, Dimensions, Platform, ScrollView } from 'react-native';
import { Block, Button, Text, theme } from 'galio-framework';
import { LinearGradient } from 'expo-linear-gradient';

const { height, width } = Dimensions.get('screen');
import { Images, materialTheme } from '../constants';
import { HeaderHeight } from "../constants/utils";
import { Icon, Product, Header } from '../components';

import products from '../constants/products';
export default class D1_Cuentas extends React.Component {
  renderNavigation = () => {
    return (
      <Block flex style={styles.group}>
        <Block>
          <Block style={{ marginBottom: theme.SIZES.BASE }}>
            <Header back title="Nueva cuenta de dinero" navigation={this.props.navigation} />
          </Block>
        </Block>
      </Block>
    )
  }

  renderProducts = () => {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.products}>
        <Block flex>
        <Text h4 style={{marginBottom: theme.SIZES.BASE / 2}}>Nueva cuenta de dinero</Text>
        <Text p style={{marginBottom: theme.SIZES.BASE / 2}}>Últimos 4 dígitos tarjeta de debito</Text>
       
        <Text p style={{marginBottom: theme.SIZES.BASE / 2}}>Fecha de vencimiento</Text>
        <Text h5 style={{marginBottom: theme.SIZES.BASE / 2}}>Saldo</Text>
          <Button shadowless color="success" style={[styles.button, styles.shadow]}>
             +
          </Button>
        </Block>
        </ScrollView>
    )
  }

  render() {
    return (
      <Block flex center style={styles.home}>
        {this.renderProducts()}
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.COLORS.BLACK,
    marginTop: Platform.OS === 'android' ? -HeaderHeight : 0,
  },
  padded: {
    paddingHorizontal: theme.SIZES.BASE * 2,
    zIndex: 3,
    position: 'absolute',
    bottom: Platform.OS === 'android' ? theme.SIZES.BASE * 2 : theme.SIZES.BASE * 3,
  },
  button: {
    width: width - theme.SIZES.BASE * 4,
    height: theme.SIZES.BASE * 3,
    shadowRadius: 0,
    shadowOpacity: 0,
  },
  pro: {
    backgroundColor: materialTheme.COLORS.LABEL,
    paddingHorizontal: 8,
    marginLeft: 12,
    borderRadius: 2,
    height: 22
  },
  gradient: {
    zIndex: 1,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 66,
  },
});
