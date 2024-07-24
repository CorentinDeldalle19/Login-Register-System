const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')

const { sequelize } = require('./models');
const models = require('./models')

const adminRoutes = require('./routes/adminRoutes');
const languagesRoutes = require('./routes/languageRoutes');
const notionRoutes = require('./routes/notionRoutes');
const userLanguageRoutes = require('./routes/userLanguagesRoutes');
const userRoutes = require('./routes/userRoutes');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(bodyParser.json());
app.use(cors())

// Routes
app.use('/users', userRoutes);
app.use('/languages', languagesRoutes);
app.use('/notions', notionRoutes);
app.use('/admins', adminRoutes);
app.use('/userlanguages', userLanguageRoutes);

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