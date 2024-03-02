<!--
 * @Author: Wanko
 * @Date: 2022-04-06 10:46:06
 * @LastEditors: Wanko
 * @LastEditTime: 2024-03-02 17:30:18
 * @Description: 
-->
<template>
  <div class="">
    <u-section title="section"></u-section>
    <u-section title="今日热门" subTitle="副标题"></u-section>
    <u-section title="今日热门" subTitle="副标题" :bold="false"></u-section>
    <u-section title="今日热门" subTitle="副标题" :font-size="48"></u-section>
    <u-section title="今日热门" subTitle="副标题" color="red"></u-section>
    <u-section title="今日热门" subTitle="副标题" sub-color="red"></u-section>
    <u-section title="今日热门" subTitle="副标题" :arrow="false"></u-section>
    <u-section title="今日热门" subTitle="副标题" :right="false"></u-section>
    <u-section title="今日热门" subTitle="副标题" :right="false" :showLine="false"></u-section>
    <c-gap/>
    <c-section title="section" />
    <c-section title="section" value="右侧"/>
    <c-section title="section" value="右侧" size="30"/>
    <c-section title="section" value="右侧" color="primary"/>
    <c-section title="section" value="右侧" lineColor="primary"/>
    <c-section title="section" value="右侧" arrow/>
    <c-section title="section" value="右侧" arrow :line="false"/>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped></style>
