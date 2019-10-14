const expressLoader = async app => {

  // Health Check endpoint
  app.get('/status', (req, res) => res.status(200).send({ message: 'Server running' }));
}
module.exports = expressLoader;