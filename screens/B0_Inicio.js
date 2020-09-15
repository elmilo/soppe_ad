import React from "react";
import { StyleSheet, Dimensions, ScrollView } from "react-native";
import { Button, Block, Text, Input, theme } from "galio-framework";
import GraficoAvance from "../components/GraficoAvance";
import GraficoGastosAcumulados from "../components/GraficoGastosAcumulados";

const { width } = Dimensions.get("screen");

export default class B0_Inicio extends React.Component {
  renderGastosAcumulados = () => {
    return (
      <Block
        card
        style={[{ height: 200 }, styles.elementografico, styles.shadow]}
      >
        <Text size={18} bold>
          Gastos Acumulados del mes
        </Text>
        <GraficoGastosAcumulados titulo={"Disponibles"} />
      </Block>
    );
  };

  renderVencimientosYDisponibles = () => {
    return (
      <Block row>
        <Block
          card
          style={[
            { height: 300 },
            { marginRight: theme.SIZES.BASE },
            styles.elementografico,
            styles.shadow,
          ]}
        >
          <GraficoAvance titulo={"Vencimientos de la semana"} />
        </Block>
        <Block
          card
          style={[{ height: 300 }, styles.elementografico, styles.shadow]}
        >
          <GraficoAvance titulo={"Disponibles"} />
        </Block>
      </Block>
    );
  };

  render() {
    return (
      <Block flex center>
        <ScrollView showsVerticalScrollIndicator={false}>
          {this.renderGastosAcumulados()}
          {this.renderVencimientosYDisponibles()}
        </ScrollView>
      </Block>
    );
  }
}


const styles = StyleSheet.create({
  home: {
    width: width,
  },
  search: {
    height: 48,
    width: width - 32,
    marginHorizontal: 16,
    borderWidth: 1,
    borderRadius: 3,
  },
  header: {
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    elevation: 4,
    zIndex: 2,
  },
  tabs: {
    marginBottom: 24,
    marginTop: 10,
    elevation: 4,
  },
  tab: {
    backgroundColor: theme.COLORS.TRANSPARENT,
    width: width * 0.5,
    borderRadius: 0,
    borderWidth: 0,
    height: 24,
    elevation: 0,
  },
  tabTitle: {
    lineHeight: 19,
    fontWeight: "300",
  },
  shadow: {
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.1,
    elevation: 2,
  },
  elementografico: {
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE,
    borderWidth: 0,
    minHeight: 114,
  },
});
