import jwt from "jsonwebtoken";
import Usuaruio from "../models/Usuario.js";

const checkAuth = async (req, res, next) =>
{
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
    {
        try
        {
            token = req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token, process.env.SECRET)
            req.usuario = await Usuaruio.findById(decoded.id).select('-password -confirmado -token -createdAt -updatedAt -__v')
            return next();
        } catch (error)
        {
            return res.status(404).json({ msg: 'Hubo un error' })
        }
    } else
    {
        const error = new Error('Token no valido');
        res.status(401).json({ msg: error.message })
    }
}

export default checkAuth;