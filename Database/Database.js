import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabase("db.db");

//*******CUENTAS************
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
        //AGREGAR insert into Ingreso (user_id, cuenta_id, rubro_id, categoria_id, monto, cuotas_fechas, id_externa, tabla_externa, descripcion, auto_manual, add_dttm) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        // [user_id, cuenta_id, null, null, ?=saldo, null, cuenta_id, 'Cuentas', 'Saldo Inicial de Cuenta', 'auto', sysdate]
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

export function getCuentaDetalle(id) {
  db.transaction((tx) => {
    tx.executeSql(
      "select * from Cuentas where id = ?",
      [id],
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

export function deleteCuenta(id) {
  console.log("deleteCuenta");
  console.log(id);
  db.transaction(
    (tx) => {
      tx.executeSql(
        "delete from Cuentas where cbu = ?",
        [id]
      );
    },
    null,
    () => console.log("la cuenta se borró correctamente")
  );
}


//*******PRESUPUESTOS************

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

export function setPresupuesto(rubro, categoria, monto, descripcion) {
  console.log("SetPresupuesto");
  console.log(rubro, categoria, monto);
  db.transaction(
    (tx) => {
      tx.executeSql(
        "insert into Presupuestos (user_id, rubro_id, categoria_id, monto_mensual, descripcion) values (?, ?, ?, ?, ?)",
        [1, rubro, categoria, monto, descripcion]
      );
    },
    null,
    () => console.log("el presupuesto se guardó correctamente")
  );
}

export function getPresupuestoDetalle(id) {
  db.transaction((tx) => {
    tx.executeSql(
      "select * from Presupuestos where id = ?",
      [id],
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

export function deletePresupuesto(id) {
  console.log("deletePresupuesto");
  console.log(cbu);
  db.transaction(
    (tx) => {
      tx.executeSql(
        "delete from Presupuestos where id = ?",
        [id]
      );
    },
    null,
    () => console.log("el presupuesto se borró correctamente")
  );
}