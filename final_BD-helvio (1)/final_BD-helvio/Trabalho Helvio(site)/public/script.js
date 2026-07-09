document.addEventListener("DOMContentLoaded", function () {
    const mapeamentoBotoes = {
        "btn-lista-herois": "lista_herois.html",
        "btn-add-heroi": "adicionar_heroi.html",
        "btn-lista-equipamento": "lista_equipamentos.html", 
        "btn-add-equipamento": "registrar_equipamentos.html", 
        "btn-relatorio": "relatorio_gastos.html" 
    };

    Object.keys(mapeamentoBotoes).forEach(idBotao => {
        const botao = document.getElementById(idBotao);
        if (botao) {
            botao.addEventListener("click", function() {
                window.location.href = mapeamentoBotoes[idBotao];
            });
        }
    });

    if (document.getElementById("tabela-herois")) carregarHerois();
    if (document.getElementById("tabela-equipamentos")) carregarEquipamentos();
    if (document.getElementById("tabela-relatorio")) carregarRelatorio();
    if (document.getElementById("id_heroi_fk")) carregarSelectHerois();


    const btnBuscar = document.getElementById("btn-buscar");
    if (btnBuscar) {
        btnBuscar.addEventListener("click", async () => {
            const classeSelecionada = document.getElementById("filtro-classe").value;
            const minNivel = document.getElementById("filtro-nivel-min").value;
            const maxNivel = document.getElementById("filtro-nivel-max").value;
            const tabela = document.getElementById("tabela-herois");
            
            let url = `/herois/busca?classe=${classeSelecionada}`;
            if (minNivel) url += `&min=${minNivel}`;
            if (maxNivel) url += `&max=${maxNivel}`;

            const resposta = await fetch(url);
            const heroisFiltrados = await resposta.json();
            
            tabela.innerHTML = "";
            heroisFiltrados.forEach(h => {
                const dataFormatada = new Date(h.data_desbloqueio).toLocaleDateString('pt-BR');
                const linha = `
                    <tr>
                        <td>${h.id_heroi}</td>
                        <td>${h.nome}</td>
                        <td>${h.nome_classe}</td>
                        <td>${h.nivel_atual}</td>
                        <td>${dataFormatada}</td>
                        <td>
                            <button class="texto-tabela texto-editar" onclick="editarNome(${h.id_heroi})" style="background-color: #3498db;">Nome</button>
                            <button class="texto-tabela texto-editar" onclick="editarClasse(${h.id_heroi})" style="background-color: #9b59b6;">Classe</button>
                            <button class="texto-tabela texto-editar" onclick="editarNivel(${h.id_heroi})">Nível</button>
                            <button class="texto-tabela texto-deletar" onclick="excluirHeroi(${h.id_heroi})">Excluir</button>
                        </td>
                    </tr>
                `;
                tabela.innerHTML += linha;
            });
        });
    }

    const formHeroi = document.getElementById("form-heroi");
    if (formHeroi) {
        formHeroi.addEventListener("submit", async (e) => {
            e.preventDefault();
            const nome = document.getElementById("nome").value;
            const nivel = document.getElementById("nivel").value;
            const desbloqueio = document.getElementById("desbloqueio").value;
            const classe_fk = document.getElementById("classe_fk").value;

            await fetch('/herois', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    nome: nome, 
                    id_classe_fk: classe_fk, 
                    nivel_atual: nivel, 
                    data_desbloqueio: desbloqueio 
                })
            });

            alert("Herói adicionado com sucesso!");
            window.location.href = "lista_herois.html";
        });
    }

    const formEquipamento = document.getElementById("form-equipamento");
    if (formEquipamento) {
        formEquipamento.addEventListener("submit", async (e) => {
            e.preventDefault();
            const nome_equipamento = document.getElementById("nome_equipamento").value;
            const poder_ataque = document.getElementById("poder_ataque").value;
            const data_forja = document.getElementById("data_forja").value;
            const id_heroi_fk = document.getElementById("id_heroi_fk").value;

            await fetch('/equipamentos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    nome_equipamento: nome_equipamento, 
                    poder_ataque: poder_ataque, 
                    data_forja: data_forja, 
                    id_heroi_fk: id_heroi_fk 
                })
            });

            alert("Equipamento registrado com sucesso!");
            window.location.href = "lista_equipamentos.html";
        });
    }
});


async function carregarHerois() {
    const tabela = document.getElementById("tabela-herois");
    if (!tabela) return; 

    const resposta = await fetch('/herois');
    const herois = await resposta.json();

    tabela.innerHTML = "";

    herois.forEach(h => {
        const linha = `
            <tr>
                <td>${h.id_heroi}</td>
                <td>${h.nome}</td>
                <td>${h.nome_classe || 'ID ' + h.id_classe_fk}</td>
                <td>${h.nivel_atual}</td>
                <td>${new Date(h.data_desbloqueio).toLocaleDateString('pt-BR')}</td>
                <td>
                    <button class="texto-tabela texto-editar" onclick="editarNome(${h.id_heroi})" style="background-color: #3498db;">Nome</button>
                    <button class="texto-tabela texto-editar" onclick="editarClasse(${h.id_heroi})" style="background-color: #9b59b6;">Classe</button>
                    <button class="texto-tabela texto-editar" onclick="editarNivel(${h.id_heroi})">Nível</button>                    <button class="texto-tabela texto-deletar" onclick="excluirHeroi(${h.id_heroi})">Excluir</button>
                </td>
            </tr>
        `;
        tabela.innerHTML += linha;
    });
}

