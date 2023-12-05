const { Router } = require('express');
const passport = require('passport');

const campisController = require('./controllers/campi/campisController');
const likeController = require('./controllers/like/likeController');
const typeController = require('./controllers/type/typeController');
const areaController = require('./controllers/area/areaController');
const comentarioController = require('./controllers/comentario/comentarioController');
const permissaoController = require('./controllers/permissao/permissaoController');
const userController = require('./controllers/user/userController');
const publicacaoController = require('./controllers/publicacao/publicacaoController');
const fileController = require('./controllers/file/fileController');
const authController = require('./controllers/auth/authUserController');
const refreshTokenController = require('./controllers/refreshToken/refreshTokenController');
const verifyJWT = require('./middleware/verifyJWT');
const verifyRefreshToken = require('./middleware/verifyRefreshTokenJWT');
const areaValidate = require('./middleware/area/areaValidateInput');
const socialLoginController = require('./controllers/social-login/google_oauth');
const middlewareUserValidate = require('./middleware/user/userValidadeInputs');
const permissaoValidate = require('./middleware/permissao/permissaoValidateInputs');
const upload = require('./middleware/publicacao/capaUpload');
const middlewareUploadAnexos = require('./middleware/publicacao/fileUpload');
const middlewareNewPasswordValidade = require('./middleware/newPassword');
require('./controllers/social-login/google_oauth');
require('./controllers/social-login/facebook_oauth');

const router = Router();

router.get('/health', (_, res) =>
  res.status(200).json({
    status: 'Server Running',
  })
);

// files
router.post(
  '/upload/file',
  verifyJWT,
  middlewareUploadAnexos.single('file'),
  fileController.create
);
router.delete('/file/delete/:id', verifyJWT, fileController.delete);
router.get('/publicacao/files/:id', verifyJWT, fileController.findAll);

// login e logout
router.post('/auth/user/login', authController.login);
router.post('/auth/user/logout', verifyRefreshToken, authController.logout);
router.post('/refreshToken', refreshTokenController.refreshToken);

// like

router.post('/like', verifyJWT, likeController.create);
router.delete('/like/delete/:id', verifyJWT, likeController.delete);

// area
router.get('/areas', verifyJWT, areaController.index);
router.get('/area/:id', verifyJWT, areaController.find);
router.post('/area', areaValidate, verifyJWT, areaController.create);
router.put('/area/update/:id', verifyJWT, areaController.update);
router.delete('/area/delete/:id', verifyJWT, areaController.delete);

// campi

router.get('/campis', campisController.index);

// type
router.get('/types', verifyJWT, typeController.index);
router.post('/type', verifyJWT, typeController.create);
router.post('/type/:id', verifyJWT, typeController.find);
router.put('/type/update/:id', verifyJWT, typeController.update);
router.delete('/type/delete/:id', verifyJWT, typeController.delete);

// permissoes
router.get('/permissoes', verifyJWT, permissaoController.index);
router.get('/permissao/:id', verifyJWT, permissaoController.find);
router.post('/permissao', verifyJWT, permissaoValidate, permissaoController.create);
router.put('/permissao/update/:id', verifyJWT, permissaoController.update);
router.delete('/permissao/delete/:id', verifyJWT, permissaoController.delete);

// user
router.get('/users', verifyJWT, userController.index);
router.get('/user/:id', verifyJWT, userController.find);
router.post('/user', verifyJWT, middlewareUserValidate, userController.create);
router.put('/user/update/:id', verifyJWT, userController.update); // atualizar dados do usuário:id
router.put('/user/new-password/:id', middlewareNewPasswordValidade, userController.userNewPassword);
// router.delete('/user/delete/:id', verifyJWT, userController.delete); // deletar o usuario:id
router.post('/user/active/:id', verifyJWT, userController.userAtcive); // ATIVAR o usuario:id
router.post('/user/disable/:id', verifyJWT, userController.userDisable); // DESATIVAR o usuario:id
router.get('/search/user/:name?', verifyJWT, userController.searchByName);

// Publication
router.post('/publication/cover', verifyJWT, upload.any(), publicacaoController.updateCover);
router.delete('/publication/cover/:id', verifyJWT, publicacaoController.deleteCover);

router.get('/publications', /* verifyJWT, */ publicacaoController.find);
router.get('/publication/:id', verifyJWT, publicacaoController.findById);
router.post('/publication', verifyJWT, upload.any(), publicacaoController.create);
router.put('/publication/update/:id', verifyJWT, publicacaoController.update);
router.put('/publication/activate/:id', verifyJWT, publicacaoController.activate);
router.put('/publication/deactivate/:id', verifyJWT, publicacaoController.deactivate);

// comentarios
router.get('/comentarios', verifyJWT, comentarioController.index);
router.post('/comentario', verifyJWT, comentarioController.create);
router.get('/comentario/:id', verifyJWT, comentarioController.find);
router.put('/comentario/update/:id', verifyJWT, comentarioController.update);
router.delete('/comentario/delete/:id', comentarioController.delete);

// Nova abordagem para Login com google
router.post('/login-google', socialLoginController.loginGoogle);

router.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    session: false,
  })
);

router.get(
  '/auth/google/redirect',
  passport.authenticate('google', {
    session: false,
    failureRedirect: '/failed',
  }),
  (req, res) => {
    const { token } = req.user;
    const { refreshTokenIfon } = req.user;
    const { msg } = req.user;
    return res.status('200').json({ msg, token, refreshToken: refreshTokenIfon });
  }
);

router.get(
  '/auth/facebook',
  passport.authenticate('facebook', {
    scope: ['public_profile'],
    session: false,
  })
);

router.get(
  '/auth/facebook/redirect',
  passport.authenticate('facebook', {
    session: false,
    failureRedirect: '/failed',
  }),
  (req, res) => {
    const { token } = req.user;
    const { refreshTokenIfon } = req.user;
    return res.status('200').json({ token, refreshToken: refreshTokenIfon });
  }
);

router.get('/failed', (req, res) => {
  return res.status('401').json('error');
});

module.exports = router;
