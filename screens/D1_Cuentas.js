import React from 'react';
import { ImageBackground, Image, StyleSheet, StatusBar, Dimensions, Platform, ScrollView } from 'react-native';
import { Block, Button, Text, theme,Input } from 'galio-framework';
import { LinearGradient } from 'expo-linear-gradient';

const { height, width } = Dimensions.get('screen');
import { Images, materialTheme } from '../constants';
import { HeaderHeight } from "../constants/utils";
import { Icon, Product, Header, Select } from '../components';
import ModalSelector from 'react-native-modal-selector';

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

  renderNuevaCuenta = () => {
    let index = 0;
    const entidad = [
        // { key: index++, section: true, label: 'Fruits' },
        { key: index++, label: 'Banco Galicia' },
        { key: index++, label: 'Banco Francés' },
        { key: index++, label: 'Efectivo' },
        { key: index++, label: 'Ualá' },
        { key: index++, label: 'Mercado Pago' },
    ];
    const monedas = [
      { key: index++, label: 'Pesos Argentinos' },
      { key: index++, label: 'Dolares' },
      { key: index++, label: 'Euros' },
     ];
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.products}>
        <Text></Text>
        <Text p style={{marginBottom: theme.SIZES.BASE / 2}}>Entidad</Text>
        <ModalSelector
                    data={entidad}
                    initValue="Seleccione una entidad"
                    // onChange={(option)=>{ alert(`${option.label} (${option.key}) nom nom nom`) }} 
                    />

        <Block/>
        <Text></Text>
        <Text p style={{marginBottom: theme.SIZES.BASE / 2}}>Moneda</Text>
        <ModalSelector
                    data={monedas}
                    initValue="Seleccione una Moneda"
                    // onChange={(option)=>{ alert(`${option.label} (${option.key}) nom nom nom`) }} 
                    />

        <Block/>
        <Text></Text>
        <Text p style={{marginBottom: theme.SIZES.BASE / 2}}>Últimos 4 dígitos tarjeta de debito</Text>
        <Block flex>  
        <Block flex style={styles.group}>
        <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
          <Input
            right
            placeholder="xxxx"
            placeholderTextColor={materialTheme.COLORS.DEFAULT}
            style={{ borderRadius: 1, borderColor: materialTheme.COLORS.INPUT }}
          />
        </Block>
        </Block>
       
        <Text p style={{marginBottom: theme.SIZES.BASE / 2}}>Fecha de vencimiento</Text>

        <Block flex style={styles.group}>
        <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
          <Input
            right
            placeholder="2 digitos para el mes y para el año"
            placeholderTextColor={materialTheme.COLORS.DEFAULT}
            style={{ borderRadius: 1, borderColor: materialTheme.COLORS.INPUT }}
          />
        </Block>
        </Block>
        <Text h5 style={{marginBottom: theme.SIZES.BASE / 2}}>Saldo</Text>

        <Block flex style={styles.group}>
        <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
          <Input
            right
            placeholder="$"
            placeholderTextColor={materialTheme.COLORS.DEFAULT}
            style={{ borderRadius: 1, borderColor: materialTheme.COLORS.INPUT }}
          />
        </Block>
        </Block>
          <Button shadowless color="success" style={[styles.button, styles.shadow]}>
             +
          </Button>
          <Text></Text>
        </Block>
        </ScrollView>
    )
  }

  render() {
    return (
      <Block flex center style={styles.home}>
        {this.renderNuevaCuenta()}
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
