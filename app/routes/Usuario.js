const router = require('express').Router();
const cadastroUsuario = require('../controllers/Usuario');
const { check } = require('express-validator');

router.get('/',cadastroUsuario.index);
router.get('/pesquisa/:cpf',cadastroUsuario.pesquisa);
router.put('/editar/:cpf',
	[
		check('nome_completo', 'Nome completo é obrigatório').not().isEmpty(),
		check('cpf', 'CPF é obrigatório').not().isEmpty(),
		check('email', 'E-mail é obrigatório').not().isEmpty(),
		check('endereco', 'Endereço é obrigatório').not().isEmpty()
	],cadastroUsuario.editar);

router.post('/cadastrar',
	[
		check('nome_completo', 'Nome completo é obrigatório').not().isEmpty(),
		check('cpf', 'CPF é obrigatório').not().isEmpty(),
		check('email', 'E-mail é obrigatório').not().isEmpty(),
		check('endereco', 'Endereço é obrigatório').not().isEmpty()
	],cadastroUsuario.cadastro_usuario);

router.delete('/deletar/:cpf', cadastroUsuario.deletar_usuario);

module.exports = router;