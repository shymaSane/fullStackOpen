const errorHandling = (err, req, res, next) => {
  if (err.name === 'CastError') {
    //id mistakes
    return res.status(400).send({ error: 'Wrong Id' })
  } else if (err.name === 'ValidationError') {
    return res.status(400).send({ error: err.message })
  }
  next(err)
}

export default errorHandling
