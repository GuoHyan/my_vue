<template>
  <div class="details container">
     <router-link to="/" class="btn btn-default">返回</router-link>

      <!-- 用户信息详情 -->
       <h4 class="page-header header">用户: {{customer.name}}
            <span class="pull-right">
              <router-link class="btn btn-primary btnDel" v-bind:to="'/edit/'+customer.id">编辑</router-link>
              <button class="btn btn-danger btnDel" v-on:click="deleteCustomer(customer.id)">删除</button>
            </span>
       </h4>
       <ul class="list-group">
         <li class="list-group-item"><span class="glyphicon glyphicon-user"><span class="spa">年龄:&nbsp;{{customer.age}}</span></span></li>
         <li class="list-group-item"><span class="glyphicon glyphicon-phone-alt"><span class="spa">电话:&nbsp;{{customer.phone}}</span></span></li>
         <li class="list-group-item"><span class="glyphicon glyphicon-envelope"><span class="spa">邮箱:&nbsp;{{customer.email}}</span></span></li>
       </ul>
       <ul class="list-group">
         <li class="list-group-item"><span class="glyphicon glyphicon-education"><span class="spa">学历:&nbsp;{{customer.education}}</span></span></li>
         <li class="list-group-item"><span class="glyphicon glyphicon-credit-card"><span class="spa">毕业学校:&nbsp;{{customer.graduationSchool}}</span></span></li>
         <li class="list-group-item"><span class="glyphicon glyphicon-folder-close"><span class="spa">职业:&nbsp;{{customer.profession}}</span></span></li>
         <li class="list-group-item"><span class="glyphicon glyphicon-thumbs-up"><span class="spa">个人简介:&nbsp;{{customer.profile}}</span></span></li>

       </ul>
  </div>
</template>

<script>
export default {
  name:'customerdetails',
  data () {
    return {
      customer:""
    }
  },

  methods:{
  fetchCustomers(id){
      this.$http.get("http://localhost:3000/users/"+id).then(function(response){
        console.log(response);
               this.customer=response.body;
           })
      },
      deleteCustomer(id){
        this.$http.delete("http://localhost:3000/users/"+id).then(function(){
          this.$router.push({path:"/",query:{alert:"用户删除成功！"}});  //回到主页
        })
      }
  },

  created(){
    this.fetchCustomers(this.$route.params.id); //获得点击详情获得的id,然后将id传给fetchCustomers(id)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header{
    color: steelblue;
}
.spa{
  padding-left:4px;
}
.btnDel{
   position: relative;
   margin-top: -20px;
}
</style>
