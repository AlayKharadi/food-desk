const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 4000;
const corsOptions = {
    origin: "*",
    credentials: true,
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions));
app.use(express.json());

const routes = require('./routes');
routes(app);

app.get('*', (req, res) => {
    res.send('Sorry, this is an invalid URL.');
});

app.listen(PORT, () => {
    console.log(`[listen] Server listening on port ${PORT}.`);
});