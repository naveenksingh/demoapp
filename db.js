const sql = require("mssql");

const config = {
    user: process.env.SQL_DB_USER,          // sql admin username
    password: process.env.SQL_DB_PASS,  // sql password
    server: process.env.SQL_DB_SERVER,      // your-server.database.windows.net
    database: process.env.SQL_DB_NAME,
    options: {
        encrypt: true,
        trustServerCertificate: true
    }
};

async function getUsers() {
    try {
        let pool = await sql.connect(config);
        let result = await pool.request().query("SELECT id, username, email FROM Users");
        return result.recordset;
    } catch (err) {
        console.error("Database error:", err);
        throw err;
    }
}

module.exports = { getUsers };