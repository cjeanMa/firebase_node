const path = require("path")
const express = require("express")
const morgan = require("morgan")
const {engine} = require("express-handlebars")

const app = express();

//settings
app.set('port', process.env.port || 4000)
app.set('views', path.join(__dirname, 'views'))
app.engine('.hbs', engine({
    defaultLayout: 'main', 
    extname: '.hbs'
}))
app.set('view engine', '.hbs')
//middlewares

app.use(morgan('dev'))
app.use(express.urlencoded({extended: false}))

//Routes
app.use("/", require('./routes/index'))

//Static files
app.use(express.static(path.join(__dirname, 'public')))

module.exports = {
    app
}