async function carregarEquipamentos() {
    const tabela = document.getElementById("tabela-equipamentos");
    if (!tabela) return; 

    const resposta = await fetch('/equipamentos');
    const equipamentos = await resposta.json();

    tabela.innerHTML = "";

    equipamentos.forEach(eq => {
        const linha = `
            <tr>
                <td>${eq.id_equipamento}</td>
                <td>${eq.nome_equipamento}</td>
                <td>${eq.poder_ataque}</td>
                <td>${new Date(eq.data_forja).toLocaleDateString('pt-BR')}</td>
                <td>${eq.nome_heroi || 'Sem Dono'}</td>
                <td>
                    <button class="texto-tabela texto-deletar" onclick="excluirEquipamento(${eq.id_equipamento})">Excluir</button>
                </td>
            </tr>
        `;
        tabela.innerHTML += linha;
    });
}

async function carregarRelatorio() {
    const tabela = document.getElementById("tabela-relatorio");
    if (!tabela) return;

    const resposta = await fetch('/relatorio');
    const dados = await resposta.json();

    tabela.innerHTML = "";

    dados.forEach(r => {
        const linha = `
            <tr>
                <td><strong>${r.nome}</strong></td>
                <td>${r.qtd_equipamentos} itens</td>
                <td>${r.poder_total} de Ataque</td>
            </tr>
        `;
        tabela.innerHTML += linha;
    });
}

async function carregarSelectHerois() {
    const select = document.getElementById("id_heroi_fk");
    if (!select) return;

    const resposta = await fetch('/herois');
    const herois = await resposta.json();

    herois.forEach(h => {
        const option = document.createElement("option");
        option.value = h.id_heroi;
        option.textContent = h.nome;
        select.appendChild(option);
    });
}


async function editarNivel(id) {
    const novoNivel = prompt("Digite o novo nível do Herói:");
    if (novoNivel) {
        await fetch(`/herois/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nivel_atual: novoNivel })
        });
        alert("Nível atualizado!");
        carregarHerois();
    }
}
async function editarNome(id) {
    const novoNome = prompt("Digite o novo nome do Herói:");
    if (novoNome) {
        await fetch(`/herois/nome/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome: novoNome })
        });
        alert("Nome atualizado com sucesso!");
        carregarHerois(); // Recarrega a tabela
    }
}

async function editarClasse(id) {
    const novaClasse = prompt("Digite o ID da nova classe:\n1 = Mago\n2 = Guerreiro\n3 = Arqueiro\n4 = Tank\n5 = Necromancer");
    if (novaClasse >= 1 && novaClasse <= 5) {
        await fetch(`/herois/classe/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id_classe_fk: novaClasse })
        });
        alert("Classe atualizada com sucesso!");
        carregarHerois(); // Recarrega a tabela
    } else if (novaClasse) {
        alert("ID de classe inválido!");
    }
}

app.put('/herois/nome/:id', (req, res) => {
    const { nome } = req.body; 
    const { id } = req.params;
    db.query(`UPDATE herois SET nome = ? WHERE id_heroi = ?`, [nome, id], (err) => {
        if (err) throw err; 
        res.json({ message: 'Nome atualizado!' });
    });
});

app.put('/herois/classe/:id', (req, res) => {
    const { id_classe_fk } = req.body; 
    const { id } = req.params;
    db.query(`UPDATE herois SET id_classe_fk = ? WHERE id_heroi = ?`, [id_classe_fk, id], (err) => {
        if (err) throw err; 
        res.json({ message: 'Classe atualizada!' });
    });
});



async function excluirHeroi(id) {
    if (confirm("Deseja realmente excluir este herói? Os equipamentos dele também serão perdidos!")) {
        await fetch(`/herois/${id}`, { method: 'DELETE' });
        alert("Herói excluído!");
        carregarHerois();
    }
}

async function excluirEquipamento(id) {
    if (confirm("Deseja destruir este equipamento?")) {
        await fetch(`/equipamentos/${id}`, { method: 'DELETE' });
        alert("Equipamento destruído!");
        carregarEquipamentos();
    }
}

async function mostrarHeroisSemEquipamento() {
    const resposta = await fetch('/herois/sem-equipamento');
    const herois = await resposta.json();
    
    if (herois.length === 0) {
        alert("Todos os heróis possuem equipamentos!");
    } else {
        const nomes = herois.map(h => h.nome).join(", ");
        alert(`Consulta: Os heróis sem equipamento são: ${nomes}`);
    }
}