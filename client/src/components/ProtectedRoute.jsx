import { Navigate } from "react-router-dom"
import { getStoredUser } from "../utils/auth"

function ProtectedRoute({ children }) {

  const user = getStoredUser()

  if (!user) {
    return <Navigate to="/login" />
  }

  return children
}

export default ProtectedRoute