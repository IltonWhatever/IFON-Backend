const schemas = require('../../services/schemasValidate');

const middlewarePermissaoValidate = (req, res, next) => {
  const { error } = schemas.permissaoValidade.validate(req.body);
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

module.exports = middlewarePermissaoValidate;
