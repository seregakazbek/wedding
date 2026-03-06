/* =========================
   ТАЙМЕР ДО СВАДЬБЫ
========================= */
const weddingDate = new Date("September 19, 2026 16:00:00").getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    if (distance < 0) {
        if(document.querySelector(".countdown")) document.querySelector(".countdown").innerHTML = "День свадьбы настал!";
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if(document.getElementById("days")) document.getElementById("days").innerText = days;
    if(document.getElementById("hours")) document.getElementById("hours").innerText = hours;
    if(document.getElementById("minutes")) document.getElementById("minutes").innerText = minutes;
    if(document.getElementById("seconds")) document.getElementById("seconds").innerText = seconds;
}

setInterval(updateCountdown, 1000);
updateCountdown();

/* =========================
   БУРГЕР-МЕНЮ
========================= */
function toggleMenu() {
    const menu = document.getElementById("menu");
    if (menu) {
        menu.style.display = (menu.style.display === "flex") ? "none" : "flex";
    }
}

/* =========================
   RSVP ФОРМА
========================= */
const scriptURL = "https://script.google.com/macros/s/AKfycbxAipTCrJusTCRBML-LhyibtgDE0FPDjsYwSSmYbG0VS7OvAnAwbdcWXfEqpM_cbEOL/exec";

const form = document.getElementById("rsvp-form");
const toggleBtn = document.getElementById("toggleForm");
const container = document.getElementById("rsvpContainer");
const responseMessage = document.getElementById("response-message");

if (toggleBtn && container) {
    toggleBtn.addEventListener("click", function() {
        container.classList.toggle("show");
        toggleBtn.innerText = container.classList.contains("show") ? "Скрыть форму" : "Подтвердить!";
    });
}

if (form) {
    form.addEventListener("submit", function(e) {
        e.preventDefault();
        const btn = form.querySelector('.send-btn');
        const originalText = btn.innerText;
        btn.innerText = "Отправляем...";
        btn.disabled = true;

        const formData = new FormData();
        formData.append("Имя", document.getElementById("mainName").value);
        formData.append("Количество", document.getElementById("totalCount").value);
        formData.append("Имена_гостей", document.getElementById("guestsNames").value);
        formData.append("Алкоголь", document.querySelector('input[name="alcohol"]:checked').value);
        formData.append("Присутствие", document.querySelector('input[name="attendance"]:checked').value);
        formData.append("Комментарий", document.getElementById("message").value);
        formData.append("Дата_заявки", new Date().toLocaleString());

        fetch(scriptURL, { method: 'POST', body: formData, mode: 'no-cors' })
        .then(() => {
            responseMessage.innerText = "Спасибо! Ответ успешно отправлен.";
            responseMessage.style.color = "green";
            form.reset();
            btn.innerText = "Отправлено!";
            setTimeout(() => {
                container.classList.remove("show");
                btn.innerText = originalText;
                btn.disabled = false;
                toggleBtn.innerText = "Подтвердить!";
            }, 3000);
        })
        .catch(error => {
            console.error('Ошибка!', error);
            responseMessage.innerText = "Ошибка отправки. Попробуйте еще раз.";
            responseMessage.style.color = "red";
            btn.disabled = false;
            btn.innerText = originalText;
        });
    });
}

/* =========================
   АНИМАЦИЯ ПОЯВЛЕНИЯ ПРИ СКРОЛЛЕ
========================= */
const observerOptions = { threshold: 0.1 };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.invitation, .wishes, .schedule, .map-section, .couple-photo').forEach(section => {
    section.classList.add('hidden-up');
    observer.observe(section);
});
