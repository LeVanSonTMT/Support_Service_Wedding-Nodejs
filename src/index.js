const path = require('path');
const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const cookieSession = require('cookie-session')
const cookieParser = require('cookie-parser')
const setCookie = require('set-cookie-parser');
const methodOverride = require('method-override');
const ls = require('local-storage');
const localStorage = require('localStorage'), myValue = { foo: 'bar', baz: 'quux' };
const route = require('./routes/index');
const db = require('./confi/db');
const lStorage = require('local-storage-json');
const multer = require('multer');

//connect database
db.connect();

const app = express();
const port = 3009;

const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.static(path.join(__dirname, 'public')));

app.use(cookieParser())

app.use(
    express.urlencoded(
        {
            extended: true,
        }),
);

app.use(express.json());

app.use(methodOverride('_method'))

app.use(morgan('combined'));

app.engine('hbs', exphbs({
    extname: '.hbs',
    helpers: {
        sum: (a, b) => a + b
    }

}));


app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

io.on('connection', function (sockec) {
    console.log('User connected sockec!!!');
});

// route init
route(app);

app.listen(port, () => console.log(`App listening at http://localhost:${port}`));