<template>
  <div>
    <div class="bg" v-if="beginInput" v-on:click="onClickBg">
      <div class="container">
        <table v-if="start">
          <tr v-for="unit in validunits" v-on:click="onClick(unit)">
            <td>
              <searchcell v-bind:key="unit.id" v-bind:value="unit.name"></searchcell>
            </td>
          </tr>
        </table>
        <div v-if="start && validunits.length == 0 ">
          <div class="noresultimg">
            <img src="../assets/搜索无结果-icon.png"/>
          </div>
          <div class="noresulttext">搜索暂无结果，请重试</div>
        </div>
        <div v-if="!start" class="facilitys">
          <facilitybtn class="facility" v-for="facility in facilitys" v-bind:facility="facility" v-bind:key="facility.type" v-on:click="onClickFacility(facility)"></facilitybtn>
        </div>
      </div>
    </div>
    <div class="inputComponent">
      <div class="search"/>
      <input v-model="value" v-on:focus="onFocus" type="search" class="searhinput" placeholder="输入商铺名称、车位号、服务设施">
      <div v-if="start" class="cancel" type="submit"/>
      <div v-if="!start" class="submit" type="submit">搜索</div>
    </div>
  </div>
</template>

<script>

  import searchcell from './searchcell.vue'
  import facilitybtn from './facilitybtn.vue'

  function findSearchResult(name, units, count) {

    let temps = []

    for (let i = 0; i < units.length; ++i) {

      if (units[i].name.indexOf(name) >= 0) {

        temps.push(units[i])
      }
    }

    if (temps.length > count) {

      return temps.slice(0, 15)
    }

    return temps
  }

  export default {
    name: 'searchunit',
    components: { searchcell, facilitybtn },
    props:['facilitys', 'allunits'],
    data () {
      return {
        msgs: [],
        start:false,
        value:'',
        beginInput:false,
        validunits:[]
      }
    },
    methods: {

      endInput:function() {

        this.beginInput = false

        this.value = ''
      },
      onFocus:function() {

        this.beginInput = true
      },
      onClick:function(unit) {

        this.endInput()

        console.log(JSON.stringify(unit))

        this.$emit('navigatetounit', unit)
      },
      onClickBg:function() {

        this.endInput()
      },
      onClickFacility:function(facility) {

        this.endInput()

        this.$emit('navigatetofacility', facility)
      }
    },
    watch: {
      value: function(val) {

        this.start = val.length > 0

        this.validunits = findSearchResult(this.value, this.allunits, 15)
      },
      beginInput:function(val) {

        if (val == false) {


        }
      }
    }
  }
</script>

<style scoped>

  .main {
    position: relative;
  }

  .bg {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: 0;
    z-index: 1001;
    background-color: #eeeef2; }

  .inputComponent {

    position: relative;
    top: 10px;
    left: 0;right: 0;
    background:url("../assets/搜索框.png") no-repeat center center /100% 60px;
    height: 60px;
    width: 90%;
    margin: auto;
    z-index: 1002;
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
    outline:none;
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

    margin-top: 100px;
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

    display: flex;
    display: -webkit-flex;
    width: 100%;
  }

</style>
