// ===== VARIÁVEIS GLOBAIS =====
let isTyping = false;
let messageCounter = 0;
let currentSessionId = null;

// ===== ELEMENTOS DOM =====
const elements = {
    chatMessages: null,
    userInput: null,
    sendButton: null,
    typingIndicator: null,
    clearChatBtn: null,
    downloadBtn: null,
    modalOverlay: null,
    modalConfirm: null,
    modalCancel: null,
    modalClose: null,
    loadingOverlay: null,
    charCount: null,
    statusText: null
};
// ===== INICIALIZAÇÃO =====
document.addEventListener('DOMContentLoaded', function() {
    initializeElements();
    setupEventListeners();
    loadChatHistory();
    updateCharCounter();
    initParticles();

    console.log('🚀 Bio Chat inicializado com sucesso!');
});

function initializeElements() {
    elements.chatMessages = document.getElementById('chatMessages');
    elements.userInput = document.getElementById('userInput');
    elements.sendButton = document.getElementById('sendButton');
    elements.typingIndicator = document.getElementById('typingIndicator');
    elements.clearChatBtn = document.getElementById('clearChatBtn');
    elements.downloadBtn = document.getElementById('downloadBtn');
    elements.modalOverlay = document.getElementById('modalOverlay');
    elements.modalConfirm = document.getElementById('modalConfirm');
    elements.modalCancel = document.getElementById('modalCancel');
    elements.modalClose = document.getElementById('modalClose');
    elements.loadingOverlay = document.getElementById('loadingOverlay');
    elements.charCount = document.getElementById('charCount');
    elements.statusText = document.getElementById('statusText');
}

function setupEventListeners() {
    elements.sendButton.addEventListener('click', sendMessage);
    elements.userInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            sendMessage();
        }
    });
    elements.userInput.addEventListener('input', updateCharCounter);
    elements.clearChatBtn.addEventListener('click', showClearConfirmation);
    elements.downloadBtn.addEventListener('click', downloadHistory);
    elements.modalConfirm.addEventListener('click', confirmClearChat);
    elements.modalCancel.addEventListener('click', hideModal);
    elements.modalClose.addEventListener('click', hideModal);
    elements.modalOverlay.addEventListener('click', function(e) {
        if (e.target === elements.modalOverlay) {
            hideModal();
        }
    });
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            hideModal();
        }
    });
    elements.userInput.focus();
}
    // Botão enviar
    elements.sendButton.addEventListener('click', sendMessage);
    
    // Enter no input
    elements.userInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            sendMessage();
        }
    });
    
    // Contador de caracteres
    elements.userInput.addEventListener('input', updateCharCounter);
    
    // Botão limpar chat
    elements.clearChatBtn.addEventListener('click', showClearConfirmation);
    
    // Botão download
    elements.downloadBtn.addEventListener('click', downloadHistory);
    
    // Modal events
    elements.modalConfirm.addEventListener('click', confirmClearChat);
    elements.modalCancel.addEventListener('click', hideModal);
    elements.modalClose.addEventListener('click', hideModal);
    elements.modalOverlay.addEventListener('click', function(e) {
        if (e.target === elements.modalOverlay) {
            hideModal();
        }
    });
    
    // ESC para fechar modal
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            hideModal();
        }
    });
    
    // Focus no input
    elements.userInput.focus();


// ===== FUNÇÕES DE MENSAGEM =====
function addMessage(message, isUser = false, timestamp = null) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', isUser ? 'user-message' : 'bot-message');

    const processedMessage = message
        .replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>')
        .replace(/\n/g, '<br>');

    const timeStr = timestamp ?
        new Date(timestamp).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) :
        new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

    messageDiv.innerHTML = `
        <div class="message-content">
            <div class="message-avatar">
                <i class="fas fa-${isUser ? 'user' : 'robot'}"></i>
            </div>
            <div class="message-text">
                ${processedMessage}
            </div>
        </div>
        <div class="message-time">${timeStr}</div>
    `;

    elements.chatMessages.appendChild(messageDiv);
    scrollToBottom();
    messageDiv.classList.add('bounce');
    setTimeout(() => messageDiv.classList.remove('bounce'), 600);
    messageCounter++;
}

function showTypingIndicator() {
    if (isTyping) return;
    isTyping = true;
    elements.typingIndicator.style.display = 'block';
    scrollToBottom();
}

function hideTypingIndicator() {
    isTyping = false;
    elements.typingIndicator.style.display = 'none';
}

