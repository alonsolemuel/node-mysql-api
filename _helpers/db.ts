import config from '../config';
import mysql from 'mysql2/promise';
import { Sequelize } from 'sequelize';
import accountModel from '../accounts/account.model';
import refreshTokenModel from '../accounts/refresh-token.model';

const db: any = {};
export default db;

// resolves when the database is connected and tables are ready
export const dbReady: Promise<void> = initialize().catch(err => {
    db.error = err;
    console.error('Database connection failed:', err.message);
});

async function initialize() {
    const { host, port, user, password, database, ssl } = config.database;
    const sslOptions = ssl ? { minVersion: 'TLSv1.2', rejectUnauthorized: true } : undefined;

    const connection = await mysql.createConnection({ host, port, user, password, ssl: sslOptions });
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);
    await connection.end();

    const sequelize = new Sequelize(database, user, password, {
        host,
        port,
        dialect: 'mysql',
        dialectModule: require('mysql2'),
        dialectOptions: sslOptions ? { ssl: sslOptions } : {},
        logging: false
    });

    db.Account = accountModel(sequelize);
    db.RefreshToken = refreshTokenModel(sequelize);

    db.Account.hasMany(db.RefreshToken, { onDelete: 'CASCADE' });
    db.RefreshToken.belongsTo(db.Account);

    await sequelize.sync();
}
