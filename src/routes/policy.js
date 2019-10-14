const { Router } = require('express');
const route = Router();
const UserService = new (require('../services/user.service'));
const PolicyService = new (require('../services/policy.service'));
const auth = require('../middlewares/auth');
const { roles } = require('../config');

const getPolicies = async (req, res, next) => {
  try {
    const policies = await PolicyService.getPolicies();
    res.send(policies);
  } catch (error) {
    next(error);
  }
}

const getUserLinked = async (req, res, next) => {
  try {
    const { clientId } = await PolicyService.getPolicyById(req.params.id);
    const user = await UserService.getUserById(clientId);
    res.send(user);
  } catch (error) {
    next(error);
  }
}

module.exports = (app) => {
  app.use('/policies', route);
  route.get('/', auth.isAuthenticated(), getPolicies);
  route.get('/:id/user', auth.isAuthenticated(roles.admin), getUserLinked);
}