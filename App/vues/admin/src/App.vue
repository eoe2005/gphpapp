<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {
  created() {
    console.log(sessionStorage.getItem("store"));
    if (sessionStorage.getItem("store")) {
      this.$store.replaceState(
        Object.assign(
          {},
          this.$store.state,
          JSON.parse(sessionStorage.getItem("store"))
        )
      );
    }
  },
};
</script>
<style>
html,
body {
  padding: 0px;
  margin: 0px;
}
html * {
  box-sizing: border-box;
}

.header {
  margin: 0px;
  border-bottom: thin solid #aaa;
  margin-bottom: 1rem;
}
</style>
