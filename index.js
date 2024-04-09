const express = require('express');
const app = express();
const cars = require('./cars.json');

app.use(express.json());

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Get all cars
app.get('/cars', (req, res) => {
    res.json(cars);
});

// Get car by id
app.get('/cars/:id', (req, res) => {
    const id = req.params.id;
    const car = cars.find(car => car.id === id);
    if (!car) {
        res.status(404).json({ message: 'Car not found' });
    } else {
        res.json(car);
    }
});

// Update car
app.put('/cars/:id', (req, res) => {
    const id = req.params.id;
    const updatedCar = req.body;
    const index = cars.findIndex(car => car.id === id);
    if (index === -1) {
        res.status(404).json({ message: 'Car not found' });
    } else {
        cars[index] = updatedCar;
        res.json(updatedCar);
    }
});

// Delete car
app.delete('/cars/:id', (req, res) => {
    const id = req.params.id;
    const index = cars.findIndex(car => car.id === id);
    if (index === -1) {
        res.status(404).json({ message: 'Car not found' });
    } else {
        cars.splice(index, 1);
        res.json({ message: `Car with id ${id} deleted` });
    }
});

// Add car
app.post('/cars', (req, res) => {
    const newCar = req.body;
    cars.push(newCar);
    res.status(201).json(newCar);
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});
