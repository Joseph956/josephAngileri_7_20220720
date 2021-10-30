# P07_reseau_social

# MySql
Inserer les informations de connexion dans les variables d'environnement

# Démarrer le serveur
Lancer le serveur : `nodemon server`

# Les routes

## Gestion de l'authentification.
## Post - Creer un compte
http://localhost:3000/api/authUsers/signup
## Post - Se connecter
http://localhost:3000/api/authUsers/login
## get - Se déconnecter
http://localhost:3000/api/authUsers/logout


## Gestion des Fiches utilisateurs.
## Post - Publier une nouvelle fiche.
http://localhost:3000/api/fichesUsers/NewFiche
## Get - Voir toutes les fiches utilisateurs.
http://localhost:3000/api/fichesUsers
## Get - Voir une fiche utilisateur grâce à son id.
http://localhost:3000/api/fichesUsers/1
## Put - Modifier la fiche d'un utilisateur grâce à son id.
http://localhost:3000/api/fichesUsers/1
## Delete - Supprimer la fiche d'un utilisateur grâce à son id.
http://localhost:3000/api/fichesUsers/1


## Gestion des posts utlisateurs.
## Post - Publier un nouveau post.
http://localhost:3000/api/postsUsers/NewPost
## Get - Voir tous les posts.
http://localhost:3000/api/postsUsers
## Get - Voir un post grâce à son id.
http://localhost:3000/api/postsUsers/1
## Put - Modifier
http://localhost:3000/api/postsUsers/1
## Delete - Supprimer
http://localhost:3000/api/postsUsers/1
