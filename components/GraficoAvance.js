import React from "react";
import { StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Button, Block, theme } from "galio-framework";
import { Rect, Text as TextSVG, Svg } from "react-native-svg";

import materialTheme from "../constants/Theme";

import { StackedBarChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
const screenWidth = Dimensions.get("window").width;
//color: (opacity = 1) => 'rgba(255, 255, 255, ${opacity})',

const hex2rgba = (hex, alpha = 1) => {
  const [r, g, b] = hex.match(/\w\w/g).map((x) => parseInt(x, 16));
  return `rgba(${r},${g},${b},${alpha})`;
};

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
