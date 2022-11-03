function convertToJSON(response) {
	return response.json();
}

function loadDetail() {
	fetch(
		`https://api.coingecko.com/api/v3/coins/dogecoin?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`
	)
		.then(convertToJSON)
		.then(render);

	fetch(
		`https://api.coingecko.com/api/v3/coins/dogecoin/market_chart?vs_currency=usd&days=1&interval=hourly`
	)
		.then(convertToJSON)
		.then(renderChart);
}

function render(data) {
	const name = `${data.name} (${data.symbol.toUpperCase()})`;
	const description = data.description.en;
	const logo = data.image.large;

	const usd = data.market_data.current_price.usd;
	const eur = data.market_data.current_price.eur;
	const gbp = data.market_data.current_price.gbp;

	document.getElementById("coin-name").innerText = name;
	document.getElementById("coin-description").innerHTML = description;
	document.getElementById("coin-logo").src = logo;

	document.getElementById("usd-price").innerText = usd;
	document.getElementById("eur-price").innerText = eur;
	document.getElementById("gbp-price").innerHTML = gbp;
}

window.onload = function () {
	loadDetail();
};

function renderChart(data) {
	const prices = data.prices;

	const timesstamps = [];
	const prices_usd = [];

	for (let i = 0; i < prices.length; i++) {
		const single_price = prices[i];

		const date_obj = new Date(single_price[0]);
		let hours = date_obj.getHours();
		if (hours < 10) {
			hours = "0" + hours;
		}
		let minutes = date_obj.getMinutes();
		if (minutes < 10) {
			minutes = "0" + minutes;
		}

		timesstamps.push(`${hours}:${minutes}`);
		prices_usd.push(single_price[1]);
	}

	const ctx = document.getElementById("myChart").getContext("2d");
	const myChart = new Chart(ctx, {
		type: "line",
		data: {
			labels: timesstamps,
			datasets: [
				{
					label: "Price (in USD)",
					data: prices_usd,
					borderColor: "rgb(75, 192, 192)",
					tension: 0.4,
				},
			],
		},
		options: {
			plugins: {
				legend: {
					display: false,
				},
			},
		},
	});
}

console.log(myChart);
