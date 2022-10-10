// const username = document.querySelector("#username");

// const userValue = username.value.trim();
// if (userValue === "") {
//     let message = "Ce champ ne peut pas être vide !!!";
//     setError(username, message);
// } else if (!userValue.match(/^[A-Za-z]/)) {
//     let message = "Le nom doit commencer par une lettre !!!";
//     setError(userValue, message);
// }

// function setError(elem, message) {
//     const formCtrlSignup = elem.parentElement;
//     const small = formCtrlSignup.querySelector("small");
//     small.innertText = message;
//     formCtrlSignup.className = "form-controlSignup";
// }

//Recupération de l'élément à controler dans le formulaire
const inscription = document.querySelector("#inscription");
const username = document.querySelector("#username");

//Evenement à controler
inscription.addEventListener('submit', (e) => {
    e.preventDefault();

    //fonction qui va faire les verification
    verifyForm();
})

function verifyForm() {
    const userValue = username.value.trim();
    if (userValue === "") {
        let message = "Ce champ ne peut pas être vide !!!";
        setError(username, message);
    }
}

function setError(elem, message) {
    const formCtrlSignup = elem.parentElement;
    const small = formCtrlSignup.querySelector('small');
    small.innertText = message
    formCtrlSignup.className = "form-control";
}

//     const profil = new user(
//         document.getElementById('username').value,
//         document.getElementById('email').value,
//     );
//     const textAlert = (value) => {
//         return `${value}: Ce champ est obligatoire (Chiffres et symboles ne sont pas autorisés. Ne pas dépasser 20 caractères, minimum 3 caractères)`;
//     };
//     const validInputUser = (value) => {   //regEx nom / prenom client
//         return /^([A-Za-z]{3,20})?([-]{0,1})?([A-Za-z]{3,20})$/.test(value);
//     };


//     function validDataEmpty(querySelectorId) {
//         document.querySelector(`#${querySelectorId}`).textContent = "";
//     };

//     function validData(querySelectorId) {
//         document.querySelector(`#${querySelectorId}`).textContent = "Ce champ est obligatoire";
//     };
//     function validUsername() {
//         const usernameProfil = profil.username;
//         if (validInputUser(usernameProfil)) {
//             validDataEmpty("usernameEmpty");
//             return true;
//         } else {
//             validData("usernameEmpty");
//             alert(textAlert("Nom"));
//             return false;
//         };
//     };
//     if (validUsername()) {
//         localStorage.setItem("profil", JSON.stringify(contact));

//         const payload = {
//             profil: {
//                 username: profil.username
//             },
//             users: users.map(user => user.id)
//         };
//         const sendDataUser = fetch("http://localhost:3000/api/users/" + this.$store.state.user.userId, {

//             headers: {
//                 Accept: "application/json",
//                 "Content-Type": "application/json",
//                 Authorization: "BEARER " + this.$store.state.user.token,
//             },
//             body: JSON.stringify(payload),
//         })


//             .then(response => response.json())
//             .then(res => {
//                 localStorage.setItem("userId", res.userId);
//                 window.location.href = "confirmation.html";
//             })

//             .catch((error) => {
//                 console.error('Error:', error);
//             });

//     } else {
//         alert("Veuillez remplir tous les champs du formulaire");
//     };
// });


