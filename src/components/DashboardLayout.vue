<script setup></script>

<template>
  <div class="min-h-screen flex flex-col">
    <div class="navbar bg-neutral justify-between p-5 text-neutral-content">
      <RouterLink to="/dashboard/contacts" class="flex items-center hover:opacity-90 transition-opacity duration-200">
        <i class="fas fa-address-book text-2xl mr-3"></i>
        <div class="font-bold text-xl">Contact App 119</div>
      </RouterLink>
      <ul class="flex space-x-6">
        <li>
          <RouterLink
            to="/dashboard/users/profile"
            class="hover:text-white flex items-center transition-colors duration-200"
          >
            <i class="fas fa-user-circle mr-2"></i>
            <span>Profile</span>
          </RouterLink>
        </li>
        <li>
          <RouterLink
            to="/dashboard/users/logout"
            class="hover:text-white flex items-center transition-colors duration-200"
          >
            <i class="fas fa-sign-out-alt mr-2"></i>
            <span>Logout</span>
          </RouterLink>
        </li>
      </ul>
    </div>

    <!-- Main content -->
    <main class="container mx-auto px-4 py-8 grow">
      <RouterView />

      <!-- Footer -->

      <div class="mt-10 mb-6 text-center text-sm animate-fade-in">
        <p>© 2025 Contact Management. All rights reserved.</p>
      </div>
    </main>
  </div>
</template>

<style scoped></style>
