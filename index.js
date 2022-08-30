require("dotenv").config();
const auth = require("./auth/auth");
const sqlite3 = require("sqlite3").verbose();
const express = require("express");
const loginroutes = require("./routes/loginroutes");
const bodyParser = require("body-parser");
const cors = require("cors");
const {
  getAllTravels,
  addNewTravel,
  deleteTravel,
  updateTravel,
} = require("./routes/travel");
const DBSOURCE = "./app.sqlite";

let db = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    console.error(err.message);
  }
});
db.serialize(() => {
  db.run(
    `CREATE TABLE Users (
            Id INTEGER PRIMARY KEY AUTOINCREMENT,
            username text, 
            email text, 
            password text,                
            Token text,
            DateLoggedIn DATE,
            dateCreated DATE
            )`,
    (err) => {
      if (err) {
        // Table already created
      } else {
        // Table just created, creating some rows
        let insert =
          "INSERT INTO Users (username, email, password, dateCreated) VALUES (?,?,?,?)";
        db.run(insert, ["user1", "user1@example.com", "user1", Date("now")]);
        db.run(insert, ["user2", "user2@example.com", "user2", Date("now")]);
      }
    }
  );
  db.run(
    `CREATE TABLE Travels (
            Id INTEGER PRIMARY KEY AUTOINCREMENT,
            username text, 
            place text, 
            review text,                
            dateCreated DATE
            )`,
    (err) => {
      if (err) {
        // Table already created
      } else {
        // Table just created, creating some rows
        let insert =
          "INSERT INTO Travels (username, place, review, dateCreated) VALUES (?,?,?,?)";
        db.run(insert, ["user1", "Vienna pool", "i like it", Date("now")]);
        db.run(insert, ["user2", "Vienna prater", "bad place", Date("now")]);
      }
    }
  );
});
// body parser added
let app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Allow cross origin requests
app.use(cors());

let router = express.Router();

// test route
router.get("/", function (req, res) {
  res.json({ message: "welcome to our upload module apis" });
});

//route to handle user registration
router.post("/register", loginroutes.register);
router.post("/login", loginroutes.login);
router.post("/test", auth, loginroutes.test);
router.get("/travel", auth, getAllTravels);
router.post("/travel", auth, addNewTravel);
router.delete("/travel", auth, deleteTravel);
router.patch("/travel", auth, updateTravel);

app.use("/api", router);
app.listen(4000);
