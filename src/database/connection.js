export const sql = require('mssql');

export const dbSettings = {
  user: 'sa',
  password: '3335',
  database: 'AwesomeCompany',
  server: '127.0.0.1',
  port: 50833,
  instancename: 'SERGIO\\SQLEXPRESS',
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  },
  options: {
    encrypt: false,
    trustServerCertificate: true
  }
}