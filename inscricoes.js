let lista_inscricoes = document.getElementById("lista_inscricoes");
let quantidade_oficinas = document.getElementById("quantidade_oficinas");
let valor_total = document.getElementById("valor_total");
let inscricoes = localStorage.getItem("inscricoes");
if (inscricoes == null) {
    inscricoes = [];
} else {
    inscricoes = JSON.parse(inscricoes);
}

function mostrar_inscricoes() {
    lista_inscricoes.innerHTML = "";
    if (inscricoes.length == 0) {
        lista_inscricoes.innerHTML =
            "<p class='mensagem-nenhuma-oficina'>" +
            "Nenhuma oficina selecionada." +
            "</p>";
        return;
    }
    inscricoes.forEach(
        function(oficina) {
            let item_inscricao = document.createElement("div");
            item_inscricao.className = "item-inscricao";
            item_inscricao.innerHTML = `
                <h3>
                    ${oficina.nome}
                </h3>
                <p>
                    Horário:
                    ${oficina.horario}
                </p>
                <p>
                    Valor:
                    R$ ${oficina.preco.toFixed(2).replace(".", ",")}
                </p>
            `;
            lista_inscricoes.appendChild(item_inscricao);
        }
    );
}

function calcular_total() {
    let total = 0;
    inscricoes.forEach(
        function(oficina) {
            total = total + oficina.preco;
        }
    );
    quantidade_oficinas.innerHTML = inscricoes.length;
    valor_total.innerHTML = "R$ " + total.toFixed(2).replace(".", ",");
}
mostrar_inscricoes();
calcular_total();