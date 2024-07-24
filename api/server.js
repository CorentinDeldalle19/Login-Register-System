const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')

const { sequelize } = require('./models');
const models = require('./models')

const userRoutes = require('./routes/userRoutes');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(bodyParser.json());
app.use(cors())

// Routes
app.use('/users', userRoutes);

sequelize.authenticate()
    .then(() => {
        console.log('Connection to the database has been established successfully.');
        return sequelize.sync();
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    })

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})