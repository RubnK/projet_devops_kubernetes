const express = require('express');
const axios = require('axios');
const app = express();

app.get('/api/hello', async (req, res) => {
  try {
    const hello = await axios.get('http://hello-service:8080/hello');
    const time = await axios.get('http://time-service:3001/time');
    res.json({ message: hello.data, time: time.data });
  } catch (err) {
    res.status(500).send("Erreur : " + err.message);
  }
});

app.listen(3000, () => {
  console.log('API Gateway running on port 3000');
});
