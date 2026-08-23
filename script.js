/* =====================================================
   MENU MOBILE
===================================================== */

const menuBtn = document.getElementById("menu-btn");
const menu = document.getElementById("menu");

if (menuBtn && menu) {

    menuBtn.addEventListener("click", () => {

        const aberto = menu.classList.toggle("active");

        menuBtn.setAttribute(
            "aria-expanded",
            aberto
        );

        menuBtn.innerHTML = aberto
            ? '<i class="fa-solid fa-xmark"></i>'
            : '<i class="fa-solid fa-bars"></i>';

    });

    // Fecha o menu ao clicar em um link

    const links = menu.querySelectorAll("a");

    links.forEach(link => {

        link.addEventListener("click", () => {

            menu.classList.remove("active");

            menuBtn.setAttribute(
                "aria-expanded",
                "false"
            );

            menuBtn.innerHTML =
                '<i class="fa-solid fa-bars"></i>';

        });

    });
}


/* =====================================================
   BOTÃO VOLTAR AO TOPO
===================================================== */

const topBtn = document.createElement("button");

topBtn.id = "topBtn";
topBtn.className = "top-btn";

topBtn.innerHTML =
    '<i class="fa-solid fa-arrow-up"></i>';

topBtn.setAttribute(
    "aria-label",
    "Voltar ao topo"
);

document.body.appendChild(topBtn);


window.addEventListener("scroll", () => {

    if (window.scrollY > 400) {

        topBtn.classList.add("show");

    } else {

        topBtn.classList.remove("show");

    }

});


topBtn.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});

/* =====================================================
   SIMULADOR
===================================================== */

const simularBtn = document.getElementById("simularBtn");

const tempAtual = document.getElementById("tempAtual");
const tempDesejada = document.getElementById("tempDesejada");
const sol = document.getElementById("sol");

const diferenca = document.getElementById("diferenca");
const tempo = document.getElementById("tempo");
const porcentagem = document.getElementById("porcentagem");

const barraProgresso =
    document.getElementById("barraProgresso");

const statusSistema =
    document.getElementById("statusSistema");

const explicacao =
    document.getElementById("explicacao");


function executarSimulacao() {

    const atual = Number(tempAtual.value);
    const desejada = Number(tempDesejada.value);
    const intensidadeSolar = Number(sol.value);


    /* ===============================
       VALIDAÇÃO
    =============================== */

    if (
        !Number.isFinite(atual) ||
        !Number.isFinite(desejada) ||
        !Number.isFinite(intensidadeSolar)
    ) {

        statusSistema.innerHTML =
            '<i class="fa-solid fa-triangle-exclamation"></i> ' +
            'Preencha todos os campos corretamente.';

        return;
    }


    if (atual < 5 || atual > 45) {

        statusSistema.innerHTML =
            '<i class="fa-solid fa-triangle-exclamation"></i> ' +
            'A temperatura atual deve estar entre 5 °C e 45 °C.';

        return;
    }


    if (desejada < 15 || desejada > 40) {

        statusSistema.innerHTML =
            '<i class="fa-solid fa-triangle-exclamation"></i> ' +
            'A temperatura desejada deve estar entre 15 °C e 40 °C.';

        return;
    }


    /* ===============================
       DIFERENÇA DE TEMPERATURA
    =============================== */

    const delta = desejada - atual;

    diferenca.textContent =
        `${delta.toFixed(1)} °C`;


    /* ===============================
       TEMPERATURA ATINGIDA
    =============================== */

    if (delta <= 0) {

        tempo.textContent = "0 h";

        porcentagem.textContent = "0%";

        barraProgresso.style.width = "0%";


        statusSistema.innerHTML =
            '<i class="fa-solid fa-circle-check"></i> ' +
            'Temperatura atingida! O aquecimento pode permanecer desligado.';


        explicacao.innerHTML = "";

        return;
    }


    /* ===============================
       NECESSIDADE DE AQUECIMENTO
    =============================== */

    let necessidade =
        (delta / 10) * 100;

    necessidade =
        Math.max(
            0,
            Math.min(
                necessidade,
                100
            )
        );


    /* ===============================
       CONTRIBUIÇÃO SOLAR
    =============================== */

    const contribuicaoSolar =
        intensidadeSolar * 0.35;

    const necessidadeComplementar =
        Math.max(
            0,
            necessidade * (1 - contribuicaoSolar)
        );


    /* ===============================
       TEMPO ESTIMADO
    =============================== */

    let tempoEstimado =
        delta * 0.35;

    tempoEstimado *=
        (1 - intensidadeSolar * 0.25);

    tempoEstimado =
        Math.max(
            tempoEstimado,
            0.2
        );


    tempo.textContent =
        `${tempoEstimado.toFixed(1)} h`;


    /* ===============================
       BARRA DE AQUECIMENTO
    =============================== */

    porcentagem.textContent =
        `${Math.round(necessidadeComplementar)}%`;

    barraProgresso.style.width =
        `${necessidadeComplementar}%`;

    /* ===============================
       STATUS
    =============================== */

    statusSistema.innerHTML =
        '<i class="fa-solid fa-fire"></i> ' +
        'Aquecimento necessário. O controlador pode acionar o sistema.';


    /* ===============================
       EXPLICAÇÃO
    =============================== */

    explicacao.innerHTML = "";

       
}


/* =====================================================
   BOTÃO DO SIMULADOR
===================================================== */

if (simularBtn) {

    simularBtn.addEventListener(
        "click",
        executarSimulacao
    );

}


/* =====================================================
   SIMULAÇÃO INICIAL
===================================================== */

if (
    tempAtual &&
    tempDesejada &&
    sol
) {

    executarSimulacao();

}


/* =====================================================
   EFEITO DE REVELAÇÃO
===================================================== */

const elementosAnimados =
    document.querySelectorAll(
        ".card, .section-title"
    );


if ("IntersectionObserver" in window) {

    const observer =
        new IntersectionObserver(
            (entries) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "visible"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.12
            }
        );


    elementosAnimados.forEach(element => {

        observer.observe(element);

    });

}


/* =====================================================
   TECLA ESC FECHA MENU
===================================================== */

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Escape" &&
            menu &&
            menu.classList.contains("active")
        ) {

            menu.classList.remove("active");


            if (menuBtn) {

                menuBtn.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuBtn.innerHTML =
                    '<i class="fa-solid fa-bars"></i>';

            }

        }

    }
);
