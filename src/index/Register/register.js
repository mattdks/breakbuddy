export default function renderRegisterPage() {
  const main = document.querySelector("main");
  main.innerHTML = `
    <section>
      <div class="login-box">
        <form action="">
          <h1>Register</h1>

          <div class="input-box">
            <span class="icon"><i class="fa-solid fa-envelope"></i></span>
            <input type="email" required>
            <label>Email</label>
          </div>

          <div class="input-box">
            <span class="icon"><i class="fa-solid fa-lock"></i></span>
            <input type="password" required>
            <label>Password</label>
          </div>

          <button type="submit" onclick="window.location.href='?page=activities'">
            Sign Up
          </button>

          <div class="register-link">
            <p>
              Already have an account? <a href="?page=login">Sign In</a>
            </p>
          </div>
        </form>
      </div>
    </section>
  `;
}