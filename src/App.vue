<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  created() {
    this.$router.push('/adminIndex')
  }
}
</script>

<style>
  html,body, #app{
    width: 100%;
    height: 100%;
  }
</style>
