const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Restaurant = require('./models/model.js');


// Query 
app.get('/api/restaurantapps', async (req, res) => {
  const restaurantId = req.query.id;
  console.log(`Restoran ID'si alındı: ${restaurantId}`);
  try {
    const restaurant = await Restaurant.findOne({ 'businesses.id': restaurantId });
    console.log('Bulunan restoran:', restaurant);
    if (!restaurant) {
      console.log('Restoran bulunamadı');
      return res.status(404).json({ error: "Restoran bulunamadı" });
    }
    const business = restaurant.businesses.find(business => business.id === restaurantId);
    console.log('Bulunan business:', business);
    if (!business) {
      console.log('Restoran businesses içinde bulunamadı');
      return res.status(404).json({ error: "Restoran bulunamadı" });
    }
    res.json(business);
  } catch (error) {
    console.error('Hata:', error.stack);
    res.status(500).json({ error: "Veri alırken bir hata oluştu", details: error.message });
  }
});


mongoose.connect('mongodb://localhost:27017/Internday', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB'ye başarıyla bağlanıldı"))
  .catch(err => {
    console.error('MongoDB bağlantı hatası:', err);
    process.exit(1); // Bağlantı hatası olduğunda süreçten çıkmak için koydum 
  });

app.listen(5000, () => {
  console.log('Server is Running!!!');
});
