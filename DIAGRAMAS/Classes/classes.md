```mermaid
classDiagram
    class Usuario {
        - Long id
        - String nome
        - String telefone
        - String email
        - String avatar
        - Date dataCadastro
        - Boolean ativo
    }

    class Cliente {
        - List<Endereco> enderecos
    }

    class Prestador {
        - String cpf
        - Date dataNascimento
        - Integer raioAtendimentoKm
        - BigDecimal precoHora
        - List<Categoria> categorias
        - Boolean documentosVerificados
        - Double notaMedia
        - Integer totalServicos
    }

    class Categoria {
        - Long id
        - String nome
        - String icone
    }

    class Servico {
        - Long id
        - String descricao
        - List<String> fotosAntes
        - List<String> fotosDepois
        - BigDecimal valorCombinado
        - BigDecimal taxaPlataforma
        - DateTime dataAgendada
        - StatusServico status
        - Avaliacao avaliacaoCliente
        - Chat chat
    }

    class StatusServico {
    }

    class Avaliacao {
        - Integer nota
        - String comentario
        - List<String> fotos
        - DateTime data
    }

    class Chat {
        - List<Mensagem> mensagens
    }

    class Mensagem {
        - Usuario remetente
        - String texto
        - String imagem
        - DateTime dataEnvio
    }

    class Endereco {
        - String cep
        - String logradouro
        - String numero
        - String complemento
        - String bairro
        - String cidade
        - String uf
        - Double latitude
        - Double longitude
    }

    Usuario <|-- Cliente
    Usuario <|-- Prestador
    Cliente "1" --> "*" Servico : solicita
    Prestador "1" --> "*" Servico : realiza
    Servico --> "0..1" Avaliacao : possui
    Prestador "*" --> "*" Categoria : atua em
