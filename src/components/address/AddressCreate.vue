<script setup>
import { onBeforeMount, reactive } from "vue";
import { RouterLink, useRoute } from "vue-router";
import { contactDetail } from "../../lib/api/ContactApi";
import { useLocalStorage } from "@vueuse/core";
import { alertError, alertSucces } from "../../lib/alert";
import { addressCreate } from "../../lib/api/AddressApi";
const route = useRoute();

const token = useLocalStorage("token", "");
const contactId = route.params.contactId;

const contact = reactive({
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
});

const address = reactive({
  street: "",
  city: "",
  province: "",
  country: "",
  postal_code: "",
});

async function handleSubmit() {
  const response = await addressCreate(token.value, contactId, address);
  const responseBody = response.json();

  console.log(responseBody);

  if (response.status === 200) {
    await alertSucces("Address created successfully");
  } else {
    await alertError(responseBody.errors);
  }
}

onBeforeMount(async () => {
  const response = await contactDetail(token.value, contactId);
  const responseBody = await response.json();
  console.log(responseBody);

  if (response.status === 200) {
    contact.first_name = responseBody.data.first_name;
    contact.last_name = responseBody.data.last_name;
    contact.email = responseBody.data.email;
    contact.phone = responseBody.data.phone;
  } else {
    await alertError(responseBody.errors);
  }
});
</script>

<template>
  <div class="flex justify-center items-center mb-6">
    <h1 class="text-2xl font-bold flex items-center">
      <i class="fas fa-plus-circle text-primary mr-3"></i> Add New Address
    </h1>
  </div>

  <div class="bg-base-200 rounded-xl shadow-2xl overflow-hidden max-w-2xl mx-auto animate-fade-in">
    <div class="p-8">
      <!-- Contact Information -->
      <div class="mb-6 pb-6">
        <div class="flex items-center">
          <div class="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mr-4 shadow-md">
            <i class="fas fa-user"></i>
          </div>
          <div>
            <h2 class="text-xl font-semibold">{{ contact.first_name }} {{ contact.last_name }}</h2>
            <p class="text-sm">{{ contact.email }} • {{ contact.phone }}</p>
          </div>
        </div>
      </div>

      <form v-on:submit.prevent="handleSubmit">
        <div class="mb-5">
          <label for="street" class="block text-sm font-medium mb-2">Street</label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <i class="fas fa-road"></i>
            </div>
            <input
              type="text"
              id="street"
              name="street"
              class="w-full input"
              placeholder="Enter street address"
              v-model="address.street"
            />
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
          <div>
            <label for="city" class="block text-sm font-medium mb-2">City</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i class="fas fa-city"></i>
              </div>
              <input
                type="text"
                id="city"
                name="city"
                class="w-full input"
                placeholder="Enter city"
                required
                v-model="address.city"
              />
            </div>
          </div>
          <div>
            <label for="province" class="block text-sm font-medium mb-2">Province/State</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i class="fas fa-map"></i>
              </div>
              <input
                type="text"
                id="province"
                name="province"
                class="w-full input"
                placeholder="Enter province or state"
                required
                v-model="address.province"
              />
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
          <div>
            <label for="country" class="block text-sm font-medium mb-2">Country</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i class="fas fa-flag"></i>
              </div>
              <input
                type="text"
                id="country"
                name="country"
                class="w-full input"
                placeholder="Enter country"
                required
                v-model="address.country"
              />
            </div>
          </div>
          <div>
            <label for="postal_code" class="block text-sm font-medium mb-2">Postal Code</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i class="fas fa-mail-bulk"></i>
              </div>
              <input
                type="text"
                id="postal_code"
                name="postal_code"
                class="w-full input"
                placeholder="Enter postal code"
                required
                v-model="address.postal_code"
              />
            </div>
          </div>
        </div>

        <div class="flex justify-end space-x-4">
          <RouterLink :to="`/dashboard/contacts/${contactId}`" class="btn btn-error">
            <i class="fas fa-times mr-2"></i> Cancel
          </RouterLink>
          <button type="submit" class="btn btn-success"><i class="fas fa-plus-circle mr-2"></i> Add Address</button>
        </div>
      </form>
    </div>
  </div>
</template>
