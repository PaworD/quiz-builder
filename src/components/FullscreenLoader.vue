<template>
  <div class="loader-wrapper">
    <div class="loader">
      <div class="one"></div>
      <div class="two"></div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.loader {
  &-wrapper {
    position: absolute;
    top: 0;
    left: 0;

    width: 100%;
    height: 100%;

    display: flex;
    justify-content: center;
    align-items: center;

    background: white;

    z-index: 999;
  }
  position: relative;
  .one {
    position: absolute;
    border-radius: 50%;
    background: #FFFFFF;
    opacity: .0;
    animation: loading 1.3s .65s infinite;
    height: 20px;
    width: 20px;
  }

  .two {
    position: absolute;
    border-radius: 50%;
    background: #FF4081;
    opacity: .0;
    animation: loading 1.3s infinite;
    height: 20px;
    width: 20px;
  }


  @keyframes loading {
    0% {
      opacity: .0;
      transform: scale(.15);
      box-shadow: 0 0 2px rgba(black, .1);
    }
    50% {
      opacity: 1;
      transform: scale(2);
      box-shadow: 0 0 10px rgba(black, .1);
    }
    100% {
      opacity: .0;
      transform: scale(.15);
      box-shadow: 0 0 2px rgba(black, .1);
    }
  }
}
</style>