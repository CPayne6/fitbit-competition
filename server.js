const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();

const jwtMiddleware = require('./middleware/passport-jwt.js');

const loginRoutes = require('./routes/login.js');

require('dotenv').config(); // Import environment variables

const port = process.env.PORT;

const app = express();
app.use(bodyParser.json());
app.use(pino);

const apiRouter = express.Router();

apiRouter.get('/', (req, res) => {
  res.send({message:"Hello"});
});

app.post('/login', jwtMiddleware, (req, res) => {
    if(!req.user){
        res.redirect(process.env.AUTHREDIRECT);
    }
});

app.post('/auth-callback', (req, res) => {

});

apiRouter.use(jwtMiddleware);

app.use('/api', apiRouter);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});