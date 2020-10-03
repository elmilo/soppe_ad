import React, { useEffect, useState } from 'react';
import { ImageBackground, Image, StyleSheet, TouchableWithoutFeedback, StatusBar, Dimensions, Platform , ScrollView } from 'react-native';
import { Block, Button, Text, theme, Input } from 'galio-framework';
import { LinearGradient } from 'expo-linear-gradient';
import { Icon, Tarjeta, Header } from '../components';
const { height, width } = Dimensions.get('screen');
import { Images, materialTheme } from '../constants';
import { HeaderHeight } from "../constants/utils";
import tarjetasjs from '../constants/tarjetas.js';
import { updateFechasTarjeta, deleteTarjeta } from "../Database/Database";
import { getTarjetas } from "../Database/Database";
import { setTarjeta } from '../Database/Database';
import ModalPersonalizado from '../components/ModalPersonalizado';


const arrayTarjetas1 = [
  { value: 1, label: "Tarjeta1" },
  { value: 2, label: "Tarjeta2" },
  { value: 3, label: "Tarjeta3" },
  { value: 4, label: "Tarjeta3" },
];

export default function C2_Tarjetas(props) {
  const [user_id, setUser_id] = useState(1);
  const [tarjeta, setTarjeta] = useState("");
  const [arrayTarjetas, setArrayTarjetas] = useState([]);
  const [fechaVenceResumen, setFechaVenceResumen] = useState("");
  const [fechaCierre, setFechaCierre] = useState("");
  const navigation = props.navigation;
  
  
  function successCallbackUserID(rowDB) {
    setUser_id(rowDB.idExt);
    getTarjetas(rowDB.idExt, successArrayTarjetas);
  }

  useEffect(() => {
    getTodo("Usuarios", successCallbackUserID);    
  }, []);


  function handleOnChangeTarjeta (unaTarjeta){
    console.log('handleOnChangeTarjeta: ' + unaTarjeta);
    setTarjeta(unaTarjeta);
  }

  function successArrayTarjetas(rows) {
    var datosFinales = [];
    rows.forEach((elemento, key) => {
      datosFinales.push({
        key: elemento.id,
        label: elemento.emisor + '(' + elemento.ultimos_4_digitos + ')',
      });
    });

    setArrayTarjetas(datosFinales);
  }

  function DropdownTarjeta(props) {
    return (
      <ModalPersonalizado
        data={arrayTarjetas}
        initValue="Tarjeta"
        onSelected={handleOnChangeTarjeta}
      />
    );
  };
  
  function updateFechas() {
    updateFechasTarjeta(tarjeta.slice(-5,-1),fechaCierre, fechaVenceResumen);
    navigation.navigate("Tarjetas");
      }
  
      function eliminarTarjeta() {
        deleteTarjeta(tarjeta.slice(-5,-1));
        navigation.navigate("Tarjetas");
          }
    return (
    
      <Block style={{ paddingHorizontal: theme.SIZES.BASE, paddingVertical: theme.SIZES.BASE }}>
      {DropdownTarjeta() }
      <ScrollView>
                 
          <Block flex style={styles.tarjetaDescription}>
           <Text size={18} style={styles.tarjetaEntidad}>Fecha de cierre:</Text>
            <Block flex style={styles.group}>
              <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                <Input
                  right
                  keyboardType = 'numeric'
                  placeholder="Solo números ej 25052020"
                  placeholderTextColor={materialTheme.COLORS.DEFAULT}
                  style={{ borderRadius: 1, borderColor: materialTheme.COLORS.INPUT }}
                  onChangeText={(text) => {setFechaCierre(text);}}
                />
              </Block>
            </Block>
            <Text></Text><Text></Text><Text></Text>
            <Text size={18} style={styles.tarjetaEntidad}>Fecha de vencimiento del resumen:</Text>
            <Block flex style={styles.group}>
              <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                <Input
                  right
                  keyboardType = 'numeric'
                  placeholder="Solo números ej 25052020"
                  placeholderTextColor={materialTheme.COLORS.DEFAULT}
                  style={{ borderRadius: 1, borderColor: materialTheme.COLORS.INPUT }}
                  onChangeText={(text) => {setFechaVenceResumen(text);}}
                />
                <Text></Text><Text></Text><Text></Text>
                

            <Button
              shadowless
              color="success"
              style={[styles.button, styles.shadow]}
              onPress={() => {updateFechas();}}

            >
             Actualizar
            </Button>

           

                <Text></Text>
                <Button
              shadowless
              color="red"
              style={[styles.button, styles.shadow]}
              onPress={() => {eliminarTarjeta();}}

            >
            Eliminar
            </Button>
              </Block>
            </Block>
          </Block>
          </ScrollView>
      </Block>
    );
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