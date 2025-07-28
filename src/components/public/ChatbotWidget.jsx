import { useEffect, useState } from 'react'
import { io } from 'socket.io-client';
import { Chatbot } from './Chatbot';
import cucarachatIcon from '../../assets/img/Cucarachat.png';


export const ChatbotWidget = () => {
    // Para comprobar si el chat está abierto o no
    const [isOpen, setIsOpen] = useState(false);
    const [socket, setSocket] = useState(null);
    const [messages, setMessages] = useState([{

        role: "assistant",
        content: '¡Hola! soy CucaraChat, ¿en qué puedo ayudarte?'
    }
    ]);
    const chatUrlBase = import.meta.env.VITE_CHAT_URL_BASE;

    const [conversationId, setConversationId] = useState(
        localStorage.getItem("conversation_id") || null
    );

    // Conexión a Socket.io
    useEffect(() => {
        const socketInstance = io(`${chatUrlBase}`);
        // Se guarda el componente en el estado del socket
        setSocket(socketInstance);

        socketInstance.on("connect", () => {
            console.log("Conectado con socket.io");
        });

        socketInstance.on("disconnect", () => {
            console.log("Desconectado del servidor");
        });

        socketInstance.on("chat_response", (data) => {

            console.log('DATA SOCKET', data.response)
            if (data.conversation_id && !conversationId) {
                setConversationId(data.conversation_id);
                localStorage.setItem("conversation_id", data.conversation_id);
            }

            let responseText = "";
            if (data && typeof data.response === "string") {
                responseText = data.response.split("{")[0].trim(); // cortar antes del JSON embebido
            }
            if (responseText) {
                setMessages((prev) => [
                    ...prev,
                    {
                        role: "assistant",
                        content: responseText
                    }
                ]);
            }
        });

        return () => socketInstance.disconnect();
    }, []);

    const handleClick = () => {
        setIsOpen(!isOpen);
    }

    return (
        <>
            {/* Botón chat */}
            <button className="chat-toggle-btn mb-4" onClick={handleClick}>
                <img
                    src={cucarachatIcon}
                    alt="Chat"
                    className="chat-icon-img shadow"
                />
            </button>

            {/* Chat*/}
            {isOpen && (
                <div className="chat-float-window shadow">
                    <Chatbot
                        messages={messages}
                        setMessages={setMessages}
                        socket={socket}
                        conversationId={conversationId}
                    />
                </div>
            )}
        </>
    );
}
