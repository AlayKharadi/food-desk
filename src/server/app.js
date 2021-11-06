const express = require('express');
const app = require('express')();
const http = require('http').Server(app);
const PORT = process.env.PORT || 4000;
const cors = require('cors');
const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200,
}
const user_modal = require('./userModal');
app.use(cors(corsOptions));
app.use(express.json());

app.post('/login', (req, res) => {
    user_modal.getUsers(req.body)
        .then(response => {
            if (response === undefined) {
                res.status(500).send(undefined);
            } else {
                res.status(200).send(response);
            }
        })
        .catch(error => {
            res.status(500).send(error);
        });
});

app.post('/changepwd', (req, res) => {
    user_modal.changepwd(req.body)
        .then(response => {
            if (response === undefined) {
                res.status(500).send(undefined);
            } else {
                res.status(200).send(response);
            }
        })
        .catch(error => {
            res.status(500).send(error);
        });
});

http.listen(PORT, () => {
    console.log(`[listen] Server listening on port ${PORT}.`);
});
