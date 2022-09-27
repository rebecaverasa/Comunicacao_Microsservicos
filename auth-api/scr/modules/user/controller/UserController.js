import userService from "../service/userService";

class UserController {
  async findByEmail(req, res) {
    let user = await userService.findByEmail(req);
    return res.status(user.status).json(user);
  }
}

export default new UserController();
