exports.handler = async (event, context) => {
    // El tag del clan se puede pasar como parámetro o dejarlo fijo.
    // Para este caso, lo dejaremos fijo.
    const CLAN_TAG = '%232QC2VG82L'; 
    const API_TOKEN = process.env.CLASH_API_TOKEN;

    const CURRENT_WAR_API_URL = `https://api.clashofclans.com/v1/clans/${CLAN_TAG}/currentwar`;
    console.log('Full URL:', CURRENT_WAR_API_URL);

    const headers = {
        'Authorization': `Bearer ${API_TOKEN}`,
        'Accept': 'application/json',
    };

    try {
        const warResponse = await fetch(CURRENT_WAR_API_URL, { headers });
        
        console.log('Response status:', warResponse.status);
        console.log('Response headers:', Object.fromEntries(warResponse.headers.entries()));
        
        if (!warResponse.ok) {
            const errorText = await warResponse.text();
            console.log('Error response body:', errorText);
            
            let errorBody;
            try {
                errorBody = JSON.parse(errorText);
            } catch (e) {
                errorBody = { reason: errorText };
            }
            
            return {
                statusCode: warResponse.status,
                body: JSON.stringify({ 
                    message: `Error de la API de Supercell: ${errorBody.reason}`,
                    url: CURRENT_WAR_API_URL,
                    status: warResponse.status
                }),
            };
        }
        
        const warData = await warResponse.json();
        
        return {
            statusCode: 200,
            body: JSON.stringify(warData),
        };
        
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ 
                message: 'Error en la Netlify Function: ' + error.message,
                stack: error.stack
            }),
        };
    }
};
