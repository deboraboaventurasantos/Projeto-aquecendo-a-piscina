/* ==================================================
   MENU RESPONSIVO
================================================== */

const menuBtn =
    document.getElementById("menuBtn");

const menu =
    document.querySelector(".menu");


if(menuBtn && menu){

    menuBtn.addEventListener("click", () => {

        menu.classList.toggle("ativo");

        const aberto =
            menu.classList.contains("ativo");

        menuBtn.setAttribute(
            "aria-expanded",
            aberto
        );

        menuBtn.innerHTML =
            aberto
            ? '<i class="fas fa-xmark"></i>'
            : '<i class="fas fa-bars"></i>';

    });

}


/* Fechar menu ao clicar em um link */

document
    .querySelectorAll(".menu a")
    .forEach(link => {

        link.addEventListener("click", () => {

            menu.classList.remove("ativo");

            menuBtn.setAttribute(
                "aria-expanded",
                "false"
            );

            menuBtn.innerHTML =
                '<i class="fas fa-bars"></i>';

        });

    });


/* ==================================================
   ACESSIBILIDADE
================================================== */

const diminuirFonte =
    document.getElementById("diminuirFonte");

const fonteNormal =
    document.getElementById("fonteNormal");

const aumentarFonte =
    document.getElementById("aumentarFonte");

const altoContraste =
    document.getElementById("altoContraste");


let tamanhoFonte = 100;


function aplicarFonte(){

    document.documentElement.style.fontSize =
        tamanhoFonte + "%";

}


if(aumentarFonte){

    aumentarFonte.addEventListener("click", () => {

        if(tamanhoFonte < 125){

            tamanhoFonte += 10;

            aplicarFonte();

        }

    });

}


if(diminuirFonte){

    diminuirFonte.addEventListener("click", () => {

        if(tamanhoFonte > 85){

            tamanhoFonte -= 10;

            aplicarFonte();

        }

    });

}


if(fonteNormal){

    fonteNormal.addEventListener("click", () => {

        tamanhoFonte = 100;

        aplicarFonte();

    });

}


if(altoContraste){

    altoContraste.addEventListener("click", () => {

        document.body.classList.toggle(
            "alto-contraste"
        );

    });

}


/* ==================================================
   SIMULADOR
================================================== */

const temperatura =
    document.getElementById("temperatura");

const temperaturaValor =
    document.getElementById("temperaturaValor");

const setpoint =
    document.getElementById("setpoint");

const simular =
    document.getElementById("simular");

const statusTitulo =
    document.getElementById("statusTitulo");

const statusTexto =
    document.getElementById("statusTexto");

const statusAquecedor =
    document.getElementById("statusAquecedor");

const statusBomba =
    document.getElementById("statusBomba");

const iconeStatus =
    document.getElementById("iconeStatus");


/* Mostrar temperatura atual */

if(temperatura){

    temperatura.addEventListener("input", () => {

        temperaturaValor.textContent =
            temperatura.value;

    });

}


/* Executar simulação */

if(simular){

    simular.addEventListener("click", () => {

        const atual =
            Number(temperatura.value);

        const desejada =
            Number(setpoint.value);


        if(atual < desejada){

            statusTitulo.textContent =
                "Aquecimento ativado";

            statusTexto.textContent =
                `A temperatura atual é ${atual} °C.
                O sistema identificou que está abaixo
                do setpoint de ${desejada} °C e pode
                acionar o aquecimento.`;

            statusAquecedor.textContent =
                "LIGADO";

            statusBomba.textContent =
                "LIGADA";

            iconeStatus.innerHTML =
                '<i class="fas fa-fire"></i>';

        }


        else if(atual === desejada){

            statusTitulo.textContent =
                "Temperatura ideal";

            statusTexto.textContent =
                `A água está em ${atual} °C,
                exatamente no setpoint configurado.`;

            statusAquecedor.textContent =
                "DESLIGADO";

            statusBomba.textContent =
                "DESLIGADA";

            iconeStatus.innerHTML =
                '<i class="fas fa-check"></i>';

        }


        else{

            statusTitulo.textContent =
                "Temperatura acima do setpoint";

            statusTexto.textContent =
                `A temperatura atual é ${atual} °C,
                enquanto o setpoint está em ${desejada} °C.
                O aquecimento permanece desligado.`;

            statusAquecedor.textContent =
                "DESLIGADO";

            statusBomba.textContent =
                "DESLIGADA";

            iconeStatus.innerHTML =
                '<i class="fas fa-temperature-high"></i>';

        }

    });

}


/* ==================================================
   MODELO 3D
================================================== */

const iniciar3D =
    document.getElementById("iniciar3D");

const modelo =
    document.querySelector(".modelo");

const mensagem3D =
    document.getElementById("mensagem3D");


if(iniciar3D && modelo){

    iniciar3D.addEventListener("click", () => {

        modelo.classList.toggle("ativo");


        if(modelo.classList.contains("ativo")){

            iniciar3D.innerHTML =
                '<i class="fas fa-pause"></i> Pausar sistema';

            mensagem3D.textContent =
                "Sistema em funcionamento: a água é aquecida e circulada pela piscina.";

        }

        else{

            iniciar3D.innerHTML =
                '<i class="fas fa-play"></i> Iniciar sistema';

            mensagem3D.textContent =
                "Clique para iniciar a demonstração.";

        }

    });

}


/* ==================================================
   ANIMAÇÃO DOS FLUXOS
================================================== */

const itensFluxo =
    document.querySelectorAll(".fluxo-item");


itensFluxo.forEach((item, index) => {

    item.style.transitionDelay =
        `${index * 0.08}s`;

});


/* ==================================================
   ANO AUTOMÁTICO NO FOOTER
================================================== */

const anoAtual =
    new Date().getFullYear();

const footerFinal =
    document.querySelector(".footer-final p");


if(footerFinal){

    footerFinal.textContent =
        `Projeto desenvolvido para fins educacionais • ${anoAtual}`;

}
