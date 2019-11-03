import blog from '@/api/blog.js'

export default {
  data() {
    return {
      blogs: [],
      page: 1,
      total: 0
    }
  },

  created() {
    this.page = parseInt(this.$route.query.page) || 1
    blog.getIndexBlogs({ page: this.page }).then(res => {
      this.blogs = res.data
      this.page = res.page
      this.total = res.total
    })
  },

  methods: {
    onPageChange(newPage) {
      blog.getIndexBlogs({ page: newPage }).then(res => {
        this.blogs = res.data
        this.page = res.page
        this.total = res.total
        this.$router.push({ path: '/', query: { page: newPage } })
      })
    }
  }
}