<template>
  <div id="app">
    <div v-infinite-scroll="loadMore">
      <h2 v-for="(post, index) in posts.edges" :key="index">{{post.node.title}}</h2>
    </div>
  </div>
</template>

<script>
import PaginatedPostsQuery from "./graphql/paginatedPosts.gql";


export default {
  name: 'App',
  components: {
  },
  data() {
    return {
      after: null,
      first: 5,
      posts: {
        pageInfo: {},
        edges: []
      }
    };
  },
  apollo: {
    posts: {
      query: PaginatedPostsQuery,
      variables() {
        return {
          after: this.after,
          first: this.first
        };
      },
    }
  },
  methods: {
    loadMore() {

      this.$apollo.queries.posts.fetchMore({
        variables: {
          after: this.posts.pageInfo.endCursor,
          first: this.first
        },

        updateQuery: (previousResult, { fetchMoreResult }) => {
          
          return {
            posts: {
              __typename: previousResult.posts.__typename,
              pageInfo: fetchMoreResult.posts.pageInfo,
              edges:  [...previousResult.posts.edges, ...fetchMoreResult.posts.edges],
            }
          }
        } 
      })
    },

  }

}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
