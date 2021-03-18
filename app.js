const fs = require('fs');
const path = require('path');
const csv = require('fast-csv');

let i = 0;
fs.createReadStream(path.resolve(__dirname, '', 'postal_code.csv'))
    .pipe(csv.parse({ headers: true }))
    .on('error', error => console.error(error))
    .on('data', row => {
        i++;
        if (i==2) process.exit();
        console.log(row);
    })
    .on('end', rowCount => console.log(`Parsed ${rowCount} rows`));