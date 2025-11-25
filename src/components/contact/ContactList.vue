<script setup>
import { onBeforeMount, onMounted, reactive, ref, watch } from "vue";

import { useLocalStorage } from "@vueuse/core";
import { alertConfirm, alertError, alertSucces } from "../../lib/alert.js";
import { contactDelete, contactList } from "../../lib/api/ContactApi.js";

const token = useLocalStorage("token", "");
const search = reactive({
  name: "",
  email: "",
  phone: "",
});
const page = ref(1);
const totalPage = ref(1);
const contacts = ref([]);
const pages = ref([]);
const currentPage = ref(1);

watch(totalPage, (value) => {
  const data = [];
  for (let i = 1; i <= value; i++) {
    data.push(i);
  }
  pages.value = data;
});

async function handleChangePage(value) {
  page.value = value;
  await fetchContacts();
}

async function handleSearch() {
  currentPage.value = page.value;
  page.value = 1;
  await fetchContacts();
}

async function handleResetSearch() {
  search.name = "";
  search.email = "";
  search.phone = "";

  await handleChangePage(currentPage.value);
}

async function fetchContacts() {
  const response = await contactList(token.value, {
    name: search.name,
    email: search.email,
    phone: search.phone,
    page: page.value,
  });
  const responseBody = await response.json();
  console.log(responseBody);

  if (response.status === 200) {
    contacts.value = responseBody.data;
    totalPage.value = responseBody.paging.total_page;
  } else {
    await alertError(responseBody.errors);
  }
}

async function handleDelete(id) {
  if (!(await alertConfirm("Are you sure want to delete this contact"))) {
    return;
  }

  const response = await contactDelete(token.value, id);
  const responseBody = await response.json();

  console.log(responseBody);

  if (response.status === 200) {
    page.value = 1;
    await alertSucces("Contact deleted successfully");
    await fetchContacts();
  } else {
    await alertError(responseBody.errors);
  }
}

onBeforeMount(async () => {
  await fetchContacts();
});

onMounted(() => {
  const toggleButton = document.getElementById("toggleSearchForm");
  const searchFormContent = document.getElementById("searchFormContent");
  const toggleIcon = document.getElementById("toggleSearchIcon");

  // Add transition for smooth animation
  searchFormContent.style.transition = "max-height 0.3s ease-in-out, opacity 0.3s ease-in-out, margin 0.3s ease-in-out";
  searchFormContent.style.overflow = "hidden";
  searchFormContent.style.maxHeight = "0px";
  searchFormContent.style.opacity = "0";
  searchFormContent.style.marginTop = "0";

  toggleButton.addEventListener("click", function () {
    if (searchFormContent.style.maxHeight !== "0px") {
      // Hide the form
      searchFormContent.style.maxHeight = "0px";
      searchFormContent.style.opacity = "0";
      searchFormContent.style.marginTop = "0";
      toggleIcon.classList.remove("fa-chevron-up");
      toggleIcon.classList.add("fa-chevron-down");
    } else {
      // Show the form
      searchFormContent.style.maxHeight = searchFormContent.scrollHeight + "px";
      searchFormContent.style.opacity = "1";
      searchFormContent.style.marginTop = "1rem";
      toggleIcon.classList.remove("fa-chevron-down");
      toggleIcon.classList.add("fa-chevron-up");
    }
  });
});
</script>

