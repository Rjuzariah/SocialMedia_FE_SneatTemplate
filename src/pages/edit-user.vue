<script setup>
import ManageUserInfoForm from '@/views/pages/manage-user/ManageUserInfoForm.vue'
import ManageUserPost from '@/views/pages/manage-user/ManageUserPost.vue'

import { getUserbyId } from '@/services/user_management_services';
import { getManageUserPost, createManageUserPost, editManageUserPost } from '@/services/manage_user_post_services';

const props = defineProps({
  userId : null
});

let userInfo = ref({});
let userPostLimitationInfo = ref({});

onMounted(async () => {
  userInfo = await getUserbyId(props.userId)
  userPostLimitationInfo = await getManageUserPost(props.userId)

});
</script>

<template>
  <div>
    <VRow>
      <VCol
        cols="12"
        md="12"
      >
        <!-- 👉 Horizontal Form -->
        <VCard title="Manage User Info">
          <VCardText>
            <ManageUserInfoForm :userData="userInfo"/>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>

    <VRow>
      <VCol
        cols="12"
        md="12"
      >
        <!-- 👉 Horizontal Form -->
        <VCard title="Manage User Post">
          <VCardText>
            <ManageUserPost />
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
  </div>
</template>
