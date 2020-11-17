const port = '3070'

const express = require('express')
const db = require('./models')
const cors = require('cors')
const morgan = require('morgan')
const userRouter = require('./routes/user')

// passport modules
const passport = require('passport')
const passportConfig = require('./passport')
const session = require('express-session')
const cookie = require('cookie-parser')
const app = express()

db.sequelize.sync() // db 실행

app.use(morgan('dev'))
app.use(express.json()) // express 가 json을 받기 위함
app.use(express.urlencoded( {extended: false})) 
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))   //


// passport
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: 'ns747800',
    cookie: {
        httpOnly: true,
        secure: false,
    }
}))
app.use(cookie('ns747800'))
app.use(passport.initialize())
app.use(passport.session())
passportConfig()
// passport_end



// API만 작성해주세요
app.get('/', (req,res)=>{ res.send('hello wizeto') })
app.use('/user', userRouter)  // signUp, login, logout



// listen
app.listen(port,()=>{ console.log(`YES backend server is ${port}`) })