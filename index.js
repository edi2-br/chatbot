// Importa as dependências
import pkg from 'whatsapp-web.js';
import express from 'express';
import cors from 'cors';

const { Client, LocalAuth } = pkg;

const app = express();
const PORT = process.env.PORT || 8000;
let qrData = '';

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Inicializa o cliente do WhatsApp
const client = new Client({
    authStrategy: new LocalAuth(),
});

// Exibe o QR Code no terminal
client.on('qr', (qr) => {
    qrData = qr;
    //console.log('== QRCODE ===========================================================');
    //console.log(`https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(qr)}&size=300x300`);
});

client.on('ready', () => {
    console.log('Bot do WhatsApp está pronto!');
});

// Responde automaticamente às mensagens recebidas
client.on('message', async (message) => {
    console.log(`Mensagem recebida: ${message.body}`);
    if (message.body.toLowerCase() === 'oi') {
        await message.reply('Olá! Como posso ajudar?');
    }
});

// Inicia o cliente do WhatsApp
client.initialize();

// Configuração do servidor Express
app.get('/', (req, res) => {
    res.send('Chatbot rodando!');
});

app.post('/qrcode', (req, res) => {
    const qrLink = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(qrData)}&size=300x300`;
    res.send(`<html><body><a href="${qrLink}" target="_blank">Clique aqui para gerar o QR Code</a></body></html>`);
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
