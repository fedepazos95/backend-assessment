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
  
  /**
   * @swagger
   * /users:
   *    get:
   *      tags:
   *      - users
   *      description: This should return all users
   *      responses:
   *        200:
   *          description: OK
   *          content:
   *            application/json:
   *              schema:
   *                type: array
   *                items:
   *                 "$ref": "#/definitions/User"
   *        401:
   *          "$ref": "#/components/responses/Unauthenticated"
   *        403:
   *          "$ref": "#/components/responses/Unauthorized"
   *      security:
   *      - bearerAuth: []
   */
  route.get('/', auth.isAuthenticated([roles.user, roles.admin]), getUsers);

  /**
   * @swagger
   * /users/authenticate:
   *    post:
   *      tags:
   *      - users
   *      description: This should return authentication token
   *      requestBody:
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                email:
   *                  type: string
   *                  required: true
   *            examples:
   *              Admin:
   *                value:
   *                  email: whitleyblankenship@quotezart.com
   *              User:
   *                value:
   *                  email: barnettblankenship@quotezart.com
   *      responses:
   *        200:
   *          description: OK
   *          content:
   *            application/json:
   *              schema:
   *                "$ref": "#/definitions/Authentication"
   *        401:
   *          "$ref": "#/components/responses/Unauthenticated"
   *        403:
   *          "$ref": "#/components/responses/Unauthorized"
   *      security:
   *      - bearerAuth: []
   */
  route.post('/authenticate', celebrate({ body: Joi.object({ email: Joi.string().required() }) }), authenticate);

  /**
   * @swagger
   * /users/{id}:
   *    get:
   *      tags:
   *      - users
   *      description: This should return user data
   *      parameters:
   *        - name: id
   *          in: path
   *          description: User ID
   *          required: true
   *          example: a0ece5db-cd14-4f21-812f-966633e7be86
   *      responses:
   *        200:
   *          description: OK
   *          content:
   *            application/json:
   *              schema:
   *                "$ref": "#/definitions/User"
   *        401:
   *          "$ref": "#/components/responses/Unauthenticated"
   *        403:
   *          "$ref": "#/components/responses/Unauthorized"
   *      security:
   *      - bearerAuth: []
   */
  route.get('/:id', auth.isAuthenticated([roles.user, roles.admin]), getById);

  /**
   * @swagger
   * /users/{id}/policies:
   *    get:
   *      tags:
   *      - users
   *      description: This should return user's policies
   *      parameters:
   *        - name: id
   *          in: path
   *          description: User ID
   *          required: true
   *          example: a0ece5db-cd14-4f21-812f-966633e7be86
   *      responses:
   *        200:
   *          description: OK
   *          content:
   *            application/json:
   *              schema:
   *                type: array
   *                items:
   *                 "$ref": "#/definitions/Policy"
   *        401:
   *          "$ref": "#/components/responses/Unauthenticated"
   *        403:
   *          "$ref": "#/components/responses/Unauthorized"
   *      security:
   *      - bearerAuth: []
   */
  route.get('/:id/policies', auth.isAuthenticated(roles.admin), getUserPolicies);
}