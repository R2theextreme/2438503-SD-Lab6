document.addEventListener('DOMContentLoaded', function() {
    const loadCarsBtn = document.getElementById('loadCarsBtn');
    const carList = document.getElementById('carList');
    const carForm = document.getElementById('carForm');

    // Function to fetch cars from the backend API
    function fetchCars() {
        fetch('/cars')
            .then(response => response.json())
            .then(cars => {
                // Clear existing car list
                carList.innerHTML = '';
                // Display each car in the list
                cars.forEach(car => {
                    const carItem = document.createElement('div');
                    carItem.classList.add('car-card');
                    carItem.innerHTML = `
                        <h2>${car.make} ${car.model}</h2>
                        <p>Year: ${car.year}</p>
                        <p>Color: ${car.color}</p>
                        <p>Price: ${car.price}</p>
                        <button class="deleteBtn" data-id="${car.id}">Delete</button>
                    `;
                    carList.appendChild(carItem);
                });
            })
            .catch(error => console.error('Error fetching cars:', error));
    }

    // Event listener for clicking "Load Cars" button
    loadCarsBtn.addEventListener('click', function() {
        fetchCars();
    });

    // Event listener for submitting the car form
    carForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const formData = new FormData(carForm);
        const newCar = {
            make: formData.get('make'),
            model: formData.get('model'),
            year: formData.get('year'),
            color: formData.get('color'),
            price: formData.get('price')
        };
        fetch('/cars', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newCar)
        })
        .then(response => response.json())
        .then(() => {
            // Refresh car list after adding a new car
            fetchCars();
            // Reset form fields
            carForm.reset();
        })
        .catch(error => console.error('Error adding car:', error));
    });

    // Event delegation for delete buttons
    carList.addEventListener('click', function(event) {
        if (event.target.classList.contains('deleteBtn')) {
            const carId = event.target.dataset.id;
            fetch(`/cars/${carId}`, {
                method: 'DELETE'
            })
            .then(() => {
                // Refresh car list after deleting a car
                fetchCars();
            })
            .catch(error => console.error('Error deleting car:', error));
        }
    });

    // Load cars when the page loads
    fetchCars();
});
