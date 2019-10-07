<template>
  <div class="customers container">
    <Alert v-if="alert" v-bind:message="alert"></Alert>
    <!-- 用户管理系统的所有用户信息展示表 -->
      <h4 class="page-header header">用户管理系统</h4>
      <input type="text" class="form-control search" placeholder="根据姓名或职业搜索" v-model="filterInput">
      <br>
      <table class="table table-striped" cellpadding="1" cellspacing="1" border="1" bordercolor="#ccc">
      <thead>
        <tr>
          <th>序号</th>
          <th>姓名</th>
          <th>年龄</th>
          <th>电话</th>
          <th>邮箱</th>
         <!-- <th>学历</th>
          <th>毕业学校</th> -->
          <th>职业</th>
         <th>个人简介</th>
          <th>操作</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="customer in filterBy(customers,filterInput)">
          <td>{{customer.id}}</td>
           <td v-text="customer.name"></td>
           <!-- 也可以获得值 -->
         <!-- <td>{{customer.name}}</td> -->
         <!-- 也可以获得值 -->
          <td>{{customer.age}}</td>
          <td>{{customer.phone}}</td>
          <td>{{customer.email}}</td>
         <!-- <td>{{customer.education}}</td>
          <td>{{customer.graduationSchool}}</td> -->
          <td>{{customer.profession}}</td>
          <td>{{customer.profile}}</td>
          <td>
            <router-link class="btn btn-default" v-bind:to="'/customer/'+customer.id">详情</router-link>
            <router-link class="btn btn-default" v-bind:to="'/edit/'+customer.id">修改</router-link>
            <button class="btn btn-default" v-on:click="deleteCustomer(customer.id)">删除</button>
          </td>
        </tr>
      </tbody>
     </table>
     <nav aria-label="Page navigation" class="right" style="float: right;">
       <ul class="pagination">
         <li>
           <a href="#" aria-label="Previous">
             <span aria-hidden="true">&laquo;</span>
           </a>
         </li>
         <li><a href="#">1</a></li>
         <li><a href="#">2</a></li>
         <li><a href="#">3</a></li>
         <li><a href="#">4</a></li>
         <li><a href="#">5</a></li>
         <li>
           <a href="#" aria-label="Next">
             <span aria-hidden="true">&raquo;</span>
           </a>
         </li>
       </ul>
     </nav>
  </div>
</template>

<script>
import Alert from './Alert'
export default {
  name:'customers',
  data () {
    return {
      customers:[],
      alert:"",
      filterInput:'',


      }
    },
  methods:{
    fetchCustomers(){
      this.$http.get("http://localhost:3000/users").then(function(response){
            // console.log(response)
             this.customers=response.body;   //给上面data里的customers赋值
           })
      },
      filterBy(customers,value){  //value就是输入框输入的内容
        return customers.filter(function(customer){  //filter()是ES6里进行检索的一个方法
          // return customer.name.match(value);   //只根据姓名搜索
          return customer.name.match(value)||customer.profession.match(value);   //希望根据多个条件搜索时，用 || “或”来表达返回值；match()是字符串搜索的方法
        })
      },
      deleteCustomer(id){
        this.$http.delete("http://localhost:3000/users/"+id).then(function(){
          this.$router.push({path:"/",query:{alert:"用户删除成功！"}});  //回到主页
        })
      }
    },
  created() {
    if(this.$route.query.alert){
       this.alert=this.$route.query.alert;
    }else{
       // this.alert="用户信息添加失败！"
    }
    this.fetchCustomers();
  },
  updated() {
    this.fetchCustomers();
  },
  components:{
    Alert
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header{
    color: steelblue;
}
th,td{
  text-align: center;
}
.search{
 width: 200px;
}
</style>
