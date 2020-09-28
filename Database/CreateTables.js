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

    
var createEntidades =
    "CREATE TABLE IF NOT EXISTS "
    + " Entidades "
    + " ( "
    + "id" 			      + " INTEGER PRIMARY KEY,"
    + "descripcion" 	+ " VARCHAR(128) NULL"
    + ")";
    
var createCuentas =
    "CREATE TABLE IF NOT EXISTS "
    + " Cuentas " 
    + " ( " 
    + "id"            + " INTEGER PRIMARY KEY,"
    + "cbu"           + " INTEGER,"
    + "user_id"       + " INTEGER,"
    + "nro_cuenta"    + " INTEGER,"
    + "entidad_id"    + " VARCHAR(60),"
    + "moneda"        + " VARCHAR(45),"
    + "alias"         + " VARCHAR(60)," 
    + "saldo_dttm"    + " DATETIME NULL," 
    + "descripción"   + " VARCHAR(80) NULL," 
    + "saldo"         + " NUMERIC(10, 2) NULL" 
    + ")";

var createTarjetas =
    "CREATE TABLE IF NOT EXISTS "
    + " Tarjetas "
    + " ( "
    + "id" 						            + " INT NOT NULL,"
    + "user_id" 					        + " INT NOT NULL,"
    + "cuenta_id" 				        + " INT NULL,"
    + "ultimos_4_digitos" 	    	+ " INT NULL,"
    + "emisor" 				           	+ " VARCHAR(45) NULL,"
    + "tipo" 						          + " VARCHAR(45) NULL,"
    + "fecha_vencimiento_tarjeta" + " DATETIME NULL,"
    + "fecha_cierre_resumen" 		  + " DATETIME NULL,"
    + "fecha_vencimiento_resumen" + " DATETIME NULL"
    + ")";

var createPrestamos =
    "CREATE TABLE IF NOT EXISTS "
    + " Prestamos "
    + " ( "
    + "id" 								          	    + " INT NOT NULL,"
    + "user_id" 							          	+ " INT NULL,"
    + "cuenta_id"							      	    + " INT NULL,"
    + "tipo" 								        	    + " INT NULL,"
    + "prestamo_a_tercero_descripcion"    + " VARCHAR(128) NULL,"
    + "cuotas_monto" 							        + " DECIMAL NULL,"
    + "cuotas_fecha_proximo_vencimiento"  + " DATETIME NULL,"
    + "cuotas_restantes" 					    	  + " INT NULL,"
    + "prestamo_monto" 					       	  + " DECIMAL NULL,"
    + "descripcion" 						        	+ " VARCHAR(128) NULL,"
    + "tomado" 							            	+ " TINYINT NULL,"
    + "terminado" 							         	+ " TINYINT NULL"
    + ")";

var createRubros =
    "CREATE TABLE IF NOT EXISTS "
    + " Rubros "
    + " ( "
    + "id" 			      + " INT NOT NULL,"
    + "descripcion" 	+ " VARCHAR(128) NULL"
    + ")";

var createCategorias =
    "CREATE TABLE IF NOT EXISTS "
    + " Categorias "
    + " ( "
    + "id" 			      + " INT NOT NULL,"
    + "descripcion" 	+ " VARCHAR(128) NULL"
    + ")";

var createPresupuestos =
    "CREATE TABLE IF NOT EXISTS "
    + " Presupuestos "
    + " ( "
    + "id" 		    	  + " INT NOT NULL,"
    + "user_id" 		  + " INT NULL,"
    + "rubro_id"		  + " INT NULL,"
    + "categoria_id" 	+ " INT NULL,"
    + "monto_mensual"	+ " VARCHAR(45) NULL"
    + "descripcion" 	+ " VARCHAR(128) NULL"
    + ")";

var createInversiones =
    "CREATE TABLE IF NOT EXISTS "
    + " Inversiones "
    + " ( "
    + "id" 				        + " INT NOT NULL,"
    + "cuenta_id" 		    + " INT NULL,"
    + "user_id" 			    + " INT NULL,"
    + "tipo" 				      + " VARCHAR(45) NULL,"
    + "fecha_vencimiento" + " DATETIME NULL,"
    + "compra_monto"		  + " DECIMAL NULL,"
    + "venta_monto"		    + " DECIMAL NULL,"
    + "descripcion" 	  	+ " VARCHAR(128) NULL,"
    + "terminado"			    + " TINYINT NULL"
    + ")";

