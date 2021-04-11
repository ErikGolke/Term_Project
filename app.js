const express = require('express');
const bodyParser = require('body-parser');
const swaggerUI = require('swagger-ui-express');
const swaggerJS = require('./COMP4537/termproject/API/swagger.json');
const sqlite = require('sqlite3').verbose();
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const accessTokenSecret = "tomBombadil";
const crypto = require("crypto");
const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors');
app.use(express.static(__dirname + '/public'));
app.use(cors());
app.options('https://erikgolke.com', cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerJS));

app.listen(port, () => {
    console.log('running on ' + port);
});


const db = new sqlite.Database("COMP4537/termproject/API/db/database.db", (err) => {
    if (err){
        return console.error(err.message);
    } else{
        console.log("connected to SQLite database");
    }
});

createMetrics();

function createMetrics() {
    db.run("CREATE TABLE IF NOT EXISTS metrics(method TEXT, endpoint TEXT, hits INTEGER, PRIMARY KEY(method, endpoint))");
}

function incrementMetrics(method, endpoint) {
    db.run("INSERT INTO metrics(method, endpoint, hits) VALUES (?, ?, 1) ON CONFLICT(method, endpoint) DO UPDATE SET hits = hits + 1",[method, endpoint], function(err) {
        if(err){
            console.log(err)
        }else{
          console.log("succ")
    }
})
}


//Authenticator
const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, accessTokenSecret, (err, user) => {
            if (err) {
                console.log("nuu")
                return res.sendStatus(403);
            }
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};
// Update quote in DB
app.put('/API/v1/quote', authenticateJWT, (req, res) =>{
    db.run("UPDATE quote SET quote =? WHERE email =? AND quote=?", [req.body.updateQuote, req.body.email, req.body.quote],
        function(err){
            if(err){
                return console.error(err.message);
            }else{
                console.log("updated " + req.body.quote + " with " + req.body.updateQuote)
                res.json({status:201, message:req.body.updateQuote});
            }
        })
    incrementMetrics(req.method, req.path)
})

app.put('/API/v1/changeUserName', authenticateJWT, (req, res) =>{
    db.run("UPDATE users SET email =? WHERE email =?", [req.body.newEmail, req.body.email],
        function(err){
            if(err){
                return console.error(err.message);
            }else{
                let response = "updated " + req.body.email + " with " + req.body.newEmail
                console.log(response)
                let newEmail = req.body.newEmail
                res.json({status:201, message:response, email:newEmail});
            }
        })
    incrementMetrics(req.method, req.path)
})

// Delete quote
app.delete('/API/v1/quote', authenticateJWT, (req,res) =>{
    db.run("DELETE FROM quote WHERE email=? AND quote=?", [req.body.email, req.body.quote], function(err){
        if(err){
            return console.error(err.message);
        }else{
            console.log("deleted " + req.body.quote);
            res.json({status:200, message:"deleted quote: " + req.body.quote});
        }
    });
    incrementMetrics(req.method, req.path)
})

app.delete('/API/v1/quoteAll', authenticateJWT, (req,res) =>{
    db.run("DELETE FROM quote WHERE email=?", [req.body.email], function(err){
        if(err){
            return console.error(err.message);
        }else{
            console.log("deleted all");
            res.json({status:200, message:"deleted all quotes for user: " + req.body.email });
        }
    });
    incrementMetrics(req.method, req.path)
})

app.post('/API/v1/quote', authenticateJWT, [
    body('quote').isLength({ min: 8})
], (req, res, next) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.json({
            status: 400,
            message: "Quote too short",
            errors: errors.array()
        });
    }
    console.log(req.body)
    db.run("CREATE TABLE IF NOT EXISTS quote(id INTEGER PRIMARY KEY AUTOINCREMENT, quote TEXT, email TEXT)");
    db.run("INSERT INTO quote(quote, email) VALUES (?, ?)", [req.body.quote, req.body.email], function(err) {
        if(err){
            console.log(err)
            res.json({status:503, message:"INTERNAL ERROR"});
        }else{
            let resp = {email: req.body.email, quote: req.body.quote}
            res.json({status:201, message: resp});
        }
    })
    incrementMetrics(req.method, req.path)

})


//USER STUFF
app.post('/API/v1/login', (req, res) => {
    let hashPass = crypto.createHash("sha256").update(req.body.password).digest("hex");
    db.run("SELECT email, password FROM users WHERE email = ? AND password = ?", [req.body.email, hashPass], function(err){
        if(err){
            res.json({status:404, message: "Login Failed"})
        }
        else{
            let sql = "SELECT * FROM metrics";
            db.all(sql, [], (err, rows) =>{
                if(err){
                    return console.error(err.message);
                }else{
                    let accessToken = jwt.sign({ username: req.body.email, role: "user" }, accessTokenSecret);
                    res.json({status:201, token:accessToken, message:rows})
                }
            })

        }
    });
    incrementMetrics(req.method, req.path)
});

app.post('/API/v1/newUser', [
    body('password').isLength({ min: 8}),
    body('email').isEmail()
], (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.json({
            status: 401,
            message: "BAD REQUEST",
            errors: errors.array()
        });
    }
    let hashPass = crypto.createHash("sha256").update(req.body.password).digest("hex");
    db.run('CREATE TABLE IF NOT EXISTS users(id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT, password TEXT)');
    db.run('INSERT INTO users (email, password) VALUES (?, ?)', [req.body.email, hashPass], function(err) {
        if(err){
            console.log("NAh")
        } else {
            let sql = "SELECT * FROM metrics";
            db.all(sql, [], (err, rows) =>{
                if(err){
                    return console.error(err.message);
                }else{
                    let accessToken = jwt.sign({ username: req.body.email, role: "user" }, accessTokenSecret);
                    res.json({status:201, token:accessToken, message:rows})
                }
            })
        }
    });
    incrementMetrics(req.method, req.path)
});

app.get('/API/v1/metrics', authenticateJWT, (req, res) =>{
    let sql = "SELECT * FROM metrics";
    db.all(sql, [], (err, rows) =>{
        if(err){
            return console.error(err.message);
        }else{
            res.json({status:200, message:rows});
            res = rows;
        }
    })
});


app.get('/API/v1/quote', authenticateJWT, (req, res) =>{
    let email = req.query.email;
    console.log(req.query.email)
    let sql = "SELECT * FROM quote WHERE email = '"+email+"' ORDER BY RANDOM() LIMIT 1;";
    db.get(sql, [], (err, row) =>{
        if(err){
            return console.error(err);
        }else{
            console.log(row);
            res.json({status:200, message:row.quote});
        }
    })
    incrementMetrics(req.method, req.path)
});

app.get('/API/v1/quoteAll', authenticateJWT, (req, res) =>{
    let sql = "SELECT * FROM quote ORDER BY RANDOM() LIMIT 1;";
    db.get(sql, [], (err, row) =>{
        if(err){
            return console.error(err);
        }else{
            console.log(row);
            res.json({status:200, message:row.quote});
        }
    })
    incrementMetrics(req.method, req.path)
});