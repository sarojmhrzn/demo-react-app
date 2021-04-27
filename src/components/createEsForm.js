import React from 'react';
import Axios from "axios";

import useCreateEsForm from "../customHooks";
const serverUrl = 'http://localhost:3005/api';

const CreateEsForm = () => {
    const {inputs, handleInputChange, handleSubmit} = useCreateEsForm({prefix: ''}, async () => {
        const esDataObject = {
            prefix: inputs.prefix,
            type: inputs.type
        }
        const result = await createEsTemplate(esDataObject);
        if(result.success) {
            Array.from(document.querySelectorAll('input')).forEach(input => {
                input.value = ''
            })
        }
        alert(result.message);

    });
    return(
        <form onSubmit={handleSubmit}>
            <div>
                <label>Client Prefix</label>
                <input type="text" name="prefix" onChange={handleInputChange} value={inputs.prefix} required />
            </div>
            <div>
                <input type="radio" id="leg" name="type" value="leg"  onChange={handleInputChange}/>
                <label htmlFor="leg">Leg</label>
                <input type="radio" id="segment" name="type" value="segment" onChange={handleInputChange}/>
                <label htmlFor="segment">Segment</label>
            </div>
            <button type="submit">Create Template</button>
        </form>
    )
}

const createEsTemplate = (data) => {
    return new Promise((resolve, reject) => {
        Axios
            .put(`${serverUrl}/es-template`, data, {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then((resp) => {
                resolve(resp.data);
            })
            .catch((err) => {
               reject(err.message);
            });
    })
}

export default CreateEsForm;