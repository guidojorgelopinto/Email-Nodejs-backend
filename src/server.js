const express = require('express')
const app = express()
const port = 3000

const { sequelize } = require('./models/index');

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Rutas
app.use(require('./routes/routes'));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);

  sequelize.authenticate().then(() => {
    console.log('Nos hemos conectado a la base de datos!!');
  })
});