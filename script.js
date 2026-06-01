const csvSource = { url: "dados_limpos.csv" };

// ATENÇÃO: Tema configurado como "dark" para o Vega-Lite aplicar tipografia clara nos graficos
const vegaConfig = { actions: false, theme: "dark" };

// VISUALIZAÇÃO 1: Quantidade de Jogos por Plataforma
const spec1 = {
  $schema: "https://vega.github.io/schema/vega-lite/v5.json",
  data: csvSource,
  width: 750,
  height: 350,
  mark: { type: "bar", color: "#6366f1" }, // Cor indigo estática sem travar a escala
  encoding: {
    x: { field: "Platform", type: "nominal", sort: "-y", title: "Plataforma", axis: { labelAngle: -45 } },
    y: { aggregate: "count", type: "quantitative", title: "Quantidade de Jogos" }
  }
};
vegaEmbed('#vis1', spec1, vegaConfig);

// VISUALIZAÇÃO 2: Distribuição dos Jogos por Gênero
const spec2 = {
  $schema: "https://vega.github.io/schema/vega-lite/v5.json",
  data: csvSource,
  width: 400,
  height: 320,
  mark: { type: "arc", innerRadius: 60, stroke: "#1e293b" },
  encoding: {
    theta: { aggregate: "count", type: "quantitative" },
    color: { field: "Genre", type: "nominal", title: "Gêneros", scale: { scheme: "tableau20" } }
  }
};
vegaEmbed('#vis2', spec2, vegaConfig);

// VISUALIZAÇÃO 3: Evolução dos Lançamentos ao Longo dos Anos
const spec3 = {
  $schema: "https://vega.github.io/schema/vega-lite/v5.json",
  data: csvSource,
  width: 750,
  height: 320,
  mark: { type: "line", point: { size: 40, filled: true }, color: "#38bdf8" },
  encoding: {
    x: { field: "Year", type: "quantitative", title: "Ano", axis: { format: "d" } },
    y: { aggregate: "count", type: "quantitative", title: "Volume de Lançamentos" }
  }
};
vegaEmbed('#vis3', spec3, vegaConfig);

// VISUALIZAÇÃO 4: Vendas Globais por Plataforma
const spec4 = {
  $schema: "https://vega.github.io/schema/vega-lite/v5.json",
  data: csvSource,
  width: 750,
  height: 450,
  mark: { type: "bar", color: "#6366f1" },
  encoding: {
    y: { field: "Platform", type: "nominal", sort: "-x", title: "Plataforma" },
    x: { field: "Global_Sales", aggregate: "sum", type: "quantitative", title: "Faturamento Acumulado (Milhões USD)" }
  }
};
vegaEmbed('#vis4', spec4, vegaConfig);

// VISUALIZAÇÃO 5: Vendas Globais por Gênero
const spec5 = {
  $schema: "https://vega.github.io/schema/vega-lite/v5.json",
  data: csvSource,
  width: 750,
  height: 350,
  mark: { type: "bar", color: "#a855f7" },
  encoding: {
    x: { field: "Genre", type: "nominal", sort: "-y", title: "Gênero" },
    y: { field: "Global_Sales", aggregate: "sum", type: "quantitative", title: "Vendas Globais (Milhões USD)" }
  }
};
vegaEmbed('#vis5', spec5, vegaConfig);

// VISUALIZAÇÃO 6: Top 10 Jogos Mais Vendidos
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
    x: { field: "Global_Sales", type: "quantitative", title: "Vendas Globais (Milhões Unidades)" }
  }
};
vegaEmbed('#vis6', spec6, vegaConfig);

// VISUALIZAÇÃO 7: Relação entre Vendas na América do Norte e Europa
const spec7 = {
  $schema: "https://vega.github.io/schema/vega-lite/v5.json",
  data: csvSource,
  width: 750,
  height: 400,
  mark: { type: "point", size: 40, opacity: 0.6, filled: true, color: "#f43f5e" },
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

// VISUALIZAÇÃO 8: Participação das Regiões nas Vendas Globais
const spec8 = {
  $schema: "https://vega.github.io/schema/vega-lite/v5.json",
  data: csvSource,
  transform: [
    { fold: ["NA_Sales", "EU_Sales", "JP_Sales", "Other_Sales"], as: ["Regiao", "Vendas"] }
  ],
  width: 400,
  height: 320,
  mark: { type: "arc", outerRadius: 120, stroke: "#1e293b" },
  encoding: {
    theta: { field: "Vendas", aggregate: "sum", type: "quantitative" },
    color: {
      field: "Regiao",
      type: "nominal",
      title: "Zonas Geográficas",
      scale: {
        domain: ["NA_Sales", "EU_Sales", "JP_Sales", "Other_Sales"],
        range: ["#6366f1", "#06b6d4", "#f43f5e", "#10b981"]
      }
    }
  }
};
vegaEmbed('#vis8', spec8, vegaConfig);

// VISUALIZAÇÃO 9: Distribuição das Vendas Globais (Histograma)
const spec9 = {
  $schema: "https://vega.github.io/schema/vega-lite/v5.json",
  data: csvSource,
  width: 750,
  height: 350,
  mark: { type: "bar", color: "#6366f1" },
  encoding: {
    x: { field: "Global_Sales", type: "quantitative", bin: { maxbins: 50 }, title: "Faixa de Vendas Globais (Milhões)" },
    y: { aggregate: "count", type: "quantitative", title: "Quantidade de Jogos (Frequência)" }
  }
};
vegaEmbed('#vis9', spec9, vegaConfig);
