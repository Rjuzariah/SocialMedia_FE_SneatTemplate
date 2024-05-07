<script setup>
import avatar1 from '@images/avatars/avatar-1.png'
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
          <VAvatar
            size="75"
            class="avatar-center"
            :image="avatar1"
          />
          <VCardTitle class="text-md-h5 text-primary">
            {{ post.ownerId }}
          </VCardTitle>
          <VCardText>
            {{ post.description }}
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
