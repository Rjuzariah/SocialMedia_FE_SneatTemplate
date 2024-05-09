<script setup>

import { getUserbyId } from '@/services/user_management_services';

const props = defineProps({
  userId : null
});

let userInfo = ref({});

onMounted(async () => {
  const response = await getUserbyId(props.userId)
  userInfo.value = response.result

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

                <!-- 👉 submit and reset button -->
                <VCol
                  offset-md="3"
                  cols="12"
                  md="9"
                  class="d-flex gap-4"
                >
                  <VBtn type="submit">
                    Submit
                  </VBtn>
                  <VBtn
                    color="secondary"
                    variant="tonal"
                    type="reset"
                  >
                    Reset
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
