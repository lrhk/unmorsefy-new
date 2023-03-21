const mongoose = require('mongoose')

const MorseSchema = new mongoose.Schema({
  alpha: {
    type: String,
    required: true,
  },
  morse: {
    type: String,
    required: true,
  }
})

module.exports = mongoose.model('Morse', MorseSchema)
