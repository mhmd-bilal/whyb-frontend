const API_URL_DEPLOY_1 = process.env.NEXT_PUBLIC_API_URL_DEPLOY_1
const API_URL_DEPLOY_2 = process.env.NEXT_PUBLIC_API_URL_DEPLOY_2
const API_URL_DEV = process.env.NEXT_PUBLIC_API_URL_DEV
const API_URL = process.env.NEXT_PUBLIC_API_URL_DEPLOY_1

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

  try {
    const res = await fetch(url, {
      method: "GET",
      headers,
    })

    if (!res.ok) {
      throw new Error("Failed to fetch data")
    }

    const data = await res.json()

    return data
  } catch (error) {
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
