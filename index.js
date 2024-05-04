'use strict';

//let banco = [];

const getBanco = () => JSON.parse(localStorage.getItem ('taskList')) ?? [];
const setBanco = (banco) => localStorage.setItem ('taskList', JSON.stringify(banco));

const criarItem = (tarefa, status, indice) => {
    const item = document.createElement('label');
    item.classList.add('task__item');
    item.innerHTML = `
        <input type="checkbox" ${status} data-indice=${indice}>
        <div>${tarefa}</div>
        <input type="button" value="X" data-indice=${indice}>
    `
    document.getElementById('taskList').appendChild(item);
}

const limparTarefas = () => {
    const taskList = document.getElementById('taskList');
    while (taskList.firstChild) {
        taskList.removeChild(taskList.lastChild);
    }
}

const atualizarTela = () => {
    limparTarefas();
    const banco = getBanco();
    banco.forEach ( (item, indice) => criarItem (item.tarefa, item.status, indice));
}

const inserirTarefa = (evento) => {
    const tecla = evento.key;
    const texto = evento.target.value;
    if (tecla === 'Enter'){
        const banco = getBanco();
        banco.push ({'tarefa': texto, 'status': ''});
        setBanco(banco);
        atualizarTela();
        evento.target.value = '';
    }
}

const removerTarefa = (indice) => {
    const banco =getBanco();
    banco.splice (indice, 1);
    setBanco(banco);
    atualizarTela();
}

const atualizarTarefa = (indice) => {
    const banco = getBanco();
    banco[indice].status = banco[indice].status === '' ? 'checked' : '';
    setBanco(banco);
    atualizarTela();
}

const clickTarefa = (evento) => {
    const elemento = evento.target;
    if (elemento.type === 'button') {
        const indice = elemento.dataset.indice;
        removerTarefa(indice);
    }else if (elemento.type === 'checkbox'){
        const indice = elemento.dataset.indice;
        atualizarTarefa (indice);
    }
}

document.getElementById('newItem').addEventListener('keypress', inserirTarefa);
document.getElementById('taskList').addEventListener('click', clickTarefa);

atualizarTela();
