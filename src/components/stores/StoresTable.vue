<template>
  <v-flex xs12>
    <v-toolbar>
      <v-toolbar-title class="mr-2">Stores</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" max-width="500px">
        <v-btn slot="activator" color="primary" dark class="mb-2">New Store</v-btn>
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12>
                  <v-form
                    ref="storeForm"
                    v-model="valid"
                    lazy-validation
                  >
                    <v-text-field
                      v-model="editedStore.name"
                      label="Name"
                      :rules="[v => !!v || 'Name is required']"
                      required
                    ></v-text-field>
                    <v-text-field
                      v-model="editedStore.address"
                      label="Address"
                      :rules="[v => !!v || 'Address is required']"
                      required
                    ></v-text-field>
                  </v-form>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="close">Cancel</v-btn>
            <v-btn color="blue darken-1" flat @click="save">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>
    <v-data-table
      :headers="headers"
      :items="stores"
      :pagination.sync="pagination"
      :total-items="totalStores"
      :loading="loading"
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <td class="text-xs-left">{{ props.item.name }}</td>
        <td class="text-xs-left">{{ props.item.address }}</td>
        <td class="text-xs-center">
          <v-icon
            small
            class="mr-2"
            @click="getArticles(props.item)"
          >
            list
          </v-icon>
          <v-icon
            small
            class="mr-2"
            @click="editItem(props.item)"
          >
            edit
          </v-icon>
          <v-icon
            small
            @click="deleteItem(props.item)"
          >
            delete
          </v-icon>
        </td>
      </template>

      <template slot="no-data">
        <v-alert :value="no_data" color="error" icon="warning">
          Sorry, there is not stores yet :(
        </v-alert>
      </template>
    </v-data-table>
  </v-flex>
</template>

<script>
  import storesService from '@/modules/stores/stores.service';
  import { VDataTable } from 'vuetify/es5/components/VDataTable';

  export default {
    name: "StoresTable",
    data () {
      return {
        dialog: false,
        valid: true,
        totalStores: 0,
        stores: [],
        loading: true,
        no_data: false,
        pagination: {},
        headers: [
          { text: 'Name', align: 'left', value: 'name' },
          { text: 'Address', align: 'left', value: 'address' },
          { text: '', value: '' },
        ],
        editedIndex: -1,
        editedStore: {
          name: '',
          address: ''
        },
        defaultStore: {
          name: '',
          address: ''
        }
      }
    },
    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Store' : 'Edit Store'
      }
    },
    watch: {
      dialog (val) {
        val || this.close();
      },
      pagination: {
        handler () {
          this.getData();
        },
        deep: true
      }
    },
    methods: {
      getData () {
        this.loading = true;

        storesService.getStores()
          .then((resolve) => {
            if (!resolve.error){
              const { sortBy, descending, page, rowsPerPage } = this.pagination;

              let items = resolve.data.stores;
              const total = items.length;

              if (this.pagination.sortBy) {
                items = items.sort((a, b) => {
                  const sortA = a[sortBy];
                  const sortB = b[sortBy];

                  if (descending) {
                    if (sortA < sortB) return 1;
                    if (sortA > sortB) return -1;
                    return 0
                  } else {
                    if (sortA < sortB) return -1;
                    if (sortA > sortB) return 1;
                    return 0
                  }
                })
              }

              if (rowsPerPage > 0) {
                items = items.slice((page - 1) * rowsPerPage, page * rowsPerPage)
              }

              this.loading = false;
              this.stores = items;
              this.totalStores = total;

              if (total === 0) {
                this.no_data = true;
              }
            }
          })
          .catch(() => {
            this.loading = false;
            this.no_data = true;
          });
      },
      getArticles (store) {
        this.$router.push({name: 'articlesByStore', params: { store: store.id }});
      },
      editItem (item) {
        this.editedIndex = this.stores.indexOf(item);
        this.editedStore = Object.assign({}, item);
        this.dialog = true;
      },

      deleteItem (item) {
        if (confirm('Are you sure you want to delete this store?')) {
          storesService.deleteStore(item.id)
            .then(() => {
              this.getData();
            });
        }
      },

      close () {
        this.dialog = false;
        setTimeout(() => {
          this.editedStore = Object.assign({}, this.defaultStore);
          this.editedIndex = -1;
          this.$refs.storeForm.reset();
        }, 300);
      },

      save () {
        if (this.$refs.storeForm.validate()) {
          if (this.editedIndex > -1) {
            storesService.updateStore(this.editedStore)
              .then(() => {
                this.getData();
              });
          } else {
            storesService.saveStore(this.editedStore)
              .then(() => {
                this.getData();
              });
          }
          this.close();
        }
      }
    },
    components: {
      VDataTable
    }
  }
</script>
