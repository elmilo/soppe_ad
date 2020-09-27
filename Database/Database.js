import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase("db.db");  

export function getAccounts (successCallback){
        db.transaction( tx => {
            tx.executeSql("select * from accounts", [], 
            (_, { rows})  => {
            //console.log('Success getAccounts: ', rows._array);
              successCallback (rows._array);
            },
            (_, error) => {
                //console.log('error getAccounts');
              errorCallback(error); 
            })
          })
        };
    