var createIngresos =
    "CREATE TABLE IF NOT EXISTS "
    + " Ingresos "
    + " ( "
    + "id" 		    	  + " INT NOT NULL,"
    + "user_id" 		  + " INT NULL,"
    + "cuenta_id" 	  + " INT NULL,"
    + "rubro_id" 		  + " INT NULL,"
    + "categoria_id" 	+ " INT NULL,"
    + "monto" 	    	+ " DECIMAL NULL,"
    + "cuotas_fechas" + " INT NULL,"
    + "id_externa" 	  + " INT NULL,"
    + "tabla_externa" + " VARCHAR(45) NULL,"
    + "descripcion" 	+ " VARCHAR(128) NULL,"
    + "auto_manual" 	+ " VARCHAR(45) NULL,"
    + "add_dttm" 		  + " DATETIME NULL"
    + ")";

var createEgresos =
    "CREATE TABLE IF NOT EXISTS "
    + " Egresos "
    + " ( "
    + "id" 					      + " INT NOT NULL,"
    + "user_id" 		  	  + " INT NULL,"
    + "cuenta_id" 			  + " INT NULL,"
    + "rubro_id" 		  	  + " INT NULL,"
    + "categoria_id" 	  	+ " INT NULL,"
    + "medio_de_pago" 	  + " VARCHAR(45) NULL,"
    + "monto" 				    + " DECIMAL NULL,"
    + "cuotas_fechas" 	  + " INT NULL,"
    + "cuotas_restantes"	+ " INT NULL,"
    + "id_externa" 			  + " INT NULL,"
    + "tabla_externa" 		+ " VARCHAR(45) NULL,"
    + "descripcion" 		  + " VARCHAR(128) NULL,"
    + "auto_manual" 	  	+ " VARCHAR(45) NULL,"
    + "add_dttm" 		    	+ " DATETIME NULL"
    + ")";

var createNotificaciones =
    "CREATE TABLE IF NOT EXISTS "
    + " Notificaciones "
    + " ( "
    + "id_externa" 		    + " INT NOT NULL,"
    + "tabla_externa" 		+ " VARCHAR(45) NULL,"
    + "user_id" 			    + " INT NULL,"
    + "notificado_dttm"	  + " DATETIME NULL"
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
  createTable(createUsuarios);
  createTable(createEntidades);
  createTable(createCuentas);
  createTable(createTarjetas);
  createTable(createPrestamos);
  createTable(createRubros);
  createTable(createCategorias);
  createTable(createPresupuestos);
  createTable(createInversiones);
  createTable(createIngresos);
  createTable(createEgresos);
  createTable(createNotificaciones);
  //12 tablas
};

//DROPS

var dropUsuarios = 
"DROP TABLE Usuarios;";

var dropEntidades = 
"DROP TABLE Entidades;";

var dropCuentas = 
"DROP TABLE Cuentas;";

var dropTarjetas = 
"DROP TABLE Tarjetas;";

var dropPrestamos = 
"DROP TABLE Prestamos;";

var dropRubros = 
"DROP TABLE Rubros;";

var dropCategorias = 
"DROP TABLE Categorias;";

var dropPresupuestos = 
"DROP TABLE Presupuestos;";

var dropInversiones = 
"DROP TABLE Inversiones;";

var dropIngresos = 
"DROP TABLE Ingresos;";

var dropEgresos = 
"DROP TABLE Egresos;";

var dropNotificaciones = 
"DROP TABLE Notificaciones;";


function dropTable(query){
  db.transaction( tx => {
    tx.executeSql(query, null,
    (_, { rows})  => {
    console.log("Se dropeó la tabla correctamente.")
    },
    (_, error) => {
      console.log("ERROR - La tabla no pudo ser dropeada.  " + error); 
    })
  })
};


export function dropAll() {
  dropTable(dropUsuarios);
  dropTable(dropEntidades);
  dropTable(dropCuentas);
  dropTable(dropTarjetas);
  dropTable(dropPrestamos);
  dropTable(dropRubros);
  dropTable(dropCategorias);
  dropTable(dropPresupuestos);
  dropTable(dropInversiones);
  dropTable(dropIngresos);
  dropTable(dropEgresos);
  dropTable(dropNotificaciones);
  //12 tablas
};