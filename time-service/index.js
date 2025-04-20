const express = require('express');
const app = express();

app.get('/time', (req, res) => {
    res.send(new Date().toLocaleString());
});

app.listen(3001, () => {
    console.log('Time Service running on port 3001');
});
