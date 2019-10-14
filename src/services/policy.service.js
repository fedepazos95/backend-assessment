const Mocky = new(require('./mocky.service'));

class Policy {
  async getPolicies() {
    const { policies } = await Mocky.getPolicies();
    return policies;
  }

  /**
   * 
   * @param {string} id Policy's id
   */
  async getPolicyById(id) {
    const { policies } = await Mocky.getPolicies();
    const policy = policies.find(p => p.id === id);
    return policy;
  }
}

module.exports = Policy;
