import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabase("db.db");

export function getCompletoFormateado(table, callback) {
  db.transaction((tx) => {
    tx.executeSql(
      "select * from " + table,
      [],
      (_, { rows }) => {
        //console.log('Success get: ' + table + ' ' + JSON.stringify(rows._array));
        callback(rows);
      },
      (_, error) => {
        console.log("error getCompleto");
        //errorCallback(error);
      }
    );
  });
}
