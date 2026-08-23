/* =========================
   MENU MOBILE
========================= */

const menuBtn = document.getElementById("menu-btn");
const menu = document.getElementById("menu");

menuBtn.addEventListener("click", () => {

    menu.classList.toggle("active");

    const aberto = menu.classList.contains("active");

    menuBtn.setAttribute(
        "aria-label",
        aberto ? "Fechar menu" : "Abrir menu"
    );

});


/* Fecha o menu ao clicar em um link */

const linksMenu = document.querySelectorAll(".menu a");

linksMenu.forEach((link) => {

    link.addEventListener("click", () => {

        menu.classList.remove("active");

        menuBtn.setAttribute(
            "aria-label",
            "Abrir menu"
        );

    });

});


/* =========================
   SIMULADOR
========================= */

const setpoint = document.getElementById("setpoint");
const setpointValue = document.getElementById("setpointValue");
const simulateButton = document.getElementById("simulateButton");
const simulationResult = document.getElementById("simulationResult");

let temperaturaAtual = 27;


/* Atualiza o número do slider */

setpoint.addEventListener("input", () => {

    setpointValue.textContent = setpoint.value;

});


/* Executa a simulação */

simulateButton.addEventListener("click", () => {

    const temperaturaDesejada = Number(setpoint.value);

    if (temperaturaAtual < temperaturaDesejada) {

        simulationResult.innerHTML =
            `🔥 A temperatura atual é <strong>${temperaturaAtual} °C</strong>.
            O sistema identifica que a água precisa ser aquecida
            até aproximadamente <strong>${temperaturaDesejada} °C</strong>.`;

    }

    else if (temperaturaAtual > temperaturaDesejada) {

        simulationResult.innerHTML =
            `❄️ A temperatura atual é <strong>${temperaturaAtual} °C</strong>.
            Ela está acima do valor programado de
            <strong>${temperaturaDesejada} °C</strong>.`;

    }

    else {

        simulationResult.innerHTML =
            `✅ A temperatura está em <strong>${temperaturaAtual} °C</strong>.
            O sistema não precisa aumentar o aquecimento.`;

    }

});


/* =========================
   ANIMAÇÃO AO APARECER
========================= */

const sections = document.querySelectorAll(".section");

const observer = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

            }

        });

    },
    {
        threshold: 0.12
    }
);

sections.forEach((section) => {

    observer.observe(section);

});
