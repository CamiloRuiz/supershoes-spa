<template>
  <v-container grid-list-md text-xs-center>
    <ArticlesTable />
  </v-container>
</template>

<script>
import ArticlesTable from '@/components/articles/ArticlesTable';

export default {
  name: 'articles',
  components: {
    ArticlesTable
  }
}
</script>
