document.addEventListener('DOMContentLoaded', () => {
    const loadCarsBtn = document.getElementById('loadCarsBtn');
    const carList = document.getElementById('carList');
    cars = [];
    loadCarsBtn.addEventListener('click', () => {
        fetch('http://localhost:3001/cars')
            .then(response => response.json())
            .then(data => {
                cars = data;
                carList.innerHTML = '';
                data.forEach((car, index) => {
                    const carCard = document.createElement('div');
                    carCard.classList.add('car-card');
                    carCard.innerHTML = `
                        <h2>${car.make} ${car.model}</h2>
                        <p><strong>Year:</strong> ${car.year}</p>
                        <p><strong>Make:</strong> ${car.make}</p>
                        <p><strong>Model:</strong> ${car.model}</p>
                        <p><strong>Price:</strong> R${car.price}</p>
                        <button class="btn btn-remove" data-index="${index}">Remove</button>
                    `;
                    carList.appendChild(carCard);
                });
            })
            .catch(error => {
                console.error('Error fetching car data:', error);
            });
    });
});
function removeCar(index) {
    const carId = cars[index].id;
    
    // Send a DELETE request to remove the car from the server
    fetch(`http://localhost:3001/cars/${carId}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to delete car');
        }
        // If the deletion from the server is successful, remove the car from the UI
        const carCardToRemove = document.querySelector(`.car-card[data-index="${index}"]`);
        if (carCardToRemove) {
            carCardToRemove.remove();
        }
        console.log('Car deleted successfully');
        
        // Trigger the click event of the loadCarsBtn button after deleting the car
        loadCarsBtn.click();
    })
    .catch(error => {
        console.error('Error deleting car:', error);
    });
}

function addCar(newCar) {
    fetch('http://localhost:3001/cars', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newCar)
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

carForm.addEventListener('submit', event => {
    event.preventDefault();
    const make = document.getElementById('make').value;
    const model = document.getElementById('model').value;
    const year = document.getElementById('year').value;
    const price = document.getElementById('price').value;
    addCar({ make, model, year, price });
    carForm.reset();
});

// Function to remove a car

// Event delegation for remove buttons
carList.addEventListener('click', event => {
    if (event.target.classList.contains('btn-remove')) {
        const index = event.target.dataset.index;
        removeCar(index);
    }
});