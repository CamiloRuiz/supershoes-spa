<template>
  <v-container grid-list-md text-xs-center>
    <h1 align="left">Articles By Store</h1>
    <ArticlesTable :store="this.store"/>
  </v-container>
</template>

<script>
import ArticlesTable from '@/components/articles/ArticlesTable';

export default {
  name: 'articlesByStore',
  props: {
    store: {
      type: Number,
      default: 0
    }
  },
  components: {
    ArticlesTable
  }
}
</script>
