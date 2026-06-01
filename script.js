const csvData = { url: "dados_limpos.csv" };
const embedOptions = { actions: false, theme: "pure" };

// VISUALIZAÇÃO 1
const spec1 = {
  $schema: "https://vega.github.io/schema/vega-lite/v5.json",
  data: csvData,
  width: 750,
  height: 350,
  mark: "bar",
  encoding: {
    x: { field: "Platform", type: "nominal", sort: "-y", title: "Plataforma" },
    y: { aggregate: "count", type: "quantitative", title: "Quantidade de Jogos" },
    color: { field: "Platform", type: "nominal", legend: null, scale: { scheme: "tableau10" } }
  }
};
vegaEmbed('#vis1', spec1, embedOptions);

// VISUALIZAÇÃO 2
const spec2 = {
  $schema: "https://vega.github.io/schema/vega-lite/v5.json",
  data: csvData,
  width: 400,
  height: 400,
  mark: { type: "arc", innerRadius: 50 },
  encoding: {
    theta: { aggregate: "count", type: "quantitative" },
    color: { field: "Genre", type: "nominal", title: "Gênero", scale: { scheme: "category20" } }
  }
};
vegaEmbed('#vis2', spec2, embedOptions);

// VISUALIZAÇÃO 3
const spec3 = {
  $schema: "https://vega.github.io/schema/vega-lite/v5.json",
  data: csvData,
  width: 750,
  height: 350,
  mark: { type: "line", point: true },
  encoding: {
    x: { field: "Year", type: "quantitative", title: "Ano de Lançamento", axis: { format: "d" } },
    y: { aggregate: "count", type: "quantitative", title: "Quantidade de Lançamentos" },
    color: { value: "#2563eb" }
  }
};
vegaEmbed('#vis3', spec3, embedOptions);

// VISUALIZAÇÃO 4
const spec4 = {
  $schema: "https://vega.github.io/schema/vega-lite/v5.json",
  data: csvData,
  width: 750,
  height: 450,
  mark: "bar",
  encoding: {
    y: { field: "Platform", type: "nominal", sort: "-x", title: "Plataforma" },
    x: { field: "Global_Sales", aggregate: "sum", type: "quantitative", title: "Soma de Vendas Globais (Milhões)" },
    color: { field: "Platform", type: "nominal", legend: null, scale: { scheme: "tableau20" } }
  }
};
vegaEmbed('#vis4', spec4, embedOptions);

// VISUALIZAÇÃO 5
const spec5 = {
  $schema: "https://vega.github.io/schema/vega-lite/v5.json",
  data: csvData,
  width: 750,
  height: 350,
  mark: "bar",
  encoding: {
    x: { field: "Genre", type: "nominal", sort: "-y", title: "Gênero" },
    y: { field: "Global_Sales", aggregate: "sum", type: "quantitative", title: "Vendas Globais (Milhões)" },
    color: { field: "Genre", type: "nominal", legend: null, scale: { scheme: "category20c" } }
  }
};
vegaEmbed('#vis5', spec5, embedOptions);

// VISUALIZAÇÃO 6
const spec6 = {
  $schema: "https://vega.github.io/schema/vega-lite/v5.json",
  data: csvData,
  transform: [
    { window: [{ op: "rank", as: "rank" }], sort: [{ field: "Global_Sales", order: "descending" }] },
    { filter: "datum.rank <= 10" }
  ],
  width: 750,
  height: 400,
  mark: "bar",
  encoding: {
    y: { field: "Name", type: "nominal", sort: "-x", title: "Nome do Jogo" },
    x: { field: "Global_Sales", type: "quantitative", title: "Vendas Globais (Milhões)" },
    color: { field: "Name", type: "nominal", legend: null, scale: { scheme: "dark2" } }
  }
};
vegaEmbed('#vis6', spec6, embedOptions);

// VISUALIZAÇÃO 7
const spec7 = {
  $schema: "https://vega.github.io/schema/vega-lite/v5.json",
  data: csvData,
  width: 750,
  height: 400,
  mark: { type: "point", filled: true, opacity: 0.6, size: 50 },
  encoding: {
    x: { field: "NA_Sales", type: "quantitative", title: "Vendas na América do Norte (Milhões)" },
    y: { field: "EU_Sales", type: "quantitative", title: "Vendas na Europa (Milhões)" },
    color: { value: "#e15759" },
    tooltip: [
      { field: "Name", type: "nominal", title: "Jogo" },
      { field: "Platform", type: "nominal", title: "Plataforma" },
      { field: "Global_Sales", type: "quantitative", title: "Total Global" }
    ]
  }
};
vegaEmbed('#vis7', spec7, embedOptions);

// VISUALIZAÇÃO 8
const spec8 = {
  $schema: "https://vega.github.io/schema/vega-lite/v5.json",
  data: csvData,
  transform: [
    { fold: ["NA_Sales", "EU_Sales", "JP_Sales", "Other_Sales"], as: ["Regiao", "Vendas"] }
  ],
  width: 400,
  height: 400,
  mark: { type: "arc", outerRadius: 140 },
  encoding: {
    theta: { field: "Vendas", aggregate: "sum", type: "quantitative" },
    color: {
      field: "Regiao",
      type: "nominal",
      title: "Região do Mercado",
      scale: {
        domain: ["NA_Sales", "EU_Sales", "JP_Sales", "Other_Sales"],
        range: ["#4c78a8", "#f58518", "#e15759", "#76b7b2"]
      }
    }
  }
};
vegaEmbed('#vis8', spec8, embedOptions);

// VISUALIZAÇÃO 9
const spec9 = {
  $schema: "https://vega.github.io/schema/vega-lite/v5.json",
  data: csvData,
  width: 750,
  height: 350,
  mark: "bar",
  encoding: {
    x: { field: "Global_Sales", type: "quantitative", bin: { maxbins: 40 }, title: "Vendas Globais (Milhões)" },
    y: { aggregate: "count", type: "quantitative", title: "Quantidade de Jogos (Frequência)" },
    color: { value: "#4e79a7" }
  }
};
vegaEmbed('#vis9', spec9, embedOptions);
