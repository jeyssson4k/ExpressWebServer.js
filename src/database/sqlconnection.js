import sql from 'mssql'
import config from '../config'

console.log(config.sql)

async function getConnection(){
    try{
        const pool = await sql.connect(config.sql)
        return pool
    }catch(error){
        console.error(error)
    }
}

export default getConnection
