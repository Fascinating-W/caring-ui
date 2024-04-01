<!--
 * @Author: Wanko
 * @Date: 2024-03-01 17:31:28
 * @LastEditors: Wanko
 * @LastEditTime: 2024-03-29 17:07:40
 * @Description: 
-->
<template>
  <div class="p bg-f8">
    <c-section>基本使用</c-section>
    <div class="my">
      <div>
        <c-cell
        title="基本使用"
        value="右侧内容"
        hoverClass="none"
      />
      <c-line/>
      <c-cell
        title="基本使用"
        value="右侧内容"
        hoverClass="none"
      />
      </div>
      
    </div>
    <c-section>单独使用, 左右布局</c-section>
    <div class="my">
      <c-cell
        title="基本使用"
        :borderBottom="false"
        value="右侧内容"
        arrow
        :customStyle="{
          borderRadius: '12px',
          padding: '15px'
        }"
      />
    </div>
    <c-section>单独使用, 左侧布局</c-section>
    <div class="p bg-white">
      <c-cell
        title="基本使用"
        :titleStyle="{ color: '#999', width: '70px' }"
        :borderBottom="false"
        value="右侧内容"
        :valueStyle="{
          fontSize: '14px',
          color: '#333',
          marginLeft: '10px'
        }"
        align="left"
        :customStyle="{
          padding: '0px'
        }"
      />
      <c-cell
        title="基本使用1"
        :titleStyle="{ color: '#999', width: '70px' }"
        :borderBottom="false"
        value="右侧内容1"
        :valueStyle="{
          fontSize: '14px',
          color: '#333',
          marginLeft: '10px'
        }"
        align="left"
        :customStyle="{
          padding: '0px'
        }"
      />
      <c-cell
        title="基本"
        :titleStyle="{
          color: '#999',
          width: '70px',
          textAlign: 'justify',
          textAlignLast: 'justify'
        }"
        :borderBottom="false"
        value="右侧内容1"
        :valueStyle="{
          fontSize: '14px',
          color: '#333',
          marginLeft: '10px'
        }"
        align="left"
        :customStyle="{
          padding: '0px'
        }"
      />
    </div>

    <c-section>基本使用</c-section>
    <c-cell-group title="标题">
      <c-cell title="基本使用" />
      <c-cell title="基本使用">11111</c-cell>
      <c-cell title="基本使用" type="switch"></c-cell>
      <c-cell title="基本使用" value="右侧内容" label="描述信息" />
      <c-cell title="基本使用" value="右侧内容" icon="level" />
      <c-cell title="基本使用" value="右侧内容">
        <c-icon slot="icon" name="level" size="17" class="mr-5" />
        <c-icon slot="icon" name="level" size="17" class="mr-5" />
      </c-cell>
      <c-cell title="基本使用" value="右侧带箭头" arrow />
      <c-cell title="基本使用" value="箭头朝下" arrow arrowDirection="down" />
      <c-cell
        title="基本使用"
        value="带副标题"
        label="副标题"
        arrow
        arrowDirection="down"
      />
    </c-cell-group>
    <c-gap />
    <u-cell-group title="标题">
      <u-cell-item title="基本使用" icon="level" />
      <u-cell-item title="基本使用" />
      <u-cell-item title="基本使用" value="右侧内容" />
      <u-cell-item title="夕阳无限好" arrow-direction="down">
        <u-icon slot="icon" size="32" name="search"></u-icon>
        <!-- <u-badge count="99" :absolute="false" slot="right-icon"></u-badge> -->
        <!-- <u-switch slot="right-icon" v-model="checked"></u-switch> -->
      </u-cell-item>
    </u-cell-group>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped></style>
