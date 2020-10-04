import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Dimensions,
  TouchableHighlight,
  ActivityIndicator,
  Modal,
  ImageBackground,
  Platform,
  View
} from "react-native";
import { Button, Block, Text, theme } from "galio-framework";
import { LinearGradient } from "expo-linear-gradient";

import { Icon } from "../components";
import { Images, materialTheme } from "../constants";
import { HeaderHeight } from "../constants/utils";
const { width, height } = Dimensions.get("screen");
const thumbMeasure = (width - 48 - 32) / 3;
import { useFocusEffect } from '@react-navigation/native';
import { fakeprofile as miPerfil } from "../constants";
import { getTodo , getEntidades} from "../Database/SelectTables";

import { enviarNube, deleteNube, recibirNube } from "../external/InsertAPI";

import { setCuentaUnica, setTarjeta, setInversion, setPrestamo, setPresupuesto } from "../Database/Database";
import { setEgreso } from "../Database/Egresos";
import { setIngreso } from "../Database/Ingresos";
import { deleteAllFrom } from "../Database/CreateTables";

    

export default function B01_Perfil(props) {
  const [user_id, setUser_id] = useState(1);

  const [indicadorTrabajando, setIndicadorTrabajando] = useState(false);
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  
  /********************************* */

  function successCallbackUserID(rowDB) {
    console.log('Usuario: ' + JSON.stringify(rowDB));
    setNombre(rowDB.nombre);
    setApellido(rowDB.apellido);
    setUser_id(rowDB.idExt);
  }

  useEffect(() => {
    getTodo("Usuarios", successCallbackUserID);
  }, []);

  
  function callbackEnviarEntidad(rowDB, Entidad) {
    deleteNube(user_id, Entidad ).then(
      res => {if (res) {        
          rowDB.forEach((unaFila) =>{
            enviarNube(unaFila, Entidad).then(res => {
            if (res) {
              console.log('Exito en el enviarDatosNube: ' + res);
              
            } else {
              console.log('Error en el enviarDatosNube');
              return false;
            }
          });
        });

    } else {
        console.log('Error en el deleteNube');
      }}
    );
    
  }

  //              {indicadorWIPE? <ActivityIndicator /> : null}
 /* function callbackCuentas(rowDB) {
    console.log('datos cuentas: ' + rowDB);
    //setDatosCuentas(rowDB);
    recibirNube(user_id, 'Cuenta').then(
      res => {if (res) {
        
        res.forEach((unaFila) =>{
          //insertCuenta(unaFila.id, unaFila.nombre...);
        });


      } else {
        
      }}
    );
    
    rowDB.forEach((unaFila) =>{
      enviarNube(unaFila, 'Cuenta').then(res => {
        if (res) {
          console.log('Exito en el enviarDatosNube: ' + res);
        } else {
          console.log('Error en el enviarDatosNube');
        }
      });
    });
    setIndicadorWIPR(false);
  }
*/

function enviarDatosNube (){
    /*setIndicadorTrabajando(true);
    getEntidades('Cuentas', callbackEnviarEntidad);
    getEntidades('Tarjetas', callbackEnviarEntidad);
    getEntidades('Inversiones', callbackEnviarEntidad);
    getEntidades('Presupuestos', callbackEnviarEntidad);
    getEntidades('Prestamos', callbackEnviarEntidad);
    getEntidades('Ingresos', callbackEnviarEntidad);
    getEntidades('Egresos', callbackEnviarEntidad);
    setTimeout(
      () => setIndicadorTrabajando(false), 
      7000
    );*/
   }
  

  async function recuperarDatosNube (){
    //setIndicadorTrabajando(true);
    /*recibirNube(user_id, 'Cuenta').then(
      res => {if (res) {      
        deleteAllFrom('Cuentas').then( () => {
          res.forEach((unaFila) =>{
            setCuentaUnica(unaFila.cbu, unaFila.user_id, unaFila.entidad_id, unaFila.moneda, unaFila.nro_cuenta, unaFila.alias, unaFila.saldo);
          })
        });

      } else {
        console.log('Error en recibir cuenta')
      }}
    );*/
    recibirNube(user_id, 'Tarjeta').then(
      res => {if (res) {      
        deleteAllFrom('Tarjetas').then( () => {
          res.forEach((unaFila) =>{
            setTarjeta(unaFila.user_id, unaFila.cuenta_id, unaFila.ultimos_4_digitos, 
              unaFila.emisor, unaFila.tipo , unaFila.fecha_vencimiento_tarjeta, 
              unaFila.fecha_cierre_resumen, unaFila.fecha_vencimiento_resumen, unaFila.saldo);
          })
        });

      } else {
        console.log('Error en recibir cuenta')
      }}
    );
    /*setEntidades('Tarjetas', callbackRecibirEntidad);
    setEntidades('Inversiones', callbackRecibirEntidad);
    setEntidades('Presupuestos', callbackRecibirEntidad);
    setEntidades('Prestamos', callbackRecibirEntidad);
    setEntidades('Ingresos', callbackRecibirEntidad);
    setEntidades('Egresos', callbackRecibirEntidad);*/

    /*setTimeout(
      () => setIndicadorTrabajando(false), 
      7000
    );*/
  }
  
  /*function renderBoton(){
    return(
      <TouchableHighlight
      style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
      onPress={() => {
        setIndicadorTrabajando(false);
      }}
    >
      <Text style={styles.textStyle}>¡Terminado!</Text>
    </TouchableHighlight>
    )
  }*/

  function renderCartel() {
    return (
      <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={false}
        presentationStyle='fullscreen'
        visible={indicadorTrabajando}
        onRequestClose={() => {
          console.log("Modal cerrado");
        }}
      >
        <View style={styles.centeredView}>
        <Text>Por favor, espere mientras procesamos</Text>
        {indicadorTrabajando? <ActivityIndicator size='large'/> : null}
            </View>
      </Modal>
      </View>
    );
  }

  return (
    <Block flex style={styles.profile}>
     
      <Block flex>
        <ImageBackground
          source={miPerfil.avatar}
          style={styles.profileContainer}
          imageStyle={styles.profileImage}
        >
          <Block flex style={styles.profileDetails}>
            <Block style={styles.profileTexts}>
              <Text color="black" size={28} style={{ paddingBottom: 8 }}>
                {nombre + " " + apellido}
              </Text>
              <Block row space="between">
                <Block row>
                  <Text color="white" size={16} muted style={styles.seller}>
                    {miPerfil.time}
                  </Text>
                  <Text size={16} color={materialTheme.COLORS.WARNING}>
                    <Icon name="shape-star" family="GalioExtra" size={14} />{" "}
                    {miPerfil.amount} administrados
                  </Text>
                </Block>
              </Block>
            </Block>
            <LinearGradient
              colors={["rgba(0,0,0,0)", "rgba(0,0,0,1)"]}
              style={styles.gradient}
            />
          </Block>
        </ImageBackground>
        
        <Block>
          <Block center>
            <Button
              style={styles.button}
              color={materialTheme.COLORS.INFO}
              onPress={() => {
                enviarDatosNube();
              }}
            >
              <Text>Enviar mis datos a la nube</Text>
            </Button>

            <Button
              style={styles.button}
              color={materialTheme.COLORS.LABEL}
              onPress={() => {
                recuperarDatosNube();
              }}
            >
              <Text>Recuperar datos de la nube</Text>
            </Button>
            {renderCartel()}
          </Block>
        </Block>
      </Block>
    </Block>
  );
}

