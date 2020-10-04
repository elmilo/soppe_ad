import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabase("db2.db");
export var userData = {};

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

 export function setUserData(data){
   userData = data;
 }

 export function registerUser(email, nombre, apellido, password, idExt) {
   console.log("registerUser");
   console.log(email, nombre, apellido, password, idExt);

   db.transaction(
    (tx) => {
      tx.executeSql(
        "DELETE FROM Usuarios",
        []
      );
    },
    null,
    () => {console.log("se vació la tabla usuarios OK");
  
    db.transaction(
      (tx) => {
        tx.executeSql(
          "insert into Usuarios (email, nombre, apellido, password, idExt) values (?, ?, ?, ?, ?)",
          [email, nombre, apellido, password, idExt]
        );
      },
      null,
      () => console.log("el usuarios se registró correctamente"));
  
  
  }
    
    
    
    );


 
};


//*******CUENTAS************
export function getCuentas(id_usuario, successCallback) {
  //where user_id = ?
  db.transaction((tx) => {
    tx.executeSql(
      "select * from Cuentas where user_id = ?",
      [id_usuario],
      (_, { rows }) => {
        console.log('Success getCuentas: ', rows._array);
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

export function updateSaldoCuentaIngreso(user_id, nroCuenta, montoIngreso) {
  console.log("updateSaldoCuentaIngreso");
  console.log(user_id, nroCuenta, montoIngreso);
  db.transaction(
    (tx) => {
      tx.executeSql(
        "update Cuentas set saldo = saldo + ? where user_id = ? and nro_cuenta = ?;",
        [montoIngreso, user_id, nroCuenta]
      );
    },
    null,
    () => console.log("el saldo de la cuenta se incrementó correctamente")
  );
}

  export function updateSaldoCuentaEgreso(userID,nroCuenta, montoEgreso) {
    console.log("updateSaldoCuentaEgreso");
    console.log(userID,nroCuenta, montoEgreso);
    db.transaction(
      (tx) => {
        tx.executeSql(
          "update Cuentas set saldo = saldo - ? where user_id = ? and nro_cuenta = ?;",
          [montoEgreso, userID, nroCuenta]
        );
      },
      null,
      () => console.log("el saldo de la cuenta se disminuyó correctamente")
    );
  }


export function getSaldoIngresosCuenta(cuenta) {
  db.transaction((tx) => {
    tx.executeSql(
      "select sum(monto) from Ingresos where cuenta_id = ? group by cuenta_id",
      [cuenta],
      (_, { rows }) => {
        console.log('Success getSaldoTarjetaEstePeriodo: ', rows._array);
        successCallback(rows._array);
      },
      (_, error) => {
        //console.log('error getAccounts');
        errorCallback(error);
      }
    );
  });
}

export function getSaldoEgresosCuenta(cuenta) {
  db.transaction((tx) => {
    tx.executeSql(
      "select sum(monto) from Egresos where cuenta_id = ? group by cuenta_id",
      [cuenta],
      (_, { rows }) => {
        console.log('Success getSaldoTarjetaEstePeriodo: ', rows._array);
        successCallback(rows._array);
      },
      (_, error) => {
        //console.log('error getAccounts');
        errorCallback(error);
      }
    );
  });
}

export function deleteCuenta(userId,nroCuenta) {
  console.log("deleteCuenta");
  console.log(userId,nroCuenta);
  db.transaction(
    (tx) => {
      tx.executeSql(
        "delete from Cuentas where user_id = ? and nro_cuenta = ?",
        [userId, nroCuenta]
      );
    },
    null,
    () => console.log("la cuenta se borró correctamente")
  );
}


//*******PRESUPUESTOS************

export function getPresupuestos(id_usuario,successCallback) {
  db.transaction((tx) => {
    tx.executeSql(
      "select * from Presupuestos where user_id = ?",
      [id_usuario],
      (_, { rows }) => {
        console.log('Success getpresupuesto: ', rows._array);
        successCallback(rows._array);
      },
      (_, error) => {
        //console.log('error getAccounts');
        errorCallback(error);
      }
    );
  });
}

export function getPresupuestoForRubro(rubro, successCallback) {
  db.transaction((tx) => {
    tx.executeSql(
      "select * from Presupuestos where rubro_id = " + rubro, 
      [],
      (_, { rows }) => {
        successCallback(rows._array);
      },
      (_, error) => {
        console.log(error);
      }
    )
  } )
}

export function getOtherPresupuestos(successCallback){
  db.transaction((tx) => {
    tx.executeSql(
      "select sum(monto_mensual) as monto_mensual from Presupuestos where rubro_id != 'General' and rubro_id != 'Servicios e Impuestos'" , 
      [],
      (_, { rows }) => {
        console.log(rows)
        successCallback(rows._array);
      },
      (_, error) => {
        console.log(error);
      }
    )
  } )
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

export function setPresupuesto(user_id, rubro, categoria, monto, descripcion){
  console.log(user_id,rubro, categoria, monto, descripcion);
  db.transaction( tx => {
    tx.executeSql("insert into Presupuestos (user_id, rubro_id, categoria_id, monto_mensual, descripcion) values (?, ?, ?, ?, ?)", [user_id, rubro, categoria, monto, descripcion],
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

export function deletePresupuesto(id){
  console.log("deletePresupuesto");
  db.transaction( tx => {
    tx.executeSql("delete from Presupuestos where id = ?", [id],
    (_, { rows})  => {
    console.log("El presupuesto ha sido borrado.")
    },
    (_, error) => {
      console.log("ERROR - La tabla no pudo ser insertada.  " + error); 
    })
  })
};

//*******TARJETAS************

  //*******CUENTAS************
  export function getTarjetas(id_usuario, successCallback) {
    db.transaction((tx) => {
      tx.executeSql(
        "select id, emisor, ultimos_4_digitos, fecha_vencimiento_tarjeta, fecha_cierre_resumen, fecha_vencimiento_resumen, saldo, cuenta_id from Tarjetas where user_id = ?",
        [id_usuario],
        (_, { rows }) => {
          console.log('Success getCuentas: ', rows._array);;;
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

export function updateFechasTarjeta(userID,ultimosDigitos, fechaCierre, fechaVencimientoResumen) {
  console.log("updateFechasTarjeta");
  console.log(userID,ultimosDigitos, fechaCierre, fechaVencimientoResumen);
  db.transaction(
    (tx) => {
      tx.executeSql(
        "update Tarjetas set fecha_cierre_resumen = ?, fecha_vencimiento_resumen = ? where user_id = ? and ultimos_4_digitos = ?",
        [fechaCierre, fechaVencimientoResumen, userID, ultimosDigitos],
      );
    },
    null,
    () => console.log("las fechas de la Tarjeta se actualizaron correctamente")
  );
}

export function updateSaldoTarjetaEgreso(userID, ultimosDigitos, montoEgreso) {
  console.log("updateSaldoTarjetaEgreso");
  console.log(ultimosDigitos, userID, montoEgreso);
  db.transaction(
    (tx) => {
      tx.executeSql(
        "update Tarjetas set saldo = saldo + ? where user_id = ? and ultimos_4_digitos = ?;",
        [montoEgreso, userID, ultimosDigitos]
      );
    },
    null,
    () => console.log("el saldo de la Tarjeta se incrementó correctamente")
  );
}

export function updateResetSaldoTarjeta(ultimosDigitos) {
  console.log("updateResetSaldoTarjeta");
  console.log(ultimosDigitos);
  db.transaction(
    (tx) => {
      tx.executeSql(
        "update Tarjetas set saldo = 0 where ultimos_4_digitos = ?",
        [ultimosDigitos],
      );
    },
    null,
    () => console.log("el saldo de la Tarjeta se ha actualizado a 0")
  );
}


export function deleteTarjeta(userId,ultimosDigitos) {
  console.log("deleteTarjeta");
  console.log(userId,ultimosDigitos);
  db.transaction(
    (tx) => {
      tx.executeSql(
        "delete from Tarjetas where user_id = ? and ultimos_4_digitos = ?",
        [userId,ultimosDigitos]
      );
    },
    null,
    () => console.log("la Tarjeta se borró correctamente")
  );
}

//*******INVERSIONES************

export function getInversiones(userID,successCallback) {
  db.transaction((tx) => {
    tx.executeSql(
      "select * from Inversiones where user_id = ?",
      [userID],
      (_, { rows }) => {
        console.log('Success getInversiones: ', rows._array);
        successCallback(rows._array);
      },
      (_, error) => {
        //console.log('error getAccounts');
        errorCallback(error);
      }
    );
  });
}

export function setInversion(tipo, user_id,fechaVencimiento, cuenta, compraMonto, ventaMonto, descripcion) {
  console.log("SetInversion");
  console.log(tipo,user_id, fechaVencimiento, cuenta, compraMonto, ventaMonto, descripcion);
  db.transaction(
    (tx) => {
      tx.executeSql(
        "insert into Inversiones (cuenta_id, user_id, tipo, fecha_vencimiento, compra_monto, venta_monto, descripcion, terminado) values (?, ?, ?, ?, ?, ?, ?, ?)",
        [cuenta, user_id, tipo, fechaVencimiento, compraMonto,ventaMonto, descripcion, 'false']
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

export function updateVentaMontoInversion(userId,descInversion, ventaMonto) {
  console.log("updateVentaMontoInversion");
  console.log(userId,descInversion, ventaMonto);
  db.transaction(
    (tx) => {
      tx.executeSql(
        "update Inversiones set venta_monto = ? where user_id = ? and descripcion = ?",
        [ventaMonto, userId, descInversion],
      );
    },
    null,
    () => console.log("la ventaMonto de inversion se ha actualizado")
  );
}

export function deleteInversion(userId,descInversion) {
  console.log("deleteInversion");
  db.transaction(
    (tx) => {
      tx.executeSql(
        "delete from Inversiones where user_id = ? and descripcion = ?",
        [userId,descInversion]
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
        console.log('Success getPrestamos: ', rows._array);
        successCallback(rows._array);
      },
      (_, error) => {
        //console.log('error getAccounts');
        errorCallback(error);
      }
    );
  });
}

export function setPrestamo(user_id, cuenta, tipo, terceroDescripcion, cuotasMonto, fechaVencimiento, cuotasRestantes, prestamoMonto, descripcion, tomado) {
  console.log("SetPrestamo");
  console.log(user_id, cuenta,tipo, terceroDescripcion, cuotasMonto, fechaVencimiento, cuotasRestantes, prestamoMonto, descripcion, tomado);
  db.transaction(
    (tx) => {
      tx.executeSql(
        "insert into Prestamos (user_id, cuenta_id, tipo, prestamo_a_tercero_descripcion, cuotas_monto, cuotas_fecha_proximo_vencimiento, cuotas_restantes, prestamo_monto, descripcion, tomado, terminado) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [user_id, cuenta, tipo, terceroDescripcion, cuotasMonto, fechaVencimiento, cuotasRestantes, prestamoMonto, descripcion, tomado, 0]
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



//SETS AUTOMATICOS


//ingresoInicialNuevaCuenta
        //AGREGAR insert into Ingreso (user_id, cuenta_id, rubro_id, categoria_id, monto, cuotas_fechas, id_externa, tabla_externa, descripcion, auto_manual, add_dttm) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        // [user_id, cuenta_id, null, null, ?=saldo, null, cuenta_id, 'Cuentas', 'Saldo Inicial de Cuenta', 'auto', sysdate]

//ingresoCuotaPrestamoOtorgado

//ingresoMontoPrestamoTomado

//ingresoVentaInversion

//ingresoCuotaIngresoPeriodico




export function getEgresosTarjeta(tarjeta) {
  db.transaction((tx) => {
    tx.executeSql(
      "select * from Egresos where tarjeta_id = ?",
      [tarjeta],
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
//31012020
export function getEgresosTarjetaEstePeriodo(tarjeta, fechaCierre) {
  db.transaction((tx) => {
    tx.executeSql(
      "select * from Egresos where tarjeta_id = ? and add_dttm between ? and ? ",
      [tarjeta, DATE(DATE(substr(fechaCierre,5,8)||substr(fechaCierre,3,4)||substr(fechaCierre,1,2)),'-1 month'), DATE(substr(fechaCierre,5,8)||substr(fechaCierre,3,4)||substr(fechaCierre,1,2))],
      (_, { rows }) => {
        console.log('Success getEgresosTarjetaEstePeriodo: ', rows._array);
        successCallback(rows._array);
      },
      (_, error) => {
        //console.log('error getAccounts');
        errorCallback(error);
      }
    );
  });
}

export function getSaldoTarjetaEstePeriodo(tarjeta) {
  db.transaction((tx) => {
    tx.executeSql(
      "select sum(monto) from Egresos where tarjeta_id = ? and substr(add_dttm, 6, 7) = substr(date('now'), 6, 7) group by tarjeta_id",
      [tarjeta],
      (_, { rows }) => {
        console.log('Success getSaldoTarjetaEstePeriodo: ', rows._array);
        successCallback(rows._array);
      },
      (_, error) => {
        //console.log('error getAccounts');
        errorCallback(error);
      }
    );
  });
}

export function getEgresosCuentaFecha(cuenta, fechaDesde, fechaHasta) {
  db.transaction((tx) => {
    tx.executeSql(
      "select * from Egresos where cuenta_id = ? and add_dttm between ? and ?",
      [cuenta, fechaDesde, fechaHasta],
      (_, { rows }) => {
        console.log('Success getEgresosCuentaFecha: ', rows._array);
        successCallback(rows._array);
      },
      (_, error) => {
        //console.log('error getAccounts');
        errorCallback(error);
      }
    );
  });
}



//graficos
export function getDisponiblesGroupedByCuenta(successCallback) {
  db.transaction((tx) => {
    tx.executeSql(
      "select saldo, alias from Cuentas",
      [],
      (_, { rows }) => {
        var results = rows._array;
        let cuentas = []
        let saldos = []
        for(let i = 0; i < results.length; i++ ){
          cuentas.push(results[i].alias);
          saldos.push(results[i].saldo);
        }
        
        successCallback(cuentas, saldos);
      },
      (_, error) => {
        //console.log('error getAccounts');
        console.log(error);
      }
    );
  });
}

//SETS AUTOMATICOS

//egresoCompraInversion

//egresoCuotaPrestamoTomado

//egresoMontoPrestamoOtorgado

//egresoCuotaEgresoPeriodico



//*******NOTIFICACIONES************

//Vencimiento Tarjeta


//Vencimiento Cuota Prestamo


//Vencimiento Cuota Inversion


//Vencimiento Cuota Egreso