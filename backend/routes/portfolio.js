const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const db = require('../db')

// Création d'un portofolio
router.post('/creer', verifyToken, async (req, res) => {
    try {
        const user_id = req.id

        if (user_id == undefined) {
            return res.status(401).json({ error: 'Authentication failed' });
        }

        //const { titre, contenu } = req.body;

        db.one('INSERT INTO portfolio(user_id, titre, contenu) VALUES(${user_id}, ${titre}, ${contenu}) RETURNING id', {
            user_id: user_id,
            titre: "Votre titre",
            contenu: "Votre contenu"
        })
            .then((data) => {
                console.log('DATA:', data)
                res.status(201).json({ id: data.id });
            })
            .catch((error) => {
                console.log('ERROR:', error)
            })

    } catch (error) {
        res.status(500).json({ error: 'Le portfolio n\'a pas pu être créé' });
    }
});

// Récupération de tous les portfolios d'un utilisateur
router.get('/user/', verifyToken, async (req, res) => {
    try {
        if (req.id == undefined) {
            return res.status(403).json({ error: 'Non autorisé' });
        }

        const portfolios = await db.any('SELECT * FROM portfolio WHERE user_id = $1 ORDER BY id DESC', req.id);

        res.status(200).json(portfolios);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Les portfolios n\'ont pas pu être récupérés' });
    }
});

// Récupération d'un portfolio par son id
router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;

        const portfolio = await db.one('SELECT * FROM portfolio WHERE id = $1', id);

        if (portfolio.public) {
            return res.status(200).json(portfolio);
        }

        const token = req.header('Authorization');
        if (!token) return res.status(401).json({ error: 'Access denied' });
        try {
            const decoded = jwt.verify(token, 'your-secret-key');
            req.id = decoded.id;
        } catch (error) {
            return res.status(401).json({ error: 'Invalid token' });
        }
        
        if (portfolio.user_id != req.id || req.id == undefined) {
            return res.status(403).json({ error: 'Non autorisé' });
        }

        res.status(200).json(portfolio);
    } catch (error) {
        res.status(500).json({ error: 'Le portfolio n\'a pas pu être récupéré' });
    }
});

// mise à jour d'un portfolio en vérifiant que l'utilisateur est bien le propriétaire
router.put('/:id', verifyToken, async (req, res) => {
    try {
        const id = req.params.id;
        const { titre, contenu, public } = req.body;

        const portfolio = await db.one('SELECT * FROM portfolio WHERE id = $1', id);

        console.log(portfolio.user_id)
        console.log(req.id)

        if (portfolio.user_id != req.id || req.id == undefined) {
            return res.status(403).json({ error: 'Non autorisé' });
        }

        db.none('UPDATE portfolio SET titre = ${titre}, contenu = ${contenu}, public = ${public} WHERE id = ${id}', {
            titre: titre,
            contenu: contenu,
            id: id,
            public: public,
        })
            .catch((error) => {
                console.log('ERROR:', error)
            })

        res.status(200).json({ message: 'Le portfolio a bien été mis à jour' });
    } catch (error) {
        res.status(500).json({ error: 'Le portfolio n\'a pas pu être mis à jour' });
    }
});

// Suppression d'un portfolio en vérifiant que l'utilisateur est bien le propriétaire
router.delete('/:id', verifyToken, async (req, res) => {
    try {
        const id = req.params.id;

        const portfolio = await db.one('SELECT * FROM portfolio WHERE id = $1', id);

        if (portfolio.user_id != req.id || req.id == undefined) {
            return res.status(403).json({ error: 'Non autorisé' });
        }

        db.none('DELETE FROM portfolio WHERE id = $1', id)
            .catch((error) => {
                console.log('ERROR:', error)
            })

        res.status(200).json({ message: 'Le portfolio a bien été supprimé' });
    } catch (error) {
        res.status(500).json({ error: 'Le portfolio n\'a pas pu être supprimé' });
    }
});

module.exports = router;