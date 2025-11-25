<script setup>
import { useLocalStorage } from "@vueuse/core";
import { onBeforeMount } from "vue";
import { useRouter } from "vue-router";
import { userLogout } from "../../lib/api/userApi";
import { alertConfirm, alertError } from "../../lib/alert";

const router = useRouter();

const token = useLocalStorage("token", "");

onBeforeMount(async () => {
  if (!(await alertConfirm("Are you sure want to logout"))) {
    router.replace({
      path: "/dashboard/contacts",
    });
    return;
  }
  const response = await userLogout(token.value);
  const responseBody = await response.json();
  console.log(responseBody);

  if (response.status === 200) {
    token.value = "";
    router.replace({
      path: "/login",
    });
  } else {
    await alertError(responseBody.erros);
  }
});
</script>
