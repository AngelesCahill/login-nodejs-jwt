function signIn() { 
    const loginForm = document.querySelector("#loginForm");
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = e.target.email.value;
      const userpassword = e.target.password.value;
      try {
        const { data } = await axios.post("/api/v1/users/login", {
          email,
          userpassword,
        });
        localStorage.setItem('token', data.msg.token);
        if (data.msg.role_id === 1) {
          window.location.href = "/admin";
        } else {
          window.location.href = "/store";window.location.href = "/store";
        }
          
      } catch (error) {
        console.log(error);
      }
    });
};





