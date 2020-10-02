import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabase("db2.db");
import React  from 'react';
import Moment from 'react-moment';
import moment from 'moment';
//*******EGRESOS************
export function getEgresos() {

  db.transaction((tx) => {
    tx.executeSql(
      'SELECT * from Egresos ',
      null,
      (_, { rows }) => {
        console.log('Success getEgresos: '+ JSON.stringify(rows._array));
      },
      (_, error) => {
        console.log('error getEgresos' + error);
      }
    );
  });

  
}

export function getActiveEgresos(successCallback){
  db.transaction((tx) => {
    tx.executeSql(
      'SELECT descripcion, monto from Egresos where cuotas_restantes > 0',
      [],
      (_, { rows }) => {
        var results = rows._array;
        let descripciones = [];
        let montos = [];
        for(let i = 0; i < results.length; i++){
          descripciones.push(results[i].descripcion);
          montos.push(results[i].monto);
        }
        successCallback(descripciones, montos);
      },
      (_, error) => {
        console.log(error)
      }
    )
  })
}

export function getEgresoForRubro(rubro, successCallback){
  db.transaction((tx) => {
    tx.executeSql(
      'Select sum(monto) as total from Egresos where rubro_id = ' + rubro,
      [],
      (_, { rows }) => {
        successCallback(rows._array);
      },
      (_, error) => {
        console.log(error);
      }
    );
  
  });

}

export function getOtherEgresos(successCallback){
  db.transaction((tx) => {
    tx.executeSql(
      "Select sum(monto) as total from Egresos where rubro_id != 'General' and rubro_id != 'Servicios e Impuestos'",
      [],
      (_, { rows }) => {
        successCallback(rows._array);
      },
      (_, error) => {
        console.log(error);
      }
    );
  
  });
}

export function getEgresosFromEfectivo(successCallback){
  db.transaction((tx) => {
    tx.executeSql(
      //"Select sum(monto) as totalEfectivo from Egresos e join Cuentas c on e.cuenta_id = c.id",
      "select monto, cuenta_id from Egresos",
      [],
      (_, { rows }) => {
        console.log(rows);
        successCallback(rows._array);
      },
      (_, error) => {
        console.log(error);
      }
    );
  
  });
}

//SETS MANUALES
export function setEgreso(user_id, cuenta, rubro, categoria, tarjeta, medioDePago, monto, fechaVencimiento, cuotasRestantes, descripcion, auto_manual, comprobante) {
  const fechaInsert = moment().format("YYYY-MM-DD");
  
  db.transaction((tx) => {
    tx.executeSql(
      'INSERT into Egresos (user_id, cuenta_id, rubro_id, categoria_id, tarjeta_id, medio_de_pago, monto, cuotas_fechas, cuotas_restantes, descripcion, auto_manual, add_dttm, foto_comprobante) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [user_id, cuenta, rubro, categoria, tarjeta, medioDePago, monto, fechaVencimiento, cuotasRestantes, descripcion, auto_manual, fechaInsert, comprobante],
      (_, { rows }) => {
        console.log('el Egreso se guardó correctamente: ' + JSON.stringify(rows));
      },
      (_, error) => {
        console.log('error en el setEgreso: ' + error);
      }
    );
  });  
}