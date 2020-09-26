import React from 'react';
import { ImageBackground, StyleSheet, StatusBar, Dimensions, Platform } from 'react-native';
import { Block, Button, Text, theme } from 'galio-framework';

const { height, width } = Dimensions.get('screen');

import materialTheme from '../constants/Theme';
import Images from '../constants/Images';
import * as SQLite from 'expo-sqlite';


export default class Onboarding extends React.Component {
  
  componentDidMount(){
    const db = SQLite.openDatabase("db.db");
    db.transaction(tx => {
      
      tx.executeSql(
        "create table if not exists accounts (id integer primary key not null, cbu integer, user integer, entity text, currency text, accNumber text, alias text, saldo float);"
      );

      tx.executeSql(
        "create table if not exists cards (id integer primary key not null, user integer, emisor text, tipo text, ultimosDigitos integer, accountId integer, fechaCierre text, fechaVenc text, saldo float);"
      )

      //tx.executeSql(
//        "insert into accounts (cbu, user, entity, currency, accNumber, alias, saldo) values (?, ?, ?, ?, ?, ?, ?)", [123546, 1, 'galicia', 'pesos', '1123/231', 'pepe', 1000.323]
  //    )
    });
  }

  render() {
    const { navigation } = this.props;

    return (
      <Block flex style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Block flex center>
          <ImageBackground
            source={Images.Onboarding}
            style={{ height: height, width: width, marginTop: '-10%', zIndex: 1 }}
          />
        </Block>
        <Block flex space="between" style={styles.padded}>
          <Block flex space="around" style={{ zIndex: 2 }}>
            <Block>
              <Text size={26} color='rgba(255,255,255,0.8)'>
                Un lugar, tu dinero
              </Text>
            </Block>
            <Block center>
              <Button
                shadowless
                style={styles.button}
                color={materialTheme.COLORS.BUTTON_COLOR}
                onPress={() => navigation.navigate('App')}>
                Comencemos
              </Button>
            </Block>
          </Block>
        </Block>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.COLORS.BLACK,
  },
  padded: {
    paddingHorizontal: theme.SIZES.BASE * 2,
    position: 'relative',
    bottom: theme.SIZES.BASE,
  },
  button: {
    width: width - theme.SIZES.BASE * 4,
    height: theme.SIZES.BASE * 3,
    shadowRadius: 0,
    shadowOpacity: 0,
  },
});
