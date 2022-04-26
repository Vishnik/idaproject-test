<template>
<div class="loading"></div>
</template>

<script>
export default {
  name: 'VLoader',
};
</script>

<style lang="scss" scoped>
.loading {
  height: 0;
  width: 0;
  padding: 36px;
  border: 6px solid #ccc;
  border-right-color: #888;
  border-radius: 50%;
  -webkit-animation: rotate 1s infinite linear;
  position: absolute;
  left: 50%;
  top: 30%;
  transform: translateX(-50%);
}

@-webkit-keyframes rotate {
  100% {
    -webkit-transform: translateX(-50%) rotate(360deg);
  }
}
</style>
