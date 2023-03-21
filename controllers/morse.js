const Morse = require('../models/Morse')
const User = require('../models/User')

morseAlpha = {
    A:	'. _ ',
    B:	'_ . . . ',
    C:	'_ . _ . ',	
    D:	'_ . . ',
    E:	'. ',
    F:	'. . _ . ',
    G:	'_ _ . ',	
    H:	'. . . . ',	
    I:	'. . ',
    J:	'. _ _ _ ',
    K:	'_ . _ ',
    L:	'. _ . . ',
    M:	'_ _ ',
    N:	'_ . ',
    O:	'_ _ _ ',	
    P:	'. _ _ . ',
    Q:	'. _ . ',
    R:	'. _ . ',
    S:	'. . . ',
    T:	'_ ',
    U:	'. . _ ',
    V:	'. . . _ ',
    W:	'. _ _ ',
    X:	'_ . . _ ',
    Y:	'_ . _ _ ',
    Z:	'_ _ . . ',
    0:	'_ _ _ _ _ ',
    1:	'. _ _ _ _ ',
    2:	'. . _ _ _ ',
    3:	'. . . _ _ ',
    4:	'. . . . _ ',
    5:	'. . . . . ',
    6:	'_ . . . . ',
    7:	'_ _ . . . ',
    8:	'_ _ _ . . ',
    9:	'_ _ _ _ . ',
    '.': '. _ . _ . _ ',
    ',': '_ _ . . _ _ ',
    ' ': '||| '
    }

    function convertMorse(text) {
        return text.split('').map(letter => morseAlpha[letter.toUpperCase()]).join('| ')
    }

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
            res.render('suggest.ejs', {user: req.user})
        }catch(err){
            console.log(err)
        }
    },
    getScores: async (req,res)=>{
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
            await Morse.create({alpha: req.body.morseItem, morse: convertMorse(req.body.morseItem)})
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