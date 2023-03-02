export default class PasswordGenerator{
    #notAllowedChars = ['"', "'", ",", ".", ":", ";", '=']
    #controlCharCodes = [0, 31] // NOT USE
    #specialCharCode = [33, 47] // obs: 32 is space
    #numCharCode = [48, 57]
    #othersSymbolsCode = [58, 64]
    #lettersUpperCaseCode = [64, 90]
    #lettersLowerCase = [97, 122]


    generate({length=12 , enableUpperCase= true, enableLowerCase= true, enableSymbols= true, enableOthersSymbols= true, enableNumbers=true, excludeSimilar=false}){
        
        const options = {enableUpperCase, enableLowerCase, enableSymbols, enableOthersSymbols, enableNumbers, excludeSimilar}

        const arrOptionsPass = this._enableOptions(options)

        const pass = this._randomPassword(length, arrOptionsPass, excludeSimilar)

        return pass
    }

    _generateSpecialChar(){
        let char = this._generator(this.#specialCharCode)

        let isNotAllowedChar = this.#notAllowedChars.includes(char)

        while (isNotAllowedChar){
            char = this._generator(this.#specialCharCode)
           
            if(!this.#notAllowedChars.includes(char)){
                break
            }
        }

        return char
    }

    _generateNumbers(){
        const char = this._generator(this.#numCharCode)
        
        return char

    }

    _generateOthersSymbols(){
        let char = this._generator(this.#othersSymbolsCode)

        let isNotAllowedChar = this.#notAllowedChars.includes(char)

        while (isNotAllowedChar){
            char = this._generator(this.#specialCharCode)
           
            if(!this.#notAllowedChars.includes(char)){
                break
            }
        }

        return char
    }

    _generateLettersUpper(){
        const char = this._generator(this.#lettersUpperCaseCode)

        return char
    }

    _generateLettersLower(){
        const char = this._generator(this.#lettersLowerCase)

        return char
    }

    _generator(arrNumbers){
        const [min, max] = arrNumbers

        const difference = max - min + 1

        const generateNumber = Math.trunc(Math.random() * difference) + min

        return String.fromCharCode(generateNumber)
    }

    _enableOptions(options){
        const arrayOptions = []

       if(options.enableUpperCase){
        arrayOptions.push('_generateLettersUpper')
       }

       if(options.enableLowerCase){
        arrayOptions.push('_generateLettersLower')
       }

       if(options.enableNumbers){
        arrayOptions.push('_generateNumbers')
       }

       if(options.enableOthersSymbols){
        arrayOptions.push('_generateOthersSymbols')
       }

       if(options.enableSymbols){
        arrayOptions.push('_generateSpecialChar')
       }

       return arrayOptions
    }

    _randomPassword(length, arrOptionsPass, excludeSimilar){
        let pass = '';        

        for(var i=0; i<length; i++){
            const randomParam = Math.trunc(Math.random() * arrOptionsPass.length)

            let generatedChar = this[arrOptionsPass[randomParam]]()

            if(excludeSimilar){
                while(String(pass[i - 1]).toLowerCase() === generatedChar.toLowerCase()){
                    generatedChar = this[arrOptionsPass[randomParam]]()

                    if(String(pass[i - 1]).toLowerCase() !== generatedChar.toLowerCase()){
                        break
                    }
                }
            }

            pass += generatedChar
        }

        return pass
    }
}