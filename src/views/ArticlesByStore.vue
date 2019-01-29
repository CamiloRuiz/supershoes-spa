<template>
  <v-container grid-list-md text-xs-center>
    <h1 align="left" class="ml-2">Store: {{ storeName }}</h1>
    <ArticlesTable :store="this.store"/>
  </v-container>
</template>

<script>
import ArticlesTable from '@/components/articles/ArticlesTable';
import storesService from '@/modules/stores/stores.service';

export default {
  name: 'articlesByStore',
  components: {
    ArticlesTable
  },
  props: {
    store: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      storeName: ''
    }
  },
  created() {
    this.getStore();
  },
  methods: {
    getStore() {
      storesService.getStore(this.store)
        .then((resolve) => {
          this.storeName = resolve.data.store.name;
        });
    }
  }
}
</script>
