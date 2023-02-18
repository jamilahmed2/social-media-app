import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
const JWT_SECRET = 'jamilisab$oy';
import User from '../models/user.js';

// login the user
export const signin = async (req, res) => {
    // destructing
    const { email, password } = req.body

    try {
        // checking user
        let existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(404).json({ error: "User dosen't exists." });
        }

        // checking user password
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ success, error: "Invalid credentials" });
        }

        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, JWT_SECRET, { expiresIn: '1h' })

        res.status(200).json({ result: existingUser, token })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Something went wrong" });
    }
};

// sign up the user
export const signup = async (req, res) => {

    const { email, password, firstName, lastName ,confirmPassword} = req.body;

    try {
        // checking user
        let existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ error: "User Already exists." });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Passwords don't match." });
        }

        // hashing the password
        const salt = await bcrypt.genSalt(12);
        const hashedPassowrd = await bcrypt.hash(password, salt);

        const result = await User.create({ email, password: hashedPassowrd, name: `${firstName},${lastName}` })

        const token = jwt.sign({ email: result.email, id: result._id }, JWT_SECRET, { expiresIn: '1h' })

        res.status(200).json({ result, token });

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Something went wrong" });
    }
};