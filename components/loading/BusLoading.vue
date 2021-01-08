<template>
  <div class="overflow-hidden">
      <div class="bus">
      <img  src="@/assets/imgs/loading/car-loading1.png" alt="">
      </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.bus {
    /* position:absolute; */
    /* animation: carmove 3.1s infinite linear;; */
    animation: moving 10s infinite linear;
}

@-webkit-keyframes carmove {
    0%{transform: translateY(0px);}
    25%{transform: translateY(1px)}
    29%{transform: translateY(2px)}
    33%{transform: translateY(3px)}
    47%{transform: translateY(0px)}
    58%{transform: translateY(1px)}
    62%{transform: translateY(2px)}
    66%{transform: translateY(3px)}
    75%{transform: translateY(1px)}
    100%{transform: translateY(0px)}
}

@keyframes moving {
    0% {
        transform: translateX(-10%);
    }
    
    100% {
        transform: translateX(110%);
    }
  
}
</style>