usuarios (
  id UUID PK,
  nome VARCHAR(100),
  telefone VARCHAR(20) UNIQUE,
  email VARCHAR(100),
  tipo ENUM('CLIENTE','PROFISSIONAL'),
  created_at TIMESTAMP
)

profissionais (
  usuario_id UUID PK FK >- usuarios.id,
  raio_atuacao_km INT DEFAULT 30,
  nota_media DECIMAL(3,2) DEFAULT 0,
  total_avaliacoes INT DEFAULT 0,
  aceita_sinal BOOLEAN DEFAULT true
)

categorias_profissional (
  profissional_id UUID FK,
  categoria_id UUID FK,
  PRIMARY KEY (profissional_id, categoria_id)
)

demandas (
  id UUID PK,
  cliente_id UUID FK >- usuarios.id,
  titulo VARCHAR(150),
  descricao TEXT,
  categoria_id UUID FK,
  cep VARCHAR(9),
  raio_desejado_km INT,
  orcamento_estimado DECIMAL(10,2),
  status VARCHAR(20) DEFAULT 'ABERTA',
  created_at TIMESTAMP
)

fotos (
  id UUID PK,
  demanda_id UUID FK, -- pode ser NULL (portfolio)
  profissional_id UUID FK, -- pode ser NULL
  url TEXT,
  tipo VARCHAR(20) -- PROBLEMA, PORTFOLIO, RESULTADO
)

propostas (
  id UUID PK,
  demanda_id UUID FK >- demandas.id,
  profissional_id UUID FK >- usuarios.id,
  valor DECIMAL(10,2),
  prazo_dias INT,
  mensagem TEXT,
  status VARCHAR(15) DEFAULT 'ENVIADA',
  created_at TIMESTAMP
)

avaliacoes (
  id UUID PK,
  demanda_id UUID FK,
  profissional_id UUID FK,
  nota INT CHECK (nota BETWEEN 1 AND 5),
  comentario TEXT,
  foto_resultado_id UUID FK >- fotos.id,
  created_at TIMESTAMP
)

transacoes_sinal (
  id UUID PK,
  proposta_id UUID FK,
  valor DECIMAL(10,2),
  status VARCHAR(15),
  pix_qrcode TEXT,
  pix_copiaecola TEXT,
  created_at TIMESTAMP
)