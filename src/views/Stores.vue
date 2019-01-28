<template>
  <v-container grid-list-md text-xs-center>
    <StoresTable />
  </v-container>
</template>

<script>
import StoresTable from '@/components/stores/StoresTable';

export default {
  name: 'stores',
  components: {
    StoresTable
  }
}
</script>
