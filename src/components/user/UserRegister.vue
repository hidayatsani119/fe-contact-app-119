<script setup>
import { reactive } from "vue";
import { userRegister } from "../../lib/api/userApi";
import { alertError, alertSucces } from "../../lib/alert";
import { useRouter } from "vue-router";

const router = useRouter();

const user = reactive({
  username: "",
  password: "",
  confirm_password: "",
  name: "",
});

async function handleSubmit() {
  if (user.password !== user.confirm_password) {
    await alertError("password and confirm password not match");
    return;
  }
  const response = await userRegister(user);
  const responseBody = await response.json();
  console.log(responseBody);

  if (response.status === 200) {
    await alertSucces("User created succesfully");
    await router.push({
      path: "/login",
    });
  } else {
    await alertError(responseBody.errors);
  }
}
</script>

<template>
  <div class="animate-fade-in hero-content flex-col lg:flex-row">
    <div class="text-center lg:text-left">
      <div class="font-bold text-4xl text-primary">
        <i class="fas fa-address-book text-4xl mr-3"></i>Contact Management
      </div>
      <p class="py-6">Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque, ab Lorem ipsum dolor</p>
    </div>
    <div class="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <div class="card-body">
        <form v-on:submit.prevent="handleSubmit">
          <h2 class="text-center text-4xl font-bold text-primary">Register!</h2>
          <fieldset class="fieldset">
            <label class="label">Name</label>
            <input type="text" class="input" placeholder="Name" v-model="user.name" />
            <label class="label">Username</label>
            <input type="text" class="input" placeholder="Username" v-model="user.username" />
            <label class="label">Password</label>
            <input type="password" class="input" placeholder="Password" v-model="user.password" />
            <label class="label">Confirm Password</label>
            <input type="password" class="input" placeholder="Confirm Password" v-model="user.confirm_password" />
            <div>
              <RouterLink class="link link-hover" to="/login">Allready have account??</RouterLink>
            </div>
            <button class="btn btn-neutral mt-4">Register</button>
          </fieldset>
        </form>
      </div>
    </div>
  </div>
</template>
