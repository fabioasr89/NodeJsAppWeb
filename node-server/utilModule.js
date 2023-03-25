
const uuidv4=require('uuid');
const fs=require('fs')
//location del file dei metadati
var datiStorage='dati/dati.txt';
//funzione che genera un UUID inivoco
function generUUID(){
    return uuidv4.v4();

}
//funzione che registra i metadati del file caricato in upload da interfaccia
exports.salvaDatoStrutturato=function (nomeFile,nomeOriginale,dataCaricamento,tipoFile,size){
        //creiamo il file se non c'è
        if(!fs.existsSync(datiStorage)){
            //creiamo il file
            console.log('Creazione file dati dentro la cartella dati/**');
            fs.appendFile(datiStorage,'','utf8',(err)=>{
                console.log(err);
                throw new Error(err);
            })
            console.log('File dati correttamente creato')
        }
        console.log('analisi request in corso...')        
        if( nomeFile || !tipoFile){
            if(!size){
                size=0;
            }
            if(!dataCaricamento){
                dataCaricamento=createDataOdierna();
            }
            console.log("scrittura file in corso..");
            var id=generUUID();
            fs.appendFileSync(datiStorage,+id+'|'+nomeFile+'|'+nomeOriginale+'|'+dataCaricamento+'|'+tipoFile+'|'+size+';','utf8');
            console.log('file correttamente compilato');
        }else{
            throw new Error('La cartella di archiviazione dati strutturati non esiste');
        }
    
    
};

function createDataOdierna(){
    var data=new Date();
    var anno=data.getFullYear();
    var mese=data.getMonth()+1;
    //giorno della settimana
    var giorno=data.getDay();
    var dataString=giorno+'-'+mese+'-'+anno;
    return dataString;
};
//lettura asincrona e processo del file dati.txt
exports.readFileData= function(response){
    let list=new Array();
    if(fs.existsSync(datiStorage)){
        fs.readFile(datiStorage,'utf8',(err,data)=>{
           if(err){
            console.log("Errore nella fase di lettura del file dati:"+err);
            throw new Error(err);
           }
            console.log("Lettura correttamente eseguita");
            let dataArrayString=[];
            
            if(data){
                console.log("Esistono dati da leggere nel file archiviazione dati.txt");
                dataArrayString=data.split(";");
                for(var i=0; i<dataArrayString.length;i++){
                    var row=dataArrayString[i].split('|');
                    let dato={
                        "id":row[0],
                        "nomeFile":row[1],
                        "nomeFileOriginale":row[2],
                        "dataCaricamento":row[3],
                        "mime":row[4],
                        "size":row[5]
                    }
                   if(!block(dato)){
                        list.push(dato);
                   }
                    
                }
                console.log(JSON.stringify(list));
                console.log("Operazione di recupero dati correttamente eseguita");
                response.send(list);
            }
        });
        
    }else{
       console.log("Nessun file dati.txt presente. Caricare un nuovo file!")
    }
    return list;
}


function block(dato){
    let fallito=false;
    if(!dato.id || dato.id===undefined){
        fallito=true;
    }
    if(!dato.nomeFile || dato.nomeFile===undefined){
        fallito=true;
    }
    if(!dato.nomeFileOriginale || dato.nomeFileOriginale===undefined){
        fallito=true;
    }
    if(!dato.mime || dato.mime===undefined){
        fallito=true;
    }
    if(!dato.dataCaricamento || dato.dataCaricamento===undefined){
        fallito=true;
    }
    if(!dato.size || dato.size===undefined){
        fallito=true;
    }
    return fallito;
}



