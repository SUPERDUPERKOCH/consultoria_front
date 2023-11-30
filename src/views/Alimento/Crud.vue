<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <base-crud :ref="'alimentosCrud'" crudName="Alimentos" newText="Novo Alimento" :table="table" :columns="columns"
          :options="options" :endPoint="endPoint" :enableAdd="true" :enableEdit="true" :enableDelete="true"
          :enableView="true" :enableReset="false" :dataForm="dataForm">
        </base-crud>
      </div>
    </div>
  </div>
</template>

<script>
import BaseCrud from "../../layouts/Base/BaseCrud";

export default {
  data: function () {
    return {
      table: "alimentosTable",
      showMessageImport: false,
      usersCrud: {},
      pages: [],
      url: "",
      columns: ["id", "nome", "actions"],
      tableData: ["id", "nome"],
      options: {
        filterByColumn: true,
        debounce: 1000,
        filterable: ["nome"],
        pagination: { chunk: 10, dropdown: false, nav: "scroll" },
        perPage: 10,
        perPageValues: [10, 25, 50, 100],
        headings: {
          id: "ID",
          nome: "Alimento",
          actions: "Ações",
        },

        texts: {
          filterBy: "Filtrar",
          defaultOption: "Selecione",
        },
        listColumns: {},
        templates: {},
        requestFunction: function (data) {
          let requestData = {};

          let query = this.$parent.$parent.$parent.query(data.query);
          requestData.params = data;
          requestData.params.query = "";
          requestData.params.with = [];

          return this.$http.get(this.url + "?" + query, requestData).catch(
            function (e) {
              this.dispatch("error", e);
            }.bind(this)
          );
        },
      },
      endPoint: "alimentos/",
      dataForm: {},
    };
  },
  components: {
    BaseCrud,
  },
  methods: {
    query: function (query) {
      let columns = {
        id: "id",
        photo: "photo",
        name: "name",
        access_nivel: "access_nivel",
        email: "email",
      };
      let filters = "";
      $.each(query, function (index, value) {
        filters += columns[index] + "=" + value + "&";
      });
      return filters;
    },
  },
};
</script>

<style scoped>
.VuePagination {
  text-align: center;
}

.uploading-image {
  display: flex;
  border-radius: 10px;
  width: 100px;
  height: 100px;
}
</style>