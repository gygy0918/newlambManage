<template>
	<div>
		<span>{{ itemData.name }}：</span>
		<a class="single-btn"
		    :class="{ 'active': index === clickedIndex }"
		    v-for="(item, index) in itemData.options"
		    href="javascript:;"
		    @click="handleClick(index, item.value)">{{ item.key }}</a>
	</div>
</template>
<script>
	export default {
		name: 'filter',
		props: {
			itemData: {
				type: Object,
				required: true,
			},
			onItemClick: {
				type: Function,
				required: true,
			}
		},
		data() {
			return {
				clickedIndex: 0,
			}
		},
		methods: {
			handleClick(index, val) {
				this.clickedIndex = index;
				if(this.onItemClick) {
					this.onItemClick(val);
				}
			}
		}
	}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
	div {
		&:not(:last-child) {
			margin-bottom: 10px;
		}
		span{
			font-size: 14px;
			color: #48576a;
			font-weight: bold;
		}
		.single-btn {
			font-size: 14px;
			padding: 3px 8px;
			border-radius: 2px;
			margin-right: 10px;
			color: #1D8CE0;
			&.active {
				background: #20A0FF;
				color: #ffffff;
			}
		}
	}
</style>