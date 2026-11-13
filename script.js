const roomPrice = document.getElementById("roomPrice");
const checkin = document.getElementById("checkin");
const checkout = document.getElementById("checkout");
const total = document.getElementById("total");

const today = new Date().toLocaleDateString("en-CA");

checkin.min = today;
checkout.min = today;

function selectRoom(price) {
    roomPrice.value = price;
    document.getElementById("booking").scrollIntoView({
        behavior: "smooth"
    });
    calculatePrice();
}

function calculatePrice() {
    if (!checkin.value || !checkout.value) {
        total.textContent = "Total: ₹0";
        return;
    }

    const start = new Date(checkin.value);
    const end = new Date(checkout.value);

    const nights = Math.round(
        (end - start) / 86400000
    );

    if (nights <= 0) {
        total.textContent = "Select valid dates";
        return;
    }

    total.textContent =
        "Total: ₹" + (nights * Number(roomPrice.value));
}

roomPrice.addEventListener("change", calculatePrice);
checkin.addEventListener("change", function() {
    checkout.min = checkin.value;
    if (checkout.value && checkout.value <= checkin.value) {
        checkout.value = "";
    }
    calculatePrice();
});
checkout.addEventListener("change", calculatePrice);

document.getElementById("bookingForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const start = new Date(checkin.value);
    const end = new Date(checkout.value);
    const nights = Math.round((end - start) / 86400000);

    if (nights <= 0) {
        alert("Please select valid check-in and check-out dates.");
        return;
    }

    const amount = nights * Number(roomPrice.value);
    const name = document.getElementById("name").value;

    document.getElementById("message").textContent =
        "Thank you " + name +
        "! Demo booking confirmed. Total: ₹" + amount;

    this.reset();
    total.textContent = "Total: ₹0";
});