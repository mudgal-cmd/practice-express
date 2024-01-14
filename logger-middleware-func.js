const logger = (req, res, next)=>{
  const url = req.url;
  const method = req.method;
  const time = new Date();

  console.log(url);
  console.log(method);
  console.log(time.getDate());
  next();
}

module.exports = logger;