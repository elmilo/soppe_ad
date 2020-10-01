import React, { useEffect, useState } from "react";
import { StyleSheet, Dimensions, ScrollView } from "react-native";
import { Button, Block, Text, Input, theme } from "galio-framework";
import GraficoAvance from "../components/GraficoAvance";
import GraficoGastosAcumulados from "../components/GraficoGastosAcumulados";
import GraficoPresupuesto from "../components/GraficoPresupuesto";
import GraficoVencimientos from "../components/GraficoVencimientos";
import { getPresupuestoForRubro, getOtherPresupuestos } from "../Database/Database"
import { getEgresoForRubro, getOtherEgresos } from "../Database/Egresos"
const { width } = Dimensions.get("screen");

export default function B0_Inicio (props) {

  const [presupuestoGeneral, setPresupuestoGeneral] = useState(0);
  const [presupuestoServicios, setPresupuestoServicios] = useState(0);
  const [presupuestoOtros, setPresupuestoOtros] = useState(0);
  const [gastosGenerales, setGastosGenerales] = useState(0);
  const [gastoServicios, setGastoServicios] = useState(0);
  const [gastoOtros, setGastoOtros] = useState(0);


  function getPresupuestoGeneral(rows){
    if(rows.length > 0){
      setPresupuestoGeneral(Number(rows[0].monto_mensual));
    }
  }

  function getGastosGeneral(rows){
    if(rows[0].total != null){
      setGastosGenerales(Number(rows[0].total));
    }
  }

  function getPresupuestoServicio(rows){
    if(rows.length > 0){
      setPresupuestoServicios(Number(rows[0].monto_mensual));
    }
  }

  function getGastoServicios(rows) {
    if(rows[0].total != null){
      setGastoServicios(Number(rows[0].total));
    }
  }

  function getRemainingPresupuestos(rows){
    if(rows[0].total != null){
      setPresupuestoOtros(Number(rows[0].total));
    }
  }

  function getOtherGastos(rows){
    if(rows[0].total != null){
      setGastoOtros(Number(rows[0].total));
    }
  }

  useEffect(() => {
    getPresupuestoForRubro("'General'", getPresupuestoGeneral);
    getEgresoForRubro("'General'", getGastosGeneral);
    getPresupuestoForRubro("'Servicios e Impuestos'", getPresupuestoServicio);
    getEgresoForRubro("'Servicios e Impuestos'", getGastoServicios);
    getOtherPresupuestos(getRemainingPresupuestos);
    getOtherEgresos(getOtherGastos);
  })
  
  function renderGraficoPresupuesto() {
    return (
      <Block fluid style={[
        styles.elementografico,
        styles.shadow,
        {space: 'evenly'}
      ]}>
      <Block row>
      <Text size={18} bold>
   Objetivos del mes
 </Text></Block>
    <Block row >
      <Block >
      <GraficoPresupuesto avance={gastosGenerales} target={presupuestoGeneral} categoria={'General'}/>
      </Block>
      <Block >
      <GraficoPresupuesto avance={gastoServicios} target={presupuestoServicios} categoria={'Servicios'}/>
      </Block>
      <Block >
      <GraficoPresupuesto avance={gastoOtros} target={presupuestoOtros} categoria={'Otros'}/>
      </Block>
      </Block>
      </Block>
      );
  }

  function renderGastosAcumulados(){
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

  function renderVencimientosYDisponibles(){
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
          <GraficoVencimientos titulo={"Vencimientos del mes"} />
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
/**
{this.renderGastosAcumulados()}
{this.renderVencimientosYDisponibles()} 

*/



  
    return (
      <Block flex center>
        <ScrollView showsVerticalScrollIndicator={false}>
        {renderGastosAcumulados()}
{renderVencimientosYDisponibles()} 
          {renderGraficoPresupuesto()}
          
        </ScrollView>
      </Block>
    );
  
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
    //minHeight: 114,
  },
});
