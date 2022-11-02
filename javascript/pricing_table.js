function showTable(){
    fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd")
    .then(res =>res.json())
    .then((jsonData)=>{
        const coinSet = jsonData
        // console.log(coinSet)
    
        let coinData = ""
        
        for (let i = 0; i<coinSet.length; i++) {
            coinData += '<tr>'
            coinData += `<td class="numeric"><img src="${coinSet[i].image}"></td class="numeric">`;
            coinData += `<td class="numeric"> ${coinSet[i].name} </td>`;
            coinData += `<td class="numeric"> ${coinSet[i].symbol} </td>`;
            coinData += `<td class="numeric"> $ ${coinSet[i].current_price} </td>`;
            coinData += `<td class="numeric"> ${coinSet[i].market_cap} </td>`;
            coinData += `<td class="numeric"> ${coinSet[i].circulating_supply} </td>`; "<tr>"
        }
    
        // console.log(coinData)
    
        document.getElementById('coinTableData').innerHTML = coinData
    });
}

showTable();