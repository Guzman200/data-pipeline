const fs = require('fs');
const { MongoClient, ObjectId } = require('mongodb');
const csv = require('fast-csv');

const mongoUri = 'mongodb://localhost:27017';
const dbName = 'nestdb';
const collectionName = 'wifi_access_points';
const csvFilePath = './init-scripts/data.csv';

async function importCSV() {

    const client = new MongoClient(mongoUri);
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    console.log(`Conectado a MongoDB. Importando datos en ${collectionName}...`);

    let records = [];
    let batchSize = 5000; // Número de registros por lote

    return new Promise((resolve, reject) => {

        const stream = fs.createReadStream(csvFilePath)
        .pipe(csv.parse({ headers: false }))
        .on('data', async (row) => {

            stream.pause(); // Pausamos el stream mientras procesamos

            const [id, programa, fecha_instalacion, latitud, longitud, colonia, alcaldia] = row;

            records.push({
                id,
                programa,
                fecha_instalacion,
                latitud: parseFloat(latitud),
                longitud: parseFloat(longitud),
                colonia,
                alcaldia,
                location: {
                    type: 'Point',
                    coordinates: [parseFloat(longitud), parseFloat(latitud)],
                }
            });

            // Si alcanzamos el tamaño del lote, insertamos en la bd
            if (records.length >= batchSize) {
                await collection.insertMany(records);
                records = []; // Limpiamos el array para el sig lote
            }

            stream.resume(); // Reanudamos el stream mientras procesamos

        })
        .on('end', async () => {

            // Insertamos el último lote si hay registros restantes
            if (records.length > 0) {
            await collection.insertMany(records);
            }
            console.info('Importación completada.');
            resolve();
        })
        .on('error', (error) => {
            console.error('Error al leer el archivo CSV:', error);
            reject(error);
        });
    });
}

importCSV().then(() => process.exit(0)).catch(console.error);
