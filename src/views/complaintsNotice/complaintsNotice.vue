<template>
  <div class="textBox " style="padding-bottom:95px"> 
    <div class="text">
      <h2>投诉须知</h2>
      <p>投诉范围：</p>投诉受理范围（包括不限于以下情形）：
      <br>1.组织管理、运营管理、人员管理等存在公平性、遵循性、合规性问题；
      <br>2.行贿、受贿、索贿等违法行为；
      <br>3.职务侵占、盗窃、挪用资金、侵占公司资产及徇私舞弊等违法违纪行为；
      <br>4.利用职务之便为本人、他人谋取不正当利益；
      <br>5.收受回扣、手续费或其他好处归个人或团队所有；
      <br>6.接受事业伙伴及业务关联单位任何形式的礼品、馈赠、旅游、宴请等不正当利益；
      <br>7.其他涉及贪腐、弄虚作假、违反公司制度的舞弊行为。
      <br>
      <p>投诉要求：</p>1.投诉应实事求是，不得恶意投诉和诬告陷害；
      <br>2.投诉人须如实提供被投诉人姓名、部门、违规事实，并提供相关证据资料；
      <br>3.鼓励实名投诉，不愿实名的，如有切实证据仍予受理；
      <br>4.对于恶意虚假投诉，保留追究投诉人责任的权利。
      <br>
      <p>对投诉人的保护：</p>1.变革管理与组织发展中心（经营稽查）独立开展调查工作，以保证过程和结果客观公正；
      <br>2.对投诉人的个人信息及投诉人提供的资料均严格保密，对恶意打击报复投诉人员的行为，将追究相关人员责任。
      
    </div>
    <div class="mui-card checkPosition" style="margin:0;width:100%;background-color:#ccc;height:40px;line-height:40px;padding-left:10px">
         
            <input name="checkbox" style="width:18px;height:18px;vertical-align: middle" value="Item 0" type="checkbox"  @click="checkboxClick" >
            <label style="font-size:16px;">我已阅读理解以上内容</label>
          
      </div>
    <nav class="mui-bar mui-bar-tab">
      <router-link class="mui-tab-item " :to=online >
        <span class="mui-tab-label" @click="jumpcomplaintsEdit">在线投诉</span>
      </router-link>
      <router-link class="mui-tab-item" :to=email >
        <span class="mui-tab-label" @click="jumpComplaintsEmail">电邮投诉</span>
      </router-link>
    </nav>
  </div>
</template>
<script>
export default {
  data() {
    return {
      checkFlag: 0,
      online:'',
      email:''
    };
  },
  methods: {
    checkboxClick() {
      if (this.checkFlag == 0) {
        this.checkFlag = 1;
      }else{
        this.checkFlag = 0;
      }
    },
    jumpcomplaintsEdit() {
      if (this.checkFlag == 1) {
      this.online = '/complaintsEdit'
         
      }
    },
    jumpComplaintsEmail() {
      // console.log(this.checkFlag);
      if (this.checkFlag == 1) {
        this.email = '/complaintsEmail'
      }
      
    }
  }
};
</script>
<style lang="stylus" scoped>
.textBox {
  width: 100%;
  height: 100%;
  overflow: auto;
  position: relative;
}


.text {
  padding 10px
  font-size: 12px;
  width: 100%;

  h2 {
    text-align: center;
    font-weight: 700;
  }

  p {
    margin: 0
    font-size: 14px;
    color: #333;
    font-weight: 700;
  }
}

.mui-checkbox.mui-left label, .mui-radio.mui-left label {
  background-color: #ccc;
}
</style>