import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase("db.db");  

const dataMaestros = [
"INSERT INTO Rubros (descripcion) VALUES ('Comida');",
"INSERT INTO Rubros (descripcion) VALUES ('Deportes');",
"INSERT INTO Rubros (descripcion) VALUES ('Entretenimiento');",
"INSERT INTO Rubros (descripcion) VALUES ('Educación');",
"INSERT INTO Rubros (descripcion) VALUES ('Salidas');",
"INSERT INTO Rubros (descripcion) VALUES ('Servicios e Impuestos');",
"INSERT INTO Rubros (descripcion) VALUES ('Viáticos');",
"INSERT INTO Rubros (descripcion) VALUES ('Varios');",
"INSERT INTO Categorias (descripcion) VALUES( 'AFIP');",
"INSERT INTO Categorias (descripcion) VALUES( 'Agua');",
"INSERT INTO Categorias (descripcion) VALUES( 'Barrio Privado');",
"INSERT INTO Categorias (descripcion) VALUES( 'Clubes y Asociaciones');",
"INSERT INTO Categorias (descripcion) VALUES( 'Compras');",
"INSERT INTO Categorias (descripcion) VALUES( 'Consorcio');",
"INSERT INTO Categorias (descripcion) VALUES( 'Cooperativa');",
"INSERT INTO Categorias (descripcion) VALUES( 'Donaciones');",
"INSERT INTO Categorias (descripcion) VALUES( 'Electricidad');",
"INSERT INTO Categorias (descripcion) VALUES( 'Emergencias Medicas');",
"INSERT INTO Categorias (descripcion) VALUES( 'Establecimientos Educativo');",
"INSERT INTO Categorias (descripcion) VALUES( 'Gas');",
"INSERT INTO Categorias (descripcion) VALUES( 'Impuesto Municipal');",
"INSERT INTO Categorias (descripcion) VALUES( 'Impuesto Provincial');",
"INSERT INTO Categorias (descripcion) VALUES( 'Medicina Prepaga');",
"INSERT INTO Categorias (descripcion) VALUES( 'Operadores de Tv');",
"INSERT INTO Categorias (descripcion) VALUES( 'Patente');",
"INSERT INTO Categorias (descripcion) VALUES( 'Planes de Ahorro');",
"INSERT INTO Categorias (descripcion) VALUES( 'Préstamo');",
"INSERT INTO Categorias (descripcion) VALUES( 'Proveedores de Internet');",
"INSERT INTO Categorias (descripcion) VALUES( 'Recargas');",
"INSERT INTO Categorias (descripcion) VALUES( 'Seguridad');",
"INSERT INTO Categorias (descripcion) VALUES( 'Seguros');",
"INSERT INTO Categorias (descripcion) VALUES( 'Seguros de retiro');",
"INSERT INTO Categorias (descripcion) VALUES( 'Seguros de vida');",
"INSERT INTO Categorias (descripcion) VALUES( 'Servicios Web');",
"INSERT INTO Categorias (descripcion) VALUES( 'Tarjetas de crédito');",
"INSERT INTO Categorias (descripcion) VALUES( 'Telefonía');",
"INSERT INTO Categorias (descripcion) VALUES( 'Viajes y turismo');",
"INSERT INTO Categorias (descripcion) VALUES( 'Registro Nacional');",
"INSERT INTO Categorias (descripcion) VALUES( 'Otro');",
"INSERT INTO Entidades (descripcion) VALUES( 'BANCO BBVA');",
"INSERT INTO Entidades (descripcion) VALUES( 'BANCO BICA ');",
"INSERT INTO Entidades (descripcion) VALUES( 'BANCO COINAG ');",
"INSERT INTO Entidades (descripcion) VALUES( 'BANCO COLUMBIA ');",
"INSERT INTO Entidades (descripcion) VALUES( 'BANCO COMAFI SOCIEDAD ANONIMA');",
"INSERT INTO Entidades (descripcion) VALUES( 'BANCO DE COMERCIO ');",
"INSERT INTO Entidades (descripcion) VALUES( 'BANCO DE CORRIENTES ');",
"INSERT INTO Entidades (descripcion) VALUES( 'BANCO DE GALICIA');",
"INSERT INTO Entidades (descripcion) VALUES( 'BANCO DE LA CIUDAD DE BUENOS AIRES');",
"INSERT INTO Entidades (descripcion) VALUES( 'BANCO DE LA NACION ARGENTINA');",
"INSERT INTO Entidades (descripcion) VALUES( 'BANCO DE LA PAMPA ');",
"INSERT INTO Entidades (descripcion) VALUES( 'BANCO DE LA PROVINCIA DE BUENOS AIRES');",
"INSERT INTO Entidades (descripcion) VALUES( 'BANCO DE LA PROVINCIA DE CORDOBA ');",
"INSERT INTO Entidades (descripcion) VALUES( 'BANCO DE LA REPUBLICA ORIENTAL DEL URUGU');",
"INSERT INTO Entidades (descripcion) VALUES( 'BANCO DE SAN JUAN ');",
"INSERT INTO Entidades (descripcion) VALUES( 'BANCO DE SANTA CRUZ ');",
"INSERT INTO Entidades (descripcion) VALUES( 'BANCO DE SANTIAGO DEL ESTERO ');",
"INSERT INTO Entidades (descripcion) VALUES( 'BANCO DE SERVICIOS FINANCIEROS ');",
"INSERT INTO Entidades (descripcion) VALUES( 'BANCO DE SERVICIOS Y TRANSACCIONES ');",
"INSERT INTO Entidades (descripcion) VALUES( 'BANCO DEL SOL ');",
"INSERT INTO Entidades (descripcion) VALUES( 'BANCO HIPOTECARIO ');",
"INSERT INTO Entidades (descripcion) VALUES( 'BANCO INTERFINANZAS ');",
"INSERT INTO Entidades (descripcion) VALUES( 'BANCO ITAU ARGENTINA ');",
"INSERT INTO Entidades (descripcion) VALUES( 'BANCO JULIO SOCIEDAD ANONIMA');",
"INSERT INTO Entidades (descripcion) VALUES( 'BANCO MACRO ');",
"INSERT INTO Entidades (descripcion) VALUES( 'BANCO MARIVA ');",
"INSERT INTO Entidades (descripcion) VALUES( 'BANCO MASVENTAS ');",
"INSERT INTO Entidades (descripcion) VALUES( 'BANCO MERIDIAN ');",
"INSERT INTO Entidades (descripcion) VALUES( 'BANCO PATAGONIA ');",
"INSERT INTO Entidades (descripcion) VALUES( 'BANCO PIANO ');",
"INSERT INTO Entidades (descripcion) VALUES( 'BANCO PROVINCIA DE TIERRA DEL FUEGO');",
"INSERT INTO Entidades (descripcion) VALUES( 'BANCO PROVINCIA DEL NEUQUÉN');",
"INSERT INTO Entidades (descripcion) VALUES( 'BANCO RIOJA SOCIEDAD ANONIMA UNIPERSONAL');",
"INSERT INTO Entidades (descripcion) VALUES( 'BANCO ROELA ');",
"INSERT INTO Entidades (descripcion) VALUES( 'BANCO SAENZ ');",
"INSERT INTO Entidades (descripcion) VALUES( 'BANCO SANTANDER RIO ');",
"INSERT INTO Entidades (descripcion) VALUES( 'BANCO SUCREDITO REGIONAL U.');",
"INSERT INTO Entidades (descripcion) VALUES( 'BANCO SUPERVIELLE ');",
"INSERT INTO Entidades (descripcion) VALUES( 'BANCO VOII ');",
"INSERT INTO Entidades (descripcion) VALUES( 'BANK OF AMERICA');",
"INSERT INTO Entidades (descripcion) VALUES( 'BNP PARIBAS');",
"INSERT INTO Entidades (descripcion) VALUES( 'CITIBANK');",
"INSERT INTO Entidades (descripcion) VALUES( 'COMPAÑIA FINANCIERA ARGENTINA ');",
"INSERT INTO Entidades (descripcion) VALUES( 'CORDIAL COMPAÑÍA FINANCIERA ');",
"INSERT INTO Entidades (descripcion) VALUES( 'CREDITO REGIONAL COMPAÑIA FINANCIERA S.A');",
"INSERT INTO Entidades (descripcion) VALUES( 'FCA COMPAÑIA FINANCIERA');",
"INSERT INTO Entidades (descripcion) VALUES( 'HSBC BANK ARGENTINA ');",
"INSERT INTO Entidades (descripcion) VALUES( 'INDUSTRIAL AND COMMERCIAL BANK OF CHINA');",
"INSERT INTO Entidades (descripcion) VALUES( 'JPMORGAN CHASE BANK');",
"INSERT INTO Entidades (descripcion) VALUES( 'WILOBANK');",
"INSERT INTO Entidades (descripcion) VALUES( 'Otro');"
];



function runQuery(query){
    db.transaction( tx => {
      tx.executeSql(query, null,
      (_, { rows})  => {
      //console.log("Se ejecutó ok la query" + rows);
      },
      (_, error) => {
        console.log("ERROR - en la query " + error); 
      })
    })
  };


export function insertMaestros() {
    dataMaestros.forEach(unaFila => 
           runQuery(unaFila)       
      );
}