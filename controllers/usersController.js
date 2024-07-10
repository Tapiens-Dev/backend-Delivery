const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');


module.exports = {

    login(req, res) {

        const email = req.body.email;
        const password = req.body.password;

        User.findByEmail(email, async (err, myUser) => {

            if(err){
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error con el registro del usuario',
                    error: err
                });
            }
            
            if(!myUser){
                return res.status(401).json({  // RESP 401 EL CLIENTE NO TIENE AUTORIZACION PARA REALIZAR ESTA PETICION
                    success: false,
                    message: 'El Email No Fue Encontrado',
                   
                });
            }

            const isPasswordValid = await bcrypt.compare(password, myUser.password);

            if(isPasswordValid){
                const token = jwt.sign({id: myUser.id, email: myUser.email}, keys.secretOrKey, {});

                const data = {
                    id: myUser.id,
                    name: myUser.name,
                    lastname: myUser.lastname,
                    email: myUser.email,
                    phone: myUser.phone,
                    image: myUser.image,
                    session_token: `JWT ${token}`
                }

                return res.status(201).json({
                    success: true,
                    message: 'El usuario fue autenticado',
                    data: data // El Id del nuevo usuario que se registro
                });
            }else{
                return res.status(401).json({  // RESP 401 EL CLIENTE NO TIENE AUTORIZACION PARA REALIZAR ESTA PETICION
                    success: false,
                    message: 'El password es incorrecto',
                   
                });
            }

            
        });
    },

    register(req, res){

        const user = req.body; // CAPTURO LOS DATOS QUE VA A ENVIAR EL CLIENTE
        User.create(user, (err, data) => {

            if(err){
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error con el registro del usuario',
                    error: err
                });
            }

            return res.status(201).json({
                success: true,
                message: 'Registro realizado correctamente',
                data: data // El Id del nuevo usuario que se registro
            });
        });
    }
}