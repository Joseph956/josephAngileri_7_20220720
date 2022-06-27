let liens = document.querySelectorAll('a.external')
for (let i = 0; i < liens.length; i++) {
    let lien = liens[i]
    lien.addEventListener('click', function () {
        let reponse = window.confirm('Voulez vous vraiment afficher le détail du post ?')
        console.log(reponse);
    })
}