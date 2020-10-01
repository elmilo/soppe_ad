import React from "react";
import {
  View,
  Dimensions,
  StyleSheet
} from 'react-native';
import { theme, Text as GalioText} from "galio-framework";

import { PieChart } from "react-native-svg-charts";
import materialTheme from "../constants/Theme";
import { getActiveEgresos } from '../Database/Egresos'


const screenWidth = 0.5*Dimensions.get("window").width;
//color: (opacity = 1) => 'rgba(255, 255, 255, ${opacity})',
/*
const hex2rgba = (hex, alpha = 1) => {
  const [r, g, b] = hex.match(/\w\w/g).map((x) => parseInt(x, 16));
  return `rgba(${r},${g},${b},${alpha})`;
};
*/

var descripciones = [];
var montos = [];


function setEgresos(ds, ms){
  console.log(ds, ms);
  descripciones = ds;
  montos = ms;
}

const colors = [materialTheme.COLORS.ACTIVE, 
  materialTheme.COLORS.DEFAULT, 
  materialTheme.COLORS.INFO, 
  materialTheme.COLORS.WARNING, 
  materialTheme.COLORS.ERROR];

export default class GraficoVencimientos extends React.Component {
 constructor(props) {
   super(props);
    this.state = {
      selectedSlice: {
        label: '',
        value: 0
      },
      labelWidth: 0
    }
  }

  componentDidMount(){
    getActiveEgresos(setEgresos);
  }
  


  render() {
    const { labelWidth, selectedSlice } = this.state;
    const { label, value } = selectedSlice;
    
    const { titulo } = this.props; 
    
    const data = descripciones.map((key, index) => {
        return {
          key,
          value: montos[index],
          svg: { fill: colors[index] },
          arc: { outerRadius: (70 + montos[index]/200) + '%', padAngle: label === key ? 0.1 : 0 },
          onPress: () => this.setState({ selectedSlice: { label: key, value: montos[index] } })
        }
      })

    return (
      <View style={{ justifyContent: 'center', flex: 1 }}>
        <PieChart
          style={{ height: 200, width:screenWidth }}
          outerRadius={'95%'}
          innerRadius={'55%'}
          data={data}
        />
        <GalioText
          onLayout={({ nativeEvent: { layout: { width } } }) => {
            this.setState({ labelWidth: width });
          }}
          style={{
            position: 'absolute',
            left: screenWidth / 2 - labelWidth / 2,
            textAlign: 'center'
          }}>
          {`${label} \n ${value}`}
        </GalioText>
        <GalioText center>{titulo}</GalioText>
      </View>
    )
  }

/*

<PieChart
        style={{ height: 300, width:screenWidth*0.5 }}
            valueAccessor={({ item }) => item.amount}
            data={data}
            spacing={0}
            outerRadius={'95%'}
        >
           
        </PieChart>


        */
/*
  render() {
    const data = [50, 10, 40, 95, -4, -24, 85, 91];

    const randomColor = () =>
      ("#" + ((Math.random() * 0xffffff) << 0).toString(16) + "000000").slice(
        0,
        7
      );

    const pieData = data
      .filter((value) => value > 0)
      .map((value, index) => ({
        value,
        svg: { fill: randomColor() },
        key: `pie-${index}`,
      }));

    const Labels = ({ slices }) => {
      return slices.map((slice, index) => {
        const { labelCentroid, pieCentroid, data } = slice;
        return (
          <G key={index}>
            <Line
              x1={labelCentroid[0]}
              y1={labelCentroid[1]}
              x2={pieCentroid[0]}
              y2={pieCentroid[1]}
              stroke={data.svg.fill}
            />
            <Circle
              cx={labelCentroid[0]}
              cy={labelCentroid[1]}
              r={15}
              fill={data.svg.fill}
            />
          </G>
         );
      });
    };

    return (

        <PieChart
          style={{ height: 300, width:screenWidth }}
          data={pieData}
          innerRadius={0.2*screenWidth}
          outerRadius={0.3*screenWidth}
          labelRadius={80}
        >
        </PieChart>
      
    );
  }
  */
}

/*
export default class GraficoAvance extends React.Component {
  render() {
    const data = {
      labels: ["Test1", "Test2"],
      legend: ["L1", "L2", "L3"],
      data: [
        [60, 60, 60],
        [30, 30, 60]
      ],
      barColors: ["#dfe4ea", "#ced6e0", "#a4b0be"]
    };
   
    const chartConfig = {
      backgroundGradientFrom: theme.COLORS.WHITE, 
      backgroundGradientFromOpacity: 0,
      backgroundGradientTo: theme.COLORS.WHITE,
      backgroundGradientToOpacity: 0,
      color: (opacity = 1) => hex2rgba(materialTheme.COLORS.BLOCK, opacity),
      strokeWidth: 2, // optional, default 3
      barPercentage: 0.5,
      useShadowColorFromDataset: false // optional
    };

    return (
     <Block row card flex style={[styles.elementografico, styles.shadow]}>
     <StackedBarChart
        data={data}
        width={screenWidth}
        height={220}
        chartConfig={chartConfig}
      />
      </Block>    
    );
  }
}
*/

const styles = StyleSheet.create({
  elementografico: {
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE,
    borderWidth: 0,
    minHeight: 114,
  },
  imageContainer: {
    elevation: 1,
  },
  shadow: {
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.1,
    elevation: 2,
  },
});
