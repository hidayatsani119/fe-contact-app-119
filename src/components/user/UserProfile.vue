<script setup>
import { useLocalStorage } from "@vueuse/core";
import { onBeforeMount, ref } from "vue";
import { userDetail, userUpdatePassword, userUpdateProfle } from "../../lib/api/userApi";
import { alertError, alertSucces } from "../../lib/alert";
import { useRouter } from "vue-router";

const router = useRouter();
const token = useLocalStorage("token", "");
const name = ref("");
const password = ref("");
const confirm_password = ref("");

async function fetchUser() {
  const response = await userDetail(token.value);
  const responseBody = await response.json();
  console.log(responseBody);

  if (response.status === 200) {
    name.value = responseBody.data.name;
  } else {
    await alertError(responseBody.errors);
  }
}

async function handleChangeName() {
  const response = await userUpdateProfle(token.value, { name: name.value });
  const responseBody = await response.json();

  if (response.status === 200) {
    await alertSucces("Profile updated succesfully");
  } else {
    await alertError(responseBody.errors);
  }
}

async function handleChangePassword() {
  if (password.value !== confirm_password.value) {
    await alertError("password and confirm password not match");
    return;
  }
  const response = await userUpdatePassword(token.value, { password: password.value });
  const responseBody = await response.json();
  console.log(responseBody);

  if (response.status === 200) {
    password.value = "";
    confirm_password.value = "";
    await alertSucces("Password updated succesfully");
  } else {
    await alertError(responseBody.errors);
  }
}

onBeforeMount(async () => {
  await fetchUser();
});
</script>

<template>
  <div class="flex items-center mb-6">
    <i class="fas fa-user-cog text-primary text-2xl mr-3"></i>
    <h1 class="text-2xl font-bold">My Profile</h1>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
    <!-- Form 1: Edit Name -->
    <div class="bg-base-200 rounded-xl shadow-2xl animate-fade-in">
      <div class="p-6">
        <div class="flex items-center mb-4">
          <div class="w-10 h-10 bg-info rounded-full flex items-center justify-center mr-3 shadow-md">
            <i class="fas fa-user-edit"></i>
          </div>
          <h2 class="text-xl font-semibold">Edit Profile</h2>
        </div>
        <form v-on:submit.prevent="handleChangeName">
          <div class="mb-5">
            <label for="name" class="block text-sm font-medium mb-2">Full Name</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i class="fas fa-user text-gray-500"></i>
              </div>
              <input
                type="text"
                id="name"
                name="name"
                class="input w-full"
                placeholder="Enter your full name"
                required
                v-model="name"
              />
            </div>
          </div>

          <div class="mt-6">
            <button type="submit" class="w-full btn btn-success">
              <i class="fas fa-save mr-2"></i> Update Profile
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Form 2: Edit Password -->
    <div class="bg-base-200 rounded-xl shadow-2xl animate-fade-in">
      <div class="p-6">
        <div class="flex items-center mb-4">
          <div class="w-10 h-10 bg-warning rounded-full flex items-center justify-center mr-3 shadow-md">
            <i class="fas fa-key"></i>
          </div>
          <h2 class="text-xl font-semibold">Change Password</h2>
        </div>
        <form v-on:submit.prevent="handleChangePassword">
          <div class="mb-5">
            <label for="new_password" class="block text-sm font-medium mb-2">New Password</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i class="fas fa-lock text-gray-500"></i>
              </div>
              <input
                type="password"
                id="new_password"
                name="new_password"
                class="w-full input"
                placeholder="Enter your new password"
                required
                v-model="password"
              />
            </div>
          </div>

          <div class="mb-5">
            <label for="confirm_password" class="block text-sm font-medium mb-2">Confirm New Password</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i class="fas fa-check-double text-gray-500"></i>
              </div>
              <input
                type="password"
                id="confirm_password"
                name="confirm_password"
                class="w-full input"
                placeholder="Confirm your new password"
                required
                v-model="confirm_password"
              />
            </div>
          </div>

          <div class="mt-6">
            <button type="submit" class="w-full btn btn-error"><i class="fas fa-key mr-2"></i> Update Password</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
