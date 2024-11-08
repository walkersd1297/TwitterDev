const helper  = function(){
    const num = Math.floor(Math.random() * 10);
    return num%2 ===0;
}
const execute = function(){
    const result = helper();
    console.log(result);
    if(true){
        return "Success";
    }else{
        return "Failure";
    }
}

module.exports = {
    execute,
    helper
}