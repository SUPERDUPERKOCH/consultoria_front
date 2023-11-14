<template>
  <div>
    <div class="main-content">
      <div class="row">
        <div class="col-md-12">
          <label>Titulo</label>
          <input type="text" class="form-control" v-model="paciente.title" />
        </div>
        <div class="col-md-12">
          <label>Descrição</label>
          <textarea
            cols="30"
            rows="10"
            class="form-control"
            v-model="paciente.description"
          ></textarea>
        </div>
        <div class="col-md-12 mt-3">
          <button class="btn btn-add" @click="save">Salvar</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import BaseCrud from "../../layouts/Base/BaseCrud";
import vSelect from "vue-select";

export default {
  name: "imageUpload",
  data() {
    return {
      paciente: {},
    };
  },
  computed: {},
  methods: {
    save: function () {
      const self = this;
      let api = self.$store.state.api + "pacientes";

      self.$http
        .post(api, self.paciente)
        .then((response) => {
          self.$message(
            "Sucesso",
            `Informações guardadas com sucesso`,
            "success"
          );
          this.$router.push("/pacientes");
        })
        .catch((error) => {
          self.$message(null, error.response.data, "error");
        });
    },
    getUsers: function (id) {
      const self = this;
      const api = self.$store.state.api + "users/" + id;

      self.$http
        .get(api)
        .then((response) => {
          self.users = response.data.data[0];
          self.users.password = "";
          self.change_password = false;
        })
        .catch((error) => {
          self.$message(null, error.response.data, "error");
        });
    },
  },
  mounted: function () {
    const self = this;

    let id = self.$route.params.id;
    if (id) {
      self.getUsers(id);
    }
  },
  components: {
    BaseCrud,
    vSelect,
  },
};
</script>
<style scoped>
.profile_user {
  text-align: center;
}
.photo {
  display: block;
  margin-left: 5px;
  width: 18%;
  border-radius: 10px;
  max-width: 400px;
  max-height: 400px;
  object-fit: cover;
}
.btn-user:hover,
.btn-user[aria-expanded="true"] {
  background: linear-gradient(to right, #000, #666);
  color: #fff !important ;
}
.photo-title {
  color: #000;
  font-size: 18px;
  display: block;
  margin-left: 5px;
  width: 18%;
}
</style>