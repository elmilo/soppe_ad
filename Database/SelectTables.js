import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabase("db2.db");

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
        console.log("error getCompletoFormateado", error);
      }
    );
  });
}


export function getTodo(table, successCallback) {
  db.transaction((tx) => {
    tx.executeSql(
      "select * from " + table,
      [],
      (_, { rows }) => {
        //console.log('Success getTodo: ' + table + ' -- ' + JSON.stringify(rows._array[0]));
        successCallback(rows._array[0]);
      },
      (_, error) => {
        console.log("error getTodo", error);
      }
    );
  });
}


export function getTodoSC(campos, userID, table) {
  db.transaction((tx) => {
    tx.executeSql(
      "select "+ campos +  " from " + table,
      [userID],
      (_, { rows }) => {
        console.log('Success getTodoSC: ' + table + ' -- ' + JSON.stringify(rows._array[0]));
        return (rows._array);
      },
      (_, error) => {
        console.log("error getTodoSC", error);
        return ([]);
      }
    );
  });
}



/*
export function getTodoSinFiltro(table, successCallback) {
  return callgetTodoSinFiltro(table, successCallback);
}

async function callgetTodoSinFiltro(table, successCallback) {
  try {
    let response = await fetch(URL_API + "Cuenta", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Cuenta),
    });
    let responseJson = await response.json();
    console.log(responseJson);
    return responseJson._id;
  } catch (error) {
    console.log(error);
    return -1;
  }
}*/

export function getTodoSinFiltro(table, successCallback) {
  db.transaction((tx) => {
    tx.executeSql(
      "select * from " + table,
      [],
      (_, { rows }) => {
        console.log('Success getTodoSinFiltro: ' + table + ' -- ' + JSON.stringify(rows._array));
        successCallback(rows._array);
      },
      (_, error) => {
        console.log("error getTodoSinFiltro", error);
      }
    );
  });
}


export function getTodoUserID(table, user_id, callback) {
  db.transaction((tx) => {
    tx.executeSql(
      "select * from " + table + " where user_id = ?",
      [user_id],
      (_, { rows }) => {
        console.log('Success getTodoUserID: ' + table + ' -- ' + JSON.stringify(rows._array[0]));
        callback (rows._array);
      },
      (_, error) => {
        console.log("error getTodoUserID", error);
        return ([]);
      }
    );
  });
}