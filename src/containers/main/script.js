var urlCep = '';
var urlStore = '';
let fs = '';
let produtos;
let produto;
var headers = 
    {  method: 'GET',
        headers:
        {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        mode: 'cors',
        cache: 'default',
    };

async function getDataCatch(fs) {
    var response = await (fetch(fs) );

    if (response.ok) {
        return response.json();
    } else {
         throw new Error("err.message || err.statusText");
    }
}

async function getData(fs) {
    const response = await fetch(fs)
    return response.json();
}


async function localizaCep() {
    const txtCep = document.getElementById('txtCep').value;
    urlCep = `https://mercado.carrefour.com.br/api/checkout/pub/regions?country=BRA&postalCode=${ txtCep }`;
    fs = new Request(urlCep, headers);
    var erro = `Cep não encontrado: ${ txtCep.value }`;
    selectStore.innerHTML = `<option></option>`;

    try{
        const data = await getDataCatch(fs);
        erro = `Erro ao montar lojas ${ txtCep.value }`;
        data[0].sellers.forEach(element => {
            selectStore.innerHTML += `<option>${ element.id }</option>`
        });
    }
    catch
    {
        console.log(erro)
    }
} 

async function localizaStore() {
    urlStore = `https://mercado.carrefour.com.br/api/catalog_system/pub/products/search?fq=${selectStore.value}`;
    fs = new Request(urlStore, headers);
    var erro = `Loja não encontrada: ${ selectStore.value }`;
    selectProd.innerHTML = `<option></option>`;

    try{
        const data = await getDataCatch(fs);
        erro = `Erro ao montar produtos da loja: ${ selectStore.value }`;
        data.forEach(element => {
            selectProd.innerHTML += `<option>${ element.productName }</option>`
        });
    }
    catch
    {
        console.log(erro)
    }
}

async function localizaProduto() {
    urlStore = `https://mercado.carrefour.com.br/api/catalog_system/pub/products/search?fq=${selectStore.value}`;
    fs = new Request(urlStore, headers);
    var erro = `Loja não encontrada: ${ selectStore.value }`;

    try{
        produtos = await getDataCatch(fs);
        produto = getProdutoByCode(selectProd.value);
        erro = `Erro ao selecionar produtos ${ selectProd.value }, da loja: ${ selectStore.value }`;

        var img = new Image();
        var imgUrl = produto[0].items[0].images[0].imageUrl;
        // img.src = imgUrl;
        // console.log(img)
        // imageProd.appendChild(img);
        // imageProd2.appendChild(img);
        // imageProd.innerHTML = img;
        imageProd.src = imgUrl;
        // theimage.appendChild(img);

        itemName.innerHTML = produto[0].items[0].name;
        measurementUnit.innerHTML = produto[0].items[0].unitMultiplier + produto[0].items[0].measurementUnit;
//        itemName.innerHTML = produto[0].items[0].name;
        // data[0].sellers.forEach(element => {
        //     //selectStore.innerHTML += `<option>${ element.id }</option>`
        // });
    }
    catch
    {
        console.log(erro)
    }
} 

function getProdutoByCode(productName) {
    return produtos.filter(
        function(produtos){ return produtos.productName == productName }
    );
  }
