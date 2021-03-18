const fs = require('fs');
const path = require('path');
const csv = require('fast-csv');
const mongoose = require('mongoose');
const URI = "mongodb+srv://admin:Mongo21&@cluster0.x67oc.mongodb.net/postal_code?retryWrites=true&w=majority"



mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }, err => {
      if (err) console.log("Erreur :" + err);
      console.log("t'es in");
  });

//Définition schema et model Suisse
const mySchema = new mongoose.Schema({
    
        zip: String,
        post_district: String,
        comment: String,
        country_code: String,
        region: String,
        town: String,
        lat: String,
        lng:String,
      
});
const myModel = new mongoose.model('postal_code', mySchema, 'Switzerland');
//FIN Definition Suisse 

//Définition schema et model FR
const schemaFR = new mongoose.Schema({
    
        Code_commune_INSEE: String,
        Nom_commune: String,
        Code_postal: String,
        Ligne_5: String,
        Libellé_d_acheminement: String,
        coordonnees_gps: String,
      
})
const modelFR = new mongoose.model('postal_codeFR', schemaFR, 'France');
//FIN Definition France 

 //let i = 0;
fs.createReadStream(path.resolve(__dirname, '', 'postal_code.csv'))
    .pipe(csv.parse({ headers: true }))
    .on('error', error => console.error(error))
    .on('data', row => {
       // i++;
       //if (i==5) process.exit();
       let postCode= new myModel(row);
       postCode.save();
        //console.log(row);
    })
    .on('end', rowCount => console.log(`Parsed ${rowCount} rows`));

fs.createReadStream(path.resolve(__dirname, '', 'postal_codeFR.csv'))
    .pipe(csv.parse({ headers: true ,delimiter: ';'}))
    .on('error', error => console.error(error))
    .on('data', row => {
    //     i++;
    //    if (i==5) process.exit();
       let postCode= new modelFR(row);
       postCode.save();
       // console.log(row);
    })
    .on('end', rowCount => console.log(`Parsed ${rowCount} rows`));