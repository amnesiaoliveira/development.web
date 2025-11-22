@startuml
actor Cliente
participant "App Mobile" as App
participant "API Gateway" as API
participant "Serviço de Pedidos" as Pedidos
participant "Serviço de Chat" as Chat
participant Prestador

Cliente -> App: Abre app e busca "montagem de móveis"
App -> API: GET /prestadores?cat=montagem&lat=&lon=&raio=15
API -> Pedidos: busca com filtro geográfico + avaliação
Pedidos --> API: lista de prestadores
API --> App: retorna lista
App --> Cliente: exibe prestadores

Cliente -> App: Toca "Solicitar" no Prestador X
App -> API: POST /servicos/solicitar
API -> Pedidos: cria serviço em AGUARDANDO_ORCAMENTOS + envia fotos
Pedidos -> Prestador: Push "Nova solicitação de orçamento"
Prestador -> App: Abre e envia orçamento R$180 - 2h
App -> API: POST /servicos/:id/orcamento
API -> Pedidos: salva orçamento
Pedidos -> Cliente: Push "Você recebeu um orçamento"

Cliente -> App: Aceita orçamento do Prestador X
App -> API: PATCH /servicos/:id/aceitar
API -> Pedidos: muda status para AGENDADO + cobra taxa R$19,90
Pedidos -> Chat: libera chat entre os dois
Pedidos --> Cliente: Confirmação + recibo
Pedidos --> Prestador: Serviço confirmado - valor garantido

note right: Dia do serviço...
Cliente -> App: Marca como "Serviço concluído"
App -> Pedidos: muda status para CONCLUIDO
Pedidos -> Prestador: Transfere 100% do valor (R$180)
Cliente -> App: Dá 5 estrelas + fotos do móvel montado
@enduml