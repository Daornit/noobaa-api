const express = require('express')
const bodyParser = require('body-parser');
// const get_client = require('./request/api');

// middlewares
const get_client = require('./middleware/auth')
// routes
const accountRoute = require('./routes/account');
const authRoute = require('./routes/auth');
const systemRoute = require('./routes/system');
const poolRoute = require('./routes/pool');
const bucketRoute = require('./routes/bucket');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(get_client);

app.use('/account', accountRoute);
app.use('/auth', authRoute);
app.use('/system', systemRoute);
app.use('/pool', poolRoute);
app.use('/bucket', bucketRoute);

app.listen(3000, () => {
  console.log(`app listening at http://localhost:${3000}`)
})