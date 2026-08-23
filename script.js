/* =====================================================
   MENU RESPONSIVO
===================================================== */

const menuBtn = document.getElementById("menu-btn");
const menu = document.getElementById("menu");


menuBtn.addEventListener("click", () => {

    menu.classList.toggle("active");

    const aberto =
        menu.classList.contains("active");

    menuBtn.setAttribute(
        "aria-expanded",
        aberto
    );

    menuBtn.setAttribute(
        "aria-label",
        aberto
            ? "Fechar menu"
            : "Abrir menu"
    );

});


/* =====================================================
   FECHAR MENU AO CLICAR EM UM LINK
===================================================== */

const linksMenu =
    document.querySelectorAll(".menu a");


linksMenu.forEach((link) => {

    link.addEventListener("click", () => {

        menu.classList.remove("active");

        menuBtn.setAttribute(
            "aria-expanded",
            "false"
        );

        menuBtn.setAttribute(
            "aria-label",
            "Abrir menu"
        );

    });

});


/* =====================================================
   SIMULADOR DE TEMPERATURA
===================================================== */

const setpoint =
    document.getElementById("setpoint");

const setpointValue =
    document.getElementById("setpointValue");

const simulateButton =
    document.getElementById("simulateButton");

const simulationResult =
    document.getElementById("simulationResult");

const temperature =
    document.getElementById("temperature");


/*
    Temperatura inicial utilizada
    apenas para a simulação.
*/

let temperaturaAtual = 27;


/* =====================================================
   ATUALIZA O VALOR DO SLIDER
===================================================== */

setpoint.addEventListener("input", () => {

    setpointValue.textContent =
        setpoint.value;

});


/* =====================================================
   EXECUTA A SIMULAÇÃO
===================================================== */

simulateButton.addEventListener("click", () => {

    const temperaturaDesejada =
        Number(setpoint.value);


    if (
        temperaturaAtual <
        temperaturaDesejada
    ) {

        simulationResult.innerHTML =

            `🔥 A temperatura atual é
            <strong>${temperaturaAtual} °C</strong>.
            O sistema identifica que a água
            precisa ser aquecida até
            <strong>${temperaturaDesejada} °C</strong>.`;

    }


    else if (
        temperaturaAtual >
        temperaturaDesejada
    ) {

        simulationResult.innerHTML =

            `❄️ A temperatura atual é
            <strong>${temperaturaAtual} °C</strong>.
            Ela está acima da temperatura
            desejada de
            <strong>${temperaturaDesejada} °C</strong>.`;

    }


    else {

        simulationResult.innerHTML =

            `✅ A temperatura está em
            <strong>${temperaturaAtual} °C</strong>.
            O sistema não precisa aumentar
            o aquecimento.`;

    }

});


/* =====================================================
   ANIMAÇÃO DAS SEÇÕES
===================================================== */

const sections =
    document.querySelectorAll(".section");


const observer =
    new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (
                    entry.isIntersecting
                ) {

                    entry.target.classList.add(
                        "visible"
                    );

                }

            });

        },
        {
            threshold: 0.1
        }
    );


sections.forEach((section) => {

    observer.observe(section);

});


/* =====================================================
   FECHAR MENU COM ESC
===================================================== */

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Escape" &&
            menu.classList.contains("active")
        ) {

            menu.classList.remove("active");

            menuBtn.setAttribute(
                "aria-expanded",
                "false"
            );

            menuBtn.setAttribute(
                "aria-label",
                "Abrir menu"
            );

            menuBtn.focus();

        }

    }
);
