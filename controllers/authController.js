const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/User');
const cookieOption = require('../config/cookieOption');

const handleLogin = async (req, res) => {
  const { user, pwd } = req.body;

  if (!user || !pwd) {
    return res
      .status(400)
      .json({ message: 'Username and password are required.' });
  }

  const foundUser = await User.findOne({ username: user }).exec();
  if (!foundUser) return res.sendStatus(401); //Unauthorized

  // evaluate password
  const match = await bcrypt.compare(pwd, foundUser.password);

  if (match) {
    const roles = Object.values(foundUser.roles).filter(Boolean);
    // create JWTs
    const accessToken = jwt.sign(
      {
        userInfo: {
          username: foundUser.username,
          roles,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: '15m',
      }
    );

    const refreshToken = jwt.sign(
      {
        username: foundUser.username,
      },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: '1d',
      }
    );

    /* const userUpdate = await User.updateOne(foundUser, { refreshToken }).exec(); */
    foundUser.refreshToken = refreshToken;

    await foundUser.save();

    res.cookie('jwt', refreshToken, cookieOption);

    res.json({ accessToken });
  } else {
    res.sendStatus(400);
  }
};

module.exports = { handleLogin };
