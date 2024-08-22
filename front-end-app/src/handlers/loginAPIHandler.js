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