const sqlConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_USER_PWD,
    server: process.env.DB_SERVER,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_NAME,
    options:{
        excrypt: true,
        trustServerCertificate: true
    }
}
const serverConfig = {
    port: 1500
}
const config = {
    sql: sqlConfig,
    server: serverConfig
}
export default config