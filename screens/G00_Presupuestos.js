import React from 'react';
import { ImageBackground, Image, StyleSheet, StatusBar, Dimensions, Platform, ScrollView } from 'react-native';
import { Block, Button, Text, theme } from 'galio-framework';
import { LinearGradient } from 'expo-linear-gradient';

const { height, width } = Dimensions.get('screen');
import { Images, materialTheme } from '../constants';
import { HeaderHeight } from "../constants/utils";
import { Icon, Presupuesto, Header } from '../components';
import presupuestos from '../constants/presupuestos';
import {getPresupuestos }from "../Database/Database";

export default class G00_Presupuestos extends React.Component {

  renderNavigation = () => {
    return (

      <Block flex style={styles.group}>
        <Block>
          <Block style={{ marginBottom: theme.SIZES.BASE }}>
            <Header back title="Title" navigation={this.props.navigation} />
          </Block>
        </Block>
      </Block>
    )
  }

  renderPresupuestos = () => {
    const { navigation } = this.props;
    let datos = [];
    presupuestos.forEach((presupuesto, index) => {
      datos.push(
        <Presupuesto presupuesto={presupuesto} key={index} horizontal />
      )
    })
    return (
      <Block flex>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.presupuestos}>
          <Block flex>
            <Block dense>
              {datos}

            </Block>
            <Button shadowless color="success" style={[styles.button, styles.shadow]}
              onPress={() => navigation.navigate('Nuevo Presupuesto')}
            >
              +  Agregar nuevo presupuesto
          </Button>
            <Text></Text>
          </Block>
        </ScrollView>
      </Block>
    )
  }

  render() {
    return (
      <Block flex center style={styles.home}>
        {this.renderPresupuestos()}
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
