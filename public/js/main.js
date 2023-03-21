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

// Displaying the dictionary and declaring the "tip" flag
let tip = false

document.getElementById('tip').addEventListener('click', () => {
    tip = true
    if (document.getElementById('morseTip').className === 'expandable') {
        document.getElementById('morseTip').classList.replace('expandable', 'expandable-return')
    } else {
        document.getElementById('morseTip').classList.replace('expandable-return', 'expandable')
    }
})

// Checking 
const guessSubmit = document.querySelector('#guessButton')
        .addEventListener('click', checkMorse)
const alpha = document.getElementById('alpha').innerText.toUpperCase()

function checkMorse() {
    const check = document.querySelector('#guessWord').value.toUpperCase()
    if (check === alpha) {
        console.log('RIGHT')
        document.querySelector('.morsed').classList.replace('morsed', 'completed')
        alert(`GREAT JOB! The answer is ${alpha}`)
        updateScore()
        } else {
            console.log('WRONG')
            alert('Try again. You\'re almost there!')
        }
    }