// All settings come from environment variables (see .env.example).
// Defaults are for running locally with XAMPP / a local MySQL server.
const config = {
    database: {
        host: process.env.DB_HOST || 'localhost',
        port: Number(process.env.DB_PORT) || 3306,
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || 'node_mysql_api',
        // set DB_SSL=true for cloud databases that require SSL (e.g. TiDB Cloud, Aiven)
        ssl: process.env.DB_SSL === 'true'
    },
    secret: process.env.JWT_SECRET || 'change-this-secret',
    emailFrom: process.env.EMAIL_FROM || 'info@node-mysql-api.com',
    smtpOptions: {
        host: process.env.SMTP_HOST || '',
        port: Number(process.env.SMTP_PORT) || 587,
        auth: {
            user: process.env.SMTP_USER || '',
            pass: process.env.SMTP_PASS || ''
        }
    }
};

export default config;
