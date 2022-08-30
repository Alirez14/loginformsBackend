const sqlite3 = require("sqlite3").verbose();
const DBSOURCE = "./app.sqlite";
const jwt = require("jsonwebtoken");

let db = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    console.error(err.message);
  }
});

exports.register = async (req, res) => {
  let errors = [];
  try {
    const { username, place, review } = req.body;

    if (!username) {
      errors.push("username is missing");
    }
    if (!email) {
      errors.push("email is missing");
    }
    if (errors.length) {
      res.status(400).json({ error: errors.join(",") });
      return;
    }
    let userExists = false;

    let sql = "SELECT * FROM Users WHERE email = ?";
    await db.all(sql, email, (err, result) => {
      if (err) {
        res.status(402).json({ error: err.message });
        return;
      }

      if (result.length === 0) {
        let data = {
          username: username,
          email: email,
          password: password,
          dateCreated: Date("now"),
        };

        let sql =
          "INSERT INTO Users (username, email, password, dateCreated) VALUES (?,?,?,?)";
        let params = [data.username, data.email, data.password, Date("now")];
        let user = db.run(sql, params, function (err) {
          if (err) {
            res.status(400).json({ error: err.message });
            return;
          }
        });
      } else {
        userExists = true;
        // res.status(404).send("User Already Exist. Please Login");
      }
    });

    setTimeout(() => {
      if (!userExists) {
        res.status(201).json("Success");
      } else {
        res.status(201).json("Record already exists. Please login");
      }
    }, 500);
  } catch (err) {
    console.log(err);
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Make sure there is an email and password in the request
    if (!(email && password)) {
      res.status(400).send("All input is required");
      return;
    }

    let user = [];

    let sql = "SELECT * FROM Users WHERE email = ?";
    db.all(sql, email, function (err, rows) {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }

      rows.forEach(function (row) {
        user.push(row);
      });

      let PHash = password;

      if (PHash === user[0]?.password) {
        // * CREATE JWT TOKEN
        const token = jwt.sign(
          { user_id: user[0]?.Id, username: user[0]?.username, email },
          process.env.TOKEN_KEY,
          {
            expiresIn: "1h", // 60s = 60 seconds - (60m = 60 minutes, 2h = 2 hours, 2d = 2 days)
          }
        );

        user[0].Token = token;
      } else {
        return res.status(400).send("No Match");
      }

      return res.status(200).send(user);
    });
  } catch (err) {
    console.log(err);
  }
};

exports.test = async (req, res) => {
  res.status(200).send("Token Works - Yay!");
};
