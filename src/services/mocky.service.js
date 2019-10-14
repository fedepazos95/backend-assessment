const axios = require('axios');
const config = require('../config');

/**
 * This is a Singleton Class that acts as a Database
 */
class Mocky {
  constructor() {
    if (!!Mocky.instance) {
      return Mocky.instance;
    }

    Mocky.instance = this;
    return this;
  }

  /**
   * Get list of Users from mocky service
   */
  async getUsers() {
    if (!this.users) {
      const { data } = await axios.get(config.mocky.users);
      this.users = data;
    }
    return this.users;
  }

  /**
   * Get list of Policies from mocky service
   */
  async getPolicies() {
    if (!this.policies) {
      const { data } = await axios.get(config.mocky.policies);
      this.policies = data;
    }
    return this.policies;
  }
}

module.exports = Mocky;