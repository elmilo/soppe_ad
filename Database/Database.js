import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase("db.db");  

export function getCuentas (successCallback){
        db.transaction( tx => {
            tx.executeSql("select * from Cuentas", [], 
            (_, { rows})  => {
           // console.log('Success getCuentas: ', rows._array);
              successCallback (rows._array);
            },
            (_, error) => {
                //console.log('error getAccounts');
              errorCallback(error); 
            })
          })
        };
    
        export function get2Cuentas (){
          db.transaction( tx => {
              tx.executeSql("select * from Cuentas", [], 
              (_, { rows})  => {
             console.log('Success get2Cuentas: ', rows._array);

              },
              (_, error) => {
                  //console.log('error getAccounts');

              })
            })
          };
      
       

export function setCuentaUnica (cbu, entity, currency, accNumber, alias, saldo){
  console.log('SetCuentaUnica');
  console.log(cbu, entity, currency, accNumber, alias, saldo);
  //[cbu, 1, entity, currency, accNumber, alias, saldo]
  db.transaction(
    tx => {
      tx.executeSql(
        "insert into Cuentas (cbu, user_id, entidad_id, moneda, nro_cuenta, alias, saldo) values (?, ?, ?, ?, ?, ?, ?)", ['1231', 1, 'entity', 'currency', '2356456', 'alias', '38.2']
      );
    },
    null,
    null
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
};

