async function updateScore(){
    const userId = document.getElementById('usermorse').dataset.id
    let scoreS;
    if (tip === true) { 
        scoreS = Number(document.getElementById('score').innerText) - 5
    } else {
        scoreS = document.getElementById('score').innerText
    }
    console.log(scoreS)
    try{
        const response = await fetch('morse/updatescore', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'morseIdFromJSFile': userId,
                'userScore': scoreS
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

//! MORSE CODE CODE!

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
    
let convert = document.querySelector('.morsed').innerText.toUpperCase()
let guessSubmit = document.querySelector('#guessButton')
        .addEventListener('click', checkMorse)
let tip = false
    
document.getElementById('tip').addEventListener('click', () => {
    tip = true
    if (document.getElementById('morseTip').className === 'expandable') {
        document.getElementById('morseTip').classList.replace('expandable', 'expandable-return')
    } else {
        document.getElementById('morseTip').classList.replace('expandable-return', 'expandable')
    }
})
    
function convertMorse(text) {
    return text.split('').map(letter => morseAlpha[letter]).join('| ')
}
    
document.querySelector('.morsed').innerText = convertMorse(convert)
    
function checkMorse() {
    const check = document.querySelector('#guessWord').value.toUpperCase()
    if (check === convert) {
        console.log('RIGHT')
        document.querySelector('.morsed').classList.replace('morsed', 'completed')
        alert(`GREAT JOB! The answer is ${convert}`)
        updateScore()
        } else {
            console.log('WRONG')
            alert('Try again. You\'re almost there!')
        }
    }