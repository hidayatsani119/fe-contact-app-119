import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { createRouter, createWebHistory } from "vue-router";
import Layout from "./components/Layout.vue";
import UserRegister from "./components/user/UserRegister.vue";
import UserLogin from "./components/user/UserLogin.vue";
import DashboardLayout from "./components/DashboardLayout.vue";
import UserProfile from "./components/user/UserProfile.vue";
import UserLogout from "./components/user/UserLogout.vue";
import ContactList from "./components/contact/ContactList.vue";
import ContactCreate from "./components/contact/ContactCreate.vue";
import ContactEdit from "./components/contact/ContactEdit.vue";
import ContactDetail from "./components/contact/ContactDetail.vue";
import AddressCreate from "./components/address/AddressCreate.vue";
import AddressEdit from "./components/address/AddressEdit.vue";
import { useLocalStorage } from "@vueuse/core";
import { alertError } from "./lib/alert";
import NotFound from "./components/not-found/NotFound.vue";
import { userDetail } from "./lib/api/UserApi";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      component: Layout,
      children: [
        {
          path: "/register",
          component: UserRegister,
        },
        {
          path: "/login",
          component: UserLogin,
        },
      ],
    },
    {
      path: "/dashboard",
      component: DashboardLayout,
      children: [
        {
          path: "contacts",
          component: ContactList,
        },
        {
          path: "contacts/create",
          component: ContactCreate,
        },
        {
          path: "contacts/:id/edit",
          component: ContactEdit,
        },
        {
          path: "contacts/:id",
          component: ContactDetail,
        },
        {
          path: "contacts/:contactId/addresses",
          component: AddressCreate,
        },
        {
          path: "contacts/:contactId/addresses/:addressId/edit",
          component: AddressEdit,
        },

        {
          path: "users/profile",
          component: UserProfile,
        },

        {
          path: "users/logout",
          component: UserLogout,
        },
      ],
    },
    {
      path: "/:pathMatch(.*)*",
      name: "notfound",
      component: NotFound,
    },
  ],
});

async function checkAuthentication(token) {
  const response = await userDetail(token);

  if (response.status == 200) {
    return true;
  } else {
    return false;
  }
}

router.beforeEach(async (to, from, next) => {
  const publicPages = ["/login", "/register"];
  const authRequired = !publicPages.includes(to.path);
  const token = useLocalStorage("token", "");
  const notfoundPages = to.name === "notfound";

  if (!authRequired || notfoundPages) {
    return next();
  }
  if (!token.value) {
    await alertError("Unauthorized");
    return next("/login");
  }
  const isValid = await checkAuthentication(token.value);
  if (!isValid) {
    await alertError("Unauthorized");
    return next("/login");
  }
  next();
});

createApp(App).use(router).mount("#app");
