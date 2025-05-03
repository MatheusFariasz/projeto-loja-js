let listaPessoas = ["Vinicius", "Gabriel", "Matheus"];
let form = document.getElementsByClassName("form1");

let listaProdutos = [["Mouse Gamer", 149.99],["Teclado Mecânico", 299.99]];

let contadorPessoas = 3;
let contadorProdutos = 2;

// -------------------------------------------------------------- Pessoa --------------------------------------------------------------------//

function cadastrarPessoas(e) {
    e.preventDefault();

    let nome = document.querySelector("#pessoas")
    let nomeValor = nome.value.trim();

    if (nomeValor == '') {
        alert("O nome não pode estar vazio.");
        return;
    }
    if (listaPessoas.includes(nome.value)) {
        alert("Já está cadastrado");
        nome.value = "";
    } else {
        listaPessoas.push(nome.value)
        nome.value = "";

        contadorPessoas++
        criarTabelaPessoas(listaPessoas)
    }
    console.log(listaPessoas)
}

function atualizarSelectPessoas() {
    let selectPessoa = document.getElementById("ComprasPessoas");
    selectPessoa.innerHTML = '<option value="">Selecione uma pessoa</option>';

    listaPessoas.forEach(function(pessoa) {
        const option = document.createElement("option");
        option.value = pessoa;
        option.text = pessoa;
        selectPessoa.appendChild(option);
    });
}


document.getElementById("formPessoa").addEventListener("submit", (e) => {
    cadastrarPessoas(e);
    atualizarSelectPessoas();
});

//Tabela de pessoas
function criarTabelaPessoas(nome) {
    const tbody = document.querySelector('#tabelaPessoas');

    var produto = ""
    var total = 0.00


    if (listaPessoas.length == 0) {
        contadorPessoas = 0
    }

    if (!listaPessoas.includes(nome)) {

        let tr = document.createElement("tr");

        let td1 = document.createElement("td");
        td1.innerText = contadorPessoas;
        tr.append(td1);

        let td2 = document.createElement("td");
        td2.innerText = nome[contadorPessoas - 1];
        tr.append(td2);

        let td3 = document.createElement("td");
        td3.innerText = produto;
        tr.append(td3);

        let td4 = document.createElement("td");
        td4.innerText = total.toFixed(2);
        tr.append(td4);


        let td5 = document.createElement("td");
        let removerBtn = document.createElement("button");
        removerBtn.innerText = "Remover";
        removerBtn.classList.add("botaoRemover");

        removerBtn.addEventListener("click", removerPessoa);
        td5.append(removerBtn);
        tr.append(td5);


        tbody.append(tr);

        atualizarTabelaPessoas();
    }
}

function atualizarTabelaPessoas() {
    const tbody = document.querySelector('#tabelaPessoas');
    tbody.innerHTML = "";

    for (let i = 0; i < listaPessoas.length; i++) {
        let nome = listaPessoas[i];
        let produtosComprados = [];
        let total = 0;

        for (let j = 0; j < listaCompras.length; j++) {
            if (listaCompras[j][0] === nome) {
                produtosComprados = listaCompras[j][1];
                total = listaCompras[j][2];
                break;
            }
        }

        let tr = document.createElement("tr");

        let td1 = document.createElement("td");
        td1.innerText = i + 1;
        tr.append(td1);

        let td2 = document.createElement("td");
        td2.innerText = nome;
        tr.append(td2);

        let td3 = document.createElement("td");
        let ul = document.createElement("ul");
        ul.classList.add("ulProdutos");

        for (let k = 0; k < produtosComprados.length; k++) {
            let nomeProduto = produtosComprados[k];
            let precoProduto = 0;
            let produtoIndex = null;

            for (let l = 0; l < listaProdutos.length; l++) {
                if (listaProdutos[l][0] === nomeProduto) {
                    precoProduto = listaProdutos[l][1];
                    produtoIndex = l;  
                    break;
                }
            }

            let li = document.createElement("li");
            li.id = `produto-${produtoIndex}`; 
            li.innerText = ` ${nomeProduto} -- R$ ${precoProduto.toFixed(2)}`;
            ul.appendChild(li);
        }

        td3.appendChild(ul);
        tr.append(td3);

        let td4 = document.createElement("td");
        td4.innerText = total.toFixed(2);
        tr.append(td4);

        let td5 = document.createElement("td");
        let removerBtn = document.createElement("button");
        removerBtn.innerText = "Remover";
        removerBtn.classList.add("botaoRemover");
        removerBtn.addEventListener("click", removerPessoa);
        td5.append(removerBtn);
        tr.append(td5);

        tbody.append(tr);
    }
}

// -------------------------------------------------------------- PRODUTOS --------------------------------------------------------------------//

