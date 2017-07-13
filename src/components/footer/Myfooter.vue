<template>
  <div class="myfooter">
    <div class="container">
      <div class="footer-main">
        <p class="admin">庄特顺毕业设计用</p>
        <a href="javascript:;" class="link">反馈意见</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
  .myfooter{
    widows: 100%;
    height: 120px;
    background-color: #324057;
    color: #a4aebd;
    margin-top: -120px;
    .container{
      height: 100%;
      box-sizing: border-box;
      width: 1140px;
      padding: 0 30px;
      margin: 0 auto;
      .footer-main{
        font-size: 0;
        padding-top: 40px;
        display: inline-block;
        .admin{
          line-height: 1;
          font-size: 22px;
          margin: 0;
        }
        .link{
          display: inline-block;
          margin: 12px 18px 0 0;
          line-height: 1;
          font-size: 12px;
          color: #768193;
        }
      }
    }
  }
</style>
