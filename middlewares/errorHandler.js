const errorHandler = (err,req,res,next)=>{
    let message = err.message || 'Sorry, someting went wrong :( Please try again!';
    let status = err.status || 500;
}

module.exports = errorHandler;