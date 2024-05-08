<script setup>
import { createPost, getAllPost } from '@/services/post_services';
import CreatePost from '@/views/post/CreatePost.vue';
import GetPosts from '@/views/post/GetPosts.vue';
import { onMounted } from 'vue';

var postList = ref([]);
onMounted(async () => {
  postList.value = await getAllPost()

});

const postSomething = async (description) => {
  const response = await createPost(description)
  console.log(response)
  postList.value.push(response)
  console.log(postList.value);
}



</script>

<template>
  <VRow>

    <VCol
      cols="12"
      md="12"
    >
      <CreatePost @createPost="postSomething" />
      <GetPosts :postList="postList"/>
    </VCol>

  </VRow>
</template>
