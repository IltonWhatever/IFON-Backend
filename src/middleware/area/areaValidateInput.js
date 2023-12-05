const schemas = require('../../services/schemasValidate');

const middlewareAreaValidate = (req, res, next) => {
  const { error } = schemas.areaValidate.validate(req.body);
  const valid = error == null;

  if (valid) {
    next();
  } else {
    const { details } = error;
    const message = details.map((i) => i.message).join(',');

    // console.log('error', message);
    res.status(422).json({ error: message });
  }
};

module.exports = middlewareAreaValidate;
