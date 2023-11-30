
<template>
  <div>
    <div class="main-content">
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-header">
              <div class="card-title">Alimento</div>
            </div>
            <hr style="margin-top: -4px" />
            <div class="card-body">
              <div class="row">

                <div class="col-md-6">
                  <span>Alimento</span>
                  <input type="text" class="form-control" v-model="alimento.nome">
                </div>
                <div class="col-md-6">
                  <span>Porção (Gramas)</span>
                  <input type="text" class="form-control" v-model="alimento.porcao">
                </div>
                <div class="col-md-2">
                  <span>Qntd. de carboidrato</span>
                  <input type="text" class="form-control" v-model="alimento.carboidratos" @input="calcularCalorias">
                </div>
                <div class="col-md-2">
                  <span>Qntd. de proteína</span>
                  <input type="text" class="form-control" v-model="alimento.proteinas" @input="calcularCalorias">
                </div>
                <div class="col-md-2">
                  <span>Qntd. de gordura</span>
                  <input type="text" class="form-control" v-model="alimento.gorduras" @input="calcularCalorias">
                </div>
                <div class="col-md-2">
                  <span>Qntd. de fibras</span>
                  <input type="text" class="form-control" v-model="alimento.fibras">
                </div>
                <div class="col-md-2">
                  <span>Qntd. de sódio (Mg)</span>
                  <input type="text" class="form-control" v-model="alimento.sódio">
                </div>
                <div class="col-md-2">
                  <span>Calorias totais</span>
                  <input type="text" class="form-control" v-model="alimento.calorias">
                </div>
                <div class="col-md-12 text-right">
                  <hr />
                  <router-link to="/alimentos" class="btn btn-back mr-1">
                    <i class="fa fa-arrow-left" />
                    Voltar
                  </router-link>
                  <a class="btn btn-add" @click="save">
                    Salvar
                    <i class="fa fa-save" />
                  </a>
                </div>
              </div>
            </div>
          </div>
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
      alimento: {
        carboidratos: "",
        proteinas: "",
        gorduras: "",
      },
    };
  },
  computed: {},
  methods: {
    save: function () {
      const self = this;
      let api = self.$store.state.api + "alimentos";

      self.$http
        .post(api, self.alimento)
        .then((response) => {
          self.$message(
            "Sucesso",
            `Informações guardadas com sucesso`,
            "success"
          );
          this.$router.push("/alimentos");
        })
        .catch((error) => {
          self.$message(null, error.response.data, "error");
        });
    },
    getAlimento: function (id) {
      const self = this;
      const api = self.$store.state.api + "alimentos/" + id;

      self.$http
        .get(api)
        .then((response) => {
          self.alimento = response.data.data[0];
        })
        .catch((error) => {
          self.$message(null, error.response.data, "error");
        });
    },

    calcularCalorias() {
      const self = this;

      const carboidratos = parseFloat(self.alimento.carboidratos) || 0;
      const proteinas = parseFloat(self.alimento.proteinas) || 0;
      const gorduras = parseFloat(self.alimento.gorduras) || 0;

      self.alimento.calorias = (carboidratos * 4) + (proteinas * 4) + (gorduras * 9);

    }

  },
  mounted: function () {
    const self = this;

    let id = self.$route.params.id;
    if (id) {
      self.getAlimento(id);
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
  color: #fff !important;
}

.photo-title {
  color: #000;
  font-size: 18px;
  display: block;
  margin-left: 5px;
  width: 18%;
}
</style>
