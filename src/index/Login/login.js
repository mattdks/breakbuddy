export default function renderLoginPage() {
  const main = document.querySelector("main");
  main.innerHTML = `
    <section>
      <div class="login-box">
        <form action="">
          <h1>Login</h1>

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

          <div class="remember-forgot">
            <label><input type="checkbox"> Remember me</label>
            <a href="#">Forgot Password?</a>
          </div>

          <button type="submit" onclick="window.location.href='?page=activities'">
            Login
          </button>

          <div class="register-link">
            <p>
              Don't have an account? <a href="?page=register">Register</a>
            </p>
          </div>
        </form>
      </div>
    </section>
  `;
}