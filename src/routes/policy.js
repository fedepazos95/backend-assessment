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

    /**
   * @swagger
   * /policies:
   *    get:
   *      tags:
   *      - policies
   *      description: This should return all policies
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
  route.get('/', auth.isAuthenticated(), getPolicies);

  /**
   * @swagger
   * /policies/{id}/user:
   *    get:
   *      tags:
   *      - policies
   *      description: This should return policy's user
   *      parameters:
   *        - name: id
   *          in: path
   *          description: Policy ID
   *          required: true
   *          example: 7b624ed3-00d5-4c1b-9ab8-c265067ef58b
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
  route.get('/:id/user', auth.isAuthenticated(roles.admin), getUserLinked);
}