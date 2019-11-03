import { mapActions } from 'vuex'

export default {
  data() {
    return {
      username: '',
      password: ''
    }
  },

  methods: {
    ...mapActions([
      'login'
    ]),

    onLogin() {
      console.log(this.username + ':' + this.password)
      this.login({ username: this.username, password: this.password })
        .then(() => {
          console.log(this.$route.query.redirect)
          this.$router.push({ path: this.$route.query.redirect || '/' })
        })
    }
  }
}