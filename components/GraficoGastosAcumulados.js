import React from 'react'
import { View } from 'react-native'
import { BarChart, Grid } from 'react-native-svg-charts'
import { Text } from 'react-native-svg'
import materialTheme from "../constants/Theme";

export default class GraficoGastosAcumulados extends React.Component {

    render() {

      const data = [ //4000, 1820, 650 ];
        {
          valor: 4000,
            etiqueta: 'Cuentas bancarias',
        },
        {
            valor: 1820,
            etiqueta: 'Efectivo',
        },
        {
          valor: 650,
            etiqueta: 'Otros',
        }
    ];

        const Labels = ({  x, y, bandwidth, data }) => (
            data.map((unItem, indice) => (
                <Text
                    key={ indice }
                    x={ x(0) + 10 }
                    y={ y(indice) + (bandwidth / 2) }
                    fontSize={ 14 }
                    fill={ 'black' }
                    alignmentBaseline={ 'middle' }
                >
                    {unItem.etiqueta + ': $' + unItem.valor}
                </Text>
            ))
        )
//                   <Labels/>
        return (
            <View style={{ flexDirection: 'row', height: 180, paddingVertical: -20 }}>
                <BarChart
                    style={{ flex: 1, marginLeft: 8 }}
                    data={data}
                    yAccessor={ ({item}) => item.valor }
                    horizontal={true}
                    svg={{ fill: materialTheme.COLORS.DEFAULT, }}
                    contentInset={{ top: 10, bottom: 10 }}
                    spacing={0.8}
                    gridMin={0}
                >
<Labels/>
                </BarChart>
            </View>
        )
    }

}

