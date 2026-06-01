const csvSource = { url: "dados_limpos.csv" };
const vegaConfig = { actions: false, theme: "dark" };

const spec1 = {
  $schema: "https://vega.github.io/schema/vega-lite/v5.json",
  data: csvSource,
  width: 750,
  height: 350,
  mark: { type: "bar", color: "#6366f1" },
  encoding: {
    x: { field: "Platform", type: "nominal", sort: "-y", title: "Plataforma", axis: { labelAngle: -45 } },
    y: { aggregate: "count", type: "quantitative", title: "Quantidade de Jogos" },
    tooltip: [
      { field: "Platform", type: "nominal", title: "Plataforma" },
      { aggregate: "count", type: "quantitative", title: "Qtd de Jogos" }
    ]
  }
};
vegaEmbed('#vis1', spec1, vegaConfig);

const spec2 = {
  $schema: "https://vega.github.io/schema/vega-lite/v5.json",
  data: csvSource,
  width: 400,
  height: 320,
  transform: [
    { aggregate: [{ op: "count", as: "total_jogos" }], groupby: ["Genre"] },
    { joinaggregate: [{ op: "sum", field: "total_jogos", as: "grand_total" }] },
    { calculate: "datum.total_jogos / datum.grand_total", as: "porcentagem" },
    { calculate: "datum.Genre + ' (' + format(datum.porcentagem, '.1%') + ')'", as: "legenda_customizada" }
  ],
  mark: { type: "arc", innerRadius: 60, stroke: "#1e293b" },
  encoding: {
    theta: { field: "total_jogos", type: "quantitative" },
    color: { 
      field: "legenda_customizada", 
      type: "nominal", 
      title: "Gêneros (% do Total)", 
      scale: { scheme: "tableau20" },
      sort: { field: "total_jogos", order: "descending" }
    },
    tooltip: [
      { field: "Genre", type: "nominal", title: "Gênero" },
      { field: "total_jogos", type: "quantitative", title: "Qtd de Jogos" },
      { field: "porcentagem", type: "quantitative", title: "Participação", format: ".1%" }
    ]
  }
};
vegaEmbed('#vis2', spec2, vegaConfig);

const spec3 = {
  $schema: "https://vega.github.io/schema/vega-lite/v5.json",
  data: csvSource,
  width: 750,
  height: 320,
  mark: { type: "line", point: { size: 40, filled: true }, color: "#38bdf8" },
  encoding: {
    x: { field: "Year", type: "quantitative", title: "Ano", axis: { format: "d" } },
    y: { aggregate: "count", type: "quantitative", title: "Volume de Lançamentos" },
    tooltip: [
      { field: "Year", type: "quantitative", title: "Ano", format: "d" },
      { aggregate: "count", type: "quantitative", title: "Lançamentos" }
    ]
  }
};
vegaEmbed('#vis3', spec3, vegaConfig);

const spec4 = {
  $schema: "https://vega.github.io/schema/vega-lite/v5.json",
  data: csvSource,
  width: 750,
  height: 450,
  mark: { type: "bar", color: "#6366f1" },
  encoding: {
    y: { field: "Platform", type: "nominal", sort: "-x", title: "Plataforma" },
    x: { field: "Global_Sales", aggregate: "sum", type: "quantitative", title: "Faturamento Acumulado (Milhões USD)" },
    tooltip: [
      { field: "Platform", type: "nominal", title: "Plataforma" },
      { field: "Global_Sales", aggregate: "sum", type: "quantitative", title: "Vendas Totais (Mmi)", format: "$.2f" }
    ]
  }
};
vegaEmbed('#vis4', spec4, vegaConfig);

const spec5 = {
  $schema: "https://vega.github.io/schema/vega-lite/v5.json",
  data: csvSource,
  width: 750,
  height: 350,
  mark: { type: "bar", color: "#a855f7" },
  encoding: {
    x: { field: "Genre", type: "nominal", sort: "-y", title: "Gênero" },
    y: { field: "Global_Sales", aggregate: "sum", type: "quantitative", title: "Vendas Globais (Milhões USD)" },
    tooltip: [
      { field: "Genre", type: "nominal", title: "Gênero" },
      { field: "Global_Sales", aggregate: "sum", type: "quantitative", title: "Vendas (Mmi)", format: "$.2f" }
    ]
  }
};
vegaEmbed('#vis5', spec5, vegaConfig);

