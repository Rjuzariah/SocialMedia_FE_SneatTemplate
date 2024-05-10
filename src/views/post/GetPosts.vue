<script setup>
import avatar1 from '@images/avatars/avatar-1.png';
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
  
      <VRow v-for="(post, index) in sortedPostList">
      <VCol
        cols="12"
        sm="12"
        xs="12"
      >
      <VCard class="text-center text-sm-start" >
        <VCardItem>
          <VRow>
          <VCol cols="2" sm="2" xs="2"><VAvatar
            size="75"
            class="avatar-center"
            :image="avatar1"
          /></VCol>
          <VCol cols="10" sm="10" xs="10">
            <VRow>
              <VCol cols="12"><VCardTitle>{{ post.ownerName }}</VCardTitle></VCol>
              <VCol cols="12">{{ post.description }}</VCol>
              <VCol cols="12"><span class="text-caption">{{ post.createdDateTime }}</span></VCol>
            </VRow>
          </VCol>
        </VRow>
        </VCardItem>
      </VCard>
        
      </VCol>
    </VRow>
  
</template>

<style lang="scss" scoped>
.john-illustration {
  inset-block-end: -0.0625rem;
  inset-inline-end: 3rem;
}
</style>
