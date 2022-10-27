const express = require('express')
const mysql = require('mysql')
const session = require('express-session')
const app = express()
const PORT = 3000

const conection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'nodelogin'
})

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))

app.use(express.json());

app.use(express.urlencoded({extended: true}))

app.set('view engine', 'ejs')


app.get('/', (req,res) => {
        res.render('main')
})

app.get('/register', (req,res) => {
    res.render('register')
})

app.post('/auth',(req,res) => {
    const username = req.body.usermane
    const password = req.body.password

    if(username && password) {

        conection.query('SELECT * FROM account WHERE username = ? AND password = ?' [username, password], (err,result,fields) =>{
            if (err) throw err

            if  (result.length > 0) {

                req.session.loggedin = true
                req.session.username = username

                res.redirect('/main')
            } else {
                res.send('Incorrect Username and Password')
            }
            res.end()
        })
    } else {
        res.send('Please enter Username and Password!')
        res.end()
    }
})

app.get('/main', (req,res) => {
    if(req.session.loggedin) {
        res.send('Hello dear' + req.session.usermane)
    } else {
        res.send('please login to view this page!')
    }
    res.end()
})

app.post('/create', (req,res) => {
        const username = req.body.usermane
        const password = req.body.password

        if (username && password) {
            conection.query(`INSERT INTO accounts (username,password) VALUES ('${username}', '${password}') `, (err,result,fields) => {
                if(err) throw err

                req.session.loggedin = true
                req.session.usermane = username

                res.redirect('/main')
            })
        }  
})



app.listen(PORT,  () => {
    console.log(`server running on http://localhost:${PORT}`)
})