exports.handler = async (event, context) => {
    
    if (!event.queryStringParameters || !event.queryStringParameters.tag) {
        return {
            statusCode: 400,
            body: JSON.stringify({ 
                message: 'Se requiere el tag del jugador.',
                received: event.queryStringParameters 
            })
        };
    }
    
    const originalTag = event.queryStringParameters.tag;
    
    
    const PLAYER_API_URL = `https://api.clashk.ing/player/${originalTag}/stats`;
    console.log('Full URL:', PLAYER_API_URL);
    
    const headers = {
        'Accept': 'application/json',
    };
    
    try {
        const playerResponse = await fetch(PLAYER_API_URL, { headers });
        
        console.log('Response status:', playerResponse.status);
        console.log('Response headers:', Object.fromEntries(playerResponse.headers.entries()));
        
        if (!playerResponse.ok) {
            const errorText = await playerResponse.text();
            console.log('Error response body:', errorText);
            
            let errorBody;
            try {
                errorBody = JSON.parse(errorText);
            } catch (e) {
                errorBody = { reason: errorText };
            }
            
            return {
                statusCode: playerResponse.status,
                body: JSON.stringify({ 
                    message: `Error de la API: ${errorBody.reason}`,
                    url: PLAYER_API_URL,
                    status: playerResponse.status
                }),
            };
        }
        
        const playerData = await playerResponse.json();
        
        return {
            statusCode: 200,
            body: JSON.stringify(playerData),
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