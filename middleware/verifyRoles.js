const verifyRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req?.roles) {
      return res.sendStatus(401); /* not Autorization */
    }
    const roles = [...allowedRoles]; /* зачем ? */
    console.log(`verifyRoles: verifyRoles =>`, roles);
    console.log(`verifyRoles: getRoles => `, req.roles);

    const result = req.roles.some((role) => roles.includes(role));
    if (!result) return res.sendStatus(401); /* not Autorization */

    next();
  };
};

module.exports = verifyRoles;
