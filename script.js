/* =====================================================
   MENU MOBILE
===================================================== */

const menuBtn = document.getElementById("menuBtn");
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

const topBtn = document.getElementById("topBtn");

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
    Este simulador é uma representação didática.

    Ele não representa um dimensionamento real
    de uma instalação de aquecimento.

    O objetivo é demonstrar a lógica de:
    sensor -> controlador -> decisão -> atuador.
*/

function executarSimulacao() {

    const atual = Number(tempAtual.value);
    const desejada = Number(tempDesejada.value);
    const intensidadeSolar = Number(sol.value);

    /* ==========================================
       VALIDAÇÃO
    ========================================== */

    if (
        !Number.isFinite(atual) ||
        !Number.isFinite(desejada)
    ) {

        statusSistema.innerHTML =
            '<i class="fa-solid fa-triangle-exclamation"></i> ' +
            'Preencha os campos corretamente.';

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


    /* ==========================================
       DIFERENÇA DE TEMPERATURA
    ========================================== */

    const delta = desejada - atual;

    diferenca.textContent =
        `${delta.toFixed(1)} °C`;


    /* ==========================================
       TEMPERATURA JÁ ATINGIDA
    ========================================== */

    if (delta <= 0) {

        tempo.textContent = "0 h";

        porcentagem.textContent = "0%";

        barraProgresso.style.width = "0%";

        statusSistema.innerHTML =
            '<i class="fa-solid fa-circle-check"></i> ' +
            'Temperatura atingida. O aquecimento pode permanecer desligado.';

        explicacao.innerHTML = `

            <h4>
                Sistema estabilizado
            </h4>

            <p>
                A temperatura atual é igual ou superior
                à temperatura desejada. O controlador
                pode manter o aquecimento desligado,
                enquanto o sensor continua monitorando
                a água.
            </p>

        `;

        return;
    }


    /* ==========================================
       NECESSIDADE DE AQUECIMENTO
    ========================================== */

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


    /* ==========================================
       EFEITO DA ENERGIA SOLAR
    ========================================== */

    const contribuicaoSolar =
        intensidadeSolar * 0.35;

    const necessidadeComplementar =
        Math.max(
            0,
            necessidade * (1 - contribuicaoSolar)
        );


    /* ==========================================
       TEMPO DIDÁTICO
    ========================================== */

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


    /* ==========================================
       BARRA
    ========================================== */

    porcentagem.textContent =
        `${Math.round(necessidadeComplementar)}%`;

    barraProgresso.style.width =
        `${necessidadeComplementar}%`;


    /* ==========================================
       TEXTO SOBRE O SOL
    ========================================== */

    let textoSol;

    if (intensidadeSolar === 0) {

        textoSol =
            "sem contribuição solar significativa";

    } else if (intensidadeSolar <= 0.3) {

        textoSol =
            "com baixa contribuição solar";

    } else if (intensidadeSolar <= 0.6) {

        textoSol =
            "com contribuição solar moderada";

    } else if (intensidadeSolar <= 0.8) {

        textoSol =
            "com boa contribuição solar";

    } else {

        textoSol =
            "com alta contribuição solar";

    }


    /* ==========================================
       STATUS
    ========================================== */

    statusSistema.innerHTML =
        '<i class="fa-solid fa-fire"></i> ' +
        'Aquecimento necessário. O controlador pode acionar o sistema.';


    /* ==========================================
       EXPLICAÇÃO
    ========================================== */

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
            A diferença é de
            <strong>${delta.toFixed(1)} °C</strong>.
            Como a temperatura está abaixo do valor
            desejado, o controlador entende que o
            aquecimento precisa ser acionado.
        </p>

        <p>
            A condição solar está representada como
            <strong>${textoSol}</strong>.
            Neste modelo didático, uma maior intensidade
            solar reduz a necessidade de aquecimento
            complementar.
        </p>

        <p>
            O tempo apresentado é apenas uma
            <strong>estimativa para fins educativos</strong>.
            Um sistema real precisaria considerar volume
            da piscina, potência dos equipamentos,
            temperatura ambiente, perdas térmicas,
            área dos coletores e outros fatores.
        </p>

    `;

}


    /* ---------------------------------------------
       VALIDAÇÃO
    --------------------------------------------- */

    if (
        isNaN(atual) ||
        isNaN(desejada) ||
    ) {

        statusSistema.innerHTML =
            '<i class="fa-solid fa-triangle-exclamation"></i> ' +
            'Preencha todos os campos corretamente.';

        return;
    }


    if (volume <= 0) {

        statusSistema.innerHTML =
            '<i class="fa-solid fa-triangle-exclamation"></i> ' +
            'O volume precisa ser maior que zero.';

        return;
    }


    /* ---------------------------------------------
       DIFERENÇA DE TEMPERATURA
    --------------------------------------------- */

    const delta =
        desejada - atual;


    diferenca.textContent =
        `${delta.toFixed(1)} °C`;


    /* ---------------------------------------------
       SISTEMA JÁ ESTÁ NA TEMPERATURA?
    --------------------------------------------- */

    if (delta <= 0) {

        potencia.textContent = "0 kW";

        tempo.textContent = "0 h";

        bombaStatus.textContent =
            "Desligada";

        porcentagem.textContent =
            "0%";

        barraProgresso.style.width =
            "0%";

        statusSistema.innerHTML =
            '<i class="fa-solid fa-circle-check"></i> ' +
            'Temperatura atingida. O aquecimento pode permanecer desligado.';

        explicacao.innerHTML = `

            <h4>
                Sistema estabilizado
            </h4>

            <p>
                A temperatura atual já está igual ou acima
                da temperatura programada. Em uma lógica
                de controle, o controlador poderia manter
                o aquecimento desligado e continuar
                monitorando a água.
            </p>

        `;

        return;
    }

    const fatorTemperatura =
        Math.min(delta / 10, 2);


    const aproveitamentoSolar =
        intensidadeSolar * 0.8;





    /* ---------------------------------------------
       TEMPO ESTIMADO
    --------------------------------------------- */

    /*
       Estimativa didática:

       quanto maior o volume e a diferença,
       maior o tempo necessário.
    */

    let tempoEstimado =
        (
            volume *
            delta
        ) /
        (
            potenciaEstimada *
            12000
        );


    /*
       Limita valores absurdos para manter
       a visualização do simulador compreensível.
    */

    tempoEstimado =
        Math.max(
            tempoEstimado,
            0.2
        );


    tempo.textContent =
        `${tempoEstimado.toFixed(1)} h`;

    /* ---------------------------------------------
       NECESSIDADE DE AQUECIMENTO
    --------------------------------------------- */

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


    porcentagem.textContent =
        `${Math.round(necessidade)}%`;


    barraProgresso.style.width =
        `${necessidade}%`;


    /* ---------------------------------------------
       STATUS DO SISTEMA
    --------------------------------------------- */

    let textoSol;

    if (intensidadeSolar === 0) {

        textoSol =
            "sem contribuição solar significativa";

    } else if (intensidadeSolar <= 0.3) {

        textoSol =
            "com baixa contribuição solar";

    } else if (intensidadeSolar <= 0.6) {

        textoSol =
            "com contribuição solar moderada";

    } else {

        textoSol =
            "com boa contribuição solar";

    }


    statusSistema.innerHTML =
        '<i class="fa-solid fa-fire"></i> ' +
        'Aquecimento necessário. O controlador pode acionar o sistema.';


    /* ---------------------------------------------
       EXPLICAÇÃO
    --------------------------------------------- */

    explicacao.innerHTML = `

        <h4>
            O que aconteceu na simulação?
        </h4>

        <p>
            O sensor identificou uma temperatura de
            <strong>${atual.toFixed(1)} °C</strong>,
            enquanto o valor desejado é
            <strong>${desejada.toFixed(1)} °C</strong>.
            Portanto, existe uma diferença de
            <strong>${delta.toFixed(1)} °C</strong>.
        </p>

        <p>
            O controlador interpreta essa diferença e
            determina que o sistema de aquecimento deve
            ser acionado. A bomba pode permanecer ligada
            para favorecer a circulação da água.
        </p>

        <p>
            Nesta simulação, as condições solares estão
            consideradas como <strong>${textoSol}</strong>.
            Quanto maior o aproveitamento solar,
            menor pode ser a necessidade de energia
            complementar representada pelo modelo.
        </p>

    `;

}


/* =====================================================
   BOTÃO DO SIMULADOR
===================================================== */

simularBtn.addEventListener(
    "click",
    executarSimulacao
);


/* =====================================================
   SIMULAÇÃO INICIAL
===================================================== */

executarSimulacao();


/* =====================================================
   EFEITO DE REVELAÇÃO DAS SEÇÕES
===================================================== */

const observer =
    new IntersectionObserver(
        (entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "visible"
                    );

                }

            });

        },
        {
            threshold: 0.12
        }
    );


document
    .querySelectorAll(".card, .section-title")
    .forEach(element => {

        observer.observe(element);

    });


/* =====================================================
   TECLA ESC FECHA MENU
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

            menuBtn.innerHTML =
                '<i class="fa-solid fa-bars"></i>';

        }

    }
);
