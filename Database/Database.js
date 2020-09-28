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
  console.log(rubro, categoria, monto, descripcion);
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

//*******TARJETAS************

export function getTarjetas(successCallback) {
  db.transaction((tx) => {
    tx.executeSql(
      "select * from Tarjetas",
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

export function setTarjeta(cuenta, digitos, emisor, tipo, fechaVencimientoTarjeta, fechaCierre, fechaVencimientoResumen) {
  console.log("SetTarjeta");
  console.log(cuenta, digitos, emisor, tipo, fechaVencimientoTarjeta, fechaCierre, fechaVencimientoResumen);
  db.transaction(
    (tx) => {
      tx.executeSql(
        "insert into Tarjetas (user_id, cuenta_id, ultimos_4_digitos, emisor, tipo, fecha_vencimiento_tarjeta, fecha_cierre_resumen, fecha_vencimiento_resumen) values (?, ?, ?, ?, ?, ?, ?, ?)",
        [1, cuenta, digitos, emisor, tipo, fechaVencimientoTarjeta, fechaCierre, fechaVencimientoResumen]
      );
    },
    null,
    () => console.log("la Tarjeta se guardó correctamente")
  );
}

export function getTarjetaDetalle(id) {
  db.transaction((tx) => {
    tx.executeSql(
      "select * from Tarjetas where id = ?",
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

export function updateFechasTarjeta(id, fechaCierre, fechaVencimientoResumen, ) {
  console.log("updateFechasTarjeta");
  console.log(fechaCierre, fechaVencimientoResumen, id);
  db.transaction(
    (tx) => {
      tx.executeSql(
        "update Tarjetas set fecha_cierre_resumen = ?, fecha_vencimiento_resumen = ? where id = ?",
        [fechaCierre, fechaVencimientoResumen, id],
      );
    },
    null,
    () => console.log("las fechas de la Tarjeta se actualizaron correctamente")
  );
}


export function deleteTarjeta(id) {
  console.log("deleteTarjeta");
  console.log(cbu);
  db.transaction(
    (tx) => {
      tx.executeSql(
        "delete from Tarjetas where id = ?",
        [id]
      );
    },
    null,
    () => console.log("la Tarjeta se borró correctamente")
  );
}


//*******INVERSIONES************

export function getInversiones(successCallback) {
  db.transaction((tx) => {
    tx.executeSql(
      "select * from Inversiones",
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

export function setInversion(cuenta, tipo, fechaVencimiento, compraMonto, ventaMonto, descripcion) {
  console.log("SetInversion");
  console.log(cuenta, tipo, fechaVencimiento, compraMonto, ventaMonto, descripcion);
  db.transaction(
    (tx) => {
      tx.executeSql(
        "insert into Inversiones (cuenta_id, user_id, tipo, fecha_vencimiento, compra_monto, venta_monto, descripcion) values (?, ?, ?, ?, ?, ?, ?)",
        [cuenta, 1, tipo, fechaVencimiento, compraMonto, ventaMonto, descripcion]
      );
    },
    null,
    () => console.log("la Inversion se guardó correctamente")
  );
}

export function getInversionDetalle(id) {
  db.transaction((tx) => {
    tx.executeSql(
      "select * from Inversiones where id = ?",
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

export function updateVenderInversion(id, ventaMonto) {
  console.log("updateVenderInversion");
  console.log(id, ventaMonto);
  db.transaction(
    (tx) => {
      tx.executeSql(
        "update Inversiones set venta_monto = ? terminado = 'true' where id = ?",
        [ventaMonto, id],
      );
    },
    null,
    () => console.log("la inversion se ha actualizado a status terminado")
  );
}

export function deleteInversion(id) {
  console.log("deleteInversion");
  console.log(cbu);
  db.transaction(
    (tx) => {
      tx.executeSql(
        "delete from Inversiones where id = ?",
        [id]
      );
    },
    null,
    () => console.log("la Inversion se borró correctamente")
  );
}

//*******PRESTAMOS************

export function getPrestamos(successCallback) {
  db.transaction((tx) => {
    tx.executeSql(
      "select * from Prestamos",
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

export function setPrestamo(cuenta, tipo, fechaVencimiento, compraMonto, ventaMonto, descripcion) {
  console.log("SetPrestamo");
  console.log(cuenta, tipo, fechaVencimiento, compraMonto, ventaMonto, descripcion);
  db.transaction(
    (tx) => {
      tx.executeSql(
        "insert into Prestamos (cuenta_id, user_id, tipo, fecha_vencimiento, compra_monto, venta_monto, descripcion) values (?, ?, ?, ?, ?, ?, ?)",
        [cuenta, 1, tipo, fechaVencimiento, compraMonto, ventaMonto, descripcion]
      );
    },
    null,
    () => console.log("la Prestamo se guardó correctamente")
  );
}

export function getPrestamoDetalle(id) {
  db.transaction((tx) => {
    tx.executeSql(
      "select * from Prestamos where id = ?",
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

export function updateTerminarPrestamo(id) {
  console.log("updateTerminarPrestamo");
  console.log(id);
  db.transaction(
    (tx) => {
      tx.executeSql(
        "update Prestamos set terminado = 'true' where id = ?",
        [id],
      );
    },
    null,
    () => console.log("el Prestamo se ha actualizado a status terminado")
  );
}

export function deletePrestamo(id) {
  console.log("deletePrestamo");
  console.log(cbu);
  db.transaction(
    (tx) => {
      tx.executeSql(
        "delete from Prestamos where id = ?",
        [id]
      );
    },
    null,
    () => console.log("el Prestamo se borró correctamente")
  );
}

