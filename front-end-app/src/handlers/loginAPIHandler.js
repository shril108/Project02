import { post } from "./customerAPIHandler";
import { useNavigate } from "react-router-dom";

const baseURL = 'http://localhost:8080/account';

export async function login(item) {
    const options = {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(item)
    };

    const postData = async (url) => {
        try {
            const response = await fetch(`${url}/token`, options);
            if (!response.ok){
                throw new Error(`Error fetching data: ${response.status}`);
            }
            const data = await response.json();
            return data.text;
        } catch (error) {
            console.error(error)
        }
    }
    return await postData(baseURL);
}

export async function register(item) {
    const optionsForGet = {
        method: 'GET',
        mode: 'cors'
    };

    const fetchData = async (url) => {
        try {
            const response = await fetch(`http://localhost:8080/api/customers/findbyEmail/${item.email}`, optionsForGet);
            if (!response.ok){
                throw new Error(`Error fetching data: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error)
        }
    }


    try{fetchData(baseURL).then((customer) => {
        if(customer){
            console.log(customer)
            throw new Error(`Error: Customer already exists`);
        }
    })
        post(item);
        return true;
    } catch(error) {
        return false;
    }
}