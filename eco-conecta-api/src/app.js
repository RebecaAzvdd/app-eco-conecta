const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/posts", require("./routes/postsRoutes"));
app.use("/api/events", require("./routes/eventsRoutes"));


app.get('/', (req, res) => {
  res.send('API EcoConecta rodando!');
});

module.exports = app;