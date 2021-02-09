require('dotenv/config');
const app = require('./app');

async function start() {
    app.listen(process.env.PORT || 3002);
}

start();
