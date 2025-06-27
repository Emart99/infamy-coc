exports.handler = async (event, context) => {
    const CLAN_TAG = '%232QC2VG82L'; 

    const CURRENT_WAR_API_URL = `https://api.clashk.ing/war/${CLAN_TAG}/basic`;

    const headers = {
        'Accept': 'application/json',
    };

    try {
        const warResponse = await fetch(CURRENT_WAR_API_URL, { headers });
        
        
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
                    message: `Error de la API: ${errorBody.reason}`,
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