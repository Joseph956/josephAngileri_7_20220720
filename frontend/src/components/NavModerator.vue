<template>
  <header>
    <nav class="navbar navbar-expand navbar-light fixed-top">
      <div class="container">
        <router-link class="navbar-brandLogo" :to="{ name: 'Accueil' }">
          <img
            class="imgAccueil"
            style="height: 2rem; width: 12rem"
            x="0"
            y="0"
            height="100%"
            width="100%"
            src="../assets/icon-left-font.svg"
            alt=""
          />
        </router-link>
      </div>
      <div class="toggle" toggle @click="toggle()">
        <img
          style="height: 2.6rem; width: 4rem"
          x="0"
          y="0"
          height="100%"
          width="100%"
          class="open"
          src="../assets/Icons/bars-regular.svg"
          alt="ouvrir le menu"
        />

        <img
          style="height: 2.6rem; width: 4rem"
          x="0"
          y="0"
          height="100%"
          width="100%"
          class="close"
          src="../assets/Icons/BiXCircle.svg"
          alt="fermer le menu"
        />
      </div>
      <div class="iconsMenuAccueil">
        <ul class="menuAccueil">
          <li class="formRow">
            <router-link class="navbar-brand" id="link" :to="{ name: 'Users' }">
              <img
                class="iconPeople"
                style="height: 2rem; width: 1.2rem"
                x="0"
                y="0"
                height="100%"
                width="100%"
                src="../assets/Icons/MdiAccountGroup.svg"
                alt="groupes"
              />
            </router-link>
          </li>
          <li class="formRow">
            <button type="button" @click="logout()" class="btn">
              <img
                style="height: 1.5rem; width: 1.5rem"
                x="0"
                y="0"
                height="100%"
                width="100%"
                src="../assets/Icons/sign-out-alt-regular.svg"
                alt=""
              />
            </button>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  name: "NavModerator",
};
</script>

<style>
</style>