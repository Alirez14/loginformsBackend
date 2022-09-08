import { hostPath, navbarMain } from '../index.js';
let buttonsID, buttonsPlace;
const buttonAddTravel = document.getElementById('buttonAddTravel');

const deleteById = async (event) => {
    const Id = event.target.innerText;
    console.log(event.target.innerText);

    const authToken = localStorage.getItem('token');
    if (authToken) {
        const res = await fetch(hostPath + 'travel', {
            method: 'delete',
            body: JSON.stringify({
                username: localStorage.getItem('username'),
                Id

            }),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': authToken
            }
        });
        if (res.status !== 200) alert('Re log In');
        else {
            location.reload();
        }
    } else {
        alert('please login first ');
        location.pathname = '/';
    }
};
const loadTableData = async () => {
    const authToken = localStorage.getItem('token');
    if (authToken) {
        const res = await fetch(hostPath + 'travel', {
            method: 'get',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': authToken
            }
        });
        if (res.status !== 200) alert('Re log In');
        else {
            const json = await res.json();
            console.log(json);
            json.forEach((element) => {
                const html = `<tr>
                <th class="idElement">${element.Id}</th>
                <th>${element.username}</th>
                <th class="placeElement" >${element.place}</th>
                <th>${element.review}</th>
                <th>${new Date(element.dateCreated).toLocaleDateString('en-US')}</th>
                </tr>`;
                $('#rowFormAddTravel').prepend(html);
            });

            buttonsID = document.querySelectorAll('.idElement');
            console.log(buttonsID);
            buttonsID.forEach((item) => {
                item.onclick = deleteById;
            });
            buttonsPlace = document.querySelectorAll('.placeElement');
            console.log(buttonsPlace);
            buttonsPlace.forEach((item) => {
                item.onclick = showGoogleMap;
            });
        }
    } else {
        alert('please login first ');
        location.pathname = '/';
    }
};
const createTravel = async () => {
    const review = document.getElementById('inputReview').value;
    const place = document.getElementById('inputPlace').value;

    const authToken = localStorage.getItem('token');
    if (authToken) {
        if (!place || !review) {
            alert('place and review must not empty');
        } else {
            const res = await fetch(hostPath + 'travel', {
                method: 'post',
                body: JSON.stringify({
                    username: localStorage.getItem('username'),
                    place,
                    review
                }),
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'x-access-token': authToken
                }

            });
            if (res.status !== 201) alert('Re log In');
            else {
                location.reload();
            }
        }
    } else {
        alert('please login first ');
        location.pathname = '/';
    }
};
const showGoogleMap = (e) => {
    const map = document.getElementById('googleMaps');
    const place = e.target.innerText;
    map.src = `https://maps.google.com/maps?q=vienna,${place}=&z=13&ie=UTF8&iwloc=&output=embed`;
};

navbarMain();
loadTableData();

buttonAddTravel.onclick = createTravel;
