import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabase("db.db");

export function getCompletoFormateado(table, callback) {
  db.transaction((tx) => {
    tx.executeSql(
      "select * from " + table,
      [],
      (_, { rows }) => {
        //console.log('Success getCompletoFormateado: ' + table + ' ' + JSON.stringify(rows._array));
        callback(rows._array);
      },
      (_, error) => {
        console.log("error getCompletoFormateado " + table);
        //errorCallback(error);
      }
    );
  });
}
