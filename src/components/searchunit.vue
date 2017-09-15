<template>
  <div>
    <div class="inputComponent">
      <div class="search"/>
      <input v-model="value" type="search" class="searhinput" placeholder="输入商铺名车、车位号、服务设施">
      <div v-if="start" class="cancel" type="submit"/>
      <div v-if="!start" class="submit" type="submit">搜索</div>
    </div>
    <div class="container">
      <table v-if="start">
        <tr v-for="unit in validunits">
          <td>
            <searchcell v-bind:key="unit.id" v-bind:value="unit.name"></searchcell>
          </td>
        </tr>
      </table>
      <div v-if="start && results.length == 0 ">
        <div class="noresultimg">
          <img src="../assets/搜索无结果-icon.png"/>
        </div>
        <div class="noresulttext">搜索暂无结果，请重试</div>
      </div>
      <div v-if="!start" class="facilitys">
        <facilitybtn v-for="facility in facilitys" v-bind:facility="facility" v-bind:key="facility.type"></facilitybtn>
      </div>
    </div>
  </div>
</template>

<script>

  import searchcell from './searchcell.vue'
  import facilitybtn from './facilitybtn.vue'

  export default {
    name: 'searchunit',
    components: { searchcell, facilitybtn },
    props:['facilitys', 'allunits'],
    data () {
      return {
        msgs: [],
        start:false,
        value:'',
        results:[],
        validunits:[]
      }
    },
    watch: {
      value: function(val) {

        this.start = val.length > 0

        console.log(val)
      }
    }
  }
</script>

<style scoped>

  .inputComponent {

    position: relative;
    top: 10px;
    left: 0;right: 0;
    background:url("../assets/搜索框.png") no-repeat center center /100% 60px;
    height: 60px;
    width: 90%;
    margin: auto;
  }

  .search {

    display: inline-block;
    position: absolute;
    top:0;bottom: 0;
    margin: auto;
    left: 20px;
    background:url("../assets/搜索.png") no-repeat center center /20px 20px;
    width: 20px;
    height: 20px;

  }

  .searhinput {

    display: inline-block;

    width: 70%;
    position: absolute;
    top:0;bottom: 0;
    margin: auto;
    height: 40px;
    left: 40px;
    padding: 0 10px;
    user-select: text !important;
    -webkit-user-select:text !important;
    border: 0px solid white;
    vertical-align: middle;
    line-height: 40px;
  }

  .cancel {

    display: inline-block;
    position: absolute;
    top:0;bottom: 0;
    margin: auto;
    right: 1rem;
    background: red url("../assets/返回.png") no-repeat center center / 1rem 1rem;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    line-height: 40px;
    vertical-align: middle;
  }

  .submit {

    display: inline-block;
    position: absolute;
    top:0;bottom: 0;
    margin: auto;
    right: 1rem;
    background: red;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    line-height: 40px;
    vertical-align: middle;
    font-size:14px;
    text-align: center;
    color: white;
  }

  .container {

    margin-top: 20px;
    height: 50%;
    width: 100%;
    border: 0px;
    padding: 0;
    overflow-y: hidden;
    overflow-y: scroll;
    overflow-x: hidden;
  }

  table {

    border-collapse: collapse;
    width: 100%;
  }

  td {
    padding: 0;
  }

  .noresultimg {

    height: 180px;
    width: 100%;
    position: relative;
  }

  .noresultimg > img {

    width: 73px;
    height: 100px;
    position: absolute;
    bottom: 0;
    left:0;
    right:0;
    margin: auto;
  }

  .noresulttext {

    padding: 10px 0;
    text-align: center;
    color: #c2c6da;
  }

  .facilitys {

    /*display: flex;*/
  }

</style>
