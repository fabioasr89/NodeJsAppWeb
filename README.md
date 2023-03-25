Applicativo scritto in NODE.js e pensato per gestire upload di documenti.

Nel file serverConfig.js, esponiamo la configurazione del server Express e dei servizi l'interfacciamento con un client web (servizi rest e controller di reindirizzamento).
Il file utilModule.js è un modulo in cui esponiamo le funzioni di utility per gestire la logica di business da richiamare nel nostro server.

Sotto la cartella pages/, invece, ho messo il front end, composto da due semplici pagine html : index (pagina iniziale dove viene mostrata la lista dello storico dei file caricati),e una 
pagine upload.html chiamata per caricare i file sul server usando uno dei servizi esposti.

Ogni caricamento, salva il file all'interno della cartella node-server/storage e registra il metadato in un file node-server/dati/dati.txt.
Le tecnologie che ho usato sono:

NODE.js
Express (server)
jQuery
Datatable.js
Bootstrap 5
html/css

Per far funzionare l'applicativo, occorre buildare eseguendo il comando:

-npm install

Queso creerà una cartella node_modules con all'interno tutte le dipendenze denunciate nel package.json. A questo punto,
basterà eseguire

-npm start

disponendosi nella cartella node-server per far partire l'applicazione. Una volta avviata, andare su http://localhost:8080.


Fabio.