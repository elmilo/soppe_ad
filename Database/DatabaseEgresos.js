import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabase("db2.db");

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

//SETS MANUALES
export function setEgreso(cuenta, rubro, categoria, tarjeta, medioDePago, monto, fechaVencimiento, cuotasRestantes, descripcion, auto_manual) {
  var fechaInsert = new Date();
  db.transaction((tx) => {
    tx.executeSql(
      'INSERT into Egresos (user_id, cuenta_id, rubro_id, categoria_id, tarjeta_id, medio_de_pago, monto, cuotas_fechas, cuotas_restantes, descripcion, auto_manual, add_dttm) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [1, cuenta, rubro, categoria, tarjeta, medioDePago, monto, fechaVencimiento, cuotasRestantes, descripcion, auto_manual, fechaInsert],
      (_, { rows }) => {
        console.log('el Egreso se guardó correctamente: ' + JSON.stringify(rows));
      },
      (_, error) => {
        console.log('error en el setEgreso: ' + error);
      }
    );
  });  
}