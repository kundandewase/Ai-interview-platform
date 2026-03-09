function Dashboard() {

  const user = JSON.parse(
    localStorage.getItem("user")
  )

  return (

    <div className="bg-gray-900 text-white min-h-screen p-6">

      <h1 className="text-2xl">
        Welcome {user?.username}
      </h1>

      <p className="mt-2">
        Practice coding and AI interviews
      </p>

    </div>

  )

}

export default Dashboard