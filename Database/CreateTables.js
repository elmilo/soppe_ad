import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase("db.db");  


var createUsuarios =
    "CREATE TABLE IF NOT EXISTS "
    + " Usuarios " 
    + " ( " 
    + "id"        + " INTEGER PRIMARY KEY,"
    + "email"     + " VARCHAR(128) NOT NULL,"
    + "nombre"    + " VARCHAR(128) NULL,"
    + "apellido"  + " VARCHAR(128) NULL,"
    + "password"  + " VARCHAR(256) NOT NULL" 
    + ")";

    
var createCuentas =
    "CREATE TABLE IF NOT EXISTS "
    + " Cuentas " 
    + " ( " 
    + "id"            + " INTEGER PRIMARY KEY,"
    + "cbu"           + " INTEGER,"
    + "entidad_id"    + " INTEGER,"
    + "moneda"        + " VARCHAR(45),"
    + "alias"         + " VARCHAR(60)," 
    + "saldo_dttm"    + " DATETIME NULL," 
    + "descripción"   + " VARCHAR(80) NULL," 
    + "saldo"         + " NUMERIC(10, 2) NULL" 
    + ")";
       
    


function createTable(query){
  db.transaction( tx => {
    tx.executeSql(query, null,
    (_, { rows})  => {
    console.log("Se creó la tabla correctamente.")
    },
    (_, error) => {
      console.log("ERROR - La tabla no pudo ser creada.  " + error); 
    })
  })
};

export function createAll() {
  createTable(createCuentas);
  createTable(createUsuarios);
};

