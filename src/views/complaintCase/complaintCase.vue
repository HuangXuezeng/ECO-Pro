<template>
    <div style="width:'100%;height:100%;overflow : auto;">
       <ul class="mui-table-view" style="overflow : auto;" >
				<li class="mui-table-view-cell mui-media" v-for="(item, id) in this.itemList" :key="id" >
					<a href="javascript:;" @click='getInfo(item.id)'>
						<img class="mui-media-object mui-pull-right" :src='item.covers'>
						<div class="mui-media-body" >
							<p class='mui-ellipsis' style="height:30px;line-height :30px">{{item.title}}</p>
						</div>
					</a>
				</li>
			</ul>
    </div>
</template>
<script>
import {getCase} from './caseService.js'
export default {
  data () {
    return {
			itemList:[]
    };
	},
	created() {
		getCase().then((res =>{
			// console.log(res);
			this.itemList = res.data.itemList
		}))
	},
	methods:{
		getInfo(id){
			 this.$router.push({
        name: 'caseInfo',
        query: {
          id: id
        }
      })
		}
	}
}
</script>
<style lang="stylus" scoped>

li{
	height 100px
	
}
.mui-table-view .mui-media-object{
		max-width 112px
		height 90px
		line-height 90px
	}

</style>