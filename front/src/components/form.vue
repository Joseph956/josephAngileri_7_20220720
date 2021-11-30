<template>
  <form>
    <label for="techno">Techno à ajouter</label><br />
    <input type="text" name="techno" v-model="tecToLearn" /><br />
    <button type="submit">Ajouter</button>
  </form>
</template>

<script>
export default {
  setup() {
    let techToLearn = "";

    const addTechno = function () {
      console.log("Form | addTechno() | techToLearn", techToLearn);
    };
    return {
      techToLearn,
      addTechno,
    };
  },
};
</script>

<style>
</style>