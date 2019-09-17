const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/usuarios',{useNewUrlParser: true}).then().catch((err)=>{
	console.log('Ocorreu um erro ao conectar ao banco');
});
const usuarioSchema = new mongoose.Schema({
	nome_completo:{
		type:String,
		require:true
	},
	cpf:{
		type:String,
		require:true 
	},
	endereco:{
		type:String,
		require:true
	},
	email:{
		type:String,
		require:true
	}
});
const createUsuario = mongoose.model('Usuarios', usuarioSchema);

module.exports = {createUsuario};


