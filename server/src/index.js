const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(morgan('common'));

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});
