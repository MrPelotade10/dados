d3.csv("dados_limpos.csv").then(function(data){

data.forEach(d=>{

d.Global_Sales=+d.Global_Sales;
d.NA_Sales=+d.NA_Sales;
d.EU_Sales=+d.EU_Sales;
d.JP_Sales=+d.JP_Sales;
d.Other_Sales=+d.Other_Sales;
d.Year=+d.Year;

});

document.getElementById("games").innerText=data.length;

document.getElementById("platforms").innerText=
new Set(data.map(d=>d.Platform)).size;

document.getElementById("genres").innerText=
new Set(data.map(d=>d.Genre)).size;

let totalSales=
data.reduce((s,d)=>s+d.Global_Sales,0);

document.getElementById("sales").innerText=
totalSales.toFixed(0);

let top10=[...data]
.sort((a,b)=>b.Global_Sales-a.Global_Sales)
.slice(0,10);

Plotly.newPlot("grafico1",[{
x:top10.map(d=>d.Global_Sales),
y:top10.map(d=>d.Name),
type:"bar",
orientation:"h"
}]);

let genero={};

data.forEach(d=>{
genero[d.Genre]=(genero[d.Genre]||0)+d.Global_Sales;
});

Plotly.newPlot("grafico2",[{
labels:Object.keys(genero),
values:Object.values(genero),
type:"pie"
}]);

let plataforma={};

data.forEach(d=>{
plataforma[d.Platform]=(plataforma[d.Platform]||0)+d.Global_Sales;
});

let topPlat=
Object.entries(plataforma)
.sort((a,b)=>b[1]-a[1])
.slice(0,10);

Plotly.newPlot("grafico3",[{
x:topPlat.map(x=>x[0]),
y:topPlat.map(x=>x[1]),
type:"bar"
}]);

let anos={};

data.forEach(d=>{

if(!isNaN(d.Year)){

anos[d.Year]=(anos[d.Year]||0)+d.Global_Sales;

}

});

let anosOrd=
Object.entries(anos)
.sort((a,b)=>a[0]-b[0]);

Plotly.newPlot("grafico4",[{
x:anosOrd.map(x=>x[0]),
y:anosOrd.map(x=>x[1]),
mode:"lines+markers"
}]);

let regioes=[

data.reduce((s,d)=>s+d.NA_Sales,0),
data.reduce((s,d)=>s+d.EU_Sales,0),
data.reduce((s,d)=>s+d.JP_Sales,0),
data.reduce((s,d)=>s+d.Other_Sales,0)

];

Plotly.newPlot("grafico5",[{

labels:[
"América do Norte",
"Europa",
"Japão",
"Outros"
],

values:regioes,

type:"pie"

}]);

});
