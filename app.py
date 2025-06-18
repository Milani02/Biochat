from flask import Flask, render_template, request, jsonify, session
from conhecimento_empresa import buscar_informacao
from dotenv import load_dotenv
load_dotenv()
import requests
import time
import uuid
import os
from flask_cors import CORS
from datetime import datetime

app = Flask(__name__, static_folder='static', template_folder='templates')
app.secret_key = os.getenv("FLASK_SECRET_KEY")  
CORS(app, resources={r"/*": {"origins": "*"}})

# Configurações da API do OpenRouter
OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")
OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions"
MODELO = "openai/gpt-3.5-turbo"

# Armazenamento temporário das conversas (em produção, use um banco de dados)
conversas_ativas = {}

headers = {
    "Authorization": f"Bearer {OPENROUTER_API_KEY}",
    "Content-Type": "application/json",
    "HTTP-Referer": "https://localhost",
    "X-Title": "Chatbot Biodinâmica"
}

def get_session_id():
    """Obtém ou cria um ID de sessão único"""
    if 'session_id' not in session:
        session['session_id'] = str(uuid.uuid4())
    return session['session_id']

def salvar_mensagem(session_id, user_message, bot_response):
    """Salva uma troca de mensagens no histórico"""
    if session_id not in conversas_ativas:
        conversas_ativas[session_id] = []
    
    conversas_ativas[session_id].append({
        'timestamp': datetime.now().isoformat(),
        'user': user_message,
        'bot': bot_response
    })
    
    # Manter apenas as últimas 50 mensagens por sessão
    if len(conversas_ativas[session_id]) > 50:
        conversas_ativas[session_id] = conversas_ativas[session_id][-50:]

def get_bot_response(user_message, session_id=None):
    resposta_rapida = buscar_informacao(user_message)
    if resposta_rapida:
        return resposta_rapida

    # ... o restante do código original da função continua aqui
    
    # Detectar pedidos sobre pastas/arquivos
    palavras_chave = ["documento", "arquivo", "manual", "procedimento", "pastas", "relatório", "pdf"]
    if any(p in user_message.lower() for p in palavras_chave):
        return "📁 Você pode acessar todos os documentos aqui: http://intranet.empresa.com/utilidades/pastas.html"

    # Preparar mensagens com contexto do histórico
    messages = [
        {"role": "system", "content": """Você é Bio Chat, um assistente inteligente da empresa Biodinâmica. 
        Seja útil, objetivo e sempre educado. Mantenha um tom profissional mas amigável.
        Lembre-se do contexto da conversa anterior quando relevante."""}
    ]
    
    # Adicionar histórico recente (últimas 5 trocas)
    if session_id and session_id in conversas_ativas:
        historico = conversas_ativas[session_id][-5:]  # Últimas 5 trocas
        for item in historico:
            messages.append({"role": "user", "content": item['user']})
            messages.append({"role": "assistant", "content": item['bot']})
    
    # Adicionar mensagem atual
    messages.append({"role": "user", "content": user_message})

    data = {
        "model": MODELO,
        "messages": messages,
        "temperature": 0.7,
        "max_tokens": 500
    }

    # Implementar retry com backoff exponencial
    for tentativa in range(3):
        try:
            response = requests.post(OPENROUTER_API_URL, headers=headers, json=data, timeout=30)
            if response.status_code == 200:
                return response.json()["choices"][0]["message"]["content"]
            elif response.status_code == 401:
                return "❌ Erro de autenticação na API. Verifique a chave."
            elif response.status_code == 429:
                return "⏳ Muitas solicitações. Tente novamente em alguns segundos."
            else:
                return f"❌ Erro da API: {response.text[:100]}..."
        except requests.exceptions.Timeout:
            if tentativa < 2:
                time.sleep(2 * (tentativa + 1))
                continue
            return "⏱️ Timeout: A resposta está demorando muito. Tente novamente."
        except Exception as e:
            if tentativa < 2:
                time.sleep(2 * (tentativa + 1))
                continue
            return f"❌ Erro técnico: {str(e)[:100]}..."

    return "😔 Desculpe, estou tendo dificuldades técnicas no momento. Tente novamente mais tarde."

@app.route('/')
def home():
    """Página inicial do chatbot"""
    session_id = get_session_id()
    return render_template('index.html')

@app.route('/pastas.html')
def pastas():
    """Página de documentos e pastas"""
    return render_template('pastas.html')

@app.route('/chat', methods=['POST'])
def chat():
    try:
        user_message = request.json.get("message")
        if not user_message or not user_message.strip():
            return jsonify({"error": "Mensagem vazia"}), 400

        session_id = get_session_id()
        bot_response = get_bot_response(user_message, session_id)

        salvar_mensagem(session_id, user_message, bot_response)

        return jsonify({
            "reply": bot_response,
            "session_id": session_id,
            "timestamp": datetime.now().isoformat()
        })

    except Exception as e:
        import traceback
        print("🚨 ERRO DETALHADO:")
        traceback.print_exc()
        return jsonify({"error": f"Erro interno: {str(e)}"}), 500


@app.route('/historico', methods=['GET'])
def get_historico():
    """Retorna o histórico da conversa atual"""
    session_id = get_session_id()
    historico = conversas_ativas.get(session_id, [])
    return jsonify({"historico": historico, "session_id": session_id})

@app.route('/limpar-chat', methods=['POST'])
def limpar_chat():
    """Limpa o histórico da conversa atual"""
    session_id = get_session_id()
    if session_id in conversas_ativas:
        del conversas_ativas[session_id]
    return jsonify({"success": True, "message": "Chat limpo com sucesso!"})

@app.route('/status', methods=['GET'])
def status():
    """Endpoint de status da aplicação"""
    return jsonify({
        "status": "online",
        "versao": "2.0",
        "conversas_ativas": len(conversas_ativas),
        "timestamp": datetime.now().isoformat()
    })

if __name__ == '__main__':
    print("🚀 Servidor ChatBot Biodinâmica v2.0 está rodando em http://127.0.0.1:5000")
    print("📝 Funcionalidades: Histórico de conversas, Interface moderna, Indicador de digitação")
    app.run(debug=True, host='0.0.0.0', port=5000)