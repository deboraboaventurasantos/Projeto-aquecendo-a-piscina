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

const simularBtn =
    document.getElementById("simularBtn");

const tempAtual =
    document.getElementById("tempAtual");

const tempDesejada =
    document.getElementById("tempDesejada");

const sol =
    document.getElementById("sol");

const diferenca =
    document.getElementById("diferenca");

const tempo =
    document.getElementById("tempo");

const porcentagem =
    document.getElementById("porcentagem");

const barraProgresso =
    document.getElementById("barraProgresso");

const statusSistema =
    document.getElementById("statusSistema");

const explicacao =
    document.getElementById("explicacao");


/*
    Simulador didático.

    Ele representa a lógica:

    SENSOR
       ↓
    CONTROLADOR
       ↓
    DECISÃO
       ↓
    AQUECIMENTO / BOMBA

    Os valores não representam o dimensionamento
    real de uma piscina.
*/


function executarSimulacao() {

    /* =================================================
       VERIFICAÇÃO DOS ELEMENTOS
    ================================================= */

    if (
        !tempAtual ||
        !tempDesejada ||
        !sol ||
        !diferenca ||
        !tempo ||
        !porcentagem ||
        !barraProgresso ||
        !statusSistema ||
        !explicacao
    ) {

        console.error(
            "Elementos do simulador não foram encontrados no HTML."
        );

        return;
    }


    /* =================================================
       PEGAR VALORES
    ================================================= */

    const atual =
        Number(tempAtual.value);

    const desejada =
        Number(tempDesejada.value);

    const intensidadeSolar =
        Number(sol.value);


    /* =================================================
       VALIDAÇÃO
    ================================================= */

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


    /* =================================================
       DIFERENÇA DE TEMPERATURA
    ================================================= */

    const delta =
        desejada - atual;


    diferenca.textContent =
        `${delta.toFixed(1)} °C`;


    /* =================================================
       TEMPERATURA JÁ ATINGIDA
    ================================================= */

    if (delta <= 0) {

        tempo.textContent =
            "0 h";

        porcentagem.textContent =
            "0%";

        barraProgresso.style.width =
            "0%";


        statusSistema.innerHTML =
            '<i class="fa-solid fa-circle-check"></i> ' +
            'Temperatura atingida! O aquecimento pode permanecer desligado.';


        explicacao.innerHTML = `

            <h4>
                Sistema estabilizado
            </h4>

            <p>
                O sensor identificou
                <strong>${atual.toFixed(1)} °C</strong>,
                enquanto a temperatura desejada é
                <strong>${desejada.toFixed(1)} °C</strong>.
            </p>

            <p>
                Como a água já atingiu ou ultrapassou a
                temperatura programada, o controlador pode
                manter o aquecimento desligado.
            </p>

            <p>
                O sensor continua realizando medições.
                Caso a temperatura volte a diminuir,
                o sistema poderá acionar novamente
                o aquecimento.
            </p>

        `;

        return;
    }


    /* =================================================
       NECESSIDADE DE AQUECIMENTO
    ================================================= */

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


    /* =================================================
       CONTRIBUIÇÃO SOLAR
    ================================================= */

    /*
       O valor escolhido no campo "Intensidade solar"
       varia de 0 a 1.

       Aqui usamos esse valor apenas para criar
       uma representação visual da contribuição
       da energia solar.
    */

    const contribuicaoSolar =
        intensidadeSolar * 0.35;


    const necessidadeComplementar =
        Math.max(
            0,
            necessidade * (1 - contribuicaoSolar)
        );


    /* =================================================
       TEMPO ESTIMADO
    ================================================= */

    /*
       Modelo didático:

       Quanto maior a diferença de temperatura,
       maior será o tempo estimado.

       A intensidade solar reduz um pouco
       esse tempo no modelo.
    */

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


    /* =================================================
       BARRA DE NECESSIDADE
    ================================================= */

    porcentagem.textContent =
        `${Math.round(necessidadeComplementar)}%`;


    barraProgresso.style.width =
        `${necessidadeComplementar}%`;


    /* =================================================
       TEXTO SOBRE A INTENSIDADE SOLAR
    ================================================= */

    let textoSol;


    if (intensidadeSolar === 0) {

        textoSol =
            "sem contribuição solar significativa";

    }

    else if (intensidadeSolar <= 0.3) {

        textoSol =
            "com baixa contribuição solar";

    }

    else if (intensidadeSolar <= 0.6) {

        textoSol =
            "com contribuição solar moderada";

    }

    else if (intensidadeSolar <= 0.8) {

        textoSol =
            "com boa contribuição solar";

    }

    else {

        textoSol =
            "com alta contribuição solar";

    }


    /* =================================================
       STATUS DO SISTEMA
    ================================================= */

    statusSistema.innerHTML =
        '<i class="fa-solid fa-fire"></i> ' +
        'Aquecimento necessário. O controlador pode acionar o sistema.';


    /* =================================================
       EXPLICAÇÃO
    ================================================= */

    explicacao.innerHTML = `

        <h4>
            Resultado da simulação
        </h4>

        <p>
            O sensor identificou uma temperatura de
            <strong>${atual.toFixed(1)} °C</strong>,
            enquanto o valor programado é
            <strong>${desejada.toFixed(1)} °C</strong>.
        </p>

        <p>
            A diferença de temperatura é de
            <strong>${delta.toFixed(1)} °C</strong>.
            Como a água está abaixo da temperatura
            desejada, o controlador entende que
            o aquecimento deve ser acionado.
        </p>

        <p>
            A condição solar foi configurada como
            <strong>${textoSol}</strong>.
            Neste modelo didático, uma maior
            intensidade solar diminui a necessidade
            de aquecimento complementar.
        </p>

        <p>
            A necessidade estimada de aquecimento
            complementar é de aproximadamente
            <strong>${Math.round(necessidadeComplementar)}%</strong>.
        </p>

        <p>
            O tempo estimado de
            <strong>${tempoEstimado.toFixed(1)} horas</strong>
            é apenas uma representação educativa.
            Um sistema real precisaria considerar
            fatores como volume de água, potência
            térmica, área dos coletores, temperatura
            ambiente, perdas de calor e condições
            climáticas.
        </p>

    `;

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
