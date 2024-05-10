<script setup>

import { getRoles } from '@/services/roles_services';
import { createUser, editUser, getUserbyId } from '@/services/user_management_services';
import { useRouter } from 'vue-router';

const router = useRouter();

const props = defineProps({
  userId : null,
  contextType:""
});

let userInfo = ref({
  userName: null,
  email: null,
  password: null,
  postLimitNumber: null,
  roleIds: []
});
let roles = ref([]);
const isPasswordVisible = ref(false)


onMounted(async () => {
  if (props.userId) {
    const getUserbyIdResponse = await getUserbyId(props.userId)
    userInfo.value = getUserbyIdResponse

    
  }
  roles.value = await getRoles()
  

});

const submitUserData = async () => {
  let response = null
  if (props.contextType === "create") {
    response = await createUser(userInfo.value)
  } else {
    response = await editUser(userInfo.value)
  }

  console.log(response.status)
  
  if (response.status in [201,204]) {
    router.push({path: '/list-user'})
  } else {
    errorDetails.value.status = response.status
    errorDetails.value.title= response.title
    errorDetails.value.errorList= response.errorList
  }
  
}

// const editUserData = async () => {
//   const response = await editUser(userInfo.value)
//   if (response.status == 204) {
//     router.push({path: '/list-user'})
//   } else {
//     errorDetails.value.status = response.status
//     errorDetails.value.title= response.title
//     errorDetails.value.errorList= response.errorList
//   }
  
// }

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
            <VForm @submit.prevent="() => {}">
              <VRow>
                <VCol cols="12">
                  <VRow no-gutters>
                    <!-- 👉 First Name -->
                    <VCol
                      cols="12"
                      md="3"
                    >
                      <label for="userName">User Name</label>
                    </VCol>

                    <VCol
                      cols="12"
                      md="9"
                    >
                      <VTextField
                        id="userName"
                        v-model="userInfo.userName"
                        persistent-placeholder
                      />
                    </VCol>
                  </VRow>
                </VCol>

                <VCol cols="12">
                  <VRow no-gutters>
                    <!-- 👉 Email -->
                    <VCol
                      cols="12"
                      md="3"
                    >
                      <label for="email">Email</label>
                    </VCol>

                    <VCol
                      cols="12"
                      md="9"
                    >
                      <VTextField
                        id="email"
                        v-model="userInfo.email"
                        persistent-placeholder
                      />
                    </VCol>
                  </VRow>
                </VCol>

                <VCol cols="12">
                  <VRow no-gutters>
                    <!-- 👉 Email -->
                    <VCol
                      cols="12"
                      md="3"
                    >
                      <label for="email">Password</label>
                    </VCol>

                    <VCol
                      cols="12"
                      md="9"
                    >
                    <VTextField
                      v-model="userInfo.password"
                      placeholder="············"
                      :type="isPasswordVisible ? 'text' : 'password'"
                      :append-inner-icon="isPasswordVisible ? 'bx-hide' : 'bx-show'"
                      @click:append-inner="isPasswordVisible = !isPasswordVisible"
                    />
                    </VCol>
                  </VRow>
                </VCol>

                <VCol cols="12">
                  <VRow no-gutters>
                    <!-- 👉 Email -->
                    <VCol
                      cols="12"
                      md="3"
                    >
                      <label for="email">Post Limit Number</label>
                    </VCol>

                    <VCol
                      cols="12"
                      md="9"
                    >
                    <VTextField
                      id="postLimitNumber"
                      v-model="userInfo.postLimitNumber"
                      type="number"
                      persistent-placeholder
                    />
                    </VCol>
                  </VRow>
                </VCol>

                <VCol cols="12">
                  <VRow no-gutters>
                    <!-- 👉 Email -->
                    <VCol
                      cols="12"
                      md="3"
                    >
                      <label for="roles">Roles</label>
                    </VCol>

                    <VCol
                      cols="2"
                      md="2"
                      v-for="role in roles"
                    >
                    <VCheckbox
                      v-model="userInfo.roleIds"
                      :key="role.id" :value="role.id"
                      :label="role.name"
                    />
                    </VCol>
                  </VRow>
                </VCol>

                <!-- 👉 submit and reset button -->
                <VCol
                  offset-md="3"
                  cols="12"
                  md="9"
                  class="d-flex gap-4"
                >
                  <VBtn @click="submitUserData">
                    Submit
                  </VBtn>
                </VCol>
              </VRow>
            </VForm>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
  </div>
</template>
