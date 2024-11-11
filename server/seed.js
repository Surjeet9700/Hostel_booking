const mongoose = require('mongoose');
const Hostel = require('./models/hostels'); // Adjust the path as needed
require('dotenv').config();

const dbConnectionString = process.env.MONGO_CONNECTION_STRING;

const hostelData = [
    {
        "id": 1,
        "title": "Cozy Hostel Room near Charminar",
        "image": "/images/charminar_hostel.jpg",
        "price": 1500,
        "rating": 4.5,
        "reviews": 60,
        "type": "Shared room",
        "beds": 2
    },
    {
        "id": 2,
        "title": "Luxurious PG near Hitech City",
        "image": "/images/hitech_city_pg.jpg",
        "price": 3000,
        "rating": 4.8,
        "reviews": 120,
        "type": "Private room",
        "beds": 1
    },
    {
        "id": 3,
        "title": "Affordable Hostel in Banjara Hills",
        "image": "/images/banjara_hills_hostel.jpg",
        "price": 1200,
        "rating": 4.3,
        "reviews": 85,
        "type": "Shared room",
        "beds": 4
    },
    {
        "id": 4,
        "title": "Premium Suite in Jubilee Hills",
        "image": "/images/jubilee_hills_suite.jpg",
        "price": 5000,
        "rating": 4.9,
        "reviews": 50,
        "type": "Entire apartment",
        "beds": 1
    },
    {
        "id": 5,
        "title": "Backpacker’s Haven near Secunderabad",
        "image": "/images/secunderabad_backpacker.jpg",
        "price": 900,
        "rating": 4.2,
        "reviews": 40,
        "type": "Dormitory",
        "beds": 8
    },
    {
        "id": 6,
        "title": "Budget PG in Madhapur",
        "image": "/images/madhapur_pg.jpg",
        "price": 1300,
        "rating": 4.4,
        "reviews": 75,
        "type": "Shared room",
        "beds": 2
    },
    {
        "id": 7,
        "title": "Student Hostel near Osmania University",
        "image": "/images/osmania_university_hostel.jpg",
        "price": 1100,
        "rating": 4.1,
        "reviews": 45,
        "type": "Dormitory",
        "beds": 6
    },
    {
        "id": 8,
        "title": "Ladies PG near Kachiguda",
        "image": "/images/kachiguda_pg.jpg",
        "price": 1700,
        "rating": 4.5,
        "reviews": 30,
        "type": "Shared room",
        "beds": 2
    },
    {
        "id": 9,
        "title": "Corporate Stay near Gachibowli",
        "image": "/images/gachibowli_corporate.jpg",
        "price": 3200,
        "rating": 4.7,
        "reviews": 100,
        "type": "Entire apartment",
        "beds": 1
    },
    {
        "id": 10,
        "title": "Peaceful Hostel in Shamirpet",
        "image": "/images/shamirpet_hostel.jpg",
        "price": 1400,
        "rating": 4.3,
        "reviews": 55,
        "type": "Shared room",
        "beds": 3
    },
    {
        "id": 11,
        "title": "Executive PG in Kondapur",
        "image": "/images/kondapur_pg.jpg",
        "price": 2700,
        "rating": 4.6,
        "reviews": 65,
        "type": "Private room",
        "beds": 1
    },
    {
        "id": 12,
        "title": "Central Hostel near LB Nagar",
        "image": "/images/lb_nagar_hostel.jpg",
        "price": 1250,
        "rating": 4.2,
        "reviews": 48,
        "type": "Shared room",
        "beds": 4
    }
];

mongoose.connect(dbConnectionString, {
    
})
    .then(() => {
        console.log('MongoDB Connected');
        return Hostel.insertMany(hostelData);
    })
    .then(() => {
        console.log('Hostels added to database');
        mongoose.connection.close();
    })
    .catch(err => {
        console.error(err);
        mongoose.connection.close();
    });