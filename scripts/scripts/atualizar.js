const fs = require('fs');
const path = require('path');

// ============================================================
// DADOS ATUALIZADOS (VOCÊ PODE EDITAR AQUI QUANDO QUISER)
// ============================================================
const DADOS_ATUALIZADOS = {
  "serie-a": {
    "nome": "Brasileirão Série A",
    "icone": "🇧🇷",
    "formato": "pontos-corridos",
    "jogos_hoje": [],
    "proximos_jogos": [
      { "time_casa": "Fluminense", "time_visitante": "Palmeiras", "data": "15/08/2026", "hora": "16:30", "estadio": "Maracanã" },
      { "time_casa": "Athletico-PR", "time_visitante": "RB Bragantino", "data": "15/08/2026", "hora": "18:30", "estadio": "Arena da Baixada" },
      { "time_casa": "São Paulo", "time_visitante": "Coritiba", "data": "15/08/2026", "hora": "21:00", "estadio": "Morumbis" },
      { "time_casa": "Chapecoense", "time_visitante": "Bahia", "data": "16/08/2026", "hora": "11:00", "estadio": "Arena Condá" },
      { "time_casa": "Vasco", "time_visitante": "Santos", "data": "16/08/2026", "hora": "16:00", "estadio": "São Januário" },
      { "time_casa": "Atlético-MG", "time_visitante": "Grêmio", "data": "16/08/2026", "hora": "16:00", "estadio": "Arena MRV" },
      { "time_casa": "Mirassol", "time_visitante": "Flamengo", "data": "16/08/2026", "hora": "18:30", "estadio": "José Maria de Campos Maia" },
      { "time_casa": "Vitória", "time_visitante": "Botafogo", "data": "16/08/2026", "hora": "18:30", "estadio": "Barradão" },
      { "time_casa": "Corinthians", "time_visitante": "Cruzeiro", "data": "16/08/2026", "hora": "19:30", "estadio": "Neo Química Arena" },
      { "time_casa": "Internacional", "time_visitante": "Remo", "data": "17/08/2026", "hora": "20:00", "estadio": "Beira-Rio" }
    ],
    "artilheiros": [
      { "nome": "Viveros", "time": "Athletico-PR", "gols": 14 },
      { "nome": "Pedro", "time": "Flamengo", "gols": 12 },
      { "nome": "Carlos Vinícius", "time": "São Paulo", "gols": 10 },
      { "nome": "John Kennedy", "time": "Fluminense", "gols": 9 },
      { "nome": "Breno Lopes", "time": "Palmeiras", "gols": 8 },
      { "nome": "Danilo", "time": "Corinthians", "gols": 7 },
      { "nome": "Calleri", "time": "São Paulo", "gols": 7 },
      { "nome": "Arthur Cabral", "time": "Vasco", "gols": 7 },
      { "nome": "Luciano Juba", "time": "Bahia", "gols": 7 },
      { "nome": "Gabriel", "time": "Santos", "gols": 7 },
      { "nome": "Flaco López", "time": "Palmeiras", "gols": 6 },
      { "nome": "Luciano", "time": "São Paulo", "gols": 6 },
      { "nome": "Kaio Jorge", "time": "Cruzeiro", "gols": 6 },
      { "nome": "Jajá", "time": "Botafogo", "gols": 6 }
    ],
    "tabela": [
      { "posicao": 1, "time": "Palmeiras", "pontos": 48, "jogos": 22, "vitorias": 14, "empates": 6, "derrotas": 2, "saldo": "+22" },
      { "posicao": 2, "time": "Flamengo", "pontos": 42, "jogos": 21, "vitorias": 12, "empates": 6, "derrotas": 3, "saldo": "+21" },
      { "posicao": 3, "time": "Athletico-PR", "pontos": 40, "jogos": 22, "vitorias": 12, "empates": 4, "derrotas": 6, "saldo": "+11" },
      { "posicao": 4, "time": "Fluminense", "pontos": 35, "jogos": 22, "vitorias": 9, "empates": 8, "derrotas": 5, "saldo": "+5" },
      { "posicao": 5, "time": "Cruzeiro", "pontos": 33, "jogos": 22, "vitorias": 9, "empates": 6, "derrotas": 7, "saldo": "-1" },
      { "posicao": 6, "time": "Bahia", "pontos": 33, "jogos": 22, "vitorias": 8, "empates": 9, "derrotas": 5, "saldo": "+4" },
      { "posicao": 7, "time": "Corinthians", "pontos": 32, "jogos": 22, "vitorias": 8, "empates": 8, "derrotas": 6, "saldo": "+4" },
      { "posicao": 8, "time": "RB Bragantino", "pontos": 31, "jogos": 21, "vitorias": 9, "empates": 4, "derrotas": 8, "saldo": "+4" },
      { "posicao": 9, "time": "Botafogo", "pontos": 30, "jogos": 21, "vitorias": 8, "empates": 6, "derrotas": 7, "saldo": "+2" },
      { "posicao": 10, "time": "Coritiba", "pontos": 30, "jogos": 22, "vitorias": 8, "empates": 6, "derrotas": 8, "saldo": "-2" },
      { "posicao": 11, "time": "Atlético-MG", "pontos": 29, "jogos": 21, "vitorias": 8, "empates": 5, "derrotas": 8, "saldo": "0" },
      { "posicao": 12, "time": "São Paulo", "pontos": 26, "jogos": 21, "vitorias": 7, "empates": 5, "derrotas": 9, "saldo": "+1" },
      { "posicao": 13, "time": "Vitória", "pontos": 26, "jogos": 22, "vitorias": 7, "empates": 5, "derrotas": 10, "saldo": "-11" },
      { "posicao": 14, "time": "Grêmio", "pontos": 25, "jogos": 21, "vitorias": 6, "empates": 7, "derrotas": 8, "saldo": "-3" },
      { "posicao": 15, "time": "Mirassol", "pontos": 23, "jogos": 21, "vitorias": 6, "empates": 5, "derrotas": 10, "saldo": "-6" },
      { "posicao": 16, "time": "Internacional", "pontos": 23, "jogos": 22, "vitorias": 5, "empates": 8, "derrotas": 9, "saldo": "-4" },
      { "posicao": 17, "time": "Santos", "pontos": 22, "jogos": 21, "vitorias": 5, "empates": 7, "derrotas": 9, "saldo": "-6" },
      { "posicao": 18, "time": "Vasco", "pontos": 22, "jogos": 21, "vitorias": 5, "empates": 7, "derrotas": 9, "saldo": "-8" },
      { "posicao": 19, "time": "Remo", "pontos": 22, "jogos": 22, "vitorias": 5, "empates": 7, "derrotas": 10, "saldo": "-10" },
      { "posicao": 20, "time": "Chapecoense", "pontos": 10, "jogos": 21, "vitorias": 1, "empates": 7, "derrotas": 13, "saldo": "-23" }
    ]
  },
  "serie-b": {
    "nome": "Brasileirão Série B",
    "icone": "🇧🇷",
    "formato": "pontos-corridos",
    "jogos_hoje": [],
    "proximos_jogos": [
      { "time_casa": "Ceará", "time_visitante": "Goiás", "data": "15/08/2026", "hora": "15:00", "estadio": "Castelão" },
      { "time_casa": "Sport", "time_visitante": "CRB", "data": "15/08/2026", "hora": "17:00", "estadio": "Ilha do Retiro" },
      { "time_casa": "Novorizontino", "time_visitante": "Avaí", "data": "16/08/2026", "hora": "11:00", "estadio": "Jorge Ismael de Biasi" },
      { "time_casa": "Ponte Preta", "time_visitante": "Vila Nova", "data": "16/08/2026", "hora": "16:00", "estadio": "Moisés Lucarelli" },
      { "time_casa": "Coritiba", "time_visitante": "América-MG", "data": "17/08/2026", "hora": "20:00", "estadio": "Couto Pereira" }
    ],
    "artilheiros": [
      { "nome": "Lucas", "time": "Ceará", "gols": 11 },
      { "nome": "Gustavo", "time": "Sport", "gols": 9 },
      { "nome": "Marcos", "time": "Goiás", "gols": 8 },
      { "nome": "Bruno", "time": "Avaí", "gols": 7 },
      { "nome": "Rodrigo", "time": "CRB", "gols": 6 }
    ],
    "tabela": [
      { "posicao": 1, "time": "Ceará", "pontos": 38, "jogos": 20, "vitorias": 11, "empates": 5, "derrotas": 4, "saldo": "+15" },
      { "posicao": 2, "time": "Sport", "pontos": 35, "jogos": 20, "vitorias": 10, "empates": 5, "derrotas": 5, "saldo": "+10" },
      { "posicao": 3, "time": "Goiás", "pontos": 33, "jogos": 20, "vitorias": 9, "empates": 6, "derrotas": 5, "saldo": "+8" },
      { "posicao": 4, "time": "CRB", "pontos": 31, "jogos": 20, "vitorias": 8, "empates": 7, "derrotas": 5, "saldo": "+5" },
      { "posicao": 5, "time": "Avaí", "pontos": 30, "jogos": 20, "vitorias": 8, "empates": 6, "derrotas": 6, "saldo": "+3" },
      { "posicao": 6, "time": "Novorizontino", "pontos": 29, "jogos": 20, "vitorias": 8, "empates": 5, "derrotas": 7, "saldo": "+2" },
      { "posicao": 7, "time": "Ponte Preta", "pontos": 28, "jogos": 20, "vitorias": 7, "empates": 7, "derrotas": 6, "saldo": "0" },
      { "posicao": 8, "time": "Vila Nova", "pontos": 26, "jogos": 20, "vitorias": 7, "empates": 5, "derrotas": 8, "saldo": "-2" }
    ]
  },
  "libertadores": {
    "nome": "Copa Libertadores",
    "icone": "🌎",
    "formato": "mata-mata",
    "jogos_hoje": [
      { "time_casa": "Mirassol", "time_visitante": "LDU", "data": "13/08/2026", "hora": "19:00", "estadio": "José Maria de Campos Maia" },
      { "time_casa": "Rosario Central", "time_visitante": "Corinthians", "data": "13/08/2026", "hora": "21:30", "estadio": "Gigante de Arroyito" }
    ],
    "proximos_jogos": [
      { "time_casa": "Cruzeiro", "time_visitante": "Flamengo", "data": "13/08/2026", "hora": "21:30", "estadio": "Mineirão" },
      { "time_casa": "Fluminense", "time_visitante": "Independiente Rivadavia", "data": "11/08/2026", "hora": "19:00", "estadio": "Maracanã", "resultado": "0x0" },
      { "time_casa": "Palmeiras", "time_visitante": "Cerro Porteño", "data": "12/08/2026", "hora": "19:00", "estadio": "Allianz Parque", "resultado": "1x1" },
      { "time_casa": "Estudiantes", "time_visitante": "Universidad Católica", "data": "11/08/2026", "hora": "21:30", "estadio": "La Plata, ARG", "resultado": "1x1" },
      { "time_casa": "Platense", "time_visitante": "Coquimbo Unido", "data": "12/08/2026", "hora": "21:30", "estadio": "Vicente López, ARG", "resultado": "1x1" },
      { "time_casa": "Tolima", "time_visitante": "Independiente del Valle", "data": "19/08/2026", "hora": "21:30", "estadio": "Manuel Murillo Toro" }
    ],
    "artilheiros": [
      { "nome": "Alex Arce", "time": "Independiente Rivadavia", "gols": 8 },
      { "nome": "Carlos González", "time": "Independiente del Valle", "gols": 6 },
      { "nome": "Bruno Henrique", "time": "Flamengo", "gols": 4 },
      { "nome": "Lorenzo Melgarejo", "time": "Libertad", "gols": 4 },
      { "nome": "Matheus Pereira", "time": "Cruzeiro", "gols": 4 },
      { "nome": "Pedro", "time": "Flamengo", "gols": 3 }
    ],
    "tabela": [
      { "posicao": 1, "time": "Flamengo", "pontos": 16, "jogos": 6, "vitorias": 5, "empates": 1, "derrotas": 0, "saldo": "+12" },
      { "posicao": 2, "time": "Palmeiras", "pontos": 14, "jogos": 6, "vitorias": 4, "empates": 2, "derrotas": 0, "saldo": "+9" },
      { "posicao": 3, "time": "Corinthians", "pontos": 11, "jogos": 6, "vitorias": 3, "empates": 2, "derrotas": 1, "saldo": "+4" },
      { "posicao": 4, "time": "Cruzeiro", "pontos": 10, "jogos": 6, "vitorias": 3, "empates": 1, "derrotas": 2, "saldo": "+3" },
      { "posicao": 5, "time": "Fluminense", "pontos": 9, "jogos": 6, "vitorias": 2, "empates": 3, "derrotas": 1, "saldo": "+2" },
      { "posicao": 6, "time": "Independiente Rivadavia", "pontos": 8, "jogos": 6, "vitorias": 2, "empates": 2, "derrotas": 2, "saldo": "0" }
    ]
  },
  "sulamericana": {
    "nome": "Copa Sul-Americana",
    "icone": "🌎",
    "formato": "mata-mata",
    "jogos_hoje": [
      { "time_casa": "Santos", "time_visitante": "Macará", "data": "13/08/2026", "hora": "19:00", "estadio": "Vila Belmiro" },
      { "time_casa": "Vasco", "time_visitante": "Olimpia", "data": "13/08/2026", "hora": "19:00", "estadio": "São Januário" },
      { "time_casa": "Cienciano", "time_visitante": "Botafogo", "data": "13/08/2026", "hora": "21:30", "estadio": "Estádio Inca Garcilaso de la Vega" }
    ],
    "proximos_jogos": [
      { "time_casa": "Bolívar", "time_visitante": "São Paulo", "data": "11/08/2026", "hora": "21:30", "estadio": "La Paz, BOL", "resultado": "1x1" },
      { "time_casa": "Atlético-MG", "time_visitante": "Red Bull Bragantino", "data": "12/08/2026", "hora": "19:00", "estadio": "Arena MRV", "resultado": "1x0" },
      { "time_casa": "Boca Juniors", "time_visitante": "Deportivo Recoleta", "data": "11/08/2026", "hora": "19:00", "estadio": "Bombonera, ARG", "resultado": "3x1" },
      { "time_casa": "Santa Fe", "time_visitante": "River Plate", "data": "19/08/2026", "hora": "21:30", "estadio": "Bogotá, COL" }
    ],
    "artilheiros": [
      { "nome": "Gabriel Barbosa", "time": "Santos", "gols": 4 },
      { "nome": "Carlos Garcés", "time": "Cienciano", "gols": 4 },
      { "nome": "Adson", "time": "Vasco", "gols": 3 },
      { "nome": "Bernard", "time": "Atlético-MG", "gols": 3 },
      { "nome": "Adrián Martínez", "time": "Racing Club", "gols": 3 }
    ],
    "tabela": [
      { "posicao": 1, "time": "Santos", "pontos": 14, "jogos": 6, "vitorias": 4, "empates": 2, "derrotas": 0, "saldo": "+10" },
      { "posicao": 2, "time": "São Paulo", "pontos": 13, "jogos": 6, "vitorias": 4, "empates": 1, "derrotas": 1, "saldo": "+8" },
      { "posicao": 3, "time": "Vasco", "pontos": 11, "jogos": 6, "vitorias": 3, "empates": 2, "derrotas": 1, "saldo": "+4" },
      { "posicao": 4, "time": "Atlético-MG", "pontos": 10, "jogos": 6, "vitorias": 3, "empates": 1, "derrotas": 2, "saldo": "+3" },
      { "posicao": 5, "time": "Boca Juniors", "pontos": 9, "jogos": 6, "vitorias": 2, "empates": 3, "derrotas": 1, "saldo": "+1" },
      { "posicao": 6, "time": "Botafogo", "pontos": 8, "jogos": 6, "vitorias": 2, "empates": 2, "derrotas": 2, "saldo": "0" }
    ]
  },
  "_meta": {
    "versao": "1.0.0",
    "ultima_atualizacao": new Date().toISOString(),
    "fonte": "Dados manuais atualizados"
  }
};

// ============================================================
// SALVAR COMO JSON
// ============================================================
function gerarJson() {
  const jsonStr = JSON.stringify(DADOS_ATUALIZADOS, null, 2);
  const outputPath = path.join(__dirname, '../dados/dados.json');
  
  // Garantir que a pasta existe
  const dir = path.dirname(outputPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  fs.writeFileSync(outputPath, jsonStr, 'utf8');
  console.log('✅ dados.json gerado com sucesso!');
  console.log(`📅 Última atualização: ${DADOS_ATUALIZADOS._meta.ultima_atualizacao}`);
}

gerarJson();
