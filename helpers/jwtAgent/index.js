import makeJwtAgent from './makeJwtAgent'
import jwt from 'jsonwebtoken'

const jwtAgent = makeJwtAgent({ jwt })

export default jwtAgent
