import express from 'express';
import venom from 'venom-bot';
import cors from 'cors';
import { fileURLToPath } from 'url';
import path from 'path';

// Para obter __dirname em módulos ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8000;

// Configurações de CORS para permitir chamadas de qualquer origem
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Inicializando o cliente do WhatsApp
venom.create({
    session: 'my-session', // Nome da sessão
    headless: true,         // Executar em modo headless (sem interface gráfica)
    sessionFolder: path.resolve(__dirname, 'sessions'), // Pasta de sessão
    multidevice: false      // Defina como true se usar multidevice
})
    .then((client) => {
        console.log('Bot do WhatsApp está pronto!');

        // Exibe o QR Code no terminal
        client.on('qr', (qr) => {
            const qrLink = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(qr)}&size=300x300`;
            console.log('QR Code gerado:', qrLink);
        });

        // Responde automaticamente às mensagens recebidas
        client.on('message', async (message) => {
            console.log(`Mensagem recebida: ${message.body}`);
            if (message.body.toLowerCase() === 'oi') {
                await message.reply('Olá! Como posso ajudar?');
            } else {
                await message.reply('Desculpe, não entendi sua mensagem.');
            }
        });

        // Configuração do servidor Express

        // Página inicial do servidor
        app.get('/', (req, res) => {
            res.send('Chatbot rodando!');
        });

        // Rota para exibir o QR Code
        app.get('/qrcode', (req, res) => {
            const qrLink = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(client.qr)}&size=300x300`;
            res.send(`<html><body><h1>QR Code do WhatsApp</h1><a href="${qrLink}" target="_blank">Clique aqui para gerar o QR Code</a></body></html>`);
        });

        // Inicia o servidor Express
        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`);
        });

    })
    .catch((error) => {
        console.error('Erro ao inicializar o cliente do WhatsApp:', error);
    });
