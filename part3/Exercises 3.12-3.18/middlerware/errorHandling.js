const errorHandling = (err, req, res, next) => {
  if (err.name === "CastError") {
    return res.status(400).send({ error: "Wrong Id" });
  }
  next(err);
};

export default errorHandling;
