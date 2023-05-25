//export express
const express  = require("express");
const app = express();

//export file system
const fs = require("fs");

//export path to access local storage
const path = require("path");

//__dirname gives root directory ,To access folder inside the root directory "join" keyword is used 
const dirName = path.join(__dirname,"timestamp");


app.get("/date-time",(req,res)=>{
    //this date variable returns date as epoch;
    let date = new Date();

    //Convert epoch to date
    let convertdate = date.toUTCString();

    let content  = `The Current time stamp is ${convertdate}`;

    //Creating a File name with the converted date,convert date returns time with semicolon ,semicolon is replaced by dash to make it global use (/"Text to be replaced with"/g)
    let file_name = convertdate.replace(/:/g,"-").slice(5,-4).split(" ").join("");

    //To create a file in the root directory
    fs.writeFile(`${dirName}/${file_name}.txt`,content,(err)=>{
        if(err){
            console.log(err);
            res.send("Error in create the File");
            
            //return keyword is used to prevent the server from kill
            return
        }
        res.sendFile(path.join(dirName,`${file_name}.txt`));
    })
})

app.listen(4000,()=>console.log("Server started in localhost:4000"));