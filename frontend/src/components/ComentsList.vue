<template>
    <div>
        <navProfil />
        <h1>lister tous les commentaires</h1>
        <div class="col-md-8 col-xl-6 middle-wrapper">
            <div class="rowList">
                <div v-for="coment in coments" :key="coment.id" :coment="coment" class="col-md-12 grid-margin">
                    <div class="comentPost">
                        <p class="comentUser">
                            {{ coment.coment }}
                        </p>
                    </div>
                    <!-- Informations de l'auteur du commentaire -->
                    <!-- <div class="infosUser">
                        <div class="avatarComentUser" v-if="coment.user.attachment">
                            <img style="height: 45px; width: 35px" x="0" y="0" height="100%" width="100%"
                                class="imgComent" :src="coment.user.attachment" alt="" />
                        </div>
                        <div class="avatarComentUser" v-else>
                            <img style="height: 35px; width: 35px" x="0" y="0" height="100%" width="100%"
                                class="avatarProfil" src="../assets/Icons/BiPersonCircle.svg" alt="avatar" />
                        </div>

                        <div class="userComent">
                            <p class="textUserComent">
                                {{ coment.user.username }}
                            </p>
                            <div class="dateComent">
                                Posté le : {{ coment.createdAt }}
                            </div>
                        </div> -->
                        <!-- Fin informations de l'auteur du commentaire -->
                    </div>
                </div>
            </div>
        </div>
</template>

<script>
import navProfil from "@/components/NavProfil.vue";
export default {
name: 'ComentsList',
components: {
    navProfil,
},
    data: function () {
        return {
            apiComents: axios.create({
                baseURL: "http://localhost:3000/api/coments/",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: "BEARER " + this.$store.state.user.token,
                },
            }),
            coments: [],
        }
    },
    beforeMount() {
        this.getComentList();
    },
    mounted: function () {
        this.apiComents
            .get("")
            .then((response) => {
                this.user = response.data;
            })
            .catch(function () { });
    },

methods: {
    getComentList() {
        this.apiComents
            .get("/")
            .then((response) => {
                this.coments = response.data;
                console.log(this.coments);
            })
            .catch(function (message) {
                console.log(message);
            });
    },
}
}
</script>

<style>



.rowList {
    padding: 1rem;
    background: #5c5c6c85;
    border-radius: 1.5rem;
}


</style>