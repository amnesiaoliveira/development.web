# 1. Plano de Trabalho

| Nome do Projeto            | ConectaPro – Plataforma de Serviços Sob Demanda |
|----------------------------|-------------------------------------------------|
| Versão                     | 1.0                                             |
| Status                     | Em desenvolvimento                              |
| Número de Controle SRBR-M  | 1802030407                                      |
| Executor Principal         | EJ Tecnologia                                   |
| Coordenador do Projeto     | Prof. Antônio Alberto                           |

## 1.1 INTRODUÇÃO
Este documento apresenta o projeto de desenvolvimento de uma plataforma web que conecta **profissionais autônomos** (pedreiros, eletricistas, diaristas, encanadores, pintores, etc.) a **clientes** que precisam contratar serviços para casa, escritório ou condomínio.

A solução tem como objetivo reduzir o tempo e a insegurança na contratação de serviços, oferecendo um ambiente confiável onde o cliente publica a demanda e recebe orçamentos de profissionais próximos e bem avaliados, enquanto o profissional tem acesso a oportunidades reais, com menos “furadas” e mais previsibilidade de renda.

O projeto justifica-se pela alta demanda por serviços residenciais e comerciais, pela dificuldade de encontrar profissionais confiáveis e pela oportunidade de formalizar e organizar um mercado ainda muito informal.

### 1.1.1 Objetivo
Será desenvolvido um site com as funcionalidades essenciais para:
- Permitir que clientes publiquem anúncios de serviços necessários
- Permitir que profissionais vejam essas demandas, enviem propostas e negociem diretamente
- Garantir confiança por meio de avaliações, fotos de trabalhos anteriores e verificação básica de perfil

### 1.1.2 Motivação, Justificativa e Oportunidade
Centenas de pessoas contratam serviços todos os meses, mas ainda enfrentam:
- Dificuldade em encontrar profissionais confiáveis e disponíveis
- Perda de tempo com orçamentos que não se concretizam
- Profissionais autônomos passam dias sem trabalho por falta de visibilidade

A oportunidade está em criar uma plataforma simples, focada na experiência real do pedreiro, da diarista e do cliente comum, com taxa justa, atuando inicialmente na região metropolitana de Itacoatiara.

### 1.1.3 Caracterização do Projeto
- **1.1.3.1 Classe**: Tecnológico e social – promove inclusão digital de trabalhadores autônomos e facilita acesso a serviços de qualidade.
- **1.1.3.2 Enquadrabilidade**: Setor de economia colaborativa, serviços sob demanda e inclusão digital.
- **1.1.3.3 Tipo**: Desenvolvimento de plataforma web e futuramente um app mobile.

## 1.2 INFORMAÇÕES GERAIS
O ConectaPro será a primeira plataforma focada exclusivamente na experiência do profissional autônomo (com linguagem simples e fotos reais de antes/depois) e na segurança do cliente médio que quer resolver problemas rápido e sem dor de cabeça.

### 1.2.1 Escopo Geral
Conectar clientes que precisam de serviços a profissionais autônomos qualificados, permitindo:
- Publicação de demandas com fotos e descrição
- Visualização de oportunidades próximas por parte dos profissionais
- Envio de orçamentos e negociação direta
- Avaliações reais com fotos após a conclusão do serviço

### 1.2.2 Escopo Específico
- **Cadastro e gerenciamento de perfis**
  - Dois tipos de usuário: Cliente e Profissional
  - Cadastro rápido via celular/Computador
  - Perfil do profissional com fotos de trabalhos realizados, raio de atendimento, avaliações e categorias de serviço
- **Publicação de demandas (anúncios)**
  - Cliente cria anúncio com título, descrição, fotos/vídeos do problema, CEP e orçamento estimado (opcional)
- **Busca e filtros para profissionais**
  - Lista de demandas próximas (geolocalização)
  - Filtros por categoria, valor, urgência e distância
- **Envio de propostas e chat**
  - Profissional envia proposta com valor e prazo
  - Chat interno
- **Sistema de avaliações e reputação**
  - Após conclusão, cliente avalia com nota e comentário + foto do resultado
- **Sinal/adiantamento (opcional)**
  - Possibilidade de cliente pagar sinal via PIX para “reservar” o profissional

### 1.2.3 Escopo Negativo
- Login via redes sociais
- Pagamento integral pela plataforma (apenas sinal opcional)
- Versão desktop completa (foco em mobile/PWA)
- Ferramentas de IA (ex: matching automático avançado)
- Agenda integrada com calendário do profissional
- Emissão de nota fiscal automática
- Suporte a serviços corporativos ou grandes obras

### 1.2.4 Ambiente de Desenvolvimento
| Componente                  | Tecnologia/Ferramenta                  |
|-----------------------------|----------------------------------------|
| Metodologia                 | Scrum com sprints de 4 semanas         |
| Gerenciamento de Backlog    | GitHub Projects                        |
| Repositório de Código       | GitHub                                 |
| Modelagem de Software       | Draw.io / Figma                        |
| Front-end                   | html + CSS + JS + Bootstrap            |
| Back-end                    | Node.js + Express                      |
| Banco de dados              | MySQL                 |
| Pagamentos (sinal)          | Mercado Pago ou Pix automático         |
| Hospedagem                  | Vercel (front) + Render/Heroku (back)  |

### 1.2.5 Características Inovadoras do Projeto
- Foco total na experiência do profissional autônomo (interface extremamente simples, uso de fotos reais)
- Publicação de demanda com foto obrigatória (reduz “furadas”)
- Avaliações com foto do resultado final
- Filtro por raio de atuação real do profissional
- Modelo de monetização justo (taxa só no sucesso ou assinatura barata para profissionais)

### 1.2.6 Resultados Esperados
- Redução drástica de tempo ocioso para profissionais
- Mais segurança e agilidade para clientes
- Aumento da renda média dos profissionais parceiros
- Criação de um ecossistema confiável de serviços locais
- Base sólida para expansão para outras regiões e categorias

## 1.3 METODOLOGIA DO PROJETO

### 1.3.1 Estrutura do Projeto
#### Fases do Projeto
1. **Conceito/Ideia** – Validação com profissionais e clientes reais
2. **Análise de concorrentes** – GetNinjas, Parafuzo, Triider, Habitissimo
4. **Desenvolvimento** – 4 semanas

### 1.3.2 Equipe de Projeto
| Função                        | Responsabilidades |
|-------------------------------|-------------------|
| **Product Owner (PO)**        | Levanta necessidades com profissionais e clientes reais, prioriza backlog |
| **Scrum Master**              | Facilita cerimônias ágeis e remove impedimentos |
| **Desenvolvedor Full-Stack (2)** | Implementa front e back |
| **Designer UX/UI (1-2)**      | Cria interface simples e intuitiva pensando no Marcos (que usa celular básico) e na Fernanda (que quer tudo rápido) |

### 1.3.3 Backlog do Sprint
Mantido no GitHub Projects, com histórias de usuário baseadas diretamente nas dores das personas.

### 1.3.4 Controle de Mudanças
Qualquer mudança passa pela validação do PO com base no impacto nas personas principais.

### 1.3.5 Gerenciamento de Comunicação
- WhatsApp do grupo para comunicação rápida
- Sprint Review com demonstração ao coordenador
