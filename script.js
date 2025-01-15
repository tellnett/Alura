let participantes = [];
let resultados = {};

document.getElementById("form").addEventListener("submit", function(event) {
    event.preventDefault();

    const nomeInput = document.getElementById("nome");
    const nome = nomeInput.value.trim();

    if (nome && !participantes.includes(nome)) {
        participantes.push(nome);
        atualizarListaParticipantes();
        nomeInput.value = "";
    } else {
        alert("Nome inválido ou participante já adicionado.");
    }
});

function atualizarListaParticipantes() {
    const listaParticipantes = document.getElementById("lista-participantes");
    listaParticipantes.innerHTML = "";
    participantes.forEach(function(participante) {
        const li = document.createElement("li");
        li.textContent = participante;
        listaParticipantes.appendChild(li);
    });
}

function sortear() {
    if (participantes.length < 2) {
        alert("É necessário pelo menos 2 participantes para o sorteio!");
        return;
    }

    const participantesCopiados = [...participantes];
    resultados = {};

    participantes.forEach(participante => {
        let amigoSecreto;
        do {
            amigoSecreto = participantesCopiados[Math.floor(Math.random() * participantesCopiados.length)];
        } while (amigoSecreto === participante || resultados[amigoSecreto]);
        
        resultados[participante] = amigoSecreto;
        participantesCopiados.splice(participantesCopiados.indexOf(amigoSecreto), 1);
    });

    mostrarResultado();
}

function mostrarResultado() {
    const resultadoDiv = document.getElementById("resultado");
    const listaResultados = document.getElementById("lista-resultados");
    listaResultados.innerHTML = "";

    Object.keys(resultados).forEach(participante => {
        const li = document.createElement("li");
        li.textContent = `${participante} -> ${resultados[participante]}`;
        listaResultados.appendChild(li);
    });

    resultadoDiv.style.display = "block";
}
