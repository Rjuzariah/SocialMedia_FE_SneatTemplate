<script setup>

const props = defineProps({
  postList : Array
});

const sortedPostList = computed(() => {
  var sortedPost = []
  if (props.postList) {
    sortedPost = props.postList.sort((a, b) => {
      // Convert dates to JavaScript Date objects
      // const dateA = new Date(a.createdDateTime);
      // const dateB = new Date(b.createdDateTime);
      
      // // Compare dates
      // // return dateB - dateA;
      return b.id - a.id;
    });
  }
  
  return sortedPost

});

</script>

<template>
  <VCard class="text-center text-sm-start">
    <VRow no-gutters>
      <VCol
        cols="12"
        sm="8"
        order="2"
        order-sm="1"
      >
        <VCardItem v-for="(post, index) in sortedPostList">
          <VCardTitle class="text-md-h5 text-primary">
            {{ post.description }}
          </VCardTitle>
          <VCardText>
            {{ post.createdDateTime }}
          </VCardText>
        </VCardItem>

        
      </VCol>

      <VCol
        cols="12"
        sm="4"
        order="1"
        order-sm="2"
        class="text-center"
      >
      </VCol>
    </VRow>
  </VCard>
</template>

<style lang="scss" scoped>
.john-illustration {
  inset-block-end: -0.0625rem;
  inset-inline-end: 3rem;
}
</style>
