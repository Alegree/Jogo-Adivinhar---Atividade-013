let numeroSecreto = Math.floor(Math.random() * 10) + 1;
let tentativas = 0;
let saldo = 25;

function fazerEscolha() {
    const numeroInput = document.getElementById('numero');
    const numero = parseInt(numeroInput.value);
    const apostaInput = document.getElementById('aposta');
    const aposta = parseInt(apostaInput.value);
    const usarDicasCheckbox = document.getElementById('usarDicas');

    if (numero <= 0 || numero > 10 || isNaN(numero)) {
        alert('Digite um número entre 1 e 10.');
        return;
    }

    if (aposta > saldo || isNaN(aposta) || aposta <= 0) {
        alert('Aposte algo que esteja dentro do seu saldo de aposta e que seja superior a 1');
        return;
    }


    tentativas++;

    const resultado = numero === numeroSecreto ? 'ganhar' : 'perder';
    const table = document.getElementById('history');
    const row = table.insertRow(-1);
    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);
    const cell3 = row.insertCell(2);
    cell1.textContent = tentativas;
    cell2.textContent = numero;

    // Adiciona a dica à célula, exceto se o jogador acertar
    if (resultado === 'perder') {
        cell3.textContent = 'Não acertou';
        if (usarDicasCheckbox.checked) {
            cell3.textContent += ` (Dica: ${numero > numeroSecreto ? 'Menor' : 'Maior'})`;
        }
    } else {
        cell3.textContent = 'Acertou!';
    }

    if (resultado === 'ganhar') {
        saldo += aposta;
        atualizarSaldo();
        if (usarDicasCheckbox.checked) {
            const desconto = Math.round(0.1 * aposta);
            saldo -= desconto;
            atualizarSaldo();
            document.getElementById('resultado').textContent = `Parabéns! Acertas-te em ${tentativas} tentativas. O teu saldo atual é de ${saldo}€.`;
        }
        else {
            document.getElementById('resultado').textContent = `Parabéns! Acertas-te em ${tentativas} tentativas. O teu saldo atual é de ${saldo}€.`;
        }
        // Exibir informações do cheque
        document.getElementById('chequeNome').textContent = `Nome: ${NomeDoJogador()}`;
        document.getElementById('chequeValor').textContent = `Valor do Cheque: ${saldo}€`;

        // Exibir a área de informações do cheque
        document.getElementById('chequeInfo').style.display = 'block';

        document.getElementById('gameForm').reset();
        numeroInput.disabled = true;
        apostaInput.disabled = true;
        usarDicasCheckbox.disabled = true;
        document.querySelector('button').disabled = true;
        document.body.classList.remove('perder');
        document.body.classList.add('ganhar');
    } else {
        document.getElementById('resultado').textContent = `Número incorreto. Tenta novamente.`;
        saldo -= aposta;
        if (saldo <= 0) {
            document.getElementById('resultado').textContent = `Ficaste sem saldo. Fim do jogo.`;
            numeroInput.disabled = true;
            apostaInput.disabled = true;
            usarDicasCheckbox.disabled = true;
            document.querySelector('button').disabled = true;
        }
        document.body.classList.remove('ganhar');
        document.body.classList.add('perder');
    }
    atualizarSaldo();
}

function atualizarSaldo() {
    document.getElementById('saldoAtual').textContent = saldo;
}

function NomeDoJogador() {
    const NomeDoJogador = document.getElementById('NomeDoJogador');
    return NomeDoJogador.value.trim() || "Jogador Anónimo";
}

function carregarSaldo() {
    const carregar = parseInt(document.getElementById('carregar').value);
    saldo += carregar;
    atualizarSaldo();
}

function trocarImagem() {
    var carregar = document.getElementById("carregar");
    var notaImagem = document.getElementById("notaImagem");

    // Altera a imagem com base na opção selecionada
    if (carregar.value === "10") {
        notaImagem.src = "/imagens/10euro.png";
    } else if (carregar.value === "20") {
        notaImagem.src = "/imagens/20euro.png";
    } else if (carregar.value === "50") {
        notaImagem.src = "/imagens/50euro.png";
    }
}

function trocarAposta() {
    var aposta = document.getElementById("aposta");
    var notaAposta = document.getElementById("notaAposta");

    // Altera a imagem com base na opção selecionada
    if (aposta.value === "1") {
        notaAposta.src = "/imagens/euro.png";
    } else if (aposta.value === "5") {
        notaAposta.src = "/imagens/5euro.png";
    } else if (aposta.value === "10") {
        notaAposta.src = "/imagens/10euro.png";
    }
}