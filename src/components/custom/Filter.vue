<template>
	<div class="filter-zone">
		<slot></slot>
	</div>
</template>
<script>
	export default {
		name: 'filter',
		data() {
			return {
			}
		},
		methods: {
		}
	}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
	.filter-zone {
		width: 100%;
		box-sizing: border-box;
		padding: 10px;
		margin: 10px 0;
		background: #eeeeee;
		border-radius: 4px;
	}
</style>