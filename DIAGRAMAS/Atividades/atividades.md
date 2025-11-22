# Fluxo de Uso do App

```mermaid
flowchart TD
A([Início]) --> B[Precisa de um serviço, ex: montar móvel]
B --> C[Abre o app]
C --> D[Faz login ou cria conta com Google ou Apple]
D --> E[Define localização atual por GPS ou CEP]
E --> F[Escolhe a categoria: Montagem de Móveis]
F --> G[Aplica filtros: distância até 15km, avaliação mínima 4.5, disponibilidade hoje]
G --> H[Visualiza lista de prestadores com foto, preço por hora, avaliação e distância]
H --> I[Abre perfil e vê fotos de trabalhos anteriores e comentários]
I --> J[Seleciona Solicitar Orçamento]
J --> K[Descreve serviço e envia fotos]
K --> L[Escolhe data e horário sugerido]
L --> M[Envio da solicitação para vários prestadores]
M --> N[Prestadores enviam valores e horários]
N --> O[Cliente escolhe melhor opção com base em preço, avaliação e rapidez]
O --> P[Paga taxa fixa de segurança, ex: R$19,90]
P --> Q[Chat liberado entre cliente e prestador]
Q --> R[No dia agendado, o prestador vai ao local]
R --> S[Serviço concluído e cliente aprova]
S --> T[Plataforma libera 100% do pagamento ao prestador]
T --> U[Cliente avalia e envia fotos do resultado]
U --> V([Fim])
