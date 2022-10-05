import getConnection from '../database/sqlconnection'
import SqlQueries from '../database/queries'


async function getMdfLdfdata(req, res){
    try {
        const pool = await getConnection()
        const response = await pool.request().query(SqlQueries.mdfLdf)
        console.log(response)
        res.json(response.recordset)
    } catch (error) {
        console.error(error)
    }
}
async function getIndexFragmentation(req, res){
    try {
        const pool = await getConnection()
        const response = await pool.request().query(SqlQueries.indexFragment)
        console.log(response)
        res.json(response.recordset)
    } catch (error) {
        console.error(error)
    }
}

const Controller = {
    mdfLdf: getMdfLdfdata,
    indexFragmentation: getIndexFragmentation
}
export default Controller
