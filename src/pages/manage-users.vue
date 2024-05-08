<script setup>
import { getAllUsers } from '@/services/user_management_services';
import { onMounted } from 'vue';

import { useRouter } from 'vue-router';

const router = useRouter();

var users = ref([]);
onMounted(async () => {
  users.value = await getAllUsers()

});

const goToEditUserPage = (user_id) => {
  router.push({ path: `/edit-user/${user_id}` });
}


</script>

<template>
  <VRow v-for="user in users">
    <VCol
      cols="12"
      sm="12"
      md="12"
    >
      <VCard>
        <VCardItem>
          <VCardTitle>{{ user.userName }}</VCardTitle>
          <v-btn  small color="primary" @click="goToEditUserPage(user.id)">
      <v-icon left>mdi-pencil</v-icon> Edit
    </v-btn>

    <!-- Delete button with delete icon -->
    <v-btn small color="error" @click="deleteItem">
      <v-icon left>mdi-delete</v-icon> Delete
    </v-btn>
        </VCardItem>
      </VCard>
    </VCol>

  </VRow>
</template>
