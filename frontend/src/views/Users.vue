<template>
    <div>
        <navProfil />
        <div class="col-md-8 col-xl-6 middle-wrapper">
            <div class="containerTitre">
                <div class="logoTransparentUser">
                    <img style="height: 2.5rem; width: 2.5rem" x="0" y="0" height="100%" width="100%"
                        src="../assets/logo_transparent.png" alt="" />
                </div>
                <div class="cardTitle">
                   <h1 >Lister tous les profils utilisateurs</h1>
                </div>
            </div>
            <div class="row">
                <div v-show="users.length > 0" v-for="user in users" :key="user.id">
                    <div class="cardUsers rounded">
                        <div class="cardUser">
                            <div class="listInfosUsers " v-if="user.attachment">
                                <div>
                                    <img style="height: 10rem; width: 10rem" x="0" y="0" height="100%" width="100%"
                                        id="imgProfile" v-bind:src="user.attachment"
                                        alt="Photo de profil utilisateur" />
                                </div>
                                <div class="listInfosUser">
                                    <div>
                                        <div>
                                            <h3>{{ user.username }}</h3>
                                        </div>
                                        <div>
                                            <h3>{{ user.email }}</h3>
                                        </div>
                                    </div>
                                    <div class="positionTrash">
                                        <button class="btn" data-dropdown-button @click="userDeleted(user.id)" :class="{
                                                    'btn--disabled': !validatedFields,
                                                  }">
                                            <div class="trashBtn">
                                                <div class="btnComent">
                                                    <img style="height: 1.5rem; width: 1.5rem" x="0" y="0" height="100%"
                                                        width="100%" src="../assets/Icons/BiTrash3Fill.svg" alt="">
                                                </div>
                                                <div class="btnComent">
                                                    <span v-if="status == 'loading'">Suppression en cours....</span>
                                                    <span v-else></span>
                                                </div>
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div class="listInfosUsers " v-else>
                                <div>
                                    <img style="height: 10rem; width: 10rem" x="0" y="0" height="100%" width="100%"
                                        id="imgAvatar" src="../assets/Icons/BiPersonCircle.svg" alt="avatar"
                                        class="imgAvatarUser" />
                                </div>
                                <div class="listInfosUser">
                                    <div>
                                        <div>
                                            <h3>{{ user.username }}</h3>
                                        </div>
                                        <div>
                                            <h3>{{ user.email }}</h3>
                                        </div>
                                    </div>
                                    <div class="positionTrash">
                                        <button class="btn" data-dropdown-button @click="userDeleted(user.id)" :class="{
                                                    'btn--disabled': !validatedFields,
                                                  }">
                                            <div class="trashBtn">
                                                <div class="btnTrashUser">
                                                    <img style="height: 1.5rem; width: 1.5rem" x="0" y="0" height="100%"
                                                        width="100%" src="../assets/Icons/BiTrash3Fill.svg" alt="">
                                                </div>
                                                <div class="btnTrashUser">
                                                    <span v-if="status == 'loading'">Suppression en cours....</span>
                                                    <span v-else></span>
                                                </div>
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="logoTransparent">
                    <img style="height: 2.5rem; width: 2.5rem" x="0" y="0" height="100%" width="100%"
                        src="../assets/logo_transparent.png" alt="" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
import navProfil from "@/components/NavProfil.vue";
export default {
    name: 'Users',
    components: { navProfil },
    data: function () {
        return {
            //Lister tous les users
            apiUser: axios.create({
                baseURL:
                    "http://localhost:3000/api/users/",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: "BEARER " + this.$store.state.user.token,
                },
            }),
            users: [],
        }
    },
    mounted: function () {
        this.apiUser
            .get("")
            .then((response) => {
                this.user = response.data;
            })
            .catch(function () { });
    },
    beforeMount() {
        this.getUserList();
    },
    computed: {
        ...mapState(["status"]),
        ...mapState({user: "userInfos"}),
    },
    methods: {
        getUserList() {
            this.apiUser
                .get("")
                .then((response) => {
                    this.users = response.data;
                })
                .catch(function (error) {
                });
        },
        //Supprimer un profil avec ses posts et coments
        userDeleted: function (id) {
            // const roleId = admin;
           
            // console.log("--------->CONTENU role : isadmin");
            // console.log(isadmin);
            // if (roleId === 'admin') {
            //     return false
            // }else{
                if (
                    window.confirm("Voulez-vous vraiment supprimer ce compte utilisateur ?")
                ) {
                    this.apiUser
                        .delete("http://localhost:3000/api/users/" + id)
                        .then(() => {
                            window.location.reload();
                        });
                };
            // }
        },
    },

};
</script>

<style scoped>

.containerTitre, h1 {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 1rem 0 1rem;
}
.logoTransparentUser {
    display: flex;
}
.cardTitle {
    display: flex;
}
.cardUser {
margin: 1rem;
}
.listInfosUsers {
    display: flex;
    /* justify-content: space-evenly; */
    align-items: center;
    background: #f2f2f2;
    box-shadow: 0px 0px 10px #cecdcd, -5px -5px 10px #cfcece;
    border-radius: 5rem;
    padding: 0.5rem;
}
.listInfosUser {
    display: flex;
    margin: auto;
   
}
.imgAvatarUser {
    margin: 0 auto 0 auto;
}
.positionTrash {
    display: flex;
    align-items: center;
    margin: 0 0rem 0 5rem;
}
.btnTrashUser {
    font-size: 2rem;
}
</style>