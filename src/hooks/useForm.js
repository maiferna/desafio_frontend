import React, { useState } from 'react'
import { useNavigate } from 'react-router';

export const useForm = (initialState) => {

    const [formulario, setFormulario] = useState(initialState)
    const [enviado, setEnviado] = useState(false)

    const navigate = useNavigate();

    const serializarFormulario = (form) => {
        const formData = new FormData(form)
        console.log(formData);
        const objData = {}

        for (let [name, value] of formData) {
            console.log(name, value)
            objData[name] = value
        }

        return (objData)

    }

    const handleSubmit = (ev) => {
        ev.preventDefault();
        //console.log("ev: ", ev.target[0].name);
        console.log("ev: ", ev.target);
        const data = serializarFormulario(ev.target)
        console.log("UseForm data: ", data);


        setFormulario(data)
        setEnviado(true)



    }

    const handleChange = ({ ev }) => {
        const { name, value } = ev.target;
        const newForm = { ...formulario };
        console.log(newForm);
        newForm[name] = value;

        setFormulario(newForm)

        // Lo de abajo tambien funciona
        /* setFormulario({
            ...formulario,
            [name]: value //[] establece propiedad computada del objeto, si no puesieramos [] crearía una nueva propiedad del objeto
        }) */
    }

    return {
        handleSubmit,
        //handleChange,
        formulario,
        enviado,
        setFormulario
    }
}
