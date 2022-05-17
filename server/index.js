const express = require('express');
const cors = require('cors');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  cors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST'],
    credentials: true,
  })
);

app.use(
  session({
    key: 'user',
    secret: 'daw',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

// REGISTER: para llamar a la ruta de registro

const reg = require('./Routes/Register');
app.use('/register', reg);

// LOGIN & LOGOUT: para llamar a la ruta de login y logout

const userLogin = require('./Routes/Login');
app.use('/login', userLogin);

const userLogout = require('./Routes/Logout');
app.use('/logout', userLogout);

// BUTTONS: para llamar a la ruta de botones

const like = require('./Utils/Buttons');
app.use('/', like);

// PROFILE: para llamar a la ruta de perfil

const profileMovies = require('./Routes/Profile');
app.use('/', profileMovies);

// Para comprobar que la conexión se está realizando correctamente
app.listen(3001, () => {
  console.log('Server running on port 3001');
});
