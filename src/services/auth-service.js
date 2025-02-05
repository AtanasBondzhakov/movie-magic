import User from "../models/User.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const SECRET = 'awry10$ILNTSEmu1JN1QWYzvhSQ/OkAliMimasdbyTTDgMG71qh88g5HIwmV/7FL.yxyK'

const register = (userData) => User.create(userData);

const login = async (email, password) => {
    const user = await User.findOne({ email });

    if (!user) {
        throw new Error('Invalid email or password');
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
        throw new Error('Invalid email or password');
    }

    const payload = {
        id: user._id,
        email: user.email
    }

    const token = jwt.sign(payload, SECRET, { expiresIn: '2h' });

    return token;
}

export default {
    register,
    login
}