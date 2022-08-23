import SQLite from 'react-native-sqlite-storage';
import * as configs from '../constants/configs';
SQLite.DEBUG(configs.dbDebug);
SQLite.enablePromise(true);

var db;

function errorCB(err) {
    console.log("error: ",err);
    
}

export function getLagu(callback)
{
    SQLite.openDatabase({name : 'humnos.sqlite', createFromLocation : '~db/humnos.sqlite'}).then((DB) => {
        db = DB;
        var lagu = [];

        DB.executeSql('SELECT * FROM lagu').then((results) => {
            var len = results[0].rows.length;

            if( len > 0 ) {            	
            
                for (let i = 0; i < len; i++) {
                    
                    let row = results[0].rows.item(i);
                    
                    lagu.push(row);
                }

            }

            DB.close();
            callback(lagu);
            
        }, (reject) => {
        }).catch((error) => {
            errorCB(error);
        });
        
    }).catch((error) => {
        errorCB(error);
    });
}