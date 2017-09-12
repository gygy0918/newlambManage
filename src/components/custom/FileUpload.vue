<template>
	<div class="upload-container">
		<el-button class="upload-btn" :size="btnSize" :type="btnType">
            <slot></slot>
            <input class="upload-input" v-on:change="fileChange" type="file" :value="fileData" />
          </el-button>
	</div>
</template>
<script>
	//OSS在index.html里面全局引用了
	import cryptojs from 'crypto-js';
	import serverPath from '../../utils/serverPath';
	import getEncodedFileName from '../../utils/uploadImg';

	export default {
		name: 'fileUpload',
		props: {
			uploadSuccess: {
				type: Function,
				required: true,
			},
			btnType: {
				type: String,
				default: 'info',
			},
			btnSize: {
				type: String,
				default: 'small',
			}
		},
		data() {
			return {
				fileData: null,
			}
		},
		computed: {
		},
		methods: {
			fileChange(item) {
				let file = item.target.files[0];
				//if(file.type === 'image/jpeg' || file.type === 'image/png') {
					let that = this;
			          let url = serverPath + 'communityApi/getOssParam.htm'
			          let imgFormData = {
			            token: '1342440939',
			            resourceType: 2
			          }
			          this.$ajax({
			            method: 'get',
			            url: url,
			            params: imgFormData
			          }).then((res) => {
			            console.log(res);
			            let imgOSSParams = res.data.data.video
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
			              let fileUrl = res.res.requestUrls[0].split('?')[0];
			              that.uploadSuccess(fileUrl);
			            });
			          });

				// } else {
				// 	console.log('只支持jpg或者png类型图片');
				// }
			},
		},
		mounted() {
		}
	}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
	.upload-container {
		display: inline-block;
		.upload-btn {
	          position: relative;
	          .upload-input {
	            position: absolute;
	            top: 0;
	            left: 0;
	            width: 100%;
	            height: 100%;
	            z-index: 2;
	            opacity: 0;
	          }
	        }
	}
	

</style>