function scrollToBottom() {
    elements.chatMessages.scrollTop = elements.chatMessages.scrollHeight;
}
    
    // Processamento de links
    const processedMessage = message
        .replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>')
        .replace(/\n/g, '<br>');
    
    // Timestamp
    const timeStr = timestamp ? 
        new Date(timestamp).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) :
        new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    
    messageDiv.innerHTML = `
        <div class="message-content">
            <div class="message-avatar">
                <i class="fas fa-${isUser ? 'user' : 'robot'}"></i>
            </div>
            <div class="message-text">
                ${processedMessage}
            </div>
        </div>
        <div class="message-time">
            ${timeStr}
        </div>
    `;
    
    elements.chatMessages.appendChild(messageDiv);
    scrollToBottom();
    
    // Animação de entrada
    messageDiv.classList.add('bounce');
    setTimeout(() => messageDiv.classList.remove('bounce'), 600);
    
    messageCounter++;


function showTypingIndicator() {
    if (isTyping) return;
    
    isTyping = true;
    elements.typingIndicator.style.display = 'block';
    scrollToBottom();
}

function hideTypingIndicator() {
    isTyping = false;
    elements.typingIndicator.style.display = 'none';
}

function scrollToBottom() {
    elements.chatMessages.scrollTop = elements.chatMessages.scrollHeight;
}
// ===== EFEITO DE PARTÍCULAS =====
function initParticles() {
    const container = document.getElementById('holographicContainer');
    const tipos = ['🌱', '🍃', '🌿', '🌾', '🌵'];

    function criarParticula() {
        const particula = document.createElement('div');
        particula.className = 'holographic-particle';
        particula.textContent = tipos[Math.floor(Math.random() * tipos.length)];
        particula.style.left = Math.random() * 100 + 'vw';
        particula.style.animationDuration = (Math.random() * 5 + 5) + 's';
        particula.style.fontSize = (Math.random() * 12 + 10) + 'px';
        container.appendChild(particula);
        setTimeout(() => particula.remove(), 15000);
    }

    setInterval(criarParticula, 1000);
    for (let i = 0; i < 10; i++) setTimeout(criarParticula, i * 300);
}

// ===== FUNÇÃO PRINCIPAL DE ENVIO =====
async function sendMessage() {
    const message = elements.userInput.value.trim();
    if (!message || isTyping) return;
    
    // Adicionar mensagem do usuário
    addMessage(message, true);
    elements.userInput.value = '';
    updateCharCounter();
    
    // UI feedback
    elements.sendButton.disabled = true;
    elements.userInput.parentElement.classList.add('sending');
    showTypingIndicator();
    
    try {
        const response = await fetch('/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: message })
        });
        
        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.error) {
            throw new Error(data.error);
        }
        
        // Simular delay de digitação para realismo
        await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
        
        hideTypingIndicator();
        addMessage(data.reply, false, data.timestamp);
        
        if (data.session_id) {
            currentSessionId = data.session_id;
        }
        
    } catch (error) {
        hideTypingIndicator();
        console.error('Erro ao enviar mensagem:', error);
        
        let errorMessage = '😔 Desculpe, ocorreu um erro inesperado. Tente novamente.';
        
        if (error.message.includes('Failed to fetch')) {
            errorMessage = '🌐 Erro de conexão. Verifique sua internet e tente novamente.';
        } else if (error.message.includes('timeout')) {
            errorMessage = '⏱️ A solicitação expirou. Tente novamente.';
        }
        
        addMessage(errorMessage, false);
        
        // Shake animation no container
        elements.chatMessages.parentElement.classList.add('shake');
        setTimeout(() => {
            elements.chatMessages.parentElement.classList.remove('shake');
        }, 500);
    } finally {
        // Restaurar UI
        elements.sendButton.disabled = false;
        elements.userInput.parentElement.classList.remove('sending');
        elements.userInput.focus();
    }
}

// ===== FUNÇÕES DE HISTÓRICO =====
async function loadChatHistory() {
    try {
        elements.loadingOverlay.style.display = 'flex';
        
        const response = await fetch('/historico');
        const data = await response.json();
        
        if (data.historico && data.historico.length > 0) {
            // Limpar mensagem de boas-vindas se houver histórico
            const welcomeMessage = elements.chatMessages.querySelector('.welcome-message');
            if (welcomeMessage && data.historico.length > 0) {
                welcomeMessage.remove();
            }
            
            // Carregar mensagens do histórico
            data.historico.forEach(item => {
                addMessage(item.user, true, item.timestamp);
                addMessage(item.bot, false, item.timestamp);
            });
        }
        
        currentSessionId = data.session_id;
        
    } catch (error) {
        console.error('Erro ao carregar histórico:', error);
    } finally {
        elements.loadingOverlay.style.display = 'none';
    }
}

