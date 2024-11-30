const fs = require('fs');
const path = require('path');
const { MongoClient } = require('mongodb');

const mongoUri = 'mongodb://localhost:27017';
const dbName = 'nestdb';
const collectionName = 'wifi_access_points';
const csvFilePath = './init-scripts/data.csv';

async function importCSV() {

  try {

    // Nos conectamos a MongoDB
    const client = new MongoClient(mongoUri);
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    console.log(`Conectado a MongoDB. Importando datos en ${collectionName}...`);

    // Leemos el archivo CSV
    const csvData = fs.readFileSync(csvFilePath, 'utf8');

    // Convertimos CSV a JSON
    const records = csvData.split('\n').map(line => {
      const [id, programa, fecha_instalacion, latitud, longitud, colonia, alcaldia] = line.split(','); 
      return { id, programa, fecha_instalacion, latitud, longitud, colonia, alcaldia };
    });

    // Insertamos en MongoDB
    const result = await collection.insertMany(records);

    console.log(`Importados ${result.insertedCount} registros.`);

  } catch (err) {
    console.error('Error al importar CSV:', err);
  } finally {
    process.exit(0); // Nos aseguramos que el proceso termine
  }
}

importCSV();
