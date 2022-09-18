import { hostPath, navbarMain } from '../index.js';
let buttonsID, buttonsPlace;
const deleteById = async (event) => {
    const Id = event.target.innerText;

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
const createTravel = async () => {
    const reviewNum = document.getElementById('inputReviewNum').value;
    const reviewDec = document.getElementById('inputReviewDec').value;
    const place = document.getElementById('inputPlace').value;
    const errorMsg = document.getElementById('errorMsg');
    if (parseInt(reviewNum) < 1 || parseInt(reviewNum) > 5) {
        errorMsg.style.display = 'inline';
        return;
    } else {
        errorMsg.style.display = 'none';
    }
    const review = reviewNum + ' : ' + reviewDec;
    const authToken = localStorage.getItem('token');
    if (authToken) {
        if (!place || !reviewNum || !reviewDec) {
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

            json.forEach((element) => {
                const html = `<tr>
                <th class="idElement">${element.Id}</th>
                <th>${element.username}</th>
                <th class="placeElement" >${element.place}</th>
                <th>${element.review}</th>
                <th>${new Date(element.dateCreated).toLocaleDateString('en-US')}</th>
                </tr>`;

                document.getElementById('rowFormAddTravel').innerHTML = html + document.getElementById('rowFormAddTravel').innerHTML;
            });

            buttonsID = document.querySelectorAll('.idElement');

            buttonsID.forEach((item) => {
                item.onclick = deleteById;
            });
            buttonsPlace = document.querySelectorAll('.placeElement');

            buttonsPlace.forEach((item) => {
                item.onclick = showGoogleMap;
            });
            const buttonAddTravel = document.getElementById('buttonAddTravel');
            buttonAddTravel.onclick = createTravel;
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