function cadastrarProdutos(e) {
    e.preventDefault();

    let produto = document.querySelector("#produto");
    let preco = document.querySelector("#preco");

    let nomeProduto = produto.value.trim();
    let precoValor = parseFloat(preco.value.trim());

    if (nomeProduto == '') {
        alert("O nome do produto não pode estar vazio.");
        return;
    } else if (isNaN(precoValor) || precoValor < 0) {
        alert("Digite um preço válido maior que zero.");
        preco.value = "";
        return;
    } else {
        for (let i = 0; i < listaProdutos.length; i++) {
            if (listaProdutos[i][0] === nomeProduto) {
                produto.value = "";
                preco.value = "";
                alert("Produto já cadastrado.");
                return;
            }
        }

        listaProdutos.push([nomeProduto, precoValor]);

        contadorProdutos++;
        criarTabelaProduto(listaProdutos);
    }

    produto.value = "";
    preco.value = "";

    console.log(listaProdutos);
}

function atualizarSelectProdutos() {
    let selectProduto = document.getElementById("ComprarProduto");
    selectProduto.innerHTML = '<option value="">Selecione um produto</option>';

    listaProdutos.forEach(function(produto) {
        const option = document.createElement("option");
        option.value = produto[0];
        option.text = produto[0];
        selectProduto.appendChild(option);
    });
}


document.getElementById("formProduto").addEventListener("submit", (e) => {
    cadastrarProdutos(e);
    atualizarSelectProdutos();
});

//Tabela das produtos
function criarTabelaProduto(produto) {
    const tbody = document.querySelector('#tabelaProdutos');

    let produtoN = listaProdutos[listaProdutos.length - 1];

    if (listaProdutos.length == 0) {
        contadorProdutos = 0
    }

    let produtoExistente = false;
    for (let i = 0; i < tbody.rows.length; i++) {
        const nomeProdutoNaTabela = tbody.rows[i].children[1].innerText;
        if (nomeProdutoNaTabela === produto[0]) {
            produtoExistente = true;
            break;
        }
    }

    if (!produtoExistente) {

        let tr = document.createElement("tr");

        let td1 = document.createElement("td");
        td1.innerText = contadorProdutos;
        tr.append(td1);

        let td2 = document.createElement("td");
        td2.innerText = produtoN[0];
        tr.append(td2);

        let td3 = document.createElement("td");
        td3.innerText = produtoN[1].toFixed(2);
        tr.append(td3);


        let td4 = document.createElement("td");
        td4.classList.add("opcoes")

        let aumPreco = document.createElement("button");
        aumPreco.innerText = "+ Preço";
        aumPreco.classList.add("botaoMais");
        aumPreco.addEventListener("click", alterarPreco);

        td4.append(aumPreco);

        let dimPreco = document.createElement("button");
        dimPreco.innerText = "- Preço";
        dimPreco.classList.add("botaoMenos");
        dimPreco.addEventListener("click", alterarPreco);

        td4.append(dimPreco);

        let removerBtn = document.createElement("button");
        removerBtn.innerText = "Remover";
        removerBtn.classList.add("botaoRemover");

        td4.append(removerBtn);
        removerBtn.addEventListener("click", removerProduto)

        tr.append(td4);

        tbody.append(tr);
    }
}

function atualizarTabelaProdutos() {
    const tbody = document.querySelector('#tabelaProdutos');
    tbody.innerHTML = "";

    if (listaProdutos.length == 0) {
        contadorProdutos = 0
    }

    for (let i = 0; i < listaProdutos.length; i++) {
        let produto = listaProdutos[i];

        let tr = document.createElement("tr");

        let td1 = document.createElement("td");
        td1.innerText = i + 1;
        tr.append(td1);

        let td2 = document.createElement("td");
        td2.innerText = produto[0];
        tr.append(td2);

        let td3 = document.createElement("td");
        td3.innerText = produto[1].toFixed(2);
        tr.append(td3);

        let td4 = document.createElement("td");
        td4.classList.add("opcoes");

        let aumPreco = document.createElement("button");
        aumPreco.innerText = "+ Preço";
        aumPreco.classList.add("botaoMais");
        aumPreco.addEventListener("click", alterarPreco);
        td4.append(aumPreco);

        let dimPreco = document.createElement("button");
        dimPreco.innerText = "- Preço";
        dimPreco.classList.add("botaoMenos");
        dimPreco.addEventListener("click", alterarPreco);
        td4.append(dimPreco);

        let removerBtn = document.createElement("button");
        removerBtn.innerText = "Remover";
        removerBtn.classList.add("botaoRemover");
        removerBtn.addEventListener("click", removerProduto);
        td4.append(removerBtn);

        tr.append(td4);

        tbody.append(tr);
    }
}

