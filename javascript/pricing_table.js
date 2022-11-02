function showTable(){
    fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd")
    .then(res =>res.json())
    .then((jsonData)=>{
        const coinSet = jsonData
        // console.log(coinSet)
    
        let coinData = ""
        
        for (let i = 0; i<coinSet.length; i++) {
            coinData += '<tr>'
            coinData += `<td><img src="${coinSet[i].image}" class="coin" style="height: 40px; width: 40px;"></td>`;
            coinData += `<td> ${coinSet[i].name} </td>`;
            coinData += `<td> ${coinSet[i].symbol} </td>`;
            coinData += `<td> $ ${coinSet[i].current_price} </td>`;
            coinData += `<td> ${coinSet[i].market_cap} </td>`;
            coinData += `<td> ${coinSet[i].circulating_supply} </td>`; "<tr>"

            // adding a button that takes the user to coin-description page
            coinData += `<td><button id="learnMoreButton" onclick="location.href='./coin-description.html'">Learn More</button></td>`
        }
    
        // console.log(coinData)
    
        // inserting the table data as a string to HTML
        document.getElementById('coinTableData').innerHTML = coinData
    });
}

showTable();