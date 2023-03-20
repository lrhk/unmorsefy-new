const Morse = require('../models/Morse')
const User = require('../models/User')

module.exports = {
    getMorse: async (req,res)=>{
        try{
            const morseItems = await Morse.find()
            // const itemsLeft = await Morse.countDocuments({userId:req.user.id,completed: false})
            res.render('morse.ejs', {morse: morseItems[Math.floor(Math.random() * morseItems.length)], user: req.user})
        }catch(err){
            console.log(err)
        }
    },
    getSuggest: async (req,res)=>{
        console.log(req.user)
        try{
            const morseItems = await Morse.find()
            console.log(morseItems)
            // const itemsLeft = await Morse.countDocuments({userId:req.user.id,completed: false})
            res.render('suggest.ejs', {user: req.user})
        }catch(err){
            console.log(err)
        }
    },
    getScores: async (req,res)=>{
        console.log(req.user)
        try{
            const userList = await User.find().sort({ score: -1 })
            // const itemsLeft = await Morse.countDocuments({userId:req.user.id,completed: false})
            res.render('scores.ejs', {users: userList})
        }catch(err){
            console.log(err)
        }
    },
    createMorse: async (req, res)=>{
        try{
            await Morse.create({morse: req.body.morseItem})
            console.log('Morse has been added!')
            res.redirect('/morse/suggest')
        }catch(err){
            console.log(err)
        }
    },
    updateScore: async (req, res)=>{
        try{
            console.log(req.body.userScore)
            await User.findOneAndUpdate({_id: req.body.morseIdFromJSFile},{
                $set: {
                    score: Number(req.body.userScore) + 10
                  }
            },{
                sort: {score: -1},
                upsert: true
            })
            console.log('Score Updated')
            res.json('Score Updated')
        }catch(err){
            console.log(err)
        }
    },
}    