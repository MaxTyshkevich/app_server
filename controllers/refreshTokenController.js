const User = require('../model/User');
const jwt = require('jsonwebtoken');

const handleRefreshToken = async (req, res) => {
  // find cookie

  const cookies = req.cookies;

  if (!cookies?.jwt) return res.sendStatus(401); // bad request
  const refreshToken = cookies.jwt;

  const foundUser = await User.findOne({ refreshToken }).exec();

  if (!foundUser) return res.sendStatus(403); // invalid token

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || foundUser.username !== decoded.username)
      return res.sendStatus(403); // invalid token
    const roles = Object.values(foundUser.roles).filter(Boolean);
    const payload = {
      userInfo: {
        username: foundUser.username,
        roles,
      },
    };

    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '15min',
    });

    res.json({
      accessToken,
    });
  });
};

module.exports = { handleRefreshToken };
