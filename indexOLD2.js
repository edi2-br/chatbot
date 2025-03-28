import express from 'express';
import { Client } from 'whatsapp-web.js'; // Importando o Client do whatsapp-web.js
import cors from 'cors';
import { fileURLToPath } from 'url';
import path from 'path';
import qrcode from 'qrcode-terminal'; // Para gerar o QR Code no terminal

// Para obter __dirname em módulos ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Configurações de CORS para permitir chamadas de qualquer origem
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Inicializando o cliente do WhatsApp com whatsapp-web.js
const client = new Client();

client.on('qr', (qr) => {
    // Exibe o QR Code no terminal
    console.log('QR Code gerado:', qr);
    qrcode.generate(qr, { small: true }); // Exibe o QR Code no terminal
});

client.on('ready', () => {
    console.log('Bot do WhatsApp está pronto!');
});

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

// Rota para exibir o QR Code (link gerado)
app.get('/qrcode', (req, res) => {
    const qrLink = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(client.qr)}&size=300x300`;
    res.send(`<html><body><h1>QR Code do WhatsApp</h1><a href="${qrLink}" target="_blank">Clique aqui para gerar o QR Code</a></body></html>`);
});

// Inicia o servidor Express
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

// Inicializa o cliente
client.initialize();
