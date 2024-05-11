<script setup>
import { getLoginUser } from '@/services/user_management_services';
import { socialMediaStore } from '@/store';
import { hexToRgb } from '@layouts/utils';
import { useTheme } from 'vuetify';



const store = socialMediaStore();
const { global } = useTheme()
onMounted(async () => {
  await getLoginUser()
});

</script>

<template>
  <VApp :style="`--v-global-theme-primary: ${hexToRgb(global.current.value.colors.primary)}`">
    <RouterView />
    <v-snackbar v-model="store.error.show" :timeout="store.error.timeout" :color="store.error.color">
      <div v-if="store.error.title">
        {{ store.error.status }} {{ store.error.title }}
      </div>
      <div v-for="detail in store.error.details">
        {{ detail.description }}
      </div>
    </v-snackbar>
  </VApp>
</template>