const styles = StyleSheet.create({
  profile: {
    marginTop: Platform.OS === "android" ? -HeaderHeight : 0,
    marginBottom: -HeaderHeight * 2,
  },
  profileImage: {
    width: width * 1.1,
    height: "auto",
  },
  profileContainer: {
    width: width,
    height: height / 2,
  },
  profileDetails: {
    paddingTop: theme.SIZES.BASE * 4,
    justifyContent: "flex-end",
    position: "relative",
  },
  profileTexts: {
    paddingHorizontal: theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE * 2,
    zIndex: 2,
  },
  pro: {
    backgroundColor: materialTheme.COLORS.LABEL,
    paddingHorizontal: 6,
    marginRight: theme.SIZES.BASE / 2,
    borderRadius: 4,
    height: 19,
    width: 38,
  },
  seller: {
    marginRight: theme.SIZES.BASE / 2,
  },
  options: {
    position: "relative",
    padding: theme.SIZES.BASE,
    marginHorizontal: theme.SIZES.BASE,
    marginTop: -theme.SIZES.BASE * 7,
    borderTopLeftRadius: 13,
    borderTopRightRadius: 13,
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    zIndex: 2,
  },
  thumb: {
    borderRadius: 4,
    marginVertical: 4,
    alignSelf: "center",
    width: thumbMeasure,
    height: thumbMeasure,
  },
  gradient: {
    zIndex: 1,
    left: 0,
    right: 0,
    bottom: 0,
    height: "30%",
    position: "absolute",
  },
  button: {
    width: width - theme.SIZES.BASE * 4,
    height: theme.SIZES.BASE * 3,
    shadowRadius: 0,
    shadowOpacity: 0,
    marginTop: theme.SIZES.BASE,
    marginBottom: theme.SIZES.BASE,
  },
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5
    },
    openButton: {
      backgroundColor: "#F194FF",
      borderRadius: 20,
      padding: 10,
      elevation: 2
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    }
});
