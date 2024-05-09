<script setup>
import { CountNumberOfPost } from '@/services/post_services';
import { onMounted } from 'vue';

var numberOfPost = ref(0);
onMounted(async () => {
  numberOfPost.value = await CountNumberOfPost()

});

</script>

<template>
  <VCard class="text-center text-sm-start">
  <VRow>
    
    <VCol
      cols="6"
      md="6"
    >
    <VCardItem>
          <VCardTitle class="text-md-h5 text-primary">
            {{ numberOfPost }}
          </VCardTitle>
        
        </VCardItem>
    </VCol>
  
  </VRow>
  </VCard>
</template>