// -------------------------------------------------------------- Compras --------------------------------------------------------------------//

let listaCompras = [];

function realizarCompra() {
    let pessoaSelecionada = document.getElementById("ComprasPessoas").value;
    let produtoSelecionado = document.getElementById("ComprarProduto").value;

    if (!pessoaSelecionada || pessoaSelecionada === "Selecione uma pessoa" ||
        !produtoSelecionado || produtoSelecionado === "Selecione um produto") {
        alert("Selecione uma pessoa e um produto válidos.");
        return;
    }
    else{
        let preco = 0;
        for (let i = 0; i < listaProdutos.length; i++) {
            if (listaProdutos[i][0] === produtoSelecionado) {
                preco = listaProdutos[i][1];
            }
        }

        let pessoaExiste = false;
        for (let j = 0; j < listaCompras.length; j++) {
            if (listaCompras[j][0] === pessoaSelecionada) {
                if (listaCompras[j][1].includes(produtoSelecionado)) {
                    alert("Esta pessoa já comprou este produto.");
                    return;
                }
                else{
                    listaCompras[j][1].push(produtoSelecionado);
                    listaCompras[j][2] += preco;
                    pessoaExiste = true;
                    break;
                }
            }
        }

        if (!pessoaExiste) {
            listaCompras.push([pessoaSelecionada, [produtoSelecionado], preco]);
            }

        document.getElementById("ComprasPessoas").value = ""; 
        document.getElementById("ComprarProduto").value = "";

        console.log(listaCompras);

        atualizarTabelaPessoas();
    }

}

function removerPessoa(e) {
    const linha = e.target.parentElement.parentElement;
    const nome = linha.children[1].innerText;

    for (let i = 0; i < listaPessoas.length; i++) {
        if (listaPessoas[i] === nome) {
            listaPessoas.splice(i, 1);
            break;
        }
    }
    e.target.parentElement.parentElement.remove();
    console.log(listaPessoas)
    atualizarTabelaPessoas();
    atualizarSelectPessoas();
}

function alterarPreco(e) {
    const linha = e.target.parentElement.parentElement;
    const nomeProduto = linha.children[1].innerText;

    for (let i = 0; i < listaProdutos.length; i++) {
        if (listaProdutos[i][0] === nomeProduto) {
            let precoAntigo = listaProdutos[i][1];

            if (e.target.className.includes("botaoMais")) {
                listaProdutos[i][1] += 1;
            } else if (e.target.className.includes("botaoMenos")) {
                if (precoAntigo > 1) {
                    listaProdutos[i][1] -= 1;
                } else {
                    listaProdutos[i][1] = 0;
                }
            }

            let novoPreco = listaProdutos[i][1];
            let diferenca = novoPreco - precoAntigo;

            for (let j = 0; j < listaCompras.length; j++) {
                let produtosComprados = listaCompras[j][1];
                let quantidadeProduto = 0;

                for (let k = 0; k < produtosComprados.length; k++) {
                    if (produtosComprados[k] === nomeProduto) {
                        quantidadeProduto++;
                    }
                }

                listaCompras[j][2] += diferenca * quantidadeProduto;
            }

            break;
        }
    }

    atualizarTabelaProdutos();
    atualizarTabelaPessoas();
}

function removerProduto(e) {
    e.preventDefault();

    const linha = e.target.parentElement.parentElement;
    const nomeProduto = linha.children[1].innerText;

    for (let i = 0; i < listaProdutos.length; i++) {
        if (listaProdutos[i][0] === nomeProduto) {
            listaProdutos.splice(i, 1);
            break;
        }
    }

    for (let i = 0; i < listaCompras.length; i++) {
        let pessoaComprou = listaCompras[i];
        let produtosAtualizados = [];
        let total = 0;

        for (let j = 0; j < pessoaComprou[1].length; j++) {
            let produtoAtual = pessoaComprou[1][j];
            if (produtoAtual !== nomeProduto) {
                produtosAtualizados.push(produtoAtual);

                for (let k = 0; k < listaProdutos.length; k++) {
                    if (listaProdutos[k][0] === produtoAtual) {
                        total += listaProdutos[k][1];
                        break;
                    }
                }
            }
        }

        pessoaComprou[1] = produtosAtualizados;
        pessoaComprou[2] = total;
    }

    e.target.parentElement.parentElement.remove();
    atualizarSelectProdutos();
    atualizarTabelaProdutos();
    atualizarTabelaPessoas();
}

window.onload = () => {
    atualizarSelectPessoas();
    atualizarSelectProdutos();
    atualizarTabelaPessoas();
    atualizarTabelaProdutos();
};