function register() {
  const registerForm = document.querySelector("#registerForm");
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const email = e.target.email.value;
    const userpassword = e.target.password.value;
    try {
      const { data } = await axios.post("/api/v1/users/register", {
        username,
        email,
        userpassword,
      });
      localStorage.setItem("token", data.token);
      window.location.href = "/store";
    } catch (error) {
      console.log(error);
    }
  });
}