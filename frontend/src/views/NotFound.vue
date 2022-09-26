<template>
  <div>
    <div class="pg404">
      <h1 class="title404">
        Page 404 <br />Ooups. Cette page n'existe pas !!!!
      </h1>
    </div>
    <div>
      <img class="logo404" src="../assets/logo_transparent.png" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  name: "NotFound",
};
</script>

<style scoped>
.pg404 {
  background: url("../assets/grpm.png") no-repeat center fixed;
  background-position: center;
  background-size: cover;
  margin: 5rem 0 0 0;
  height: 20vw;
  border-radius: 1.2rem;
}
.title404,
h1 {
  padding: 4rem 0 0 0;
  color: #9d0303;
}
.logo404 {
  margin-top: 2rem;
}
@media screen and (max-width: 768px) {
  .pg404 {
    height: 55vw;
  }
}
@media screen and (max-width: 393px) {
  .pg404 {
    height: 55vw;
  }
}
@media screen and (max-width: 280px) {
  .pg404 {
    height: 75vw;
  }
}
</style>