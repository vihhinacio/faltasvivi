const materias = [
    { nome: 'Direito Administrativo II', aulas: 120, faltas: 10, limite: 30 },
    { nome: 'Direito Civil IV', aulas: 108, faltas: 6, limite: 27 },
    { nome: 'Direito Penal III', aulas: 120, faltas: 3, limite: 30 },
    { nome: 'Direito Processual Civil II', aulas: 116, faltas: 8, limite: 29 },
    { nome: 'Direito Processual Penal II', aulas: 119, faltas: 5, limite: 29 },
    { nome: 'Direito Tributário', aulas: 120, faltas: 12, limite: 30 },
    { nome: 'TCC', aulas: 78, faltas: 10, limite: 19 },
    { nome: 'Processo Civil Aplicado I', aulas: 80, faltas: 2, limite: 20 },
    { nome: 'Processo do Trabalho Aplicado', aulas: 72, faltas: 8, limite: 18 },
];

// Carrega as faltas salvas do localStorage
function carregarFaltasSalvas() {
    const salvas = JSON.parse(localStorage.getItem('faltasSalvas'));
    if (salvas) {
        materias.forEach((mat, idx) => {
            if (typeof salvas[idx] === 'number') {
                mat.faltas = salvas[idx];
            }
        });
    }
}

// Salva as faltas atuais no localStorage
function salvarFaltas() {
    const faltasAtuais = materias.map(mat => mat.faltas);
    localStorage.setItem('faltasSalvas', JSON.stringify(faltasAtuais));
}

function atualizarTabela() {
    const tbody = document.querySelector('#faltas-table tbody');
    tbody.innerHTML = '';
    materias.forEach((mat, idx) => {
        const faltasRestantes = mat.limite - mat.faltas;
        const percFaltas = ((mat.faltas / mat.aulas) * 100).toFixed(2);
        const percPresenca = (100 - percFaltas).toFixed(2);
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${mat.nome}</td>
            <td>
                <button onclick="alterarFaltas(${idx}, -1)">-</button>
                <span id="faltas-${idx}">${mat.faltas}</span>
                <button onclick="alterarFaltas(${idx}, 1)">+</button>
            </td>
            <td>${mat.limite}</td>
            <td id="restantes-${idx}">${faltasRestantes}</td>
            <td id="perc-faltas-${idx}">${percFaltas}%</td>
            <td id="perc-presenca-${idx}">${percPresenca}%</td>
        `;
        tbody.appendChild(tr);
    });
}

function alterarFaltas(idx, delta) {
    const mat = materias[idx];
    if (mat.faltas + delta >= 0 && mat.faltas + delta <= mat.aulas) {
        mat.faltas += delta;
        salvarFaltas();
        atualizarTabela();
    }
}

carregarFaltasSalvas();
atualizarTabela(); 
