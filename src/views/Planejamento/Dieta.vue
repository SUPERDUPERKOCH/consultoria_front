<template>
  <div>
    <div class="main-content">
      <div class="row">
        <div class="col-md-12">
          <div class="row d-flex align-items-center">
            <div class="col-md-2 mt-2 mb-2">
              <button class="btn btn-primary" @click="addCard(dieta.length)">Adicionar refeição</button>
            </div>

            <div class="col-md-10 text-right">
              <router-link to="/planejamentos" class="btn btn-back mr-1">
                <i class="fa fa-arrow-left" />
                Voltar
              </router-link>
              <a class="btn btn-add" @click="save">
                Salvar
                <i class="fa fa-save" />
              </a>
            </div>
          </div>
          <div v-for="(entry, dietaIndex) in dieta" :key="dietaIndex">
            <div class="card">
              <div class="row d-flex align-items-center">
                <div class="col-md-2">
                  <div class="card-header">
                    <div class="card-title">Refeição {{ dietaIndex + 1 }}</div>
                  </div>
                </div>
                <div class="col-md-10 text-right">
                  <button class="btn btn-primary" @click="addAlimento(dietaIndex)">Adicionar alimento</button>
                </div>
              </div>
              <hr style="margin-top: -4px" />
              <div class="card-body">
                <div class="row" v-for="(entry, alimentoIndex) in dieta[dietaIndex]" :key="alimentoIndex">
                  <div class="col-md-2">
                    <span>Horário</span>
                    <input type="text" class="form-control" v-model="dieta[dietaIndex][alimentoIndex].horario">
                  </div>
                  <div class="col-md-1">
                    <span>Número refeição</span>
                    <input type="text" class="form-control" v-model="dieta[dietaIndex][alimentoIndex].refeicao_ordem">
                  </div>
                  <div class="col-md-2">
                    <span>Alimento</span>
                    <v-select :options="alimentos" :reduce="(alimentos) => alimentos.id" :label="'nome'"
                      v-model="dieta[dietaIndex][alimentoIndex].alimento_id" @input="dieta.push()"></v-select>
                  </div>
                  <div class="col-md-2">
                    <span>Quantidade</span>
                    <input type="text" class="form-control" v-model="dieta[dietaIndex][alimentoIndex].quantidade">
                  </div>
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
      dieta: [],
      alimentos: [],
    };
  },
  computed: {},

  methods: {

    addCard(dietaIndex) {
      let newCard = [{
        horario: "",
        refeicao_ordem: "",
        alimento_id: null,
        quantidade: "",
        alimentos: []
      }];

      this.dieta[dietaIndex] = (newCard);
      this.dieta.push();
      console.log(this.dieta)
    },

    addAlimento(dietaIndex) {
      let newCard = [{
        horario: "",
        refeicao_ordem: "",
        alimento_id: null,
        quantidade: "",
        alimentos: []
      }];

      this.dieta[dietaIndex].push(newCard);
      this.dieta.push();
    },

    save: function () {
      const self = this;
      let api = self.$store.state.api + "dietas";

      self.$http
        .post(api, self.dieta)
        .then((response) => {
          self.$message(
            "Sucesso",
            `Informações guardadas com sucesso`,
            "success"
          );
          this.$router.push("/planejamentos");
        })
        .catch((error) => {
          self.$message(null, error.response.data, "error");
        });
    },



    remover(dietaIndex) {
      const self = this;
      self.dieta.dates.splice(dietaIndex, 1);
    },


    getDieta: function () {
      const self = this;
      const api = self.$store.state.api + "dietas";

      self.$http
        .get(api)
        .then((response) => {
          self.dieta = response.data.data;
        })
        .catch((error) => {
          self.$message(null, error.response.data, "error");
        });
    },

    getAlimentos: function () {
      const self = this;
      const api = self.$store.state.api + "alimentos";

      self.$http
        .get(api)
        .then((response) => {
          self.alimentos = response.data.data;
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
      self.getDieta();
    }

    self.getAlimentos();
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
