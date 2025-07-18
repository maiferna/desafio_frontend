
export const consultFetch = async (url, option = {}) => {
  // console.log({ url });
  /*let option;

   if (method === "POST" || method === "PUT") {
    option = {
      method: method,
      body: JSON.stringify(body),
      headers: {
        ...header,
        "Content-Type": "application/json",
      }
    };
  } else if (method === "DELETE" || method === "GET") {
    option = {
      method: method,
      headers: {
        ...header,
        "Content-Type": "application/json",
      }
    };
  } */
  try {

    //TODO: Comprobar que funciona
    const answer = await fetch(url, option);

    // console.log("respuesta: ", answer);

    if (!answer.ok) {
      // console.log("STATUS:", data);
      throw data;
    }
    const data = await answer.json();
    return data;
  } catch (error) {
    // console.log(error);
    throw new Error(error);
  }
};

/* consultFetch("http://localhost:3000/api/v1/auth/login", {
  method: 'POST',
  body: JSON.stringify({
    "user_email": "primero@gmail.com",
    "user_password": "123456"  
}),
    headers: {
      "Content-Type": "application/json",
    }

}) */