const express = require('express');
const cookieParser = require('cookie-parser');
const port = 8000;
const db = require('./configs/mongoose');

const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());


app.use('/', require('./routes'));

// server is listening at given port
app.listen(port, (err) => {
    if (err) {
        console.log(err);
        return;
    }

    console.log(`server is up and running at port ${port}`);

})