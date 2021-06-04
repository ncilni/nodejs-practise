function log (req,res,next){
    console.log('Logging request:');
    next();
}

module.exports = log;