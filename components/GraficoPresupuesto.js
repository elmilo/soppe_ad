import React, { Component, useState }  from 'react'
import {
  Dimensions
} from 'react-native';
import materialTheme from "../constants/Theme";
import Speedometer from 'react-native-speedometer-chart';
import { useFocusEffect } from '@react-navigation/native';
import { getPresupuestoForRubro, getOtherPresupuestos } from "../Database/Database"
import { getEgresoForRubro, getOtherEgresos } from "../Database/Egresos"
const colors = [materialTheme.COLORS.ACTIVE, 
  materialTheme.COLORS.DEFAULT, 
  materialTheme.COLORS.INFO, 
  materialTheme.COLORS.WARNING, 
  materialTheme.COLORS.ERROR];

const screenWidth = Dimensions.get("window").width;

//import { ProgressCircle } from 'react-native-svg-charts'

export default function GraficoPresupuesto (props) {

      const [ avance, setAvance ] = useState(0);
      const [ target, setTarget ] = useState(1); 
      const { categoria } = props; 

      function avanceCallback(rows){
        if(rows[0].total != null){
          setAvance(Number(rows[0].total));
        }
      }

      function targetCallback(rows){
        console.log(rows);
        if(rows.length > 0){
          setTarget(Number(rows[0].monto_mensual));
        }
      }


      useFocusEffect(
        React.useCallback(() => {
          if(categoria == "General"){
            getPresupuestoForRubro("'General'", targetCallback);
            getEgresoForRubro("'General'", avanceCallback);
          } else if (categoria == "Servicios"){
            getPresupuestoForRubro("'Servicios e Impuestos'", targetCallback);
            getEgresoForRubro("'Servicios e Impuestos'", avanceCallback);
          } else if (categoria == "Otros"){
            getOtherPresupuestos(targetCallback);
            getOtherEgresos(avanceCallback);
          }
        }, [categoria, avanceCallback, targetCallback])
      );
  
      const innerCircle = [
        {width: (screenWidth / 4) },
        {height: (screenWidth / 8)}
      ];
      /*const colorTexto =[
      {color: avance < target ? materialTheme.COLORS.SUCCESS : materialTheme.COLORS.ERROR}
      ];*/

      const colorCondicional = avance < target ? materialTheme.COLORS.SUCCESS : materialTheme.COLORS.ERROR;

        return (

          <Speedometer
          value={avance}
          totalValue={ target}
          size={0.3*screenWidth}
          outerColor= {materialTheme.COLORS.BLOCK}
          internalColor= {colorCondicional}
          showText
          innerCircleStyle = {innerCircle}
          text={categoria}
          textStyle={{ color: 'black' }}
          showLabels={false}
          labelFormatter={number => `${number}%`}
          showPercent
          percentStyle={{ color: colorCondicional }}
        />
           /* <ProgressCircle
                style={ { height: coeficiente*200, width: coeficiente*screenWidth} }
                progress={ avance }
                progressColor={'rgb(134, 65, 244)'}
                startAngle={ -Math.PI * 0.8 }
                endAngle={ Math.PI * 0.8 }
                cornerRadius={90}
            />*/
        )
    }