import React  from 'react';
import Moment from 'react-moment';
import moment from 'moment';
import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabase("db2.db");

export function getMovimientosUltimoMes(user_id, successCallback) {
    const begin = moment().format("YYYY-MM-01");
    const end = moment().format("YYYY-MM-") + moment().daysInMonth();
    //console.log('Success getMovimientosUltimoMes: ');
    //const start = moment().add(-4, 'm');
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT
            'Egreso' as origen, 
            descripcion,
            monto,
            add_dttm as fecha
            FROM Egresos 
            WHERE user_id = ?
         UNION
         SELECT
            'Ingreso' as origen, 
            descripcion, 
            monto,
            add_dttm as fecha
            FROM Ingresos 
            WHERE user_id = ? `,
        [user_id, user_id],
        (_, { rows }) => {
          //console.log('Success getMovimientosUltimoMes: ', rows._array);
          successCallback(rows._array);
        },
        (_, error) => {
          console.log('error getMovimientosUltimoMes: ' + error);
          //errorCallback(error);
        }
      );
    });
  }


  /******************************************************************* */
  /*export function getMovimientosYTD(user_id, successCallback) {
    const begin = moment().format("YYYY-01-01");
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT
            'Egreso' as origen, 
            descripcion,
            monto,
            add_dttm as fecha
            FROM Egresos 
            WHERE user_id = ? AND add_dttm >= ?
         UNION
         SELECT
            'Ingreso' as origen, 
            descripcion, 
            monto,
            add_dttm as fecha
            FROM Ingresos 
            WHERE user_id = ? AND add_dttm >= ?`,
        [user_id, begin, user_id, begin],
        (_, { rows }) => {
          //console.log('Success getMovimientosUltimoMes: ', rows._array);
          successCallback(rows._array);
        },
        (_, error) => {
          console.log('error getMovimientosUltimoMes: ' + error);
          //errorCallback(error);
        }
      );
    });
  }*/

  /********************************************************** */


  export function getMovimientosYTD(user_id, successCallback)  {
    return callGetMovimientosYTD(user_id, successCallback) ;
  }
  
  
  async function callGetMovimientosYTD(user_id, successCallback) {
    const begin = moment().format("YYYY-01-01");
    
    return new Promise(function(resolve, reject) {
      db.transaction((tx) => {
        tx.executeSql(
          `SELECT
              'Egreso' as origen, 
              descripcion,
              monto,
              add_dttm as fecha
              FROM Egresos 
              WHERE user_id = ? AND add_dttm >= ?
           UNION
           SELECT
              'Ingreso' as origen, 
              descripcion, 
              monto,
              add_dttm as fecha
              FROM Ingresos 
              WHERE user_id = ? AND add_dttm >= ?`,
          [user_id, begin, user_id, begin],
          (_, { rows }) => {
            console.log('Success callGetMovimientosYTD: ', rows._array);
            successCallback(rows._array)
            resolve(true);
          },
          (_, error) => {
            console.log('error callGetMovimientosYTD: ' + error);
            reject(false);
          }
        );
      });

    });
  };