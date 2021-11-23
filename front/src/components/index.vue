<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p v-if="abonnes == 0">Aucun abonnés pour le moment 😂</p>
    <p v-else-if="abonnes == 1">
      Une personne s'est abonnée, c'est un bon début ! 🔥
    </p>
    <p v-else>{{ abonnes }} personnes ce sont abonnés 💪</p>
    <button v-on:click="subscribe()">S'abonner</button>
    <div class="coment" v-for="(coment, idx) in coments" v-bind:key="idx">
      <!-- <div class="coment" v-for="coment in coments" v-bind:key="coment.id"> -->
      <h3>{{ coment.nom }}</h3>
      <p>{{ coment.commentaires }}</p>
      <div v-if="coment.note > 1">
        <span v-for="i in coment.note" v-bind:key="i"> 🍌 </span>
      </div>
      <span v-else> 💩 </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "index",
  props: {
    msg: String,
  },
  data: function () {
    return {
      abonnes: 0,
      coments: [
        {
          nom: "joseph",
          commentaires: "C'est parfait !",
          note: 2,
        },
        {
          nom: "Henrri XII",
          commentaires: "C'est très bien !",
          note: 8,
        },
        {
          nom: "Marc aigri",
          commentaires: "C'est mauvais !",
          note: 1,
        },
      ],
    };
  },
  methods: {
    subscribe: function () {
      this.abonnes++;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
p {
  font-size: 22px;
}
</style>
