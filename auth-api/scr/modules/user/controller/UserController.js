import UserService from "../service/UserService.js";

class UserController {
  async getAcessToken(req, res) {
    let accessToken = await UserService.getAcessToken(req);
    return res.status(accessToken.status).json(accessToken);
  }

  async findByEmail(req, res) {
    let user = await UserService.findByEmail(req);
    return res.status(user.status).json(user);
  }
}

export default new UserController();
