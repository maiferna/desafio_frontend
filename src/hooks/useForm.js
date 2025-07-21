import { useState } from 'react';

export const useForm = (initialValue = {}) => {
    const [formData, setFormData] = useState(initialValue);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const resetInput = () => {
        const resetState = {};
        for (const key in formData) {
            resetState[key] = "";
        }
        setFormData(resetState);
    };

    const serializeForm = () => {
        const serialized = {};
        for (const key in formData) {
            const value = formData[key];
            if (typeof value === 'string') {
                const trimmed = value.trim();
                if (trimmed) {
                    serialized[key] = trimmed;
                }
            } else if (value !== undefined && value !== null) {
                serialized[key] = value;
            }
        }
        return serialized;
    };

    return {
        formData,
        handleChange,
        resetInput,
        serializeForm,
        setFormData,
    };
};
