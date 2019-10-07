<template>
  <div class="edit container">
      <h4 class="page-header header">修改用户信息</h4>
      <form v-on:submit="editCustomer" action="">
         <div class="welll">
           <h4>用户信息</h4>
           <div class="form-group">
             <label class="lab" for="">姓名<input type="text" class="form-control" placeholder="name" v-model="customer.name"></label>
             <label class="lab" for="">年龄 <input type="text" class="form-control" size="3" placeholder="age" v-model="customer.age"></label>
             <label class="lab" for="">电话 <input type="text" class="form-control" placeholder="phone" v-model="customer.phone"></label>
             <label class="lab" for="">邮箱<input type="text" class="form-control" placeholder="email" v-model="customer.email"></label>
           </div>

           <div class="form-group">
             <label class="lab" for="">学历<input type="text" class="form-control" placeholder="education" v-model="customer.education"></label>
             <label class="lab" for="">毕业学校<input type="text" class="form-control" size="34" placeholder="graduationSchool" v-model="customer.graduationSchool"></label>
             <label class="lab" for="">职业<input type="text" class="form-control" size="20" placeholder="profession" v-model="customer.profession"></label>
           </div>

          <!-- <div class="form-group">
             <label for="">职业</label>
             <input type="text" class="form-control" placeholder="profession" v-model="customer.profession">
           </div> -->

           <div class="form-group">
             <label for="">个人简介</label>
             <textarea name="" id="" cols="30" rows="10" class="form-control" placeholder="profile" v-model="customer.profile"></textarea>
           </div>

           <button type="submit" class="btn btn-primary submitBtn">确认</button>
           <router-link to="/"><button type="button" class="btn btn-primary submitBtn">返回</button></router-link>
         </div>

      </form>
  </div>
</template>

<script>
export default {
  name:'edit',
  data () {
    return {
        customer:{}
    }
  },
  methods:{
    fetchCustomer(id){ //点击编辑后需要获得该id原有的值
      this.$http.get("http://localhost:3000/users/"+id)
         .then(function(response){
           // console.log(response)
           this.customer=response.body;
      })
    },
    editCustomer(e){  //addCustomer同form表单里绑定的提交事件
      if(!this.customer.name||!this.customer.phone||!this.customer.email){ //判断姓名电话邮箱任意一个不能为空
          alert("请完善相应信息");
        }else{
          let updataCustomer={  //将submit的数据存放在newCustomer对象里进行传递，以下顺序名称都和本地db.json里一致
            name:this.customer.name,
            age:this.customer.age,
            phone:this.customer.phone,
            email:this.customer.email,
            education:this.customer.education,
            graduationSchool:this.customer.graduationSchool,
            profession:this.customer.profession,
            profile:this.customer.profile
          }

          //将newCustomer通过put方式以url进行传递，url为（服务端）请求的地址，将添加的所有数据添加到数据里
          this.$http.put("http://localhost:3000/users/"+this.$route.params.id,updataCustomer).then(function(response){ //更新的话只能用put方法,添加的话用post
                 // console.log(response)
                 this.$router.push({path:'/',query:{alert:"用户信息更新成功！"}})   //添加成功后跳转到主页，并添加成功后传入成功的提示，以键值对的方式
               })

               e.preventDefault();
        }
      e.preventDefault();     //阻止默认事件，点击，提交，a标签都会触发默认事件
    }
  },
  created() {
    this.fetchCustomer(this.$route.params.id); //获得点击详情获得的id,然后将id传给fetchCustomers(id)
  }
}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header{
      color: steelblue;
  }
.lab{
  margin-right: 30px;
}
.submitBtn{
  position: relative;
  left: 45%;
  text-align:center;
  margin: 36px 27px 27px 0;
}
</style>
