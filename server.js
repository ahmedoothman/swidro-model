const dotenv = require('dotenv'); // to use environment variable
dotenv.config({ path: './config.env' }); // configuration of the environment file
const app = require('./app'); // import the express app

console.log(process.env.NODE_ENV);
process.on('uncaughtException', (err) => {
    console.log(err);
    console.log('Shuting down');
    process.exit(1);
});

const port = process.env.PORT;
const server = app.listen(port, () => {
    console.log(`works on ${port} ...`);
});

process.on('unhandeledRejection', (err) => {
    console.log(err);
    console.log('Shuting down');
    server.close(() => {
        process.exit(1);
    });
});

process.on('uncaughtException', (err) => {
    console.log(err);
    console.log('Shuting down');
    server.close(() => {
        process.exit(1);
    });
});
