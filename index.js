const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

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

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
