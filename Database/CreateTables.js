import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabase("db2.db");

var createUsuarios =
  "CREATE TABLE IF NOT EXISTS " +
  " Usuarios " +
  " ( " +
  "id" +
  " INTEGER PRIMARY KEY," +
  "email" +
  " VARCHAR(128) NOT NULL," +
  "nombre" +
  " VARCHAR(128) NULL," +
  "apellido" +
  " VARCHAR(128) NULL," +
  "password" +
  " VARCHAR(256) NOT NULL," +
  "idExt" +
  " VARCHAR(256)" +
  ")";

var createRubros =
  "CREATE TABLE IF NOT EXISTS " +
  " Rubros " +
  " ( " +
  "id" +
  " INTEGER PRIMARY KEY," +
  "descripcion" +
  " VARCHAR(128) NULL" +
  ")";

var createCategorias =
  "CREATE TABLE IF NOT EXISTS " +
  " Categorias " +
  " ( " +
  "id" +
  " INTEGER PRIMARY KEY," +
  "descripcion" +
  " VARCHAR(128) NULL" +
  ")";

var createEntidades =
  "CREATE TABLE IF NOT EXISTS " +
  " Entidades " +
  " ( " +
  "id" +
  " INTEGER PRIMARY KEY," +
  "descripcion" +
  " VARCHAR(128) NULL" +
  ")";

var createCuentas =
  "CREATE TABLE IF NOT EXISTS " +
  " Cuentas " +
  " ( " +
  "id" +
  " INTEGER PRIMARY KEY," +
  "cbu" +
  " INTEGER," +
  "user_id" +
  " VARCHAR(45)," +
  "nro_cuenta" +
  " INTEGER," +
  "entidad_id" +
  " VARCHAR(60)," +
  "moneda" +
  " VARCHAR(45)," +
  "alias" +
  " VARCHAR(60)," +
  "saldo_dttm" +
  " DATETIME NULL," +
  "descripción" +
  " VARCHAR(80) NULL," +
  "saldo" +
  " NUMERIC(10, 2) NULL" +
  ")";

var createTarjetas =
  "CREATE TABLE IF NOT EXISTS " +
  " Tarjetas " +
  " ( " +
  "id" +
  " INTEGER PRIMARY KEY," +
  "user_id" +
  " VARCHAR(45)," +
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
  "saldo" +
  " NUMERIC(10, 2) DEFAULT 0 NULL" +
  ")";

var createPrestamos =
  "CREATE TABLE IF NOT EXISTS " +
  " Prestamos " +
  " ( " +
  "id" +
  " INTEGER PRIMARY KEY," +
  "user_id" +
  " VARCHAR(45)," +
  "cuenta_id" +
  " INT NULL," +
  "tipo" +
  " INT NULL," +
  "prestamo_a_tercero_descripcion" +
  " VARCHAR(128) NULL," +
  "cuotas_monto" +
  " DECIMAL NULL," +
  "cuotas_fecha_proximo_vencimiento" +
  " VARCHAR(60) NULL," +
  "cuotas_restantes" +
  " INT NULL," +
  "prestamo_monto" +
  " DECIMAL NULL," +
  "descripcion" +
  " VARCHAR(128) NULL," +
  "tomado" +
  " TINYINT NULL," +
  "terminado" +
  " TINYINT NULL" +
  ")";

var createPresupuestos =
  "CREATE TABLE IF NOT EXISTS " +
  " Presupuestos " +
  " ( " +
  "id" +
  " INTEGER PRIMARY KEY," +
  "user_id" +
  " VARCHAR(45)," +
  "rubro_id" +
  " INT NULL," +
  "categoria_id" +
  " INT NULL," +
  "monto_mensual" +
  " VARCHAR(45) NULL," +
  "descripcion" +
  " VARCHAR(128) NULL" +
  ")";

var createInversiones =
  "CREATE TABLE IF NOT EXISTS " +
  " Inversiones " +
  " ( " +
  "id" +
  " INTEGER PRIMARY KEY," +
  "cuenta_id" +
  " INT NULL," +
  "user_id" +
  " VARCHAR(45)," +
  "tipo" +
  " VARCHAR(45) NULL," +
  "fecha_vencimiento" +
  " DATETIME NULL," +
  "compra_monto" +
  " DECIMAL NULL," +
  "venta_monto" +
  " DECIMAL NULL," +
  "descripcion" +
  " VARCHAR(128) NULL," +
  "terminado" +
  " TINYINT NULL" +
  ")";

var createIngresos =
  "CREATE TABLE IF NOT EXISTS " +
  " Ingresos " +
  " ( " +
  "id" + " INTEGER PRIMARY KEY," +
  "user_id" + " VARCHAR(45) NULL," +
  "cuenta_id" +  " VARCHAR(96)  NULL," +
  "tipo_ingreso" +  " VARCHAR(96)  NULL," +
  "cuotas_restantes" +   " INT NULL, " +
  "monto" +  " DECIMAL NULL," +
  "cuotas_fechas" +  " INT NULL," +
  "id_externa" +   " INT NULL," +
  "tabla_externa" +  " VARCHAR(45) NULL," +
  "descripcion" +  " VARCHAR(128) NULL," +
  "auto_manual" +   " VARCHAR(45) NULL," +
  "add_dttm" +  " DATETIME NULL" +
  ")";

