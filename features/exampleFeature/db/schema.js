import { Schema, model } from 'mongoose'

const entitySchema = new Schema({})

const EntityModel = model('entityCollectionName', entitySchema)

export default EntityModel
