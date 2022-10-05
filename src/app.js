import express from 'express'
import cors from 'cors'

import config from './config'

import mdfLdfroutes from './routes/mdfLdf.routes'
import indexFragmentation from './routes/indexFragment.routes'


const App = express()
App.set('port', config.server.port)
App.use(mdfLdfroutes)
App.use(indexFragmentation)
App.use(cors())


export default App