const express = require('express')
const app = express()
const path = require('path')

// Configurar el motor de plantillas EJS
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

// Configurar el directorio estático
app.use(express.static(path.join(__dirname, 'public')))

// Configurar las rutas
app.get('/', (req, res) => {
  res.render('crud', { title: 'CRUD EJS + Alpine.js' })
})

// Iniciar el servidor
app.listen(3000, () => {
  console.log('La aplicación está funcionando en el puerto 3000')
})
