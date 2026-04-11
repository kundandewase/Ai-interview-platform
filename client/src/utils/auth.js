export function getStoredUser() {
  const rawUser = localStorage.getItem("user")

  if (!rawUser) {
    return null
  }

  try {
    const parsed = JSON.parse(rawUser)
    return parsed && typeof parsed === "object" ? parsed : null
  } catch {
    localStorage.removeItem("user")
    return null
  }
}
