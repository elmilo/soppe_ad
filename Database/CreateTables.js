/*import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase("db.db");  

const arrayCreates = [
    {"CREATE TABLE IF NOT EXISTS `mydb`.`Cuentas` (
        `id` INT NOT NULL,
        `cbu` INT NULL,
        `user_id` INT NULL,
        `entidad_id` INT NULL,
        `moneda` VARCHAR(45) NULL,
        `alias` VARCHAR(60) NULL,
        `saldo_dttm` DATETIME NULL,
        `descripción` VARCHAR(80) NULL,
        `saldo` DECIMAL NULL,
        PRIMARY KEY (`id`),
        INDEX `fk_user_id_idx` (`user_id` ASC) VISIBLE,
        INDEX `fk_entidad_idx` (`entidad_id` ASC) VISIBLE,
        CONSTRAINT `fk_user_id`
          FOREIGN KEY (`user_id`)
          REFERENCES `mydb`.`Usuarios` (`id`)
          ON DELETE NO ACTION
          ON UPDATE NO ACTION,
        CONSTRAINT `fk_entidad`
          FOREIGN KEY (`entidad_id`)
          REFERENCES `mydb`.`Entidades` (`id`)
          ON DELETE NO ACTION
          ON UPDATE NO ACTION)"}
]

export function createsTables ()
arrayCreates.forEach(
    crea
)

function createTable (query){
        db.transaction( tx => {
            tx.executeSql(query, [], 
            (_, { rows})  => {
            //console.log('Success getAccounts: ', rows._array);
              successCallback (rows._array);
            },
            (_, error) => {
                //console.log('error getAccounts');
              errorCallback(error); 
            })
          })
        };*/