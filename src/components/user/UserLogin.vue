<script setup>
import { reactive } from "vue";
import { userLogin } from "../../lib/api/userApi";
import { alertError } from "../../lib/alert";
import { useRouter } from "vue-router";
import { useLocalStorage } from "@vueuse/core";

const router = useRouter();
const token = useLocalStorage("token", "");
const user = reactive({
  username: "",
  password: "",
});

async function handleSubmit() {
  const response = await userLogin(user);
  const responseBody = await response.json();
  console.log(responseBody);

  if (response.status === 200) {
    token.value = responseBody.data.token;
    await router.push({
      path: "/dashboard/contacts",
    });
  } else {
    await alertError(responseBody.errors);
  }
}
</script>

<template>
  <div class="animate-fade-in hero-content flex-col lg:flex-row gap-x-15">
    <div class="text-center lg:text-left">
      <div class="font-bold text-4xl text-primary">
        <i class="fas fa-address-book text-4xl mr-3"></i>Contact Management
      </div>
      <p class="py-6">Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque, ab Lorem ipsum dolor</p>
    </div>
    <div class="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <div class="card-body">
        <form v-on:submit.prevent="handleSubmit">
          <h2 class="text-center text-4xl font-bold text-primary">Login!</h2>
          <fieldset class="fieldset">
            <label class="label">Username</label>
            <input type="text" class="input" placeholder="Username" v-model="user.username" />
            <label class="label">Password</label>
            <input type="password" class="input" placeholder="Password" v-model="user.password" />
            <div><RouterLink class="link link-hover" to="/register">Don't have account?</RouterLink></div>
            <button class="btn btn-neutral mt-4">Login</button>
          </fieldset>
        </form>
      </div>
    </div>
  </div>
</template>
