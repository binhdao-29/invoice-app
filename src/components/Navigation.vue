<template>
  <header class="flex">
    <div class="branding flex">
      <img src="@/assets/file-invoice-dollar-solid.png" alt="">
    </div>
  </header>
  <div></div>
</template>

<script>
export default {
  name: "navigation"
}
</script>

<style lang="scss" scoped>
header {
  z-index: 99;
  background-color: #1e2139;
  flex-direction: row;

  @media(min-width: 900px) {
    flex-direction: column;
    min-height: 100%;
    min-height: 90px;
    border-radius: 0 20px 20px 0;
  }

  .branding {
    border-radius: 0 20px 20px 0;
    background-color: #7c5dfa;
    padding: 24px;

    @media(min-width: 900px) {
      width: 100%;

    }

    img {
      width: auto;
      height: 30px;
    }
  }
}


</style>