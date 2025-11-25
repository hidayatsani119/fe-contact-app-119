<script setup>
import { reactive } from "vue";
import { contactCreate } from "../../lib/api/ContactApi";
import { useLocalStorage } from "@vueuse/core";
import { alertError, alertSucces } from "../../lib/alert";
import { useRouter } from "vue-router";

const router = useRouter();
const token = useLocalStorage("token", "");
const contact = reactive({
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
});

async function handleSubmit() {
  const response = await contactCreate(token.value, contact);
  const responseBody = await response.json();
  console.log(responseBody);

  if (response.status === 200) {
    await alertSucces("contact create succesfully");
    router.replace({
      path: "/dashboard/contacts",
    });
  } else {
    await alertError(responseBody.errors);
  }
}
</script>

<template>
  <div class="flex justify-center items-center mb-6">
    <h1 class="text-2xl font-bold flex items-center">
      <i class="fas fa-user-plus text-primary mr-3"></i> Create New Contact
    </h1>
  </div>

  <div class="rounded-xl bg-base-200 shadow-2xl overflow-hidden max-w-2xl mx-auto animate-fade-in">
    <div class="p-8">
      <form v-on:submit.prevent="handleSubmit">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
          <div>
            <label for="first_name" class="block text-sm font-medium mb-2">First Name</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i class="fas fa-user-tag text-gray-500"></i>
              </div>
              <input
                type="text"
                id="first_name"
                name="first_name"
                class="w-full input"
                placeholder="Enter firstname"
                required
                v-model="contact.first_name"
              />
            </div>
          </div>
          <div>
            <label for="last_name" class="block text-sm font-medium mb-2">Last Name</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i class="fas fa-user-tag text-gray-500"></i>
              </div>
              <input
                type="text"
                id="last_name"
                name="last_name"
                class="w-full input"
                placeholder="Enter last name"
                required
                v-model="contact.last_name"
              />
            </div>
          </div>
        </div>

        <div class="mb-5">
          <label for="email" class="block text-sm font-medium mb-2">Email</label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <i class="fas fa-envelope text-gray-500"></i>
            </div>
            <input
              type="email"
              id="email"
              name="email"
              class="w-full input"
              placeholder="Enter email address"
              required
              v-model="contact.email"
            />
          </div>
        </div>

        <div class="mb-6">
          <label for="phone" class="block text-sm font-medium mb-2">Phone</label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <i class="fas fa-phone text-gray-500"></i>
            </div>
            <input
              type="tel"
              id="phone"
              name="phone"
              class="w-full input"
              placeholder="Enter phone number"
              required
              v-model="contact.phone"
            />
          </div>
        </div>

        <div class="flex justify-end space-x-4">
          <button class="btn btn-error">
            <RouterLink to="/dashboard/contacts"> <i class="fas fa-times mr-2"></i> Cancel </RouterLink>
          </button>
          <button type="submit" class="btn btn-success"><i class="fas fa-plus-circle mr-2"></i> Create Contact</button>
        </div>
      </form>
    </div>
  </div>
</template>
