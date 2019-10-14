const { Router } = require('express');
const route = Router();
const UserService = new (require('../services/user.service'));
const { celebrate, Joi } = require('celebrate');
const auth = require('../middlewares/auth');
const { roles } = require('../config');

const authenticate = async (req, res, next) => {
  try {
    const { email } = req.body;
    const { user, token } = await UserService.authenticate(email);
    return res.json({ user, token }).status(200);
  } catch (error) {
    return next(error);
  }
}

const getUsers = async (req, res, next) => {
  try {
    const users = await UserService.getUsers(req.query);
    res.send(users);
  } catch (error) {
    next(error);
  }
}

const getById = async (req, res, next) => {
  try {
    const user = await UserService.getUserById(req.params.id);
    res.send(user);
  } catch (error) {
    next(error);
  }
}

const getUserPolicies = async (req, res, next) => {
  try {
    const policies = await UserService.getUserPolicies(req.params.id);
    res.send(policies);
  } catch (error) {
    next(error);
  }
}

module.exports = (app) => {
  app.use('/users', route);
  route.get('/', auth.isAuthenticated([roles.user, roles.admin]), getUsers);
  route.post('/authenticate', celebrate({ body: Joi.object({ email: Joi.string().required() }) }), authenticate);
  route.get('/:id', auth.isAuthenticated([roles.user, roles.admin]), getById);
  route.get('/:id/policies', auth.isAuthenticated(roles.admin), getUserPolicies);
}