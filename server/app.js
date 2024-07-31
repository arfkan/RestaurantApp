

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); 

const app = express();


app.use(cors());


app.get('/api/users', async (req, res) => {
  try {
    const users = await Model.find(); 
    res.json(users); 
  } catch (err) {
    res.status(500).json({ error: 'Veri alırken bir hata oluştu' });
  }
});


mongoose.connect('mongodb://localhost:27017/Internday', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB'ye başarıyla bağlanıldı"))
  .catch(err => console.error('MongoDB bağlantı hatası:', err));

const userSchema = new mongoose.Schema({
  name: String,
  age: Number
});

const Model = mongoose.model('restaurantapps', userSchema);

app.listen(5000, () => {
  console.log('Server is Running!!!');
});

