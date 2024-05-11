<script setup>
import { getLoginUser } from '@/services/user_management_services';
import { socialMediaStore } from '@/store';
import { hexToRgb } from '@layouts/utils';
import { useTheme } from 'vuetify';

import { useRouter } from 'vue-router';

const store = socialMediaStore();
const { global } = useTheme()
const router = useRouter();
onMounted(async () => {
  await getLoginUser()
});

</script>

<template>
  <VApp :style="`--v-global-theme-primary: ${hexToRgb(global.current.value.colors.primary)}`">
    <RouterView />
    <v-snackbar v-model="store.error.show" :timeout="store.error.timeout" :color="store.error.color" :location="top">
      <div v-if="store.error.title">
        {{ store.error.status }} {{ store.error.title }}
      </div>
      <div v-for="detail in store.error.details">
        {{ detail.description }}
      </div>
    </v-snackbar>
    <v-snackbars :messages.sync="store.error.status" :timeout="10000" bottom left color="red"></v-snackbars>
  </VApp>
</template>
