const User = require('../models/user');


module.exports = {

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