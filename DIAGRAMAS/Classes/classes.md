@startuml
class Usuario {
  - id: Long
  - nome: String
  - telefone: String
  - email: String
  - avatar: String
  - dataCadastro: Date
  - ativo: Boolean
}

class Cliente extends Usuario {
  - enderecos: List<Endereco>
}

class Prestador extends Usuario {
  - cpf: String
  - dataNascimento: Date
  - raioAtendimentoKm: Integer
  - precoHora: BigDecimal
  - categorias: List<Categoria>
  - documentosVerificados: Boolean
  - notaMedia: Double
  - totalServicos: Integer
}

class Categoria {
  - id: Long
  - nome: String (ex: "Montagem de Móveis")
  - icone: String
}

class Servico {
  - id: Long
  - cliente: Cliente
  - prestador: Prestador
  - categoria: Categoria
  - descricao: String
  - fotosAntes: List<String>
  - fotosDepois: List<String>
  - valorCombinado: BigDecimal
  - taxaPlataforma: BigDecimal
  - dataAgendada: DateTime
  - status: StatusServico
  - avaliacaoCliente: Avaliacao?
  - chat: Chat
}

enum StatusServico {
  AGUARDANDO_ORCAMENTOS,
  ORCAMENTO_ACEITO,
  AGENDADO,
  EM_ANDAMENTO,
  CONCLUIDO,
  CANCELADO
}

class Avaliacao {
  - nota: Integer (1-5)
  - comentario: String
  - fotos: List<String>
  - data: DateTime
}

class Chat {
  - mensagens: List<Mensagem>
}

class Mensagem {
  - remetente: Usuario
  - texto: String
  - imagem: String?
  - dataEnvio: DateTime
}

class Endereco {
  - cep: String
  - logradouro: String
  - numero: String
  - complemento: String
  - bairro: String
  - cidade: String
  - uf: String
  - latitude: Double
  - longitude: Double
}

Cliente "1" --> "*" Servico : solicita
Prestador "1" --> "*" Servico : realiza
Servico "1" --> "0..1" Avaliacao : possui
Prestador "many" --> "many" Categoria : atua em
@enduml