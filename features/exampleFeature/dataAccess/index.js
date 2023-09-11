import makeDataAccess from './makeDataAccess'
import makeDb from '../db'

const db = makeDataAccess({ makeDb })

export default db
