function Signup() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Signup Page</h1>

      <form>
        <div>
          <label>Email:</label><br />
          <input type="email" placeholder="Enter email" />
        </div>

        <br />

        <div>
          <label>Password:</label><br />
          <input type="password" placeholder="Enter password" />
        </div>

        <br />

        <button type="submit">Signup</button>
      </form>
    </div>
  );
}

export default Signup;