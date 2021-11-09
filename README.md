# P07_reseau_social

# MySql
Inserer les informations de connexion dans les variables d'environnement

# Démarrer le serveur
Lancer le serveur : `nodemon server`

# Les routes

## Gestion de l'authentification.
## Post - Creer un compte
http://localhost:3000/api/auth/signup
## Post - Se connecter
http://localhost:3000/api/auth/login
## get - Se déconnecter
http://localhost:3000/api/auth/logout


## Gestion des Fiches utilisateurs.
## Post - Publier une nouvelle fiche.
http://localhost:3000/api/users/newuser
## Get - Voir toutes les fiches utilisateurs.
http://localhost:3000/api/users
## Get - Voir une fiche utilisateur grâce à son id.
http://localhost:3000/api/users/:id
## Put - Modifier la fiche d'un utilisateur grâce à son id.
http://localhost:3000/api/users/:id
## Delete - Supprimer la fiche d'un utilisateur grâce à son id.
http://localhost:3000/api/users/:id


## Gestion des posts utlisateurs.
## Post - Publier un nouveau post.
http://localhost:3000/api/posts/NewPost
## Get - Voir tous les posts.
http://localhost:3000/api/posts
## Get - Voir un post grâce à son id.
http://localhost:3000/api/posts/:id
## Put - Modifier
http://localhost:3000/api/posts/:id
## Delete - Supprimer
http://localhost:3000/api/posts/:id