async function downloadHistory() {
    try {
        const response = await fetch('/historico');
        const data = await response.json();
        
        if (!data.historico || data.historico.length === 0) {
            alert('📝 Nenhum histórico disponível para download.');
            return;
        }
        
        // Criar conteúdo do arquivo
        let content = '=== HISTÓRICO DO BIO CHAT ===\n';
        content += `Data: ${new Date().toLocaleString('pt-BR')}\n`;
        content += `Sessão: ${currentSessionId}\n`;
        content += `Total de mensagens: ${data.historico.length}\n\n`;
        
        data.historico.forEach((item, index) => {
            const timestamp = new Date(item.timestamp).toLocaleString('pt-BR');
            content += `[${timestamp}] USUÁRIO: ${item.user}\n`;
            content += `[${timestamp}] BOT: ${item.bot}\n\n`;
        });
        
        // Download do arquivo
        const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `bio-chat-historico-${new Date().toISOString().split('T')[0]}.txt`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        
        // Feedback visual
        const originalText = elements.downloadBtn.innerHTML;
        elements.downloadBtn.innerHTML = '<i class="fas fa-check"></i>';
        elements.downloadBtn.style.background = '#4caf50';
        
        setTimeout(() => {
            elements.downloadBtn.innerHTML = originalText;
            elements.downloadBtn.style.background = '';
        }, 2000);
        
    } catch (error) {
        console.error('Erro ao fazer download:', error);
        alert('❌ Erro ao baixar histórico. Tente novamente.');
    }
}

// ===== FUNÇÕES DO MODAL =====
function showClearConfirmation() {
    elements.modalOverlay.style.display = 'flex';
    elements.modalConfirm.focus();
}

function hideModal() {
    elements.modalOverlay.style.display = 'none';
}

async function confirmClearChat() {
    try {
        hideModal();
        elements.loadingOverlay.style.display = 'flex';
        
        const response = await fetch('/limpar-chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        
        const data = await response.json();
        
        if (data.success) {
            // Limpar interface
            elements.chatMessages.innerHTML = `
                <div class="message bot-message welcome-message">
                    <div class="message-content">
                        <div class="message-avatar">
                            <i class="fas fa-robot"></i>
                        </div>
                        <div class="message-text">
                            <p>👋 Olá! Eu sou o <strong>Bio Chat</strong>, seu assistente inteligente da Biodinâmica!</p>
                            <p>Como posso ajudar você hoje?</p>
                        </div>
                    </div>
                    <div class="message-time">
                        ${new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                    </div>
                </div>
            `;
            
            messageCounter = 0;
            
            // Feedback visual
            showNotification('✅ Chat limpo com sucesso!', 'success');
        } else {
            throw new Error('Erro ao limpar chat');
        }
        
    } catch (error) {
        console.error('Erro ao limpar chat:', error);
        showNotification('❌ Erro ao limpar chat. Tente novamente.', 'error');
    } finally {
        elements.loadingOverlay.style.display = 'none';
    }
}

// ===== FUNÇÕES AUXILIARES =====
function updateCharCounter() {
    const count = elements.userInput.value.length;
    elements.charCount.textContent = count;
    
    // Cores baseadas no limite
    if (count > 450) {
        elements.charCount.style.color = '#f44336';
    } else if (count > 400) {
        elements.charCount.style.color = '#ff9800';
    } else {
        elements.charCount.style.color = '#757575';
    }
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '15px 20px',
        borderRadius: '8px',
        color: 'white',
        fontWeight: '500',
        zIndex: '10001',
        opacity: '0',
        transform: 'translateX(100%)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
    });
    
    if (type === 'success') {
        notification.style.background = '#4caf50';
    } else if (type === 'error') {
        notification.style.background = '#f44336';
    } else {
        notification.style.background = '#2196f3';
    }
    
    document.body.appendChild(notification);
    
    // Animação de entrada
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remoção automática
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// ===== FUNCIONALIDADES EXTRAS =====
function checkConnectionStatus() {
    fetch('/status')
        .then(response => response.json())
        .then(data => {
            if (data.status === 'online') {
                elements.statusText.textContent = 'Online';
                elements.statusText.previousElementSibling.style.color = '#4caf50';
            }
        })
        .catch(() => {
            elements.statusText.textContent = 'Offline';
            elements.statusText.previousElementSibling.style.color = '#f44336';
        });
}

// Verificar status a cada 30 segundos
setInterval(checkConnectionStatus, 30000);

// ===== ATALHOS DE TECLADO =====
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + K para limpar chat
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        showClearConfirmation();
    }
    
    // Ctrl/Cmd + D para download
    if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
        e.preventDefault();
        downloadHistory();
    }
});

// ===== TRATAMENTO DE ERROS GLOBAIS =====
window.addEventListener('error', function(e) {
    console.error('Erro global capturado:', e.error);
});

window.addEventListener('unhandledrejection', function(e) {
    console.error('Promise rejeitada:', e.reason);
});

// ===== EXPORTAR PARA DEBUG =====
window.BioChatDebug = {
    elements,
    messageCounter,
    currentSessionId,
    addMessage,
    sendMessage,
    loadChatHistory
};