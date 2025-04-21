const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const todoRoutes = require('./routes/todos');

const app = express();
const port = process.env.PORT || 5051;
// this should always be in .env

const uri = "mongodb+srv://jpalmgren:BzlRP8qb2QyRTqhx@todo.iyvk26u.mongodb.net"
// Connect to MongoDB using environment variable
mongoose.set('strictQuery', false)

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Middlewares
app.use(cors());
app.use(bodyParser.json());

app.use('/api/todos', todoRoutes);

app.listen(port, () => console.log(`Server listening on port ${port}`));
