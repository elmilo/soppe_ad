import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabase("db.db");

//*******USUARIOS************

// export function getLogin(email) {
//   db.transaction((tx) => {
//     tx.executeSql(
//       "select * from Usuarios where email = ?",
//       [email],
//       (_, { rows }) => {
//         //console.log('Success getCuentas: ', rows._array);
//         successCallback(rows._array);
//       },
//       (_, error) => {
//         //console.log('error getAccounts');
//         errorCallback(error);
//       }
//     );
//   });
// }

// export function registerUser(email, nombre, apellido, password) {
//   console.log("registerUser");
//   console.log(email, nombre, apellido, password);
//   db.transaction(
//     (tx) => {
//       tx.executeSql(
//         "insert into Usuarios (email, nombre, apellido, password) values (?, ?, ?, ?)",
//         [email, nombre, apellido, password]
//       );
//     },
//     null,
//     () => console.log("el usuarios se registró correctamente")
//   );


//*******CUENTAS************
export function getCuentas(id_usuario, successCallback) {
  db.transaction((tx) => {
    tx.executeSql(
      "select id, entidad_id, moneda, nro_cuenta from Cuentas where user_id = ?",
      [id_usuario],
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


export function setCuentaUnica(cbu, user_id ,entity, currency, accNumber, alias, saldo) {
  console.log("SetCuentaUnica");
  console.log(cbu, entity, currency, accNumber, alias, saldo);
  db.transaction(
    (tx) => {
      tx.executeSql(
        "insert into Cuentas (cbu, user_id, entidad_id, moneda, nro_cuenta, alias, saldo) values (?, ?, ?, ?, ?, ?, ?)",
        [cbu, user_id, entity, currency, accNumber, alias, saldo]
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

// export function setPresupuesto(rubro, categoria, monto, descripcion) {
//   console.log("SetPresupuesto");
//   console.log(rubro, categoria, monto, descripcion);
//   db.transaction(
//     (tx) => {
//       tx.executeSql(
//         "insert into Presupuestos (user_id, rubro_id, categoria_id, monto_mensual, descripcion) values (?, ?, ?, ?, ?)",
//         [1, rubro, categoria, monto, descripcion]
//       );
//       console.log(tx);
//     },
//     null,
//     () => console.log("el presupuesto se guardó correctamente")
//   );
// }

export function setPresupuesto(rubro, categoria, monto, descripcion){
  db.transaction( tx => {
    tx.executeSql("insert into Presupuestos (user_id, rubro_id, categoria_id, monto_mensual, descripcion) values (?, ?, ?, ?, ?)", [1, rubro, categoria, monto, descripcion],
    (_, { rows})  => {
    console.log("Se inserto la tabla correctamente.")
    },
    (_, error) => {
      console.log("ERROR - La tabla no pudo ser insertada.  " + error); 
    })
  })
};

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

  //*******CUENTAS************
  export function getTarjetas(id_usuario, successCallback) {
    db.transaction((tx) => {
      tx.executeSql(
        "select id, emisor, ultimos_4_digitos from Tarjetas where user_id = ?",
        [id_usuario],
        (_, { rows }) => {
          //console.log('Success getCuentas: ', rows._array);
          successCallback(rows._array);
        },
        (_, error) => {
          console.log('error getTarjetas: ' + error);
          //errorCallback(error);
        }
      );
    });
  }

export function setTarjeta(user_id, cuenta, digitos, emisor, tipo, fechaVencimientoTarjeta, fechaCierre, fechaVencimientoResumen, saldo) {
console.log("SetTarjeta");
 
 db.transaction((tx) => {
    tx.executeSql(
      "insert into Tarjetas (user_id, cuenta_id, ultimos_4_digitos, emisor, tipo, fecha_vencimiento_tarjeta, fecha_cierre_resumen, fecha_vencimiento_resumen, saldo) values (?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [user_id, cuenta, digitos, emisor, tipo, fechaVencimientoTarjeta, fechaCierre, fechaVencimientoResumen,saldo],
      (_, { rows }) => {
        console.log('Success SetTarjeta: ', rows._array);
      },
      (_, error) => {
        console.log('error SetTarjeta ' + error);        
      }
    );
  });

}
var createTarjetas =
  "CREATE TABLE IF NOT EXISTS " +
  " Tarjetas " +
  " ( " +
  "id" +
  " INTEGER PRIMARY KEY," +
  "user_id" +
  " INT NOT NULL," +
  "cuenta_id" +
  " INT NULL," +
  "saldo" +
  " INT NULL," +
  "ultimos_4_digitos" +
  " INT NULL," +
  "emisor" +
  " VARCHAR(45) NULL," +
  "tipo" +
  " VARCHAR(45) NULL," +
  "fecha_vencimiento_tarjeta" +
  " DATETIME NULL," +
  "fecha_cierre_resumen" +
  " DATETIME NULL," +
  "fecha_vencimiento_resumen" +
  " DATETIME NULL" +
  ")";

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

export function setPrestamo(cuenta, tipo, terceroDescripcion, cuotasMonto, fechaVencimiento, cuotasRestantes, prestamoMonto, descripcion, tomado) {
  console.log("SetPrestamo");
  console.log(cuenta, tipo, terceroDescripcion, cuotasMonto, fechaVencimiento, cuotasRestantes, prestamoMonto, descripcion, tomado);
  db.transaction(
    (tx) => {
      tx.executeSql(
        "insert into Prestamos (user_id, cuenta_id, tipo, prestamo_a_tercero_descripcion, cuotas_monto, cuotas_fecha_proximo_vencimiento, cuotas_restantes, prestamo_monto, descripcion, tomado, terminado) values (?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [1, cuenta, tipo, terceroDescripcion, cuotasMonto, fechaVencimiento, cuotasRestantes, prestamoMonto, descripcion, tomado, 'false']
      );
    },
    null,
    () => console.log("el Prestamo se guardó correctamente")
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
//para saber cuanto hay q pagar para finalizar un prestamo al cual le quedan cuotas, hay q hacer cuotas_restantes * cuotas_monto
//y que ese sea el valor del ingreso/egreso en caso de q sea otorgado/tomado

export function updateTerminarPrestamo(id) {
  console.log("updateTerminarPrestamo");
  console.log(id);
  db.transaction(
    (tx) => {
      tx.executeSql(
        "update Prestamos set terminado = 'true', cuotas_restantes = 0 where id = ?",
        [id],
      );
    },
    null,
    () => console.log("el Prestamo se ha actualizado a status terminado")
  );
}

export function updateProximaCuota(id) {
  console.log("updateProximaCuota");
  console.log(id);
  db.transaction(
    (tx) => {
      tx.executeSql(
        "update Prestamos set cuotas_fecha_proximo_vencimiento = date(cuotas_fecha_proximo_vencimiento,'+1 month'), cuotas_restantes = cuotas_restantes-1 where id = ?",
        [id],
      );
    },
    null,
    () => console.log("el Prestamo se ha actualizado a la proxima fecha de vencimiento y disminuida 1 cuota restante")
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

//*******INGRESOS************

//MANUALES



//AUTOMATICOS

//al crear nueva cuenta
        //AGREGAR insert into Ingreso (user_id, cuenta_id, rubro_id, categoria_id, monto, cuotas_fechas, id_externa, tabla_externa, descripcion, auto_manual, add_dttm) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        // [user_id, cuenta_id, null, null, ?=saldo, null, cuenta_id, 'Cuentas', 'Saldo Inicial de Cuenta', 'auto', sysdate]


//*******EGRESOS************




//*******NOTIFICACIONES************

//Vencimiento Tarjeta


//Vencimiento Cuota Prestamo


//Vencimiento Cuota Inversion


//Vencimiento Cuota Egreso