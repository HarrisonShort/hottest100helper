const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

app.get('/backend', (request, response) => {
    response.send({ express: 'Your express backend is connected to React.' });
});

app.listen(port, () => console.log(`Listening on port ${port}`));