var createEgresos =
  "CREATE TABLE IF NOT EXISTS " +
  " Egresos " +
  " ( " +
  "id" +
  " INTEGER PRIMARY KEY," +
  "user_id" +
  " VARCHAR(45) NULL," +
  "cuenta_id" +
  " VARCHAR(96)  NULL," +
  "rubro_id" +
  " VARCHAR(96) NULL," +
  "categoria_id" +
  " VARCHAR(96) NULL," +
  "tarjeta_id" +
  " VARCHAR(96) NULL," +
  "medio_de_pago" +
  " VARCHAR(96) NULL," +
  "monto" +
  " DECIMAL NULL," +
  "cuotas_fechas" +
  " INT NULL," +
  "cuotas_restantes" +
  " INT NULL," +
  "id_externa" +
  " INT NULL," +
  "tabla_externa" +
  " VARCHAR(45) NULL," +
  "descripcion" +
  " VARCHAR(128) NULL," +
  "auto_manual" +
  " VARCHAR(45) NULL," +
  "add_dttm" +
  " DATETIME NULL," +
  "foto_comprobante" +
  " BLOB NULL" +
  ")";

var createNotificaciones =
  "CREATE TABLE IF NOT EXISTS " +
  " Notificaciones " +
  " ( " +
  "id" +
  " INTEGER PRIMARY KEY," +
  "id_externa" +
  " INT NOT NULL," +
  "tabla_externa" +
  " VARCHAR(45) NULL," +
  "user_id" +
  " VARCHAR(45) NULL," +
  "notificado_dttm" +
  " DATETIME NULL" +
  ")";

function createTable(query) {
  db.transaction((tx) => {
    tx.executeSql(
      query,
      null,
      (_, { rows }) => {
        //console.log("Se creó la tabla correctamente." + query);
      },
      (_, error) => {
        console.log("ERROR - La tabla no pudo ser creada.  " + error);
      }
    );
  });
}

export function createAll() {
  //
  const arrayCreates = [
    createIngresos,
    createEgresos,
    createUsuarios,
    createEntidades,
    createCuentas,
    createTarjetas,
    createPrestamos,    
    createCategorias,
    createPresupuestos,
    createInversiones,
    createNotificaciones,
  ];

  arrayCreates.forEach((unaQuery) => setTimeout(() => {
    createTable(unaQuery);
  }, 500) 
  
  );
  
}

//DROPS

var dropUsuarios = "DROP TABLE Usuarios;";

var dropEntidades = "DROP TABLE Entidades;";

var dropCuentas = "DROP TABLE Cuentas;";

var dropTarjetas = "DROP TABLE Tarjetas;";

var dropPrestamos = "DROP TABLE Prestamos;";

var dropCategorias = "DROP TABLE Categorias;";

var dropPresupuestos = "DROP TABLE Presupuestos;";

var dropInversiones = "DROP TABLE Inversiones;";

var dropIngresos = "DROP TABLE Ingresos;";

var dropEgresos = "DROP TABLE Egresos;";

var dropNotificaciones = "DROP TABLE Notificaciones;";

function dropTable(query) {
  db.transaction((tx) => {
    tx.executeSql(
      query,
      null,
      (_, { rows }) => {
//        console.log("Se dropeó la tabla correctamente.");
      },
      (_, error) => {
        console.log("ERROR - La tabla no pudo ser dropeada.  " + error);
      }
    );
  });
}

export function dropAll() {
  const arrayDrop = [
    dropUsuarios,
    dropEntidades,
    dropCuentas,
    dropTarjetas,
    dropPrestamos,
    dropCategorias,
    dropPresupuestos,
    dropInversiones,
    dropIngresos,
    dropEgresos,
    dropNotificaciones,
  ];

// arrayDrop.forEach((unaQuery) => setTimeout(() => {
//     dropTable(unaQuery);
//   }, 500));
  //dropTable(dropCuentas);
  
  createAll();

  //Crear solamente una
  //dropTable(dropCuentas)
  //createTable(createEgresos);

}


/*export async function deleteAllFrom(table) {
try{
  db.transaction(
    (tx) => {
      tx.executeSql(
        "DELETE FROM " + table,
        []
      );
    },
    null,
    () => {console.log("se vació la tabla " + table);
            return true;}       
    
    );
  }catch{ 

    console.log("Error en deleteAllFrom - tabla " + table);
    return false;

  }
};*/



/*export async function deleteAllFrom(table) {
  const result = await callDeleteAllFrom(table);
  console.log(result);
}*/

export function deleteAllFrom(table) {
  return callDeleteAllFrom(table);
}


async function callDeleteAllFrom(table) {
  return new Promise(function(resolve, reject) {
    db.transaction(
      (tx) => {
        tx.executeSql(
          "DELETE FROM " + table,
          []
        );
      },
      null,
      () => {console.log("se vació la tabla " + table);
        resolve(true)}       
      
      );
  });
};


