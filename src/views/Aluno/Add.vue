<template>
  <div>
    <div class="main-content">
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-header">
              <div class="card-title">Aluno</div>
            </div>
            <hr style="margin-top: -4px" />
            <div class="card-body">
              <div class="row">

                <div class="col-md-5">
                  <span>Nome completo</span>
                  <input type="text" class="form-control" v-model="aluno.nome">
                </div>
                <div class="col-md-5">
                  <span>E-mail</span>
                  <input type="text" class="form-control" v-model="aluno.email">
                </div>
                <div class="col-md-2">
                  <span>Sexo</span>
                  <select class="form-control" v-model="aluno.sexo" @input="taxaMetabolismo">
                    <option value="M">Masculino</option>
                    <option value="F">Feminino</option>
                  </select>
                </div>
                <div class="col-md-3">
                  <span>Idade</span>
                  <input type="text" class="form-control" v-model="aluno.idade" @input="taxaMetabolismo">
                </div>
                <div class="col-md-3">
                  <span>Altura (cm)</span>
                  <input type="text" class="form-control" v-model="aluno.altura" @input="taxaMetabolismo">
                </div>
                <div class="col-md-3">
                  <span>Peso (kg)</span>
                  <input type="text" class="form-control" v-model="aluno.peso" @input="taxaMetabolismo">
                </div>
                <div class="col-md-3">
                  <span>TMB</span>
                  <input type="text" class="form-control" v-model="aluno.tmb">
                </div>
                <div class="col-md-12 text-right">
                  <hr />
                  <router-link to="/alunos" class="btn btn-back mr-1">
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
      aluno: {
        idade: '',
        altura: '',
        peso: '',
        sexo: '',
      },
    };
  },
  computed: {},
  watch: {
    'aluno.sexo': 'taxaMetabolismo',
  },
  methods: {
    save: function () {
      const self = this;
      let api = self.$store.state.api + "alunos";

      self.$http
        .post(api, self.aluno)
        .then((response) => {
          self.$message(
            "Sucesso",
            `Informações guardadas com sucesso`,
            "success"
          );
          this.$router.push("/alunos");
        })
        .catch((error) => {
          self.$message(null, error.response.data, "error");
        });
    },
    getAluno: function (id) {
      const self = this;
      const api = self.$store.state.api + "alunos/" + id;

      self.$http
        .get(api)
        .then((response) => {
          self.aluno = response.data.data[0];
        })
        .catch((error) => {
          self.$message(null, error.response.data, "error");
        });
    },

    taxaMetabolismo() {
      const self = this;

      const idade = parseFloat(self.aluno.idade) || 0;
      const altura = parseFloat(self.aluno.altura) || 0;
      const peso = parseFloat(self.aluno.peso) || 0;
      let tmb = parseFloat(self.aluno.tmb) || 0;


      if (self.aluno.sexo == 'M') {
        tmb = 88.362 + (13.397 * peso) + (4.799 * altura) - (5.677 * idade);
      } if (self.aluno.sexo == 'F') {
        tmb = 447.593 + (9.247 * peso) + (3.098 * altura) - (4.330 * idade);
      }

      self.aluno.tmb = tmb.toFixed(2);
    }

  },
  mounted: function () {
    const self = this;

    let id = self.$route.params.id;
    if (id) {
      self.getAluno(id);
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
