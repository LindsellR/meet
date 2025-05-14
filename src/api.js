
import mockData from './mock-data';


/**
 *
 * @param {*} events:
 * The following function should be in the “api.js” file.
 * This function takes an events array, then uses map to create a new array with only locations.
 * It will also remove all duplicates by creating another new array using the spread operator and spreading a Set.
 * The Set will remove all duplicates from the array.
 */
export const extractLocations = (events) => {
  const extractedLocations = events.map((event) => event.location);
  const locations = [...new Set(extractedLocations)];
  return locations;
};

const removeQuery = () => {
  let newurl;
  if (window.history.pushState && window.location.pathname) {
    newurl =
      window.location.protocol +
      "//" +
      window.location.host +
      window.location.pathname;
    window.history.pushState("", "", newurl);
  } else {
    newurl = window.location.protocol + "//" + window.location.host;
    window.history.pushState("", "", newurl);
  }
 };

const checkToken = async (accessToken) => {
  const response = await fetch(
    `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`
  );
  const result = await response.json();
  return result;
 };

/**
 *
 * This function will fetch the list of all events
 */
export const getEvents = async () => {
   if (window.location.href.startsWith('http://localhost')) {
   return mockData;
 }

 const token = await getAccessToken();
 console.log("Token to be used for API call:", token);

 if (token) {
    removeQuery();
    const url =  "https://egicgyfyfe.execute-api.ap-southeast-2.amazonaws.com/dev/api/get-events" + "/" + token;

    console.log("Calling API with URL:", url);

    const response = await fetch(url);
    const result = await response.json();
    console.log("API response:", result);

      if (result && result.events && Array.isArray(result.events)) {
      return result.events;
    } else {
      console.warn("Unexpected API response format:", result);
      return [];
    }
  }

  return [];
};

const getToken = async (code) => {
  try {
    const encodeCode = encodeURIComponent(code);
 
    const response = await fetch( ' https://egicgyfyfe.execute-api.ap-southeast-2.amazonaws.com/dev/api/token' + '/' + encodeCode);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const { access_token } = await response.json();
    access_token && localStorage.setItem("access_token", access_token);
    return access_token;
  } catch (error) {
    error.json();
  }
 };

export const getAccessToken = async () => {
  const accessToken = localStorage.getItem('access_token');
  const tokenCheck = accessToken && (await checkToken(accessToken));

  console.log("Checking token", accessToken, tokenCheck)

  if (!accessToken || tokenCheck.error) {
    await localStorage.removeItem("access_token");
    const searchParams = new URLSearchParams(window.location.search);
    const code = await searchParams.get("code");
    if (!code) {
      console.log("No code found. Redirecting to auth...");
      const response = await fetch(
        "https://egicgyfyfe.execute-api.ap-southeast-2.amazonaws.com/dev/api/get-auth-url"
      );
      const result = await response.json();
      const { authUrl } = result;
      return (window.location.href = authUrl);
    }
    console.log("Code found. Fetching token...");
    return code ? await getToken(code) : null;
  }
  console.log("Valid access token:", accessToken);
  return accessToken;
};