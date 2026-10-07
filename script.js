let oficinas = [
    {
        nome: "Introdução à Robótica",
        preco: 30,
        horario: "08:00",
        vagas: 20,
        imagem: "img/introducaoRobotica.jpg"
    },
    {
        nome: "Criação de Jogos com JavaScript",
        preco: 45,
        horario: "09:00",
        vagas: 15,
        imagem: "img/criandoJogosComJS.png"
    },
    {
        nome: "Primeiros Passos com Arduino",
        preco: 40,
        horario: "10:00",
        vagas: 18,
        imagem: "img/primeirosPassosArduino.png"
    },
    {
        nome: "Design de Interfaces no Figma",
        preco: 25,
        horario: "13:00",
        vagas: 25,
        imagem: "img/designInterfaceFigma.webp"
    },
    {
        nome: "Segurança na Internet",
        preco: 20,
        horario: "14:00",
        vagas: 30,
        imagem: "img/segurancaNaInternet.jpg"
    },
    {
        nome: "Introdução à Inteligência Artificial",
        preco: 50,
        horario: "15:00",
        vagas: 20,
        imagem: "img/introducaoInteligenciaArtificial.png"
    },
    {
        nome: "Desenvolvimento de Aplicativos",
        preco: 55,
        horario: "16:00",
        vagas: 15,
        imagem: "img/desenvolvimentoDeAplicativo.jpeg"
    },
    {
        nome: "Criação de Sites Responsivos",
        preco: 35,
        horario: "17:00",
        vagas: 25,
        imagem: "img/desenvolvimentoDeSiteResponsivos.png"
    }
];

let lista_oficinas = document.getElementById("lista_oficinas");
let campo_busca = document.getElementById("campo_busca");
let campo_ordenacao = document.getElementById("campo_ordenacao");
let link_inscricoes = document.getElementById("link_inscricoes");
let mensagem_sucesso = document.getElementById("mensagem_sucesso");

function mostrar_oficinas(lista) {
    lista_oficinas.innerHTML = "";
    if (lista.length == 0) {
        lista_oficinas.innerHTML =
            "<p class='mensagem-nenhuma-oficina'>" +
            "Nenhuma oficina encontrada." +
            "</p>";
        return;
    }
    lista.forEach(function(oficina, indice) {
        let card_oficina = document.createElement("div");
        card_oficina.className = "card-oficina";
        card_oficina.innerHTML = 
        `
            <img class="imagem-oficina" src="${oficina.imagem}" alt="${oficina.nome}">
            <div class="informacoes-oficina">
                <h3 class="nome-oficina">
                    ${oficina.nome}
                </h3>
                <p class="informacao-oficina">
                    Horário: ${oficina.horario}
                </p>
                <p class="informacao-oficina">
                    Vagas: ${oficina.vagas}
                </p>
                <p class="valor-oficina">
                    R$ ${oficina.preco.toFixed(2).replace(".", ",")}
                </p>
                <button class="botao-inscrever" onclick="inscrever_oficina(${indice})">
                    Inscrever-se
                </button>
            </div>
        `;
        lista_oficinas.appendChild(card_oficina);
    });
}

function inscrever_oficina(indice) {
    let oficina = oficinas[indice];
    let inscricoes = localStorage.getItem("inscricoes");
    if (inscricoes == null) {
        inscricoes = [];
    } else {
        inscricoes = JSON.parse(inscricoes);
    }
    inscricoes.push(oficina);
    localStorage.setItem("inscricoes",JSON.stringify(inscricoes));
    mensagem_sucesso.style.display = "block";
    setTimeout(function() {
        mensagem_sucesso.style.display = "none";
    }, 3000);
    atualizar_quantidade_inscricoes();
}

function atualizar_quantidade_inscricoes() {
    let inscricoes = localStorage.getItem("inscricoes");
    if (inscricoes == null) {
        inscricoes = [];
    } else {
        inscricoes = JSON.parse(inscricoes);
    }
    link_inscricoes.innerHTML =
        "Minhas inscrições (" + inscricoes.length + ")";
}

campo_busca.addEventListener(
    "input",
    function() {
        let texto_digitado = campo_busca.value.toLowerCase();
        let oficinas_encontradas = oficinas.filter(function(oficina) {
            return oficina.nome.toLowerCase().includes(texto_digitado);
        });
        mostrar_oficinas(
            oficinas_encontradas
        );
    }
);

campo_ordenacao.addEventListener(
    "change",
    function() {
        let oficinas_ordenadas = [...oficinas];
        if (campo_ordenacao.value == "menor") {
            oficinas_ordenadas.sort(
                function(a, b) {
                    return a.preco - b.preco;
                }
            );
        }
        if (campo_ordenacao.value == "maior") {
            oficinas_ordenadas.sort(
                function(a, b) {
                    return b.preco - a.preco;
                }
            );
        }
        mostrar_oficinas(
            oficinas_ordenadas
        );
    }
);

let imagens_slider = [
    "img/banner1.png",
    "img/banner2.jpg",
    "img/banner3.jpg",
    "img/banner4.png",
    "img/banner4.png"
];

let posicao_slider = 0;
let imagem_slider = document.getElementById("imagem_slider");
let botao_anterior = document.getElementById("botao_anterior");
let botao_proximo = document.getElementById("botao_proximo");

botao_anterior.addEventListener(
    "click",
    function() {
        if (posicao_slider > 0) {
            posicao_slider--;
            imagem_slider.src = imagens_slider[posicao_slider];
        }
    }
);

botao_proximo.addEventListener(
    "click",
    function() {
        if (posicao_slider < imagens_slider.length - 1) {
            posicao_slider++;
            imagem_slider.src = imagens_slider[posicao_slider];

        }
    }
);
mostrar_oficinas(oficinas);
atualizar_quantidade_inscricoes();
