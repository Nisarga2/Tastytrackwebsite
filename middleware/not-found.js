const notFoundMiddleware = (req, res) =>
  res.status(404).send("route dose not exist !");

export default notFoundMiddleware;
