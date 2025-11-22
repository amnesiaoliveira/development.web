┌────────────────┐       ┌──────────────────┐
│    │   USUARIO      │       │   ENDERECO       │
    ├────────────────┤       ├──────────────────┤
    │ PK id          │       │ PK id            │
    │ nome           │       │ cep              │
    │ telefone       │       │ logradouro       │
    │ email          │       │ numero           │
    │ senha_hash     │       │ complemento      │
    │ avatar_url     │       │ bairro           │
    │ tipo (C/P/A)   │◄──────┤ cidade           │
    │ ativo          │ 1   * │ uf               │
    │ data_cadastro  │       │ latitude         │
    └────────────────┘       │ longitude        │
                             └──────────────────┘
          ▲         ▲
          │         │
   ┌────────────┐ ┌────────────┐
   │            │ │            │
┌───────┐   ┌───────┐   ┌───────────┐
│CLIENTE│   │PRESTADOR│   │ADMINISTRADOR│
└───────┘   └───────┘   └───────────┘
   │           │              │
   │           │              │
   │       ┌────────┐         │
   │       │CATEGORIA│         │
   │       └────────┘         │
   │           │              │
   │        *  │  *           │
   │           ▼              │
   │       ┌─────────────┐
   │       │PRESTADOR_CATEGORIA│ (tabela de relacionamento)
   │       ├─────────────┤
   │       │prestador_id │
   │       │categoria_id │
   │       │preco_hora   │
   │       │ativo        │
   │       └─────────────┘
   │
   │
   │           ┌─────────────────┐
   │           │    SERVICO      │
   │           ├─────────────────┤
   │           │ PK id            │ PK
   │           │ cliente_id       │ FK → CLIENTE
   │           │ prestador_id     │ FK → PRESTADOR (pode ser NULL até aceitar)
   │           │ categoria_id     │ FK
   │           │ descricao        │
   │           │ valor_combinado  │
   │           │ taxa_plataforma  │
   │           │ data_solicitacao │
   │           │ data_agendada    │
   │           │ status           │ (AGUARDANDO_ORCAMENTO, AGENDADO, etc.)
   │           │ endereco_servico_id │ FK → ENDERECO
   │           │ concluido_em     │
   │           │ cancelado_em     │
   │           └─────────────────┘
   │                   │
   │             *     │    1
   │                   ▼
   │           ┌─────────────────┐
   │           │   AVALIACAO     │
   │           ├─────────────────┤
   │           │ PK id           │
   │           │ servico_id      │ FK → SERVICO (única por serviço)
   │           │ nota (1-5)      │
   │           │ comentario      │
   │           │ data_avaliacao  │
   │           └─────────────────┘
   │                   │
   │             *     │
   │                   ▼
   │           ┌─────────────────┐
   │           │   FOTO          │
   │           ├─────────────────┤
   │           │ PK id           │
   │           │ servico_id      │ FK → SERVICO
   │           │ avaliacao_id    │ FK → AVALIACAO (NULL se for "antes")
   │           │ url             │
   │           │ tipo            │ (ANTES / DEPOIS)
   │           │ uploaded_at     │
   │           └─────────────────┘
   │
   │
   │           ┌─────────────────┐
   └──────────►│   DOCUMENTO     │
               ├─────────────────┤
               ┌─────────────────┐
               │ PK id           │                       │   PAGAMENTO     │
               │ prestador_id    │ FK                    ├─────────────────┤
               │ tipo            │ (RG, CPF, ANTECEDENTES)│ PK id           │
               │ url             │                       │ servico_id      │ FK → SERVICO
               │ status          │ (PENDENTE/APROVADO)   │ valor_total     │
               │ verificado_em   │                       │ taxa_plataforma │
               └─────────────────┘                       │ valor_prestador │
                                                         │ metodo          │ (PIX, CARTAO)
                                                         │ status          │ (PAGO, REEMBOLSADO)
                                                         │ transaction_id  │
                                                         └─────────────────┘

Outras tabelas auxiliares importantes:
┌─────────────────┐
│   NOTIFICACAO   │
├─────────────────┤
│ id              │
│ usuario_id      │ FK → USUARIO
│ titulo          │
│ mensagem        │
│ tipo            │
│ lida            │
│ criado_em       │
└─────────────────┘

┌─────────────────┐
│   MENSAGEM_CHAT │
├─────────────────┤
│ id              │
│ servico_id      │ FK → SERVICO
│ remetente_id    │ FK → USUARIO
│ texto           │
│ imagem_url      │
│ enviado_em      │
│ lida            │
└─────────────────┘