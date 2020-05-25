<template>
  <div>
    <!-- <form class="mui-input-group">
      <div class="mui-input-row">
        <label style="height:20px;line-height :20px">投诉主题</label>
        <cube-input v-model="edittitle" placeholder="必填"></cube-input>
      </div>

      <div class="mui-input-row">
        <label style="height:20px;line-height :20px">被投诉人姓名</label>
        <cube-input v-model="editname" placeholder="必填" style="font-size: 12px;"></cube-input>
      </div>

      <div class="mui-input-row">
        <label style="height:20px;line-height :20px">被投诉人部门</label>
        <cube-input v-model="editdepart" placeholder="必填"></cube-input>
      </div>
    </form>-->
   
    <cube-form
      :model="model"
      :schema="schema"
      :immediate-validate="false"
      @validate="validateHandler"
      :options="options"
    ></cube-form>
    <cube-textarea
      v-model="remark"
      :placeholder="placeholder"
      :maxlength="maxlength"
      style="height:150px;"
    ></cube-textarea>
    
    <cube-upload v-model="files" :action="action" @file-success="test" :max="4"
>      <div style="margin-top:5px">
          <p>             
              上传附件、文档、图片等
          </p>
      </div>
      <div class="clear-fix">
        <cube-upload-btn :multiple="false">
          <div>
            <span style="display:block;width:100px;height:100px;background-color:#fff;text-align:center;line-height:100px;border:1px solid #ccc">
              <i>＋</i>
            </span>
          </div>
        </cube-upload-btn>
      </div>
      <cube-upload-file v-for="(file, i) in files" :file="file" :key="i"></cube-upload-file>
    </cube-upload>
    <nav class="mui-bar mui-bar-tab">
      <a class="mui-tab-item" href="#tabbar">
        <span class="mui-tab-label" @click="realNameSubmint">实名提交</span>
      </a>
      <a class="mui-tab-item" href="#tabbar-with-chat">
        <span class="mui-tab-label" @click="anonymouSubmit">匿名提交</span>
      </a>
    </nav>
    <!-- <button id='confirmBtn' type="button" class="mui-btn mui-btn-blue mui-btn-outlined">确认消息框</button> -->
     <button style="background-color:#ccc;margin-left:5px;margin-top:5px" @click="getUserId">调取通讯录测试按钮</button>
  </div>
