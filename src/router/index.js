import { getToken, getAgency } from "@/utils/auth";
import RoutesDB from "@/utils/ROUTES.json";
import Vue from "vue";
import Router from "vue-router";

import layouts from "../layout";
import store from "../store";
// console.log(layouts['navLeft']);
import ForgotPassword from "@/views/pages/authentication/ForgotPassword.vue";
import ResetPassword from "@/views/pages/authentication/ResetPassword.vue";

Vue.use(Router);

for (var i = 0; i < RoutesDB.length; i++) {
  RoutesDB[i].component = view(RoutesDB[i].component);
  RoutesDB[i].meta.layout = layouts[RoutesDB[i].meta.layout];
}

RoutesDB.push({
  path: "/forgot-password/:agency_id",
  name: "forgot-password",
  component: ForgotPassword,
  meta: {
    nav: false,
    layout: "contenOnly",
  },
});
RoutesDB.push({
  path: "/reset-password/:agency_id/:token",
  name: "reset-password",
  component: ResetPassword,
  meta: {
    nav: false,
    layout: "contenOnly",
  },
});

const router = new Router({
  mode: "history",
  routes: RoutesDB,
});

function view(name) {
  return function (resolve) {
    require(["../views/pages/" + name + ".vue"], resolve);
  };
}
const l = {
  contenOnly() {
    store.commit("setLayout", layouts.contenOnly);
  },
  navLeft() {
    store.commit("setLayout", layouts.navLeft);
  },
  navRight() {
    store.commit("setLayout", layouts.navRight);
  },
  navTop() {
    store.commit("setLayout", layouts.navTop);
  },
  navBottom() {
    store.commit("setLayout", layouts.navBottom);
  },
  set(layout) {
    store.commit("setLayout", layout);
  },
};

// insert here login logic
const auth = {
  loggedIn() {
    return store.getters.isLogged && getToken();
  },
  logout() {
    store.commit("setLogout");
  },
};
var agency = getAgency();
var agencyDesc = " ";
router.beforeEach((to, from, next) => {
  var title = to.meta.title;
  if (to.params.type) {
    title = to.params.type;
  }
  if (agency) {
    agencyDesc = agency.descripcion;
  } else {
    agencyDesc = " Casillero";
  }
  document.title = title + " - " + agencyDesc;
  let authrequired = false;
  if (to && to.meta && to.meta.auth) {
    authrequired = true;
  }

  // console.log('authrequired', authrequired, to.name)

  if (authrequired) {
    if (auth.loggedIn()) {
      if (to.name === "login") {
        window.location.href = "/";
        return false;
      } else {
        next();
      }
    } else {
      if (to.name !== "login") {
        window.location.href = "login/" + btoa(1);
        return false;
      }
      next();
    }
  } else {
    if (auth.loggedIn() && to.name === "login") {
      window.location.href = "/";
      return false;
    } else {
      next();
    }
  }

  if (to && to.meta && to.meta.layout) {
    l.set(to.meta.layout);
  }
});

router.afterEach((to, from) => {
  setTimeout(() => {
    store.commit("setSplashScreen", false);
  }, 500);
});

export default router;
