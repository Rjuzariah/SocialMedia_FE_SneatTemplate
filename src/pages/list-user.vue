<script setup>
import { getAllUsers } from '@/services/user_management_services';
import { onMounted } from 'vue';

import { useRouter } from 'vue-router';

const router = useRouter();

var users = ref([]);
onMounted(async () => {
  users.value = await getAllUsers()

});

const goToCreateUserPage = (user_id) => {
  router.push({ path: `/create-user` });
}


const goToEditUserPage = (user_id) => {
  router.push({ path: `/edit-user/${user_id}` });
}

</script>

<template>
  <VRow>
          <VCol cols="12" md="12" sm="12">
            <v-btn  small color="primary" @click="goToCreateUserPage()">
            <v-icon left>mdi-pencil</v-icon> Create
          </v-btn>
          </VCol>
        </VRow>
  <VRow>
    <VCol cols="12" md="12" sm="12">
      <VCard>
        
        <VRow>
          <VCol cols="12" md="12" sm="12">
            <VTable>
    <thead>
      <tr>
        <th class="text-uppercase">
          User Name
        </th>
        <th>
          Email
        </th>
        <th>
          Post Limit Number
        </th>
        <th></th>
      </tr>
    </thead>

    <tbody>
      <tr
        v-for="user in users"
        :key="user.id"
      >
        <td>
          {{ user.userName }}
        </td>
        <td class="text-center">
          {{ user.email }}
        </td>
        <td class="text-center">
          {{ user.postLimitNumber }}
        </td>
        <td class="text-center">
          <v-btn  small color="primary" @click="goToEditUserPage(user.id)">
            <v-icon left>mdi-pencil</v-icon> Edit
          </v-btn>
        </td>
      </tr>
    </tbody>
  </VTable>
          </VCol>
        </VRow>
      </VCard>
    </VCol>
  </VRow>

</template>