<template>
  <div class="flex justify-center items-center mb-6">
    <i class="fas fa-users text-primary text-2xl mr-3"></i>
    <h1 class="text-2xl font-bold">My Contacts</h1>
  </div>

  <!-- Search form -->
  <div class="bg-base-200 p-6 mb-8 animate-fade-in shadow-2xl rounded-2xl">
    <div class="flex items-center justify-between mb-4">
      <div class="flex items-center">
        <i class="fas fa-search text-info mr-3"></i>
        <h2 class="text-xl font-semibold">Search Contacts</h2>
      </div>
      <button
        type="button"
        id="toggleSearchForm"
        class="hover:text-info focus:outline-none transition-all duration-200"
      >
        <i class="fas fa-chevron-down text-lg" id="toggleSearchIcon"></i>
      </button>
    </div>
    <div id="searchFormContent" class="mt-4">
      <form v-on:submit.prevent="handleSearch">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-2 p-3">
          <div>
            <label for="search_name" class="block text-sm font-medium mb-2">Name</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i class="fas fa-user text-neutral"></i>
              </div>
              <input
                type="text"
                id="search_name"
                name="search_name"
                class="w-full input"
                placeholder="Search by name"
                v-model="search.name"
              />
            </div>
          </div>
          <div>
            <label for="search_email" class="block text-sm font-medium mb-2">Email</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i class="fas fa-envelope text-neutral"></i>
              </div>
              <input
                type="text"
                id="search_email"
                name="search_email"
                class="w-full input"
                placeholder="Search by email"
                v-model="search.email"
              />
            </div>
          </div>
          <div>
            <label for="search_phone" class="block text-sm font-medium mb-2">Phone</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i class="fas fa-phone text-neutral"></i>
              </div>
              <input
                type="text"
                id="search_phone"
                name="search_phone"
                class="w-full input"
                placeholder="Search by phone"
                v-model="search.phone"
              />
            </div>
          </div>
        </div>
        <div class="mt-5 flex flex-row gap-5 justify-end">
          <button type="button" @click="handleResetSearch" class="btn btn-neutral text-error">
            <i class="fas fa-undo mr-2"></i> Reset
          </button>
          <button type="submit" class="btn btn-primary"><i class="fas fa-search mr-2"></i> Search</button>
        </div>
      </form>
    </div>
  </div>

  <!-- Contact cards grid -->
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <!-- Create New Contact Card -->
    <div
      class="bg-base-200 rounded-xl shadow-2xl overflow-hidden animate-fade-in transform transition-transform duration-300 hover:scale-105 hover:border border-dashed border-neutral"
    >
      <RouterLink to="/dashboard/contacts/create" class="block p-6 h-full">
        <div class="flex flex-col items-center justify-center h-full text-center">
          <div
            class="w-20 h-20 bg-base-200 rounded-full flex items-center justify-center mb-5 shadow-lg transform transition-transform duration-300 hover:scale-110"
          >
            <i class="fas fa-user-plus text-3xl"></i>
          </div>
          <h2 class="text-xl font-semibold mb-3">Create New Contact</h2>
          <p class="">Add a new contact to your list</p>
        </div>
      </RouterLink>
    </div>

    <div
      v-for="contact in contacts"
      :key="contact.id"
      class="bg-base-200 bg-opacity-80 rounded-xl shadow-2xl overflow-hidden card-hover animate-fade-in"
    >
      <div class="p-6">
        <RouterLink
          :to="`/dashboard/contacts/${contact.id}`"
          class="block cursor-pointer p-3 rounded-lg hover:bg-base-300"
        >
          <div class="flex items-center mb-3">
            <div class="w-10 h-10 bg-info rounded-full flex items-center justify-center mr-3 shadow-md">
              <i class="fas fa-user"></i>
            </div>
            <h2 class="text-xl font-semibold hover:text-primary transition-colors duration-200">
              {{ contact.first_name }} {{ contact.last_name }}
            </h2>
          </div>
          <div class="space-y-3 ml-2">
            <p class="flex items-center">
              <i class="fas fa-user-tag text-neutral w-6"></i>
              <span class="font-medium w-24">First Name:</span>
              <span>{{ contact.first_name }}</span>
            </p>
            <p class="flex items-center">
              <i class="fas fa-user-tag text-neutral w-6"></i>
              <span class="font-medium w-24">Last Name:</span>
              <span>{{ contact.last_name }}</span>
            </p>
            <p class="flex items-center">
              <i class="fas fa-envelope text-neutral w-6"></i>
              <span class="font-medium w-24">Email:</span>
              <span>{{ contact.email }}</span>
            </p>
            <p class="flex items-center">
              <i class="fas fa-phone text-neutral w-6"></i>
              <span class="font-medium w-24">Phone:</span>
              <span>{{ contact.phone }}</span>
            </p>
          </div>
        </RouterLink>
        <div class="mt-4 flex justify-end space-x-3">
          <RouterLink :to="`/dashboard/contacts/${contact.id}/edit`" class="btn btn-neutral">
            <i class="fas fa-edit mr-2"></i> Edit
          </RouterLink>
          <button v-on:click="() => handleDelete(contact.id)" class="btn btn-error">
            <i class="fas fa-trash-alt mr-2"></i> Delete
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Pagination -->
  <div class="mt-10 flex justify-center">
    <nav class="flex items-center space-x-3 bg-base-200 bg-opacity-80 rounded-xl p-3 animate-fade-in shadow-2xl">
      <a href="#" v-if="page > 1" v-on:click="() => handleChangePage(page - 1)" class="btn btn-neutral">
        <i class="fas fa-chevron-left mr-2"></i> Previous
      </a>
      <a
        href="#"
        v-for="value in pages"
        :key="value"
        v-on:click="() => handleChangePage(value)"
        :class="[
          page === value ? 'px-4 py-2 bg-error rounded-lg text-white ' : 'px-4 py-2 bg-neutral-content rounded-lg',
        ]"
      >
        {{ value }}
      </a>
      <a href="#" v-if="page < totalPage" v-on:click="() => handleChangePage(page + 1)" class="btn btn-neutral">
        Next <i class="fas fa-chevron-right ml-2"></i>
      </a>
    </nav>
  </div>
</template>

<style scoped></style>
