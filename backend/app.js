const express = require('express');
const app = express();
const authRoutes = require('./routes/auth');
const protectedRoute = require('./routes/protectedRoute');
const portfolioRoute = require('./routes/portfolio');

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

app.post("/upload", upload.single("file"), (req, res) => {

    if (portfolio.user_id != req.id || req.id == undefined) {
        return res.status(403).json({ error: 'Non autorisé' });
    }

    db.none('UPDATE portfolio SET image = ${image} WHERE id = ${id}', {
        image: req.file.filename,
        id: id
    })
        .catch((error) => {
            console.log('ERROR:', error)
        })

    res.json({ message: 'File uploaded successfully' });
});