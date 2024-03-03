const express = require('express');
const app = express();
const authRoutes = require('./routes/auth');
const protectedRoute = require('./routes/protectedRoute');
const portfolioRoute = require('./routes/portfolio');
const db = require('./db');
const verifyToken = require("./middleware/authMiddleware");


app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});

app.use(express.json());
app.use('/auth', authRoutes);
app.use('/protected', protectedRoute);
app.use('/portfolio', portfolioRoute);

app.use('/static', express.static('./uploads'))

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

//https://expressjs.com/en/starter/static-files.html
const upload = require('./middleware/upload');

app.post("/upload", verifyToken, upload.single("file"), async (req, res) => {

    if (req.file == undefined) {
        return res.status(400).json({ error: 'No file uploaded' });
    }
    id = req.body.id;
    portfolio = await db.one('SELECT * FROM portfolio WHERE id = ${id}', {
        id: id
    }).catch((error) => {
        console.log('ERROR:', error)
    })

    console.log(portfolio.user_id);
    console.log(req.id);

    if (portfolio.user_id != req.id || req.id == undefined) {
        return res.status(403).json({ error: 'Non autorisé' });
    }

    db.none('UPDATE portfolio SET image_nom = ${image} WHERE id = ${id}', {
        image: req.file.filename,
        id: id
    })
        .catch((error) => {
            console.log('ERROR:', error)
        })

    res.json({ message: 'File uploaded successfully' });
});