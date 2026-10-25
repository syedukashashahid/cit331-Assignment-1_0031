// Find the page elements
const form = document.getElementById("register-form");
const message = document.getElementById("message");
const tbody = document.getElementById("registrations-body");
const clearButton = document.getElementById("clear-all");

// Read the saved list from localStorage (or an empty list)
function loadRegistrations() {
    return JSON.parse(localStorage.getItem("registrations")) || [];
}

// Show every saved registration as a table row
function showRegistrations() {
    tbody.innerHTML = "";
    for (const person of loadRegistrations()) {
        const row = document.createElement("tr");
        const values = [person.name, person.email, person.phone, person.event, person.hear];
        for (const value of values) {
            const cell = document.createElement("td");
            cell.textContent = value;
            row.appendChild(cell);
        }
        tbody.appendChild(row);
    }
}

// When the form is submitted
form.addEventListener("submit", function (event) {
    event.preventDefault();

    const person = {
        name: document.getElementById("fullname").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        event: document.getElementById("event").value,
        hear: document.querySelector('input[name="hear"]:checked').value
    };

    const list = loadRegistrations();
    list.push(person);
    localStorage.setItem("registrations", JSON.stringify(list));

    message.textContent = "Thank you, " + person.name + "! You are registered.";
    form.reset();
    showRegistrations();
});

// When "Clear all" is clicked
clearButton.addEventListener("click", function () {
    localStorage.removeItem("registrations");
    message.textContent = "All registrations cleared.";
    showRegistrations();
});

// Show saved registrations when the page opens
showRegistrations();