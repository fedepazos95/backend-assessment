const Mocky = new (require('./mocky.service'));
const jwt = require('jsonwebtoken');
const config = require('../config');

/**
 * 
 * @param {object} user User data
 */
const generateToken = (user) => {
  //Set expiration to 1 hour
  const exp = Math.floor(Date.now() / 1000) + (60 * 60)

  return jwt.sign(
    {
      _id: user.id,
      name: user.name,
      role: user.role,
      // exp
    },
    config.secretKey
  );
}

class User {
  /**
   * 
   * @param {string} email User's email
   */
  async authenticate(email) {
    const { clients: users } = await Mocky.getUsers();
    const user = users.find(u => u.email === email);
    if (!user) {
      throw new Error('User not found');
    }
    const token = generateToken(user);
    return { user, token }
  }

  /**
   * 
   * @param {object} query Query params to filter users list
   */
  async getUsers(query = {}) {
    const { clients: users } = await Mocky.getUsers();
    if (Object.entries(query).length > 0) {
      return users.filter(user => {
        let result;
        Object.keys(query).forEach(key => {
          result = query[key].toLowerCase() === user[key].toLowerCase();
        });
        return result;
      });
    }
    return users;
  }

  /**
   * 
   * @param {string} id User's id
   */
  async getUserById(id) {
    const { clients: users } = await Mocky.getUsers();
    const user = users.find(u => u.id === id);
    return user;
  }

  /**
   * 
   * @param {string} userId User's id
   */
  async getUserPolicies(userId) {
    const { policies } = await Mocky.getPolicies();
    const userPolicies = policies.filter(p => p.clientId === userId);
    return userPolicies;
  }
}

module.exports = User;
