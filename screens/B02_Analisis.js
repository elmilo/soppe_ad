import React, { useState, useEffect } from "react";
import {
  ImageBackground,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
  Platform
} from "react-native";
import { Block, Button, Text, theme } from "galio-framework";

import { LinearGradient } from "expo-linear-gradient";

const { height, width } = Dimensions.get("screen");
import { Images, materialTheme } from "../constants/";
import { HeaderHeight } from "../constants/utils";

import XLSX from "xlsx";
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';

const DDP = FileSystem.documentDirectory;
//const DDP =FileSystem.cacheDirectory /;
const exportDir = DDP;

import {
  getMovimientosUltimoMes,
  getMovimientosYTD,
} from "../Database/Movimientos";
import Movimiento from "../components/Movimiento";

export default function B02_Analisis(props) {
  const [user_id, setUser_id] = useState(1);
  const [datos, setDatos] = useState([]);
  const [botonOpciones, setBotonOpciones] = useState(false);
  const [datosExportar, setDatosExportar] = useState([]);

  const { navigation } = props;

  function exportFile() {
     /* convert AOA back to worksheet */
    const ws = XLSX.utils.aoa_to_sheet(datosExportar);

    /* build new workbook */
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Movimientos");

    /* write file */
    const contents = XLSX.write(wb, { type: "binary", bookType: "xlsx" });
    const fileUri = exportDir + '/' + "data_export.xlsx";
    FileSystem.writeAsStringAsync(fileUri, contents).then((res) => {
      console.log("exportFile success" +  " Exported to " + fileUri);
      MediaLibrary.saveToLibraryAsync(fileUri);
      })
      .catch((err) => {
        console.log("exportFile Error", "Error " + err.message);
      });
  }

 
 /* function getCurrentTime() {
    // Get the current 'global' time from an API using Promise
    return new Promise((resolve, reject) => {
      setTimeout(function () {
        var didSucceed = Math.random() >= 0.5;
        didSucceed ? resolve(new Date()) : reject("Error");
      }, 2000);
    });
  }
  getCurrentTime()
    .then((currentTime) => getCurrentTime())
    .then((currentTime) => {
      console.log("The current time is: " + currentTime);
      return true;
    })
    .catch((err) => console.log("There was an error:" + err));
  */

  function callbackExportData(rows) {
      var datosTemporales = {
        cols: [{ name: "A", key: 0 }, { name: "B", key: 1 }, { name: "C", key: 2 }, { name: "D", key: 3 }],
        data: []
      };
    
      var cabeceras = [ "Tipo",    "Fecha", "Descripción" , "Monto"];
      datosTemporales.data.push(cabeceras);

      rows.forEach((elemento, index) => {
        console.log('elemento: ' + JSON.stringify(elemento));
        var unaFila = [elemento.origen, elemento.fecha, elemento.descripcion, elemento.monto];
        datosTemporales.data.push(unaFila);
      });
  
      setDatosExportar(datosTemporales);
      exportFile();
    }


  function renderBotonOpcionesDescarga() {
    return (
      <Button
        shadowless
        color={materialTheme.COLORS.ACTIVE}
        onPress={() => {
          setBotonOpciones(true);
        }}
      >
        Opciones de descarga de info
      </Button>
    );
  }

  function renderOpcionesDescargas() {
    return (
      <Block>
        <Block>
          <Button
            shadowless
            color={materialTheme.COLORS.ACTIVE}
            onPress={() => {
              setBotonOpciones(false);
            }}
          >
            Ocultar Opciones
          </Button>
        </Block>
        <Block>
          <Button
            shadowless
            color={materialTheme.COLORS.INFO}
            onPress={() => {
              getMovimientosYTD (1, callbackExportData);
              
              setBotonOpciones(false);
            }}
          >
            Descargar Movimientos Año Actual
          </Button>
        </Block>
      </Block>
    );
  }

  function successCallback(rows) {
    var datosTemporales = [];
    rows.forEach((elemento, index) => {
      //console.log('un Movimiento: ' + JSON.stringify(elemento));
      datosTemporales.push(<Movimiento unMovimiento={elemento} />);
    });

    setDatos(datosTemporales);
  }

  useEffect(() => {
    getMovimientosUltimoMes(user_id, successCallback);
  });

  return (
    <Block>
      {botonOpciones
        ? renderOpcionesDescargas()
        : renderBotonOpcionesDescarga()}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.cuentas}
      >
        <Block flex>
          <Block dense>{datos}</Block>
        </Block>
      </ScrollView>
    </Block>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.COLORS.BLACK,
    marginTop: Platform.OS === "android" ? -HeaderHeight : 0,
  },
  padded: {
    paddingHorizontal: theme.SIZES.BASE * 2,
    zIndex: 3,
    position: "absolute",
    bottom:
      Platform.OS === "android" ? theme.SIZES.BASE * 2 : theme.SIZES.BASE * 3,
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
    height: 22,
  },
  gradient: {
    zIndex: 1,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 66,
  },
});
