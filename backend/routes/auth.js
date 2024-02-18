const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db')

// User registration
router.post('/register', async (req, res) => {
    try {
        const { email, prenom, nom, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        db.none('INSERT INTO user_account(email, prenom, nom, hash) VALUES(${email}, ${prenom}, ${nom}, ${hashedPassword})', {
            email: email,
            prenom: prenom,
            nom: nom,
            hashedPassword: hashedPassword
        })
            .catch((error) => {
                console.log('ERROR:', error)
            })

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Registration failed' });
    }
});

// User login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        db.one('SELECT * FROM user_account WHERE email = $1', email)
            .then(async (user) => {

                if (!user) {
                    return res.status(401).json({ error: 'Authentication failed' });
                }
                console.log(password)
                console.log(user)
                const passwordMatch = await bcrypt.compare(password, user.hash);
                if (!passwordMatch) {
                    return res.status(401).json({ error: 'Authentication failed' });
                }
                const token = jwt.sign({ id: user.id }, 'your-secret-key', {
                    expiresIn: '1h',
                });
                res.status(200).json({ token });

            })
            .catch((error) => {
                console.log('ERROR:', error)
                res.status(500).send('Login failed');
            })

    } catch (error) {
        res.status(500).json({ error: 'Login failed' });
    }
});

module.exports = router;