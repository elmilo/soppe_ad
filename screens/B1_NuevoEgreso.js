import React from 'react';
import { ImageBackground, Image, StyleSheet, StatusBar, Dimensions, Platform } from 'react-native';
import { Block, Button, Text, theme } from 'galio-framework';
import { LinearGradient } from 'expo-linear-gradient';

const { height, width } = Dimensions.get('screen');
import { Images, materialTheme } from '../constants/';
import { HeaderHeight } from "../constants/utils";

export default class B1_NuevoEgreso extends React.Component {
  render() {
    const { navigation } = this.props;

    return (
      <Block flex style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Block flex>
          <Block space="between" style={styles.padded}>
            <Block>
              <Block >
                <Block>
                  <Text color="white" size={60}>Nuevo</Text>
                </Block>
                <Block>
                  <Text color="white" size={60}>Egreso</Text>
                </Block>
              </Block>
              <Text size={16} color='rgba(255,255,255,0.6)'>
                Acá van los egresos
              </Text>
              <Button
                shadowless
                style={styles.button}
                color={materialTheme.COLORS.BUTTON_COLOR}
                onPress={() => navigation.navigate('Home')}>
                Agregar
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
