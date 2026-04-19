const { loginUser } = require('../controllers/authController');

jest.mock('../models/userModel');
const User = require('../models/userModel');
const { genAccessToken, genRefreshToken } = require('../middlewares/token');

jest.mock('../middlewares/token', () => ({
  genAccessToken: jest.fn(() => 'mockAccessToken'),
  genRefreshToken: jest.fn(() => 'mockRefreshToken'),
}));

describe('authController.loginUser', () => {
  let req, res;

  beforeEach(() => {
    req = { body: { email: 'test@example.com', password: 'password123' } };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
      cookie: jest.fn().mockReturnThis(),
    };
  });

  it('should return 404 if user not found', async () => {
    User.findOne.mockResolvedValue(null);
    await loginUser(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      status: 'Error',
      message: 'Email or password does not exist',
    });
  });

  it('should return 404 if password is invalid', async () => {
    const mockUser = { isValidatePassword: jest.fn().mockResolvedValue(false) };
    User.findOne.mockResolvedValue(mockUser);
    await loginUser(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      status: 'Error',
      message: 'Invalid Email or password',
    });
  });

  it('should return 200 and tokens if login is successful', async () => {
    const mockUser = { isValidatePassword: jest.fn().mockResolvedValue(true) };
    User.findOne.mockResolvedValue(mockUser);
    await loginUser(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.cookie).toHaveBeenCalledWith('refreshToken', 'mockRefreshToken', expect.any(Object));
    expect(res.json).toHaveBeenCalledWith({
      status: 'Successful',
      message: 'User logged in successfully',
      data: {
        user: mockUser,
        refreshToken: 'mockRefreshToken',
      },
    });
  });
});
