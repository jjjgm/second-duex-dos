const path = require('path');
require ("dotenv").config();
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const http = require('http');
const routes = require('./controllers/api/apiRoutes');
const { Sequelize } = require('sequelize');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const server = http.createServer(app);

const PORT = process.env.PORT || 3001;

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: 'localhost',
  dialect: 'mysql',
});

const sess = {
  secret: 'mySecret',
  cookie: {
    maxAge: 3600000, // one hour in milliseconds
    httpOnly: true,
    secure: false,
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize, // Pass the Sequelize instance here
  }),
};

app.use(session(sess));

const hbs = exphbs.create({});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

/*const apiRoutes = require('./controllers/api/apiRoutes');
const homeRoutes = require('./controllers/homeRoutes');
const dashboardRoutes = require('./controllers/dashboardRoutes');
const authRoutes = require('./controllers/api/authRoutes'); 
const userRoutes = require('./controllers/api/users');
const messageRoutes = require('./controllers/api/messages');

app.use('/api', apiRoutes);
app.use('/', homeRoutes);
app.use('/dashboard', dashboardRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/messages', messageRoutes);
*/

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(routes);

sequelize.sync({ force: false }).then(() => {
  server.listen(PORT, () => console.log(`Now Listening at ${PORT}!`));
});

