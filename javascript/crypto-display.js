function convertToJSON(response){
    return response.json();
}


function windowLoaded(){
    fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd')
    .then(convertToJSON)
    .then(loadCoinData)
}


function loadCoinData(data){
    const conversionRate = data.bitcoin.usd;
    fetch('https://api.coingecko.com/api/v3/search/trending')
    .then(convertToJSON)
    .then((data) => {
        render(data, conversionRate)
    })
}

function render(coinData, conversionRate){
    for(let i =0; i< coinData.coins.length; i++){
        const singleCoin = coinData.coins[i].item;
        const logo = singleCoin.large;
        const name = `${singleCoin.name} (${singleCoin.symbol})`;
        const price = Math.round(singleCoin.price_btc * conversionRate * 10000) / 10000;
        insertCryptoCard(logo, name, price)
    }
}


function insertCryptoCard(logo, name, price){
    const price_para =document.createElement('p');
    price_para.classList.add("fs-lg", "fw-semibold", "text-primary", "mb-0");
    price_para.innerText = `$ ${price}`

    const name_head = document.createElement('h3');
    name_head.classList.add("h5", "mb-2");
    name_head.innerText = name;

    const right_container = document.createElement('div');
    right_container.classList.add('card-body', 'pb-3');
    right_container.appendChild(name_head);
    right_container.appendChild(price_para);

    const img_elem = document.createElement('img');
    img_elem.src = logo;
    img_elem.classList.add('card-img-top')
    img_elem.alt ='coin image';

    const img_div = document.createElement('div');
    img_div.classList.add('position-relative');
    img_div.appendChild(img_elem);

    const card_container = document.createElement('article');
    card_container.classList.add('card', 'h-100', 'border-0', 'shadow-sm');
    card_container.appendChild(img_div);
    card_container.appendChild(right_container);
    console.log(card_container);

    const card = document.createElement('div');
    card.classList.add('col', 'pb-1', 'pb-lg-3', 'mb-4')
    card.appendChild(card_container);


    document.getElementById('coins').appendChild(card);
}





window.onload = () =>{
    windowLoaded();
}