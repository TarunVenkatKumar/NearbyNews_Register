const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors')
//create express app
const app = express()
//setup server port
const port = process.env.PORT || 5000
app.use(cors());
// parse request data content type application/x-www-form-rulencoded
app.use(bodyParser.urlencoded({extended: true}));

// parse request data content type application/json
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// import user routes
const userRoutes = require('./src/routes/routes.user');

// create user routes
app.use('/user', userRoutes);

app.listen(port, () => {
  console.log(`Express app listening on port ${port}`)
})