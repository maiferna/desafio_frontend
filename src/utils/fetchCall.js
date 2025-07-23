export const fetchCall = async (url, method = "GET", headers = {}, body = null) => {
    const options = {
        method,
        headers: {
            "Content-Type": "application/json",
            ...headers,
        },
        credentials: "include" // para que se envíe la cookie
    };

    if (body && (method === "POST" || method === "PUT")) {
        options.body = JSON.stringify(body);
    }

    try {
        const response = await fetch(url, options);
        const data = await response.json();

        if (!response.ok) {
            throw data;
        }

        return data;
    } catch (error) {
        console.error("fetchCall error:", error);
        throw error;
    }
};