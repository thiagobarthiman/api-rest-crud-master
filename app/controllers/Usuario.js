module.exports.index =(req,res)=>{
	let schemas = require('../../config/connect');
	let consulta = require('../model/consultas');

	consulta._carregar_todos_registros(schemas.createUsuario,(err,result)=>{
		if(err){
			res.status(400).json({'usuarios':[],status:false});
		}else{
			console.log('Consulta realizada com sucesso !!!');
			res.json({'usuarios':result,status:true});
		}
	});	
}
module.exports.cadastro_usuario = (req,res)=>{
	let schemas = require('../../config/connect');
	let consulta = require('../model/consultas');
	let { check, validationResult } = require('express-validator');
	
	let errors = validationResult(req);

	if(!errors.isEmpty()){
		res.json({
			status:false,
			validation:errors.array()
		});
	}else{
		let usuario = new schemas.createUsuario(req.body);
		consulta._salvar_registro(usuario,(err,result)=>{
			if(err){
				res.status(400).json({
					status:false,
					message:'Não foi possivel cadastrar usuário, tente novamente.'
				});
			}else{
				res.json({
					status:true,
					message:'Usuário registrado com sucesso.'
				});
			}
		});
	}
}
module.exports.deletar_usuario  = (req, res) =>{
    let schemas = require('../../config/connect');
	let consulta = require('../model/consultas');

	if(req.params.cpf < 0){
		res.status(400).json({
			status:false,
			message:'Digite um id válido'
		});
	}else{
		consulta._deletar_registro(schemas.createUsuario,{cpf:req.params.cpf},(err,result)=>{
			if(err){
				res.status(400).json({
					status:false,
					message:'Não foi possivel deletar usuário, tente novamente.'
				});
			}else{
				if(result.n == 0){
					res.status(400).json({
						status:false,
						message:'Não existe usuário com essa informação.'
					});
				}else{
					res.json({
						status:true,
						message:'Usuário deletado com sucesso.'
					});
				}
			}
		});
	}
}
module.exports.pesquisa = (req,res)=>{
	 let schemas = require('../../config/connect');
	 let consulta = require('../model/consultas');

	 consulta._filter_registro(schemas.createUsuario,req.params.cpf,(erro,result)=>{
	 	if(erro){
	 		res.status(400).json({
				status:false,
				message:'Não foi possivel realizar consulta'
			});
	 	}else{
	 		if(result.length == 0){
	 			res.json({
					status:false,
					message:'Usuário não encontrado'
				});
	 		}else{
	 			res.json({
					status:true,
					usuarios:result
				});
	 		}
	 	}
	 });
}
module.exports.editar = (req,res)=>{
	let schemas = require('../../config/connect');
	let consulta = require('../model/consultas');
	let { check, validationResult } = require('express-validator');
	
	let errors = validationResult(req);

	if(!errors.isEmpty()){
		res.json({
			status:false,
			validation:errors.array()
		});
	}else{
		consulta._editar_registro(schemas.createUsuario,req.params.cpf,req.body,(err,result)=>{
			if(err){
				res.status(400).json({
					status:false,
					message:'Não foi possivel editar usuário, tente novamente.'
				});
			}else{
				res.json({
					status:true,
					message:'Usuário editado com sucesso.'
				});
			}
		});
	}
}