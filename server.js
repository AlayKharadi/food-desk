const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;
const corsOptions = {
    origin: "*",
    credentials: true,
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions));
app.use(express.json());
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "client/build")));
}
const routes = require('./routes');
routes(app);

if (process.env.NODE_ENV === "production") {
    app.get('/*', function (req, res) {
        res.sendFile(path.join(__dirname, 'client/build/index.html'), function (err) {
            if (err) {
                res.status(500).send(err);
            }
        })
    })
}

app.all('*', (req, res) => {
    res.send('Sorry, this is an invalid URL.');
});

app.listen(PORT, () => {
    console.log(`[listen] Server listening on port ${PORT}.`);
});