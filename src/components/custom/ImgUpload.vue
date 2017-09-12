<template>
	<div class="upload-container">
	  <span v-if="imgShow" v-for="(item, index) in imgs" class="uploaded-image-util">
            <em class="ico-delete2 image-delete-img" @click="clearImgs"></em>
            <img v-bind:src="item" alt=""/>
            {{ item }}
          </span>
		+ 添加图片
          <input v-on:change="imgChange" type="file" :value="imgData" />
	</div>
</template>
<script>
	//OSS在index.html里面全局引用了
	import cryptojs from 'crypto-js';
	import serverPath from '../../utils/serverPath';
	import getEncodedFileName from '../../utils/uploadImg';

	export default {
		name: 'imgUpload',
		props: {
			uploadSuccess: {
				type: Function,
				required: true,
			},
		},
		data() {
			return {
				imgData: null,
				imgs: [],
				imgShow: false,
			}
		},
		computed: {
		},
		methods: {
			imgChange(item) {
				this.imgs = [];
				let file = item.target.files[0];
				// if(file.type === 'image/jpeg' || file.type === 'image/png') {
				if( true ) {
					let that = this;
			          let url = serverPath + 'communityApi/getOssParam.htm'
			          let imgFormData = {
			            token: '1342440939',
			            resourceType: 1
			          }
			          this.$ajax({
			            method: 'get',
			            url: url,
			            params: imgFormData
			          }).then((res) => {
			            console.log(res);
			            let imgOSSParams = res.data.data.img
			            let imgClient = new OSS.Wrapper({
			              region: imgOSSParams.webUrl,
			              accessKeyId: imgOSSParams.accessKeyId,
			              accessKeySecret: imgOSSParams.accessKeySecret,
			              bucket: imgOSSParams.inputBucketName
			              // bucket: 'bdmt'
			            })
			            let key = getEncodedFileName(file.name)
			            imgClient.multipartUpload(key, file, {
			              // progress: progress
			            })
			            .then(function(res) {
			              let imgUrl = res.res.requestUrls[0].split('?')[0];
			              that.uploadSuccess(imgUrl);
			              that.handleUploadSuccess(imgUrl);
			            });
			          });

				} else {
					console.log('只支持jpg或者png类型图片');
				}
			},
			handleUploadSuccess(imgUrl) {
				this.imgs.push(imgUrl);
				this.imgShow = true
			},
			clearImgs() {
				this.imgs = [];
			},
		},
		mounted() {
		}
	}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
	.upload-container {
		border: 1px solid #fc592a;
		border-radius: 3px;
		width: 90px;
		height: 90px;
		float: left;
		line-height: 90px;
		text-align: center;
		position: relative;
		overflow: hidden;
		input {
			position: absolute;
			top: 0;
			left: 0;
			font-size: 90px;
			width: 100%;
			height: 90px;
			z-index: 2;
			opacity: 0;
			cursor: pointer;
		}
		span {
			img {
				width: 100%;
				height: 100%;
			}
			.ico-delete2 {
				position: absolute;
				top: 2px;
				right: 2px;
				width: 20px;
				height: 20px;
				z-index: 3;
				cursor: pointer;
				background: url(../../assets/ico-delete.png) 0 0 no-repeat;
				background-size: contain;
			}
		}
	}

</style>