<template>
  <div class="create">
    <h2>创建文章</h2>
    <h3>文章标题</h3>
    <p>
      <el-input v-model="title" ></el-input>
    </p>
    <p class="msg">限 15 个字</p>
    <h3>内容简介</h3>
    <p>
      <el-input type="textarea" v-model="description" :autosize="{ minRows: 2, maxRows: 6}"></el-input>
    </p>
    <p class="msg">限 30 个字</p>
    <h3>文章内容</h3>
    <p>
      <el-input type="textarea" v-model="content" :autosize="{ minRows: 6, maxRows: 30}"></el-input>
    </p>
    <p class="msg">限 500 个字</p>
    <p>
      <label>是否展示到首页</label>
      <el-switch v-model="atIndex" active-color="#13ce66" inactive-color="#666"></el-switch>
    </p>
    <el-button @click="onCreate">立即创建</el-button>
  </div>
</template>

<script src="./template.js"></script>

<style scoped lang="less" src="./template.less"></style>
