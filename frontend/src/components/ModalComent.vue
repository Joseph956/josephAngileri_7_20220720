<template>
  <div class="bloc-modale">
    <div class="overlay">
      <div class="modale card">
        <div class="btn-modale btn btn-danger">
          <h2>Liste des commentaires</h2>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ModalComent",
  props: ["revele", "toggleModale"],
};
</script>

<style>
.bloc-modale {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>