export const hostPath = "http://localhost:4000/api/";
export const buttonLogin = document.getElementById("buttonLogin");
export const formLogin = document.getElementById("formLogin");
export const buttonSignIn = document.getElementById("buttonSignIn");

export const navbarMain = () => {
  localStorage.getItem("token") && (buttonLogin.innerText = "Logout");
  buttonLogin.onclick = logout;
};
const formMain = () => {
  localStorage.getItem("token") && (formLogin.style.display = "none");
};

export const logout = () => {
  localStorage.clear();
};

export const login = async () => {
  const email = document.getElementById("inputEmail").value;
  const password = document.getElementById("inputPassword").value;
  console.log({ email, password });
  const res = await fetch(hostPath + "login", {
    body: JSON.stringify({ email, password }),
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  const json = await res.json();
  localStorage.setItem("token", json.Token);
  localStorage.setItem("username", json.username);
  location.pathname = "/blog/blog.html";
};

navbarMain();
location.pathname === "/" && formMain();
location.pathname === "/" && (buttonSignIn.onclick = login);
