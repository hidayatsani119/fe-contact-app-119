<script setup>
import { useLocalStorage } from "@vueuse/core";
import { onBeforeMount, reactive, ref } from "vue";
import { RouterLink, useRoute } from "vue-router";
import { contactDetail } from "../../lib/api/ContactApi";
import { addressDelete, addressList } from "../../lib/api/AddressApi";
import { alertConfirm, alertError, alertSucces } from "../../lib/alert";

const route = useRoute();
const contactId = route.params.id;
const token = useLocalStorage("token", "");
const contact = reactive({
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
});

const addresses = ref([]);

async function fetchContacts() {
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
}

async function fetchAddresses() {
  const response = await addressList(token.value, contactId);
  const responseBody = await response.json();
  console.log(responseBody);

  if (response.status === 200) {
    addresses.value = responseBody.data;
  } else {
    await alertError(responseBody.errors);
  }
}

async function handleAddressDelete(addressId) {
  if (!(await alertConfirm("Are you sure want to delete this address"))) {
    return;
  }
  const response = await addressDelete(token.value, contactId, addressId);
  const responseBody = await response.json();

  console.log(responseBody);

  if (response.status === 200) {
    await alertSucces("address deleted successfully");
    await fetchAddresses();
  } else {
    await alertError(responseBody.erros);
  }
}

onBeforeMount(async () => {
  await fetchContacts();
  await fetchAddresses();
});
</script>

<template>
  <div class="flex items-center mb-6 justify-center">
    <h1 class="text-2xl font-bold flex items-center">
      <i class="fas fa-id-card text-primary mr-3"></i> Contact Details
    </h1>
  </div>

  <div class="bg-base-200 shadow-2xl rounded-xl overflow-hidden max-w-2xl mx-auto animate-fade-in">
    <div class="p-8">
      <!-- Contact Header -->
      <div class="mb-8 text-center">
        <div class="w-20 h-20 bg-info rounded-full mx-auto flex items-center justify-center mb-4 shadow-lg">
          <i class="fas fa-user text-3xl"></i>
        </div>
        <h2 class="text-2xl font-bold mb-2">{{ contact.first_name }} {{ contact.last_name }}</h2>
        <div class="w-24 h-1 mx-auto rounded-full"></div>
      </div>

      <!-- Contact Information -->
      <div class="space-y-5 mb-8">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div class="p-5 shadow-lg rounded-lg transition-all duration-200 hover:bg-opacity-70">
            <div class="flex items-center mb-2">
              <i class="fas fa-user-tag text-secondary mr-2"></i>
              <h3 class="text-sm font-medium">First Name</h3>
            </div>
            <p class="text-lg ml-6">{{ contact.first_name }}</p>
          </div>
          <div class="p-5 shadow-lg rounded-lg transition-all duration-200 hover:bg-opacity-70">
            <div class="flex items-center mb-2">
              <i class="fas fa-user-tag text-secondary mr-2"></i>
              <h3 class="text-sm font-medium">Last Name</h3>
            </div>
            <p class="text-lg ml-6">{{ contact.last_name }}</p>
          </div>
        </div>

        <div class="p-5 shadow-lg rounded-lg transition-all duration-200 hover:bg-opacity-70">
          <div class="flex items-center mb-2">
            <i class="fas fa-envelope text-secondary mr-2"></i>
            <h3 class="text-sm font-medium">Email</h3>
          </div>
          <p class="text-lg ml-6">{{ contact.email }}</p>
        </div>

        <div class="p-5 shadow-lg rounded-lg transition-all duration-200 hover:bg-opacity-70">
          <div class="flex items-center mb-2">
            <i class="fas fa-phone text-secondary mr-2"></i>
            <h3 class="text-sm font-medium">Phone</h3>
          </div>
          <p class="text-lg ml-6">{{ contact.phone }}</p>
        </div>
      </div>

      <!-- Addresses Section -->
      <div class="mb-8">
        <div class="flex items-center mb-5">
          <i class="fas fa-map-marker-alt text-secondary mr-3"></i>
          <h3 class="text-xl font-semibold">Addresses</h3>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
          <!-- Add Address Card -->
          <div
            class="p-5 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 hover:border border-dashed border-neutral"
          >
            <RouterLink :to="`/dashboard/contacts/${contactId}/addresses`" class="block h-full">
              <div class="flex flex-col items-center justify-center h-full text-center py-4">
                <div
                  class="w-16 h-16 rounded-full flex items-center justify-center mb-4 shadow-lg transform transition-transform duration-300 hover:scale-110"
                >
                  <i class="fas fa-plus text-2xl"></i>
                </div>
                <h4 class="text-lg font-semibold">Add Address</h4>
              </div>
            </RouterLink>
          </div>

          <!-- Address Card 1 -->
          <div v-for="address in addresses" :key="address.id" class="p-5 shadow-lg rounded-lg card-hover">
            <div class="flex items-center mb-3">
              <div class="w-10 h-10 bg-secondary rounded-full flex items-center justify-center mr-3">
                <i class="fas fa-home text-neutral-content"></i>
              </div>
              <h4 class="text-lg font-semibold">Home Address</h4>
            </div>
            <div class="space-y-3 ml-2 mb-4">
              <p class="flex items-center">
                <i class="fas fa-road text-gray-500 w-6"></i>
                <span class="font-medium w-24">Street:</span>
                <span>{{ address.street }}</span>
              </p>
              <p class="flex items-center">
                <i class="fas fa-city text-gray-500 w-6"></i>
                <span class="font-medium w-24">City:</span>
                <span>{{ address.city }}</span>
              </p>
              <p class="flex items-center">
                <i class="fas fa-map text-gray-500 w-6"></i>
                <span class="font-medium w-24">Province:</span>
                <span>{{ address.province }}</span>
              </p>
              <p class="flex items-center">
                <i class="fas fa-flag text-gray-500 w-6"></i>
                <span class="font-medium w-24">Country:</span>
                <span>{{ address.country }}</span>
              </p>
              <p class="flex items-center">
                <i class="fas fa-mailbox text-gray-500 w-6"></i>
                <span class="font-medium w-24">Postal Code:</span>
                <span>{{ address.postal_code }}</span>
              </p>
            </div>
            <div class="flex justify-end space-x-3">
              <RouterLink :to="`/dashboard/contacts/${contactId}/addresses/${address.id}/edit`" class="btn btn-neutral">
                <i class="fas fa-edit mr-2"></i> Edit
              </RouterLink>
              <button v-on:click="() => handleAddressDelete(address.id)" class="btn btn-error">
                <i class="fas fa-trash-alt mr-2"></i> Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex justify-end space-x-4">
        <RouterLink to="/dashboard/contacts" class="btn btn-accent">
          <i class="fas fa-arrow-left mr-2"></i> Back
        </RouterLink>
        <RouterLink :to="`/dashboard/contacts/${contactId}/edit`" class="btn btn-info">
          <i class="fas fa-user-edit mr-2"></i> Edit Contact
        </RouterLink>
      </div>
    </div>
  </div>
</template>
