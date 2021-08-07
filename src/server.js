const express = require('express')
const app = express()
const port = 3000

const cors = require('cors')

app.use(cors())

const { sequelize } = require('./models/index');

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Rutas
app.use(require('./routes/routes'));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);

  sequelize.authenticate().then(() => {
    console.log('Estoy conectado!!');
  })
});