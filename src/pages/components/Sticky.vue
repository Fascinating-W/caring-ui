<template>
	<view class="container">
		<c-sticky h5-nav-height="0">
      <div class="h-100 bg-white flex-cc">
        <c-button primary>吸顶按钮</c-button>
      </div>
		</c-sticky>
    
	</view>
</template>

<style lang="scss" scoped>
page{
  background: #f8f8f8;
}
	.container {
		height: 200vh;
		margin-top: 250rpx;
	}
	
	.sticky {
		width: 750rpx;
		height: 120rpx;
		background-color: #2979ff;
		color: #fff;
		padding: 24rpx;
	}
</style>