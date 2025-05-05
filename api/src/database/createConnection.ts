import { createConnection, Connection } from 'typeorm';

import * as entities from 'entities';

const createDatabaseConnection = async (): Promise<Connection> => {
  try {
    console.log('Attempting to connect to the database...');
    const connection = await createConnection({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: Object.values(entities),
      synchronize: true,
    });
    console.log('Database connection established successfully.');
    return connection;
  } catch (error) {
    console.error('Error creating database connection:', error);
    throw error; // Re-throw the error to propagate it
  }
};

// createConnection();
export default createDatabaseConnection;
