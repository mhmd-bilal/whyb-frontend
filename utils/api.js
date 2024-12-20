const API_URL_DEPLOY_1 = "https://future-molli-bzhal-9b0b6787.koyeb.app"
const API_URL_DEPLOY_2 = "https://whyb-backend.onrender.com"
const API_URL_DEV = "http://127.0.0.1:8000"
const API_URL = "http://127.0.0.1:8000"

export const getPosts = async (endpoint, data, token) => {
  const res = await fetch(`${API_URL}${endpoint}?search=${data.search}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
  })

  if (!res.ok) {
    throw new Error("Failed to fetch data")
  }
  return await res.json()
}

export const getPost = async (id, token) => {
  const url = `${API_URL}/posts/${id}`
  const headers = {
    "Content-Type": "application/json",
    Authorization: token || "",
  }

  // Log the request details
  console.log("Fetching post:", {
    url,
    headers,
  })

  try {
    const res = await fetch(url, {
      method: "GET",
      headers,
    })

    // Log the response status and headers
    console.log("Response status:", res.status)
    console.log("Response headers:", Array.from(res.headers.entries()))

    if (!res.ok) {
      throw new Error("Failed to fetch data")
    }

    const data = await res.json()

    // Log the response data
    console.log("Response data:", data)

    return data
  } catch (error) {
    // Log the error message
    console.error("Error fetching post:", error.message)
    throw error
  }
}

export const postData = async (endpoint, data, token) => {
  const res = await fetch(`${API_URL}${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
    body: JSON.stringify(data),
  })
  console.log(res)
  if (!res.ok) {
    throw new Error("Failed to post data")
  }
  return await res.json()
}
