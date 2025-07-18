export const fetchCall = async (url, method = "GET", headers = {}, body = null, token = null) => {
    const options = {
        method,
        headers: {
            "Content-Type": "application/json",
            ...headers,
        },
    };

    if (token) {
        options.headers.Authorization = `Bearer ${token}`;
    }

    if (body && (method === "POST" || method === "PUT" )) {
        options.body = JSON.stringify(body);
    }

    try {
        const response = await fetch(url, options);
        const text = await response.text();

        console.log("🔍 Raw response:", text);

        if (!text) {
            throw new Error("Respuesta vacía del servidor");
        }
        let json;

        try {
            json = JSON.parse(text);
        } catch (error) {
            console.error("No es JSON válido:", error);
            throw new Error("Respuesta del servidor no es JSON válido");
        }

        if (!response.ok) {
            throw json;
        }

        return json;

    } catch (error) {
        console.error("fetchCall error:", error);
        throw error;
    }
};