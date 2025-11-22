@startuml
package "Usuários" {
  abstract class Usuario {
    -id: UUID
    -nome: String
    -telefone: String
    -email: String
    -tipo: Enum(CLIENTE, PROFISSIONAL)
    -dataCadastro: Date
  }

  class Cliente {
    -avaliacoesFeitas: List<Avaliacao>
  }

  class Profissional {
    -raioAtuacaoKm: Integer
    -categorias: List<Categoria>
    -portfolio: List<FotoTrabalho>
    -notaMedia: Double
    -totalAvaliacoes: Integer
    -aceitaSinal: Boolean
  }

  Usuario <|-- Cliente
  Usuario <|-- Profissional
}

class Demanda {
  -id: UUID
  -titulo: String
  -descricao: Text
  -categoria: Categoria
  -fotosProblema: List<Foto> [1..*]
  -cep: String
  -raioDesejadoKm: Integer
  -orcamentoEstimado: Decimal?
  -status: Enum(ABERTA, RESERVADA, CONCLUIDA, CANCELADA)
  -dataCriacao: DateTime
  -clienteId: UUID
}

class Proposta {
  -id: UUID
  -valor: Decimal
  -prazoDias: Integer
  -mensagem: Text
  -status: Enum(ENVIADA, ACEITA, RECUSADA)
  -dataEnvio: DateTime
  -demandaId: UUID
  -profissionalId: UUID
}

class Chat {
  -id: UUID
  -demandaId: UUID
  -mensagens: List<Mensagem>
}

class Mensagem {
  -id: UUID
  -texto: String
  -remetenteId: UUID
  -dataEnvio: DateTime
  -lida: Boolean
}

class Avaliacao {
  -id: UUID
  -nota: Integer (1-5)
  -comentario: Text
  -fotoResultado: Foto?
  -data: DateTime
  -demandaId: UUID
  -profissionalId: UUID
}

class Foto {
  -id: UUID
  -url: String
  -tipo: Enum(PROBLEMA, PORTFOLIO, RESULTADO)
}

class TransacaoSinal {
  -id: UUID
  -valor: Decimal
  -statusPix: Enum(PENDENTE, PAGO, FALHOU)
  -qrCode: String
  -demandaId: UUID
}

Demanda "1" --> "1" Cliente : criado por
Demanda "1" --> "0..*" Proposta : recebe
Proposta "1" --> "1" Profissional : enviada por
Demanda "1" --> "0..*" Foto : fotosProblema
Profissional "1" --> "0..*" Foto : portfolio
Demanda "1" --> "0..1" Avaliacao : avaliada por
Demanda "1" --> "0..1" TransacaoSinal : sinal pago
Demanda "1" --> "0..1" Chat : possui
@enduml