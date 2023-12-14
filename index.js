const express = require('express');
const mongoose = require('mongoose');
const expressHandlebars = require('express-handlebars')
const path = require('path')
const todoRoutes = require('./routes/todos')

const PORT = process.env.PORT || 3000;

const app = express();
const handlebars = expressHandlebars.create({
  defaultLayout: 'main',
  extname: 'hbs',
  partialsDir: [
    'views/layouts/partials/', // Путь к директории с частичными шаблонами
  ],
});


app.engine('hbs', handlebars.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

app.use(todoRoutes);

async function start() {
  try {
    await mongoose.connect('mongodb+srv://aaa:naprimer123456@cluster0.juh3x50.mongodb.net/todos', {})
    
    app.listen(PORT, () => {
      console.log('Server has been started...')
    })
  } catch (error) {
    console.log(error)
  }
}

start()