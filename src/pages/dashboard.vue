<script setup>
import { CountNumberOfPost } from '@/services/post_services';
import { onMounted } from 'vue';

var numberOfPost = ref(0);
onMounted(async () => {
  numberOfPost.value = await CountNumberOfPost()

});

</script>

<template>
    <VRow>
      <VCol
      cols="12"
      md="12"
    >
    <VCard class="text-center text-sm-start">
      <VCardItem>
        <VRow>
          <VCol sm="6">
            <VCardTitle class="text-md-h5 text-primary">
              Number of Total Post
            </VCardTitle>
          </VCol>
          <VCol sm="6">
            <VCardTitle class="text-md-h5 text-primary">
              {{ numberOfPost }}
            </VCardTitle>
          </VCol>
        </VRow>
      </VCardItem>
    </VCard>
  </VCol>
  </VRow>

  <VRow>
      <VCol
      cols="12"
      md="12"
    >
    <VCard class="text-center text-sm-start">
      <VCardItem>
        <VRow>
          <VCol sm="12">
            <VCardTitle class="text-md-h5 text-primary">
              Monthly Active Users (MAUs)
            </VCardTitle>
          </VCol>
          <VCol sm="6">
            <VCardTitle class="text-md-h5 text-primary">
              -
            </VCardTitle>
          </VCol>
        </VRow>
      </VCardItem>
    </VCard>
  </VCol>
  </VRow>
  
</template>
