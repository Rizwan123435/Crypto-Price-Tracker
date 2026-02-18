
const container = document.getElementById("cryptoList");
const loading = document.getElementById("loading");
const search = document.getElementById("search");

let cryptoData = [];

async function loadCrypto(){

try{

loading.style.display="block";

const res = await fetch(
"https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false"
);

cryptoData = await res.json();

displayCrypto(cryptoData);

loading.style.display="none";

}catch(e){

loading.innerText="Error loading data";

}

}

function displayCrypto(data){

container.innerHTML="";

data.forEach(c=>{

let changeClass = c.price_change_percentage_24h >= 0 ? "green" : "red";

container.innerHTML += `
<div class="card">

<h3>${c.name} (${c.symbol.toUpperCase()})</h3>

<p>💰 Price: $${c.current_price}</p>

<p class="${changeClass}">
24h: ${c.price_change_percentage_24h.toFixed(2)}%
</p>

<p>Market Cap: $${c.market_cap.toLocaleString()}</p>

</div>
`;

});

}

/* SEARCH */

search.oninput = () => {

let filtered = cryptoData.filter(c =>
c.name.toLowerCase().includes(search.value.toLowerCase())
);

displayCrypto(filtered);

};

/* AUTO REFRESH EVERY 30 SEC */

setInterval(loadCrypto,30000);

loadCrypto();
