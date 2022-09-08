const sqlite3 = require('sqlite3').verbose();
const DBSOURCE = './app.sqlite';

const db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        console.error(err.message);
    }
});

exports.addNewTravel = async (req, res) => {
    try {
        const { username, place, review } = req.body;

        const insert =
            'INSERT INTO Travels (username, place, review, dateCreated) VALUES (?,?,?,?)';
        db.run(insert, [username, place, review, Date('now')], function (err) {
            if (err) {
                res.status(400).json({ error: err.message });
            } else {
                res.status(201).json('Success');
            }
        });
    } catch (err) {
        console.log(err);
    }
};
exports.deleteTravel = async (req, res) => {
    try {
        const { username, Id } = req.body;
        const insert = `DELETE FROM Travels 
    WHERE Id = ? AND username = ?;`;
        db.run(insert, [Id, username], function (err) {
            if (err) {
                res.status(400).json({ error: err.message });
            } else {
                res.status(200).json('Delete Success');
            }
        });
    } catch (err) {
        console.log(err);
    }
};

exports.getAllTravels = async (req, res) => {
    try {
        // Make sure there is an email and password in the request

        const sql = 'SELECT * FROM Travels';
        const results = [];
        db.all(sql, [], function (err, rows) {
            if (err) {
                res.status(402).json({ error: err.message });
                return;
            }
            rows.forEach((row) => {
                console.log(row);
                results.push(row);
            });
            return res.status(200).send(results);
        });
    } catch (err) {
        console.log(err);
    }
};
exports.updateTravel = async (req, res) => {
    try {
        // Make sure there is an email and password in the request
        const { username, Id, place, review } = req.body;
        const sql = `UPDATE Travels 
    SET place = ? ,review = ?
    WHERE Id = ? AND username = ?`;
        db.run(sql, [place, review, Id, username], function (err, rows) {
            if (err) {
                res.status(400).json({ error: err.message });
            } else {
                return res.status(200).send('Update Success');
            }
        });
    } catch (err) {
        console.log(err);
    }
};
exports.test = async (req, res) => {
    res.status(200).send('Token Works - Yay!');
};
