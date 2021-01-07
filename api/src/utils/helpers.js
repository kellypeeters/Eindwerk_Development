const Helpers = {
    checkValidEmail: (inputString) => {
        if(typeof inputString == 'string'){
        if(inputString.length<=254){
        if(inputString.length>1){
        if(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(inputString)){
      return inputString 
    }
    }
}
        }
        return false
      },
    }
    
module.exports = Helpers