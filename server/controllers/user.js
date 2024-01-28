const User=require('../models/user');
const bcrypt =require("bcrypt");

module.exports.register = async (req, res) => {
    try {
        // console.log(req);
        const { email, name, password } = req.body;
        // console.log(req.body);
        const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
        const user = new User({ email, username:name,password:passwordHash });

        const saveduser=await user.save();
        // console.log(saveduser);
        res.status(200).json(saveduser);
    } catch (e) {
        console.log(e)
    }
}

module.exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });
    if (!user) return res.status(400).json({ msg: "User does not exist. " });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. " });
    res.status(200).json(user);
    } catch (e) {
        console.log(e)
    }
}

module.exports.getemail = async (req, res) => {
    try {
        const { id } = req.params;
        // console.log(id)
        const user = await User.findById(id);
        // console.log(email)
        const email=user.email;
        // console.log(email)
    // if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. " });
    res.status(200).json(email);
    } catch (e) {
        console.log(e)
    }
}

