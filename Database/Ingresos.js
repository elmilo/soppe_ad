import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabase("db2.db");
import React  from 'react';
import Moment from 'react-moment';
import moment from 'moment';
//*******INGRESOS************
//date time NOW DATETIME('now','localtime')

export function getIngresosEgresos(successCallback) {
    db.transaction((tx) => {
      tx.executeSql(
        "select monto, descripcion, add_dttm from Ingresos union select (monto*-1), descripcion, add_dttm from Egresos order by add_dttm desc",
        [],
        (_, { rows }) => {
          console.log('Success getIngresosEgresos: ', rows._array);
          successCallback(rows._array);
        },
        (_, error) => {
          //console.log('error getAccounts');
          errorCallback(error);
        }
      );
    });
  }
  
  //getIngresosEgresosEsteAnio
  
  export function getIngresos() {
    db.transaction((tx) => {
      tx.executeSql(
        "select * from Ingresos ",
        [],
        (_, { rows }) => {
          console.log('Success getIngresos: ', rows._array);
          //successCallback(rows._array);
        },
        (_, error) => {
          console.log('error getIngresos: ' + error);
          //errorCallback(error);
        }
      );
    });
  }
  
  export function getIngresosCuenta(cuenta) {
    db.transaction((tx) => {
      tx.executeSql(
        "select * from Ingresos where cuenta_id = ?",
        [cuenta],
        (_, { rows }) => {
          console.log('Success getIngresos: ', rows._array);
          successCallback(rows._array);
        },
        (_, error) => {
          //console.log('error getAccounts');
          errorCallback(error);
        }
      );
    });
  }
  
  export function getIngresosCuentaFecha(cuenta, fechaDesde, fechaHasta) {
    db.transaction((tx) => {
      tx.executeSql(
        "select * from Ingresos where cuenta_id = ? and add_dttm between ? and ?",
        [cuenta, DATE(substr(fechaDesde,5,8)||substr(fechaDesde,3,4)||substr(fechaDesde,1,2)), DATE(substr(fechaHasta,5,8)||substr(fechaHasta,3,4)||substr(fechaHasta,1,2))],
        (_, { rows }) => {
          console.log('Success getIngresos: ', rows._array);
          successCallback(rows._array);
        },
        (_, error) => {
          //console.log('error getAccounts');
          errorCallback(error);
        }
      );
    });
  }
  // SETS MANUALES
  
  export function setIngreso(user_id, cuenta,  tipoIngreso,  monto, cuotas_fechas,  cuotas_restantes,  descripcion, auto_manual) {
    const fechaInsert = moment().format("YYYY-MM-DD");
    //console.log(user_id, cuenta,  tipoIngreso,  monto, cuotas_fechas,  cuotas_restantes,  descripcion, auto_manual)
    
    
    db.transaction((tx) => {
        tx.executeSql(
            "insert into Ingresos (user_id, cuenta_id, tipo_ingreso, monto, cuotas_fechas, cuotas_restantes, descripcion, auto_manual, add_dttm) values (?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [user_id, cuenta,  tipoIngreso,  monto, cuotas_fechas,  cuotas_restantes,  descripcion, auto_manual, fechaInsert],
          (_, { rows }) => {
            console.log('Exito en setIngreso: ' + JSON.stringify(rows));
          },
          (_, error) => {
            console.log('error en el setIngreso: ' + error);
          }
        );
      }); 
    
  
  }


  export function setIngresoVentaInversion(user_id, cuenta,  tipoIngreso,  monto, cuotas_fechas,  cuotas_restantes,  descripcion, auto_manual) {
    const fechaInsert = moment().format("YYYY-MM-DD");
    //console.log(user_id, cuenta,  tipoIngreso,  monto, cuotas_fechas,  cuotas_restantes,  descripcion, auto_manual)
    
    
    db.transaction((tx) => {
        tx.executeSql(
            "insert into Ingresos (user_id, cuenta_id, tipo_ingreso, monto, cuotas_fechas, cuotas_restantes, descripcion, auto_manual, add_dttm) values (?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [user_id, cuenta,  tipoIngreso,  monto, cuotas_fechas,  cuotas_restantes,  descripcion, auto_manual, fechaInsert],
          (_, { rows }) => {
            console.log('Exito en setIngreso: ' + JSON.stringify(rows));
          },
          (_, error) => {
            console.log('error en el setIngreso: ' + error);
          }
        );
      }); 
    
  
  }
  