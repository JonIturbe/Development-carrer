const Users = require("./User");
//MODULOS CUSTOMIZADOS
const user = {
    list: async (req, res) => {
        const users = await Users.find();
        res.status(200).send(users);
    },
    get: async (req, res) => {
        const { id } = req.params;
        const user = await Users.findOne({ _id: id });
        res.status(200).send(user);
    },
    create: async (req, res) => {
        const user = Users(req.body);
        const savedUser = await user.save();
        res.status(201).send(savedUser._id);
    },
    update: async (req, res) => {
        const { id } = req.params;
        const user = await Users.findOne({ _id: id });
        Object.assign(user, req.body);
        await user.save();
        res.sendStatus(204);
    },
    destroy: async (req, res) => {
        const { id } = req.params;
        const user = await Users.findOne({ _id: id });
        if (user) {
            user.remove();
        }
        res.sendStatus(204);
    }
}

//Cuando importemos este archivo, recibiremos por defecto lo que nosotros exportemos en esta linea.
//Importaremos el objeto user con todos sus metodos.
module.exports = user;