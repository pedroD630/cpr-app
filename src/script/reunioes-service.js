export async function adicionarReuniao(reuniao) {
    try {
        const response = await fetch('https://cpr-cronometro.onrender.com/api/reuniao/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reuniao)
        });

        if (!response.ok) {
            const text = await response.text();
            console.error('Erro ao salvar reunião', response.status, text);
            throw new Error(`Erro ao salvar reunião: ${response.status} ${text}`);
        }

        const data = await response.json();
        console.log('Reunião salva com sucesso', data);
        return data;
    } catch (error) {
        console.error('Erro ao adicionar reunião:', error);
        throw error;
    }
}