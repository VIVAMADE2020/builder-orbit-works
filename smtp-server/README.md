# Serveur SMTP Indépendant

Ce serveur SMTP standalone est indépendant de Netlify et peut être déployé sur n'importe quelle plateforme.

## Installation

```bash
cd smtp-server
npm install
```

## Configuration

Le serveur utilise les paramètres SMTP suivants (configurés dans `server.js`):

- **Host:** mail.spacemail.com
- **Port:** 465 (SSL)
- **Username:** contatto@soluzionerapida.com
- **Password:** Salomon123@

## Lancement en Développement

```bash
npm run dev
```

Le serveur sera disponible sur `http://localhost:3001`

## Lancement en Production

```bash
npm start
```

## Endpoints Disponibles

- `GET /health` - Vérification de l'état du serveur
- `GET /test-smtp` - Test de la connexion SMTP
- `POST /send-email` - Envoi d'email via SMTP

## Variables d'Environnement

- `PORT` - Port du serveur (défaut: 3001)
- `SMTP_SERVER_URL` - URL du serveur SMTP pour le client (défaut: http://localhost:3001)

## Déploiement

Ce serveur peut être déployé sur:
- Heroku
- Railway
- DigitalOcean
- AWS EC2
- Google Cloud
- Ou tout autre service qui supporte Node.js

## Test

Pour tester la connexion SMTP:

```bash
curl http://localhost:3001/test-smtp
```

Pour tester l'envoi d'email:

```bash
curl -X POST http://localhost:3001/send-email \
  -H "Content-Type: application/json" \
  -d '{
    "to": "contatto@soluzionerapida.com",
    "subject": "Test Email",
    "html": "<h1>Test</h1>",
    "data": {"email": "test@example.com"}
  }'
```
