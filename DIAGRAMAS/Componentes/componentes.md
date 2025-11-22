[App Mobile (React Native)]
    ↑↓
[API Gateway (Node.js + Express ou NestJS)]
    ↑↓
└──> [Microserviço Usuários & Autenticação (JWT + Firebase Auth)]
    └──> [Microserviço Catálogo & Busca (Elasticsearch + PostGIS para geolocalização)]
    └──> [Microserviço Pedidos/Serviços (NestJS + TypeORM)]
    └──> [Microserviço Chat em tempo real (Socket.io ou Firebase)]
    └──> [Microserviço Pagamentos (Stripe + Pix Automático)]
    └──> [Microserviço Notificações Push (FCM)]
    └──> [Microserviço Avaliações & Fotos (S3 + Cloudinary)]

Banco de dados:
- PostgreSQL com PostGIS (dados estruturados + geolocalização)
- Redis (cache de busca e sessões)
- MongoDB opcional para logs de chat