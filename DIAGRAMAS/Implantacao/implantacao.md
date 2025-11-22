[Servidores AWS ou GCP - Região São Paulo (latência baixa)]
   ├── EC2 / Kubernetes Cluster
   │    ├── Container API Gateway
   │    ├── Container Microserviços (NestJS)
   │    ├── Container Socket.io (chat realtime)
   │    └── Container Worker (fila de notificações/pagamentos)
   ├── RDS PostgreSQL + PostGIS
   ├── ElastiCache Redis
   ├── S3 + CloudFront (fotos de trabalhos)
   ├── Cloudflare (DNS + WAF)
   └── Route 53

[CDN Global] → entrega rápida de fotos e app

[App Mobile iOS/Android]
   → Google Play + App Store
   → React Native + Expo

[Firebase Cloud Messaging] → notificações push
[Stripe + Pix (Mercado Pago ou Pagar.me)] → pagamentos