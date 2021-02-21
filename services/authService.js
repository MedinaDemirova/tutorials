const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {SALT_ROUNDS, SECRET} = require ('../config/config');

//Register
const register = async ({ username, password }) => {

    let user = await User.findOne({username});
    if (user) throw {message: 'Sorry, this user already exist!'};

    try {
        let salt = await bcrypt.genSalt(SALT_ROUNDS);
        let hashPass = await bcrypt.hash(password, salt);
        let user = new User({ username, password: hashPass });
        await user.save();
        return;
    } catch (error) {
        throw error;
    }
};


//Log in
const login = async ({ username, password }) => {
    try {
        let user = await User.findOne({ username: username });
        if (!user) throw { message: 'Invalid username or password!' };

        let isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw { message: 'Invalid username or password!' };

        let token = jwt.sign({ _id: user._id, name: username }, SECRET);
        return token;

    } catch (error) {
        throw error;
    }
}

module.exports = {
    register,
    login
};