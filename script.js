// Arquivo de dados padrão mapeado na raiz
const csvData = { url: "dados_limpos.csv" };

// Opções padrão de configuração para os gráficos ficarem responsivos e bonitos
const embedOptions = { actions: false };

// VISUALIZAÇÃO 1 - Jogos por Plataforma
const spec1 = {
  $schema: "https://vega.github.io/schema/vega-lite/v5.json",
  data: csvData,
  width: "container",
  height: 350,
  mark: "bar",
  encoding: {
    x: { field: "Platform", type: "nominal", sort: "-y", title: "Plataforma" },
    y: { aggregate: "count", type: "quantitative", title: "Quantidade de Jogos" },
    color: { field: "Platform", type: "nominal", legend: null }
  }
};
vegaEmbed('#vis1', spec1, embedOptions);

// VISUALIZAÇÃO 2 - Distribuição por Gênero
const spec2 = {
  $schema: "https://vega.github.io/schema/vega-lite/v5.json",
  data: csvData,
  width: 350,
  height: 350,
  mark: "arc",
  encoding: {
    theta: { aggregate: "count", type: "quantitative" },
    color: { field: "Genre", type: "nominal", title: "Gênero" }
  }
};
vegaEmbed('#vis2', spec2, embedOptions);

// VISUALIZAÇÃO 3 - Evolução por Ano
const spec3 = {
  $schema: "https://vega.github.io/schema/vega-lite/v5.json",
  data: csvData,
  width: "container",
  height: 350,
  mark: "line",
  encoding: {
    x: { field: "Year", type: "quantitative", title: "Ano de Lançamento", axis: { format: "d" } },
    y: { aggregate: "count", type: "quantitative", title: "Quantidade de Lançamentos" }
  }
};
vegaEmbed('#vis3', spec3, embedOptions);

// VISUALIZAÇÃO 4 - Vendas Globais por Plataforma
const spec4 = {
  $schema: "https://vega.github.io/schema/vega-lite/v5.json",
  data: csvData,
  width: "container",
  height: 450,
  mark: "bar",
  encoding: {
    y: { field: "Platform", type: "nominal", sort: "-x", title: "Plataforma" },
    x: { field: "Global_Sales", aggregate: "sum", type: "quantitative", title: "Soma de Vendas Globais (Milhões)" },
    color: { field: "Platform", type: "nominal", legend: null }
  }
};
vegaEmbed('#vis4', spec4, embedOptions);

// VISUALIZAÇÃO 5 - Vendas Globais por Gênero
const spec5 = {
  $schema: "https://vega.github.io/schema/vega-lite/v5.json",
  data: csvData,
  width: "container",
  height: 350,
  mark: "bar",
  encoding: {
    x: { field: "Genre", type: "nominal", sort: "-y", title: "Gênero" },
    y: { field: "Global_Sales", aggregate: "sum", type: "quantitative", title: "Vendas Globais (Milhões)" },
    color: { field: "Genre", type: "nominal", legend: null }
  }
};
vegaEmbed('#vis5', spec5, embedOptions);

// VISUALIZAÇÃO 6 - Top 10 Jogos Mais Vendidos (Filtrado via transform do Vega-Lite)
const spec6 = {
  $schema: "https://vega.github.io/schema/vega-lite/v5.json",
  data: csvData,
  transform: [
    {
      window: [{ op: "rank", as: "rank" }],
      sort: [{ field: "Global_Sales", order: "descending" }]
    },
    { filter: "datum.rank <= 10" }
  ],
  width: "container",
  height: 400,
  mark: "bar",
  encoding: {
    y: { field: "Name", type: "nominal", sort: "-x", title: "Nome do Jogo" },
    x: { field: "Global_Sales", type: "quantitative", title: "Vendas Globais (Milhões)" },
    color: { field: "Name", type: "nominal", legend: null }
  }
};
vegaEmbed('#vis6', spec6, embedOptions);

// VISUALIZAÇÃO 7 - América do Norte vs Europa (Dispersão)
const spec7 = {
  $schema: "https://vega.github.io/schema/vega-lite/v5.json",
  data: csvData,
  width: "container",
  height: 400,
  mark: "point",
  encoding: {
    x: { field: "NA_Sales", type: "quantitative", title: "Vendas na América do Norte (Milhões)" },
    y: { field: "EU_Sales", type: "quantitative", title: "Vendas na Europa (Milhões)" },
    tooltip: [
      { field: "Name", type: "nominal", title: "Jogo" },
      { field: "Platform", type: "nominal", title: "Plataforma" },
      { field: "Global_Sales", type: "quantitative", title: "Total Global" }
    ]
  }
};
vegaEmbed('#vis7', spec7, embedOptions);

// VISUALIZAÇÃO 8 - Participação Regional (Transform Fold para agregar colunas)
const spec8 = {
  $schema: "https://vega.github.io/schema/vega-lite/v5.json",
  data: csvData,
  transform: [
    {
      fold: ["NA_Sales", "EU_Sales", "JP_Sales", "Other_Sales"],
      as: ["Regiao", "Vendas"]
    }
  ],
  width: 350,
  height: 350,
  mark: "arc",
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

// VISUALIZAÇÃO 9 - Histograma de Distribuição Global
const spec9 = {
  $schema: "https://vega.github.io/schema/vega-lite/v5.json",
  data: csvData,
  width: "container",
  height: 350,
  mark: "bar",
  encoding: {
    x: { field: "Global_Sales", type: "quantitative", bin: { maxbins: 40 }, title: "Vendas Globais (Milhões)" },
    y: { aggregate: "count", type: "quantitative", title: "Quantidade de Jogos (Frequência)" }
  }
};
vegaEmbed('#vis9', spec9, embedOptions);
