let mysql = require("mysql2");


let conexion = mysql.createConnection({  
host: "localhost",
database:"holamundo",
user:"root",
password:"1234",
});

conexion.connect(function(err){
    if(err){
        throw err;
    }else{
        console.log("conexion exitosa");
    }   
});