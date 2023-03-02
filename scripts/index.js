import PasswordGenerator from "./PasswordGenerator.js";

const passwordGenerator = new PasswordGenerator();

// DOM

const form = document.querySelector('form');
const passLengthRange = document.querySelector('#passwordLengthRange')
const passUpperCase = document.querySelector('#passwordUpperCase')
const passLowerCase = document.querySelector('#passwordLowerCase')
const passNumbers = document.querySelector('#passwordNumbers')
const passSimilar = document.querySelector('#passwordSimilar')
const passSymbols = document.querySelectorAll('.passwordSymbols')
const passLengthSpan = document.querySelector('.passLength')
const passwordInput = document.querySelector('#password')
const passwordStrongBar = document.querySelector('.passwordStrongBar')
const copyButton = document.querySelector('.copyPass')
const newPassButton = document.querySelector('.newPass')
const toast = document.querySelector('.toast')
const toastWrapper = document.querySelector('.toast-wrapper')

let toastTimeout

const strongBarStyles = {
    'VW':{
        width: '20%',
        color: 'red'
    },
    'W':{
        width: '40%',
        color: 'rose'
    },
    'G':{
        width: '60%',
        color: 'yellow'
    },
    'S':{
        width: '80%',
        color: 'light-green'
    },
    'VS':{
        width: '100%',
        color: 'green'
    }
}

passLengthSpan.textContent = passLengthRange.value

passLengthRange.addEventListener('input', changePasswordLength)

form.addEventListener('input', generatePassword)

copyButton.addEventListener('click', copyPassword)
newPassButton.addEventListener('click', newPassword)

function generatePassword(e){
    e?.preventDefault()

    const {passSymbol=false, passOthersSymbols=false} = getEnabledSymbols()
    let passwordGenerated

    const passwordOptions = {
        length: passLengthRange.value,
        enableUpperCase: passUpperCase.checked,
        enableLowerCase: passLowerCase.checked,
        enableNumbers: passNumbers.checked,
        excludeSimilar: passSimilar.checked,
        enableSymbols: passSymbol,
        enableOthersSymbols: passOthersSymbols,
    }

    changeStrongBarColor(passLengthRange.value)

    try{
        passwordGenerated = passwordGenerator.generate(passwordOptions)
    }catch(err){
        return alert('Não foi possível criar uma senha!')
    }
    
    passwordInput.value = passwordGenerated
}

 async function newPassword(){
    toastTimeout = await showToast('Nova Senha Criada com Sucesso!')

    generatePassword()

    console.log(toastTimeout)
}

function copyPassword(){
    console.log(toastTimeout)
    toastTimeout = showToast("Copiado com sucesso!")

    navigator.clipboard.writeText(passwordInput.value)
}

function getEnabledSymbols(){
    const typeSymbolEnabled = Array.from(passSymbols).find(el => el.checked).value

    if(typeSymbolEnabled == 'exclude') return {}

    if(typeSymbolEnabled == 'symbols') return {passSymbol: true}

    if(typeSymbolEnabled == 'all-symbols') return {
        passSymbol: true,
        passOthersSymbols: true
    }    
}

function changePasswordLength(){
        if(passLengthRange.value < 10){
            passLengthSpan.textContent = '0' + passLengthRange.value
            return
        }
        passLengthSpan.textContent = passLengthRange.value
}

function changeStrongBarColor(length){
    const strongMeter = passwordStrongMeter(length)
    const strongStyles = strongBarStyles[strongMeter]

    if(passwordStrongBar.style.width == strongStyles.width) return

    passwordStrongBar.style.width = strongStyles.width
    passwordStrongBar.style.backgroundColor = `var(--strong-${strongStyles.color})`
}

function passwordStrongMeter(length){
    if(length <= 4){
        return 'VW'
    }
    if(length > 4 && length <= 7){
        return 'W'
    }
    if(length > 7 && length <= 9){
        return 'G'
    }
    if(length > 9 && length <= 11){
        return 'S'
    }
    if(length >= 12){
        return 'VS'
    }
}

function showToast(message){
    toast.classList.add('active')
    toastWrapper.classList.add('active')
    toast.querySelector('p').textContent = message
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            toast.classList.remove('active')
            toastWrapper.classList.remove('active')
            resolve('done')
        }, 2000)
    })
}


console.log(toastTimeout)