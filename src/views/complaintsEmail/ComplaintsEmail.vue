<template>
  <div>
    <div class="mui-content">
      <ul class="mui-table-view">
        <li class="mui-table-view-cell">
          <h2>电邮投诉</h2>
        </li>
        <li class="mui-table-view-cell">投诉电话 ：{{this.mobile}}</li>
        <li class="mui-table-view-cell">投诉邮箱 ：{{this.email}}</li>
      </ul>
    </div>
  </div>
</template>
<script>
import {getemail} from './emailService'
export default {
  data() {
    return {
      email:'',
      mobile:''
    };
  },
  created(){
    getemail().then((res =>{
      // console.log(res);
      this.email = res.data.email
      this.mobile = res.data.mobile
      
    }))
  }
};
</script>
<style lang="stylus" scoped>
.mui-content {
  h2{
    text-align center
    margin-bottom 30px;
  }
  .mui-table-view-cell {
    background-color: #ccc;
  }
}
</style>