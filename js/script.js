function calcular() {
    // 1. Coleta os valores dos campos de entrada
    const valorEntrega = parseFloat(document.getElementById('valorEntrega').value);
    const kmBusca = parseFloat(document.getElementById('kmBusca').value);
    const kmEntrega = parseFloat(document.getElementById('kmEntrega').value);
    const kmLitroEtanol = parseFloat(document.getElementById('kmLitroEtanol').value);
    const precoEtanol = parseFloat(document.getElementById('precoEtanol').value);

    // 2. Valida se os campos foram preenchidos
    if (isNaN(valorEntrega) || isNaN(kmBusca) || isNaN(kmEntrega) || isNaN(kmLitroEtanol) || isNaN(precoEtanol)) {
        alert("Por favor, preencha todos os campos com valores válidos.");
        return;
    }

    // 3. Executa os cálculos
    const kmTotal = kmBusca + kmEntrega;
    const litrosGastos = kmTotal / kmLitroEtanol;
    const custoCombustivel = litrosGastos * precoEtanol;
    const valorKmRodado = valorEntrega / kmTotal;
    const lucroLiquido = valorEntrega - custoCombustivel;

    // Novo cálculo para a porcentagem de lucro
    let porcentagemLucro;
    if (valorEntrega > 0) {
        porcentagemLucro = (lucroLiquido / valorEntrega) * 100;
    } else {
        porcentagemLucro = 0; // Evita divisão por zero
    }

    // 4. Exibe os resultados na tela
    document.getElementById('custoCombustivel').textContent = custoCombustivel.toFixed(2);
    document.getElementById('valorKmRodado').textContent = valorKmRodado.toFixed(2);
    document.getElementById('gastoTotal').textContent = custoCombustivel.toFixed(2);
    document.getElementById('lucroLiquido').textContent = lucroLiquido.toFixed(2);
    document.getElementById('porcentagemLucro').textContent = porcentagemLucro.toFixed(2);

    // 5. Lógica para exibir o status e a cor do botão
    const statusElement = document.getElementById('statusLucro');

    if (porcentagemLucro >= 60) {
        statusElement.textContent = "Aprovado";
        statusElement.style.backgroundColor = '#28a745'; // Verde
    } else if (porcentagemLucro >= 50 && porcentagemLucro < 60) {
        statusElement.textContent = "Verificando";
        statusElement.style.backgroundColor = '#ffc107'; // Amarelo/Laranja
    } else {
        statusElement.textContent = "Reprovado";
        statusElement.style.backgroundColor = '#dc3545'; // Vermelho
    }

    // Bônus: Destaca o lucro líquido e a porcentagem
    if (lucroLiquido > 0) {
        document.getElementById('lucroLiquido').style.color = '#28a745';
        document.getElementById('porcentagemLucro').style.color = '#28a745';
    } else {
        document.getElementById('lucroLiquido').style.color = '#dc3545';
        document.getElementById('porcentagemLucro').style.color = '#dc3545';
    }
    
    // NOVO: Atualiza a tabela de histórico com os dados da última consulta
    document.getElementById('histKmBusca').textContent = kmBusca.toFixed(2);
    document.getElementById('histKmEntrega').textContent = kmEntrega.toFixed(2);
    document.getElementById('histKmTotal').textContent = kmTotal.toFixed(2);
    document.getElementById('histLucro').textContent = lucroLiquido.toFixed(2);

    // NOVO: Exibe a tabela de histórico (caso esteja escondida)
    document.getElementById('historico').style.display = 'block';

    // Limpa os campos de entrada específicos da entrega
    document.getElementById('valorEntrega').value = '';
    document.getElementById('kmBusca').value = '';
    document.getElementById('kmEntrega').value = '';

    // Opcional: Coloca o cursor de volta no primeiro campo para facilitar a digitação
    document.getElementById('kmBusca').focus();
}

// Este bloco foi movido para fora da função 'calcular()'
document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); // Impede o comportamento padrão do "Enter" (enviar formulário)
        calcular();
    }
});