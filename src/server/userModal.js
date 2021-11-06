const pool = require('./db');

const getUsers = (body) => {
    return new Promise(function (resolve, reject) {
        const { user, pwd } = body;
        pool.query(`SELECT * FROM users WHERE username = '${user}';`, async (error, results) => {
            if (error) {
                reject(error);
            }
        
            if (results.rows.length > 0) {
                const user = results.rows[0];
                if (user.password == pwd) {
                    resolve(user);
                } else {
                    reject(undefined);
                }
            } else {
                resolve(undefined);
            }
        });
    });
};

const changepwd = (body) => {
    return new Promise(function (resolve, reject) {
        const { user, newpwd } = body;
        pool.query(`SELECT * FROM users WHERE username = '${user}';`, async (error, results) => {
            if (error) {
                reject(error);
            }
            if (results.rows.length > 0) {
                pool.query(`UPDATE users SET password = '${hashpwd}' WHERE username = '${user}' RETURNING username, password;`, (err, result) => {
                    if (err) {
                        reject(err);
                    }
                    if (results !== undefined) {
                        const user = result.rows[0];
                        resolve(user);
                    } else {
                        resolve(undefined);
                    }
                });
            } else {
                resolve(undefined);
            }
        });
    });
};

module.exports = {
    getUsers,
    changepwd
};