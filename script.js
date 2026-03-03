// Таймер
const weddingDate = new Date("September 19, 2026 16:00:00").getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").innerText = days;
    document.getElementById("hours").innerText = hours;
    document.getElementById("minutes").innerText = minutes;
    document.getElementById("seconds").innerText = seconds;
}

setInterval(updateCountdown, 1000);
updateCountdown();


// Бургер-меню
function toggleMenu() {
    const menu = document.getElementById("menu");
    menu.style.display = menu.style.display === "flex" ? "none" : "flex";
}

const scriptURL = "https://script.google.com/macros/s/AKfycbx51pkPv6_Fiflk1MOwm73nzLQcy39ughG1NcRAg1JUN934TY6HUNV6tkz1LB2kz4VQ/exec";

document.getElementById("rsvp-form").addEventListener("submit", function(e) {
    e.preventDefault();

    const data = {
        name: document.getElementById("name").value,
        attendance: document.querySelector('input[name="attendance"]:checked').value,
        message: document.getElementById("message").value
    };

    fetch(scriptURL, {
        method: "POST",
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById("response-message").innerText = "Спасибо за ответ!";
        document.getElementById("rsvp-form").reset();
    })
    .catch(error => {
        document.getElementById("response-message").innerText = "Ошибка отправки.";
    });
});