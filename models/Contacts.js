const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    name: {type: String, required: true},
    phone: {type: String, required: true, unique: true},
    birthday: {type: Date, required: true},
    date: {type: Date, default: Date.now},
    owner: {type: Types.ObjectId, ref: 'User'}
})

module.exports = model('Contacts', schema)