const spec6 = {
  $schema: "https://vega.github.io/schema/vega-lite/v5.json",
  data: csvSource,
  transform: [
    { window: [{ op: "rank", as: "rank" }], sort: [{ field: "Global_Sales", order: "descending" }] },
    { filter: "datum.rank <= 10" }
  ],
  width: 750,
  height: 380,
  mark: { type: "bar", color: "#06b6d4" },
  encoding: {
    y: { field: "Name", type: "nominal", sort: "-x", title: "Nome do Jogo" },
    x: { field: "Global_Sales", type: "quantitative", title: "Vendas Globais (Milhões Unidades)" },
    tooltip: [
      { field: "rank", type: "quantitative", title: "Posição" },
      { field: "Name", type: "nominal", title: "Jogo" },
      { field: "Global_Sales", type: "quantitative", title: "Vendas", format: ".2f" }
    ]
  }
};
vegaEmbed('#vis6', spec6, vegaConfig);

const spec7 = {
  $schema: "https://vega.github.io/schema/vega-lite/v5.json",
  data: csvSource,
  width: 750,
  height: 400,
  params: [{
    name: "grid",
    select: "interval",
    bind: "scales"
  }],
  mark: { type: "point", size: 50, opacity: 0.6, filled: true, color: "#f43f5e" },
  encoding: {
    x: { field: "NA_Sales", type: "quantitative", title: "Mercado Norte-Americano (Milhões)" },
    y: { field: "EU_Sales", type: "quantitative", title: "Mercado Europeu (Milhões)" },
    tooltip: [
      { field: "Name", type: "nominal", title: "Jogo" },
      { field: "Platform", type: "nominal", title: "Plataforma" },
      { field: "Global_Sales", type: "quantitative", title: "Total Global" }
    ]
  }
};
vegaEmbed('#vis7', spec7, vegaConfig);

const spec8 = {
  $schema: "https://vega.github.io/schema/vega-lite/v5.json",
  data: csvSource,
  transform: [
    { fold: ["NA_Sales", "EU_Sales", "JP_Sales", "Other_Sales"], as: ["Regiao", "Vendas"] },
    { aggregate: [{ op: "sum", field: "Vendas", as: "vendas_regiao" }], groupby: ["Regiao"] },
    { joinaggregate: [{ op: "sum", field: "vendas_regiao", as: "vendas_totais" }] },
    { calculate: "datum.vendas_regiao / datum.vendas_totais", as: "porcentagem" },
    { calculate: "datum.Regiao + ' (' + format(datum.porcentagem, '.1%') + ')'", as: "legenda_customizada" }
  ],
  width: 400,
  height: 320,
  mark: { type: "arc", outerRadius: 120, stroke: "#1e293b" },
  encoding: {
    theta: { field: "vendas_regiao", type: "quantitative" },
    color: {
      field: "legenda_customizada",
      type: "nominal",
      title: "Zonas Geográficas (% Global)",
      scale: {
        domain: [
          "NA_Sales (49.1%)",
          "EU_Sales (27.3%)",
          "JP_Sales (14.6%)",
          "Other_Sales (9.0%)"
        ],
        range: ["#6366f1", "#06b6d4", "#f43f5e", "#10b981"]
      }
    },
    tooltip: [
      { field: "Regiao", type: "nominal", title: "Região" },
      { field: "vendas_regiao", type: "quantitative", title: "Total Vendas", format: ".2f" },
      { field: "porcentagem", type: "quantitative", title: "Porcentagem", format: ".1%" }
    ]
  }
};
vegaEmbed('#vis8', spec8, vegaConfig);

const spec9 = {
  $schema: "https://vega.github.io/schema/vega-lite/v5.json",
  data: csvSource,
  width: 750,
  height: 350,
  mark: { type: "bar", color: "#6366f1" },
  encoding: {
    x: { field: "Global_Sales", type: "quantitative", bin: { maxbins: 50 }, title: "Faixa de Vendas Globais (Milhões)" },
    y: { aggregate: "count", type: "quantitative", title: "Quantidade de Jogos (Frequência)" },
    tooltip: [
      { field: "Global_Sales", type: "quantitative", bin: true, title: "Faixa de Vendas" },
      { aggregate: "count", type: "quantitative", title: "Frequência (Jogos)" }
    ]
  }
};
vegaEmbed('#vis9', spec9, vegaConfig);
