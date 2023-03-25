

const express=require('express')
//è il middelware necessario per gestire i file
const multer=require('multer')
const upload=multer({dest:'storage/'});
const bodyParser=require('body-parser');
const fileUpload=require('express-fileupload');
const cors=require('cors')
const utilModules=require('./utilModule');
const { request, response } = require('express');
const { openSync } = require('fs');
const port=8080
const application=express();

application.use(bodyParser.json())
application.use(express.static('../pages'));

//reindirizzamento di root
application.get("/",(request,response)=>{
    response.redirect('../pages/index.html');
})


//reindirizzamento alla pagina di upload
application.get("/upload",(request,response)=>{
    console.log("Redirect nella pagina di upload...");
    response.redirect('../upload.html');
})
var uploadFile=upload.single('docs');
application.get('/init',async(request,response,next)=>{
    console.log("Caricamento dati in corso..")
    try{
       utilModules.readFileData(response);
        console.log("Dati caricati in send");
    }catch(err){
        return next(err)
    }
    
    
});

application.post("/upload",uploadFile,(request,response,next)=>{
    try{
        //console.log(request.body);
        console.log(request.file)
        if(!request.file){
            response.send({
                message:'Nessun file caricato',
                status:504
            });
        }else{
           
           //let file=request.files.docs; 
            console.log("Upload file in corso...");
            console.log('Salvataggio info caricamento in corso..');
           //copio il file in un percorso
           console.log(utilModules);
           try{
            if(utilModules){
                console.log("Chiamata in corso a utilModule..")
                utilModules.salvaDatoStrutturato(request.file.filename,request.file.originalname,null,request.file.mimetype,request.file.size);
                console.log('Dato strutturato relativo al file correttamente salvato');
            }
           }catch(error){
            console.log(error);
            throw new Error(error);
           }
           

            //utilModule.salvaDatoStrutturato(request.file.filename,request.file.originalname,request.file.mimetype,request.file.size);
            console.log("Dato correttamente salvato")
            console.log("File correttamente caricato");
            response.send({
                message:"Upload del file "+request.file.filename+"correttamente eseguito",
                status: 200
           })
        }
    }catch(err){
        response.status(500).send(err);
    }
})

application.delete("/delete",(request,response)=>{
    response.redirect('../pages/index.html');
})






application.listen(port,'localhost',()=>{
    console.log("Serve node correttamente startato sulla porta "+port);
})

