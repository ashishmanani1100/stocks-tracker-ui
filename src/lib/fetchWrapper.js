// lib/fetchWrapper.ts
const BASE_URL = process.env.NEXT_PUBLIC_LOCAL_API_URL;
async function getToken() {
  const user = JSON.parse(localStorage.getItem("user"));
  return user?.stsTokenManager?.accessToken;
}

const fetchWrapper = {
  get: (url,params,options) =>
    request(`${BASE_URL}${url}/${params??""}`, { ...options, method: "GET" }),
  post: (url, body, options) =>
    request(`${BASE_URL}${url}`, { ...options, method: "POST", body: JSON.stringify(body) }),
  put: (url, body, options) =>
    request(url, { ...options, method: "PUT", body: JSON.stringify(body) }),
  delete: (url, options) => request(url, { ...options, method: "DELETE" }),
};

async function request(url, options) {
  const token = await getToken(); // Get the token dynamically

  const headers = {
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : undefined, // Add Authorization header if token exists
    ...(options.headers || {}),
  };

  try {
    const res = await fetch(url, { ...options, headers });

    // If status is not OK (200-299), throw error
    if (!res.ok) {
      const errorBody = await res.text();
      throw new Error(`Error ${res.status}: ${errorBody}`);
    }

    // Try parsing JSON if any
    const contentType = res.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return res.json();
    } else {
      return res.text(); // fallback for non-JSON responses
    }
  } catch (error) {
    console.error("Fetch error:", error.message);
    throw error;
  }
}

export default fetchWrapper;

export { getToken }