</template>
<script>
import { mapState } from "vuex";
import moment from "moment";
import { submitEdit } from "./editsever";
// import compress from '../../../node_modules/'
// import compress from '../../../node_modules/compress/index'
export default {
   props: {
    title: {
      type: String,
      default: ''
    },
    content: {
      type: String,
      default: ''
    },
    image: {
      type: String,
      default: ''
    },
  },
  computed: {
    ...mapState({
      userId: state => state.userId,
      complaintName: state => state.userName
    }),
  },
  
  data() {
    return {
      validity: {},
      valid: undefined,
      model: {
        checkboxValue: false,
        checkboxGroupValue: [],
        edittitle: "",
        editname: "",
        editdepart: "",
        radioValue: "",
        rateValue: 0,
        selectValue: 2018,
        switchValue: true,
        textareaValue: "",
        uploadValue: [],
        complaintName: "",

      },
      schema: {
        groups: [
          {
            fields: [
              {
                type: "input",
                modelKey: "edittitle",
                label: "投诉主题",
                props: {
                  placeholder: "必填"
                },
                rules: {
                  required: true,
                  notWhitespace: true
                },
                // validating when blur
                trigger: "blur"
              },
              {
                type: "input",
                modelKey: "editname",
                label: "被投诉人姓名",
                props: {
                  placeholder: "选填"
                },
                // rules: {
                //   required: true,
                //   notWhitespace: true
                // },
                // validating when blur
                trigger: "blur"
              },
              {
                type: "input",
                modelKey: "editdepart",
                label: "被投诉人部门",
                props: {
                  placeholder: "选填"
                },
                // rules: {
                //   // required: true,
                //   notWhitespace: true
                // },
                // validating when blur
                trigger: "blur",
                
              }
            ]
          }
        ]
      },
      options: {
        scrollToInvalidField: true,
        layout: "standard" // classic fresh
      },

      action: {
        target: "/kukacms/visitor/picUpload.htm?type=8",
        fileName: "files"
      },
      files: [],
      edittitle: "",
      editname: "",
      remark: "",
      type: "",
      editdepart: "",
      placeholder: "请您如实详细的填写投诉内容（时间、地点、人物、事情经过等）",
      maxlength: 500,
      filePath: "",
      // resultValid: ""
    };
  },
  methods: {
    validateHandler(result) {
      this.validity = result.validity;
      this.valid = result.valid;
      // console.log(  result.valid)
      this.resultValid = result.valid;
    },
    realNameSubmint() {
      this.$createDialog({
        type: "confirm",
        icon: "cubeic-alert",
        content: "是否提交实名投诉？",
        onConfirm: () => {
          if (!this.resultValid) {
            this.$createDialog({
              type: "alert",
              icon: "cubeic-alert",
              showClose: true,
              title: "必填项,投诉内容不能为空",
              onClose: () => {
                this.$createToast({
                  type: "warn",
                  time: 1000,
                  txt: "点击关闭按钮"
                }).show();
              }
            }).show();
            return;
          }
          this.type = 1;

          let creatTime = moment().format();
          const realSubmit = {};
          (realSubmit.title = this.model.edittitle),
            (realSubmit.name = this.model.editname),
            (realSubmit.depart = this.model.editdepart),
            (realSubmit.remark = this.remark),
            (realSubmit.filePath = this.filePath),
            (realSubmit.userId = this.userId),
            (realSubmit.complaintName = this.complaintName),
            (realSubmit.type = this.type),
            (realSubmit.creatTime = creatTime),
            submitEdit(realSubmit).then(res => {
              // console.log(res);
              this.model.edittitle = "";
              this.model.editname = "";
              this.model.editdepart = "";
              this.remark = "";
              this.filePath = "";
              this.files = [];
            });

          this.$createToast({
            type: "warn",
            time: 3000,
            txt: "成功提交"
          }).show();
          // this.$router.push('/')
        },
        onCancel: () => {
          this.$createToast({
            type: "warn",
            time: 1000,
            txt: "取消提交"
          }).show();
        }
      }).show();
    },
    anonymouSubmit() {
      // console.log(this.model.title);

      this.$createDialog({
        type: "confirm",
        icon: "cubeic-alert",
        content: "是否提交匿名投诉？",
        onConfirm: () => {
          if (!this.resultValid) {
            this.$createDialog({
              type: "alert",
              icon: "cubeic-alert",
              showClose: true,
              title: "必填项,投诉内容不能为空",
              onClose: () => {
                this.$createToast({
                  type: "warn",
                  time: 1000,
                  txt: "点击关闭按钮"
                }).show();
              }
            }).show();
            return;
          }
          this.type = 2;
          // this.type = 1;
          
          
          let creatTime = moment().format();
          const annoySubmit = {};
          (annoySubmit.title = this.model.edittitle),
            (annoySubmit.name = this.model.editname),
            (annoySubmit.depart = this.model.editdepart),
            (annoySubmit.remark = this.remark),
            (annoySubmit.filePath = this.filePath),
            (annoySubmit.userId = this.userId),
            (annoySubmit.type = this.type),
            (annoySubmit.creatTime = creatTime),
            submitEdit(annoySubmit).then(res => {
              // console.log(res);
              this.model.edittitle = "";
              this.model.editname = "";
              this.model.editdepart = "";
              this.remark = "";
              this.filePath = "";
              this.files = [];
            });
          this.$createToast({
            type: "warn",
            time: 3000,
            txt: "成功提交"
          }).show();
          //  this.$router.push('/')
        },
        onCancel: () => {
          this.$createToast({
            type: "warn",
            time: 1000,
            txt: "取消提交"
          }).show();
        }
      }).show();
    },
    test(res) {
      // console.log(res.response.data[1])
      // console.log(res.response.data[1]);
      this.filePath = res.response.data[1];
    },
 
  //获取投诉人信息
    getUserId(){
      let that = this
      let myurl = window.location.href
      dd.ready(() => {
        dd.biz.util.share({
            type: 0,//分享类型，0:全部组件 默认； 1:只能分享到钉钉；2:不能分享，只有刷新按钮
            url: myurl,
            title: that.title,
            content: that.content,
            image: that.image,
            onSuccess : function() {
                //onSuccess将在调起分享组件成功之后回调
                /**/
            },
            onFail : function(err) {}
        })
      })
    
    }
  }
};
</script>
<style lang="stylus" scoped>
.clear-fix{
  width:300px
  height: 100px
}
.cube-input-field{
  height:200px
}

.cube-upload
  .cube-upload-file, .cube-upload-btn
    margin: 0
    height: 100px
  .cube-upload-file
    margin-top: 10px
    width 100px
    height 100px
    float left
    + .cube-upload-btn
      margin-top: -200px
      opacity: 0
  .cube-upload-file-def
    width: 100%
    height: 100%
    .cubeic-wrong
      display: none
  .cube-upload-btn
    display: flex
    align-items: center
    justify-content: center
    > div
      text-align: left
      margin-right 190px
    i
      display: inline-flex
      align-items: center
      justify-content: center
      width: 50px
      height: 50px
      margin-bottom: 20px
      font-size: 32px
      line-height: 1
      font-style: normal
      color: #fff
      background-color: #333
      border-radius: 50%

      
      
      

</style>