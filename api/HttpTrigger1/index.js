const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = 3001;

// Sample data for cars
let cars = [];

app.use(bodyParser.json());
app.use(cors());

// Route to get all cars
app.get('/cars', (req, res) => {
    res.json(cars);
});

// Route to add a new car
app.post('/cars', (req, res) => {
    const newCar = req.body;
    cars.push(newCar);
    res.json(newCar);
});

// Route to delete a car by ID (index in this case)
app.delete('/cars/:id', (req, res) => {
    const id = req.params.id;
    cars.splice(id, 1);
    res.send('Car deleted successfully');
});

// Route for the root URL
app.get('/', (req, res) => {
    // Load cars from the JSON file
    fs.readFile('cars.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading cars.json:', err);
            return res.status(500).send('Error reading cars.json');
        }
        try {
            cars = JSON.parse(data);
            res.send('Cars loaded successfully from cars.json');
        } catch (error) {
            console.error('Error parsing cars.json:', error);
            res.status(500).send('Error parsing cars.json');
        }
    });    
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
