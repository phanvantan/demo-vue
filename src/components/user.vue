<template lang="html">
  <tr>
    <td><span v-text="user.name"></span></td>
    <td><span v-text="user.email"></span></td>
    <td>
      <label>
        <input type="checkbox" :checked="user.actived" @change="toggleActived"/>
        <span v-text="user.actived"></span>
      </label>
    </td>
    <td><i class="material-icons" @click="deleteUser">delete</i></td>
  </tr>
</template>
<script>
  export default {
    props: {
      user: Object
    },
    methods: {
      toggleActived (e) {
        const payload = {
          user: this.user,
          value: e.target.checked
        }
        this.$emit('toggleActived', payload)
      },
      deleteUser (){
        this.$emit('deleteUser', this.user)
      }
    }
  }
</script>
