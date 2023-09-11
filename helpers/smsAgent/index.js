import codeGenerator from '../codeGenerator'
import makeSmsAgent from './makeSmsAgent'

const send = makeSmsAgent({ codeGenerator })

export default Object.freeze({ send })
