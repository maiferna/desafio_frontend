import React, { useEffect, useRef, useState } from 'react'

export const Chatbot = ({ messages, setMessages, socket, conversationId }) => {
    // Socket: Conexión al servidor

    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);


    // Enviar mensaje al backend
    const handleSend = () => {
        if (!input || !socket) return;

        // Añade el mensaje del cliente al array de mensajes
        setMessages((prev) => [...prev, {
            role: "user",
            content: input
        }]
        );
        console.log('CONVERSATION ID', conversationId)
        const payload = conversationId
            ? { message: input, conversation_id: conversationId }
            : { message: input };
        console.log('PAYLOAD', payload)


        socket.emit("chat", payload); // ← Emite el mensaje al backend
        setInput("");
    };

    return (
        <article className="card rounded-2">
            <div className="card-header bg-dark text-white">CucaraChat</div>
            <div className="card-body chat-body">
                {messages && messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`d-flex ${msg.role === "user"
                            ? "justify-content-end"
                            : "justify-content-start"
                            } mb-2`}
                    >
                        <div
                            className={`p-2 rounded-2 ${msg.role === "user"
                                ? "bg-dark text-white"
                                : "bg-light text-dark"
                                } chatbot-bubble`}
                        >
                            {msg.content}
                        </div>
                    </div>
                ))}
                {loading && <div className="text-muted small">Escribiendo...</div>}
                <div ref={messagesEndRef} />
            </div>
            <div className="card-footer d-flex">
                <input
                    type="text"
                    className="form-control me-2"
                    placeholder="Escribe tu consulta..."
                    value={input}
                    onChange={(ev) => setInput(ev.target.value)}
                    onKeyDown={(ev) => ev.key === "Enter" && handleSend()}
                />
                <button className="btn btn-dark" onClick={handleSend}>
                    Enviar
                </button>
            </div>
        </article>
    );
}
