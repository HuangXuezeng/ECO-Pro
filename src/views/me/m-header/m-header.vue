<template>
  <div>
    <div class="container" >
      <p class="center">
        <img v-if="pic" :src="pic" >
        <img v-else :src="default_pic" >
      </p>
      <p class="userNC" >{{name}}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    pic: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    }, 
  },
  data () {
    return {
      default_pic: require('@/assets/default_avtar.jpg'),
    }
  },
}
</script>

<style scoped>
  .container {
    height: 35vh;
    border-bottom: 1px solid #D9D9D9;
  }

  .center {
    text-align: center;
    padding-top: 20px;
    color: #fff;
    font-size: 18px;
  }
  .center img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 4px solid #fff;
  }
  .userNC {
    text-align: center;
    margin-top: 10px
  }

</style>

