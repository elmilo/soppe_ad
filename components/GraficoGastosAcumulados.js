import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { BarChart, Grid } from "react-native-svg-charts";
import { Text } from "react-native-svg";
import { getEgresosFromEfectivo } from "../Database/Egresos";
import materialTheme from "../constants/Theme";
import { useFocusEffect } from '@react-navigation/native';

export default function GraficoGastosAcumulados() {
    const[gastosCuentas, setGastosCuentas] = useState(0);
    const[gastosEfectivo, setGastosEfectivo] = useState(0);
    const[gastosOtro, setGastosOtro] = useState(0);

    function getGastosEfectivo(rows){
        var cuentas = 0;
        var efect = 0;
        var otros = 0;
        for(let i = 0; i < rows.length ; i++){
            let cuenta = rows[i].cuenta_id;
            if(cuenta){
                let type = cuenta.substring(0, 5);
                if( type == "BANCO"){
                    cuentas = cuentas + Number(rows[i].monto);
                }
                else if (type == "EFECT"){
                    efect = efect + Number(rows[i].monto);
                }
                else {
                    otros = otros + Number(rows[i].monto);
                }
            } 
        }
        setGastosCuentas(cuentas);
        setGastosEfectivo(efect);
        setGastosOtro(otros);
    }

    useFocusEffect(
        React.useCallback(() => {
          getEgresosFromEfectivo(getGastosEfectivo);
        }, [getGastosEfectivo])
      );

    //useEffect(() => {
     //   getEgresosFromEfectivo(getGastosEfectivo);
    //})

  const data = [
    //4000, 1820, 650 ];
    {
      valor: gastosCuentas,
      etiqueta: "Cuentas bancarias",
    },
    {
      valor: gastosEfectivo,
      etiqueta: "Efectivo",
    },
    {
      valor: gastosOtro,
      etiqueta: "Otros",
    },
  ];

  const Labels = ({ x, y, bandwidth, data }) =>
    data.map((unItem, indice) => (
      <Text
        key={indice}
        x={x(0) + 10}
        y={y(indice) + bandwidth / 2}
        fontSize={14}
        fill={"black"}
        alignmentBaseline={"middle"}
      >
        {unItem.etiqueta + ": $" + unItem.valor}
      </Text>
    ));
  //                   <Labels/>
  return (
    <View style={{ flexDirection: "row", height: 180, paddingVertical: -20 }}>
      <BarChart
        style={{ flex: 1, marginLeft: 8 }}
        data={data}
        yAccessor={({ item }) => item.valor}
        horizontal={true}
        svg={{ fill: materialTheme.COLORS.DEFAULT }}
        contentInset={{ top: 10, bottom: 10 }}
        spacing={0.8}
        gridMin={0}
      >
        <Labels />
      </BarChart>
    </View>
  );
}
