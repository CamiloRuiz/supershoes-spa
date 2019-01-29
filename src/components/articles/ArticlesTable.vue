<template>
  <v-flex xs12>
    <v-toolbar>
      <v-toolbar-title class="mr-2">Articles</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" max-width="500px">
        <v-btn slot="activator" color="primary" dark class="mb-2">New Article</v-btn>
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12>
                  <v-form
                    ref="articleForm"
                    v-model="valid"
                    lazy-validation
                  >
                    <v-select
                      v-model="editedArticle.store_id"
                      :items="stores"
                      item-text="name"
                      item-value="id"
                      :rules="[v => !!v || 'The store is required']"
                      label="Store"
                      required
                    ></v-select>
                    <v-text-field
                      v-model="editedArticle.name"
                      label="Name"
                      :rules="[v => !!v || 'Name is required']"
                      required
                    ></v-text-field>
                    <v-textarea
                      v-model="editedArticle.description"
                      label="Description"
                      :rules="[v => !!v || 'Description is required']"
                      required
                      value=""
                    ></v-textarea>
                    <v-text-field
                      v-model="editedArticle.price"
                      label="Price"
                      prefix="$"
                      type="number"
                      :rules="[v => !!v || 'Price is required']"
                      required
                    ></v-text-field>
                    <v-text-field
                      v-model="editedArticle.total_in_shelf"
                      label="Total in shelf"
                      type="number"
                      :rules="[v => !!v || 'The amount of total in shelf is required']"
                      required
                    ></v-text-field>
                    <v-text-field
                      v-model="editedArticle.total_in_vault"
                      label="Total in vault"
                      type="number"
                      :rules="[v => !!v || 'The amount of total in vault is required']"
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
      :items="articles"
      :pagination.sync="pagination"
      :total-items="totalArticles"
      :loading="loading"
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <td class="text-xs-left">{{ props.item.name }}</td>
        <td class="text-xs-left">{{ props.item.description }}</td>
        <td class="text-xs-right text-no-wrap">$ {{ props.item.price }}</td>
        <td class="text-xs-right">{{ props.item.total_in_shelf }}</td>
        <td class="text-xs-right">{{ props.item.total_in_vault }}</td>
        <td class="text-xs-left text-no-wrap">{{ props.item.store_name }}</td>
        <td class="text-xs-center text-no-wrap">
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
          Sorry, there is not articles yet :(
        </v-alert>
      </template>
    </v-data-table>
  </v-flex>
</template>

<script>
  import storesService from '@/modules/stores/stores.service';
  import articlesService from '@/modules/articles/articles.service';
  import { VDataTable } from 'vuetify/es5/components/VDataTable';

  export default {
    name: "ArticlesTable",
    data () {
      return {
        dialog: false,
        valid: true,
        totalArticles: 0,
        articles: [],
        stores: [],
        loading: true,
        no_data: false,
        pagination: {},
        headers: [
          { text: 'Name', align: 'left', value: 'name' },
          { text: 'Description', align: 'left', value: 'description' },
          { text: 'Price', align: 'right', value: 'price' },
          { text: 'Total in Shelf', align: 'right', value: 'total_in_shelf' },
          { text: 'Total in Vault', align: 'right', value: 'total_in_vault' },
          { text: 'Store', align: 'left', value: 'store_name' },
          { text: '', value: '' },
        ],
        editedIndex: -1,
        editedArticle: {
          name: '',
          description: '',
          price: 0,
          total_in_shelf: 0,
          total_in_vault: 0,
          store_id: 0
        },
        defaultArticle: {
          name: '',
          description: '',
          price: 0,
          total_in_shelf: 0,
          total_in_vault: 0,
          store_id: 0
        }
      }
    },
    props: {
      store: Number
    },
    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Article' : 'Edit Article'
      }
    },
    watch: {
      dialog (val) {
        val || this.close();
      },
      pagination: {
        handler () {
          let store = this.store ? this.store : 0;
          this.getData(store);
        },
        deep: true
      }
    },
    methods: {
      getData (store) {
        this.loading = true;

        storesService.getStores()
          .then((resolve) => {
            this.stores = resolve.data.stores;
          });

        let service = articlesService.getArticles();

        if (store) {
          service = storesService.getArticles(store);
        }

        service.then((resolve) => {
            if (!resolve.error){
              const { sortBy, descending, page, rowsPerPage } = this.pagination;

              let items = resolve.data.articles;
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
              this.articles = items;
              this.totalArticles = total;

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

      editItem (item) {
        this.editedIndex = this.articles.indexOf(item);
        this.editedArticle = Object.assign({}, item);
        this.dialog = true;
      },

      deleteItem (item) {
        if (confirm('Are you sure you want to delete this article?')) {
          articlesService.deleteArticle(item.id)
            .then(() => {
              this.getData();
            });
        }
      },

      close () {
        this.dialog = false;
        setTimeout(() => {
          this.editedArticle = Object.assign({}, this.defaultArticle);
          this.editedIndex = -1;
          this.$refs.articleForm.reset();
        }, 300);
      },

      save () {
        if (this.$refs.articleForm.validate()) {
          if (this.editedIndex > -1) {
            articlesService.updateArticle(this.editedArticle)
              .then(() => {
                this.getData();
              });
          } else {
            articlesService.saveArticle(this.editedArticle)
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
