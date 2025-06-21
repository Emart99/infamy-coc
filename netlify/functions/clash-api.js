exports.handler = async (event, context) => {
  const CLAN_TAG = '%232QC2VG82L'; 

  const CLAN_API_URL = `https://api.clashk.ing/clan/${CLAN_TAG}/basic`;
  const WARLOG_API_URL = `https://api.clashk.ing/war/${CLAN_TAG}/previous`;

  const headers = {
    'Accept': 'application/json',
  };

  try {
    const [clanResponse, warLogResponse] = await Promise.all([
      fetch(CLAN_API_URL, { headers }),
      fetch(WARLOG_API_URL, { headers })
    ]);

    if (!clanResponse.ok) {
      return {
        statusCode: clanResponse.status,
        body: JSON.stringify({ message: `Error al obtener datos del clan: ${clanResponse.statusText}` }),
      };
    }
    if (!warLogResponse.ok) {
      return {
        statusCode: warLogResponse.status,
        body: JSON.stringify({ message: `Error al obtener el registro de guerra: ${warLogResponse.statusText}` }),
      };
    }

    const clanInfo = await clanResponse.json();
    const warLog = await warLogResponse.json();

    return {
      statusCode: 200,
      body: JSON.stringify({ clanInfo, warLog }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error en la Netlify Function: ' + error.message }),
    };
  }
};