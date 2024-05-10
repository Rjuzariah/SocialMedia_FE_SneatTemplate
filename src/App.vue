<script setup>
import { getLoginUser } from '@/services/user_management_services';
import { hexToRgb } from '@layouts/utils';
import { useTheme } from 'vuetify';


const { global } = useTheme()

let userLoginInfo = ref({});

onMounted(async () => {
  const getUserbyIdResponse = await getLoginUser()
  userLoginInfo.value = getUserbyIdResponse
});


</script>

<template>
  <VApp :style="`--v-global-theme-primary: ${hexToRgb(global.current.value.colors.primary)}`">
    <RouterView />
  </VApp>
</template>
