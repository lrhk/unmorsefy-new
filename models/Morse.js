const mongoose = require('mongoose')

const MorseSchema = new mongoose.Schema({
  morse: {
    type: String,
    required: true,
  }
})

module.exports = mongoose.model('Morse', MorseSchema)
