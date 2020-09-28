import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabase("db.db");

export function getCuentas(successCallback) {
  db.transaction((tx) => {
    tx.executeSql(
      "select * from Cuentas",
      [],
      (_, { rows }) => {
        //console.log('Success getCuentas: ', rows._array);
        successCallback(rows._array);
      },
      (_, error) => {
        //console.log('error getAccounts');
        errorCallback(error);
      }
    );
  });
}


export function setCuentaUnica(cbu, entity, currency, accNumber, alias, saldo) {
  console.log("SetCuentaUnica");
  console.log(cbu, entity, currency, accNumber, alias, saldo);
  db.transaction(
    (tx) => {
      tx.executeSql(
        "insert into Cuentas (cbu, user_id, entidad_id, moneda, nro_cuenta, alias, saldo) values (?, ?, ?, ?, ?, ?, ?)",
        [cbu, 1, entity, currency, accNumber, alias, saldo]
      );
    },
    null,
    () => console.log("la cuenta se guardó correctamente")
  );


  /*db.transaction( tx => {
    tx.executeSql("insert into Cuentas (cbu, user, entity, currency, accNumber, alias, saldo) values (?, ?, ?, ?, ?, ?, ?)", [cbu, 1, entity, currency, accNumber, alias, saldo]
    , [], 
    (_, { rows})  => {
    console.log('Success setCuentaUnica: ' + rows);
      //successCallback (rows._array);
    },
    (_, error) => {
        console.log('error setCuentaUnica');
      //errorCallback(error); 
    })
  })*/
}


export function getPresupuestos(successCallback) {
  db.transaction((tx) => {
    tx.executeSql(
      "select * from Presupuestos",
      [],
      (_, { rows }) => {
        //console.log('Success getCuentas: ', rows._array);
        successCallback(rows._array);
      },
      (_, error) => {
        //console.log('error getAccounts');
        errorCallback(error);
      }
    );
  });
}

export function setPresupuesto(rubro, categoria, monto) {
  console.log("SetPresupuesto");
  console.log(rubro, categoria, monto);
  db.transaction(
    (tx) => {
      tx.executeSql(
        "insert into Presupuestos (user_id, rubro_id, categoria_id, monto_mensual) values (?, ?, ?, ?)",
        [1, rubro, categoria, monto]
      );
    },
    null,
    () => console.log("el presupuesto se guardó correctamente")
  );
}