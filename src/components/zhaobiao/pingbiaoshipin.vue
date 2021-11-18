<template>
	<div class="container">
	   <div class="fileList" v-for="(item,index) in videoList" :key='index' >
	   
	   	<!-- <div >
	   		<video :src="item.vedioUrl" controls style="width: 200px;height: 200px;">
	   		</video>
	   	</div> -->
		<div >
			<video :src="item.vedioUrl" controls  width="200" height="200" style="margin-left: 20px;">
			</video>
		</div>
	   	
	   </div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				videoList:['http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4',
				'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4',
				'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4',
				],
			}
		},
		props:{
			detailId: {
				type: String,
				default: "0",	
			}
		},
		mounted() {
			let qry=this.query.new()
			this.query.toW(qry,'bidId',this.detailId,'EQ')
			this.query.toO(qry,'sort','asc')
			this.api.bidVideoList(this.query.toEncode(qry)).then(res=>{
				 this.videoList=res.data.list
			})
			
		}
	}
		
	
</script>

<style lang="less" scoped>
	.container{
		display: flex;
		flex-wrap: wrap;
		.fileList{
			display: flex;
		}
	}
	
</style>
