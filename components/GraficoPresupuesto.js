import React, { Component }  from 'react'
import {
  Dimensions
} from 'react-native';
import materialTheme from "../constants/Theme";
import Speedometer from 'react-native-speedometer-chart';
const colors = [materialTheme.COLORS.ACTIVE, 
  materialTheme.COLORS.DEFAULT, 
  materialTheme.COLORS.INFO, 
  materialTheme.COLORS.WARNING, 
  materialTheme.COLORS.ERROR];

const screenWidth = Dimensions.get("window").width;

//import { ProgressCircle } from 'react-native-svg-charts'

export default class GraficoPresupuesto extends React.Component {

    render() {
      const { avance, target, categoria } = this.props; 
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
  }