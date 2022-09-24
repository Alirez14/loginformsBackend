export const hostPath = 'https://loginformsbackend.herokuapp.com/api/';
export const subPath = location.hostname === 'alirez14.github.io' ? '/loginformsBackend/' : '/';
export const buttonLogin = document.getElementById('buttonLogin');
export const formLogin = document.getElementById('formLogin');
export const buttonSignIn = document.getElementById('buttonSignIn');

export const navbarMain = () => {
    localStorage.getItem('token') && (buttonLogin.innerText = 'Logout');
    buttonLogin.onclick = logout;
};
const formMain = () => {
    localStorage.getItem('token') && (formLogin.style.display = 'none');
};

export const logout = () => {
    localStorage.clear();
};

export const login = async () => {
    const email = document.getElementById('inputEmail').value;
    const password = document.getElementById('inputPassword').value;
    console.log({ email, password });
    const res = await fetch(hostPath + 'login', {
        body: JSON.stringify({ email, password }),
        method: 'post',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    });
    const json = await res.json();
    localStorage.setItem('token', json.Token);
    localStorage.setItem('username', json.username);
    location.pathname = subPath + 'blog/blog.html';
};

navbarMain();

location.pathname === subPath && formMain();
location.pathname === subPath && (buttonSignIn.onclick = login);
