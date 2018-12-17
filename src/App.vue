<template>
  <div id="app">
    <navbar></navbar>
    <div>
      <h1>All User</h1>
      <form @submit.prevent="createUser" >
        <div class="form-group">
          <input
            v-model="new_user.name"
            type="text"
            placeholder="name"
            v-validate="'required|min:5|max:100|regex:^[^!@#$%^&*()+/]+$'"
            name="name"
            :class="{'is-invalid': submitted && errors.has('name')}"
          />
          <div
            v-if="submitted && errors.has('name')"
            class="invalid-feedback"
            v-text="errors.first('name')"
          />
        </div>
        <div class="form-group">
          <input
            v-model="new_user.email"
            placeholder="email"
            type="email"
            name="email"
            v-validate="'required|email'"
            :class="{'is-invalid': submitted && errors.has('email')}"
          />
        </div>
        <div
          v-if="submitted && errors.has('email')"
          class="invalid-feedback"
          v-text="errors.first('email')"
        />
        <input type="submit">
      </form>
      <table class="responsive-table">
        <thead>
           <tr>
             <th>Name</th>
             <th>Email</th>
             <th>Actived</th>
           </tr>
         </thead>
         <tbody>
           <user
             v-for="user in unactivedUser"
             :key="user.id" :user="user"
             @toggleActived="updateUser"
             @deleteUser="destroyUser"
           />
         </tbody>
         <tbody>
           <user
             v-for="user in activedUser"
             :key="user.id" :user="user"
             @toggleActived="updateUser"
             @deleteUser="destroyUser"
           />
         </tbody>
       </table>
     </div>
  </div>
</template>
<script>
  import axios from 'axios'
  import 'vue-material/dist/vue-material.min.css'
  import Navbar from './components/navbar.vue'
  import User from './components/user.vue'
  export default {
    data() {
      return {
        users: [],
        new_user: {
          name: '',
          email: '',
          avtived: false
        },
        submitted: false
      }
    },
    components: { Navbar, User },
    mounted() {
      this.fetchUsers()
    },
    computed: {
      unactivedUser() {
        return this.users.filter(user => !user.actived)
      },
      activedUser() {
        return this.users.filter(user => user.actived)
      }
    },
    methods: {
      fetchUsers() {
        axios.get('http://localhost:5000/api/users/').then(
          response => {
            this.users = response.data.users
          },
        error => alert(error))
      },
      updateUser({user, value}) {
        const data = {
          user: { actived: value }
        }
        axios.put(`http://localhost:5000/api/users/${user.id}`, data).then(
          response => {
            const index = this.users.indexOf(user)
            this.users.splice(index, 1, response.data.user)
          },
        error => alert(error))
      },
      createUser() {
        this.submitted = true
        this.$validator.validate().then(valid => {
          if (valid) {
            axios.post('http://localhost:5000/api/users', this.new_user),
            error => alert(error)
            this.users.push(this.new_user)
            this.submitted = true
          }
        })
      },
      destroyUser(user) {
        axios.delete(`http://localhost:5000/api/users/${user.id}`)
        const index = this.users.indexOf(user)
        this.users.splice(index, 1)
        error => alert(error)
      }
    }
  }
</script>
