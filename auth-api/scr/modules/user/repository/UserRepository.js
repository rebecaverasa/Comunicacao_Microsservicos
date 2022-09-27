import User from "../model/User";

class UserRepository {
  async findById(id) {
    try {
      return await User.findOne({ where: { id } });
    } catch (err) {
      console.error(err.message);
      return null;
    }
  }

  async findByEmail(email) {
    try {
      return await User.findOne({ where: { email } });
    } catch (err) {
      console.error(err.message);
      return null;
    }
  }
}

export default new UserRepository();
