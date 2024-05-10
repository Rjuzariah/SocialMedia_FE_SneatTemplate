<script setup>
import { createPost, getAllPost } from '@/services/post_services';
import CreatePost from '@/views/post/CreatePost.vue';
import GetPosts from '@/views/post/GetPosts.vue';
import { onMounted } from 'vue';

var postList = ref([]);
onMounted(async () => {
  const response = await getAllPost()
  if(response.status === 200) {
    postList.value = response.data
  } else {
    if (response?.status === 401 || response.status === 0)
    {
      snackbar.value.show = true;
    } else {
      snackbar.value.show = true;
      snackbar.value.message = response.title;
    }
  }

});

const postSomething = async (description) => {
  const response = await createPost(description)
  if(response.status === 200) {
    postList.value.push(response.data)
  } else {
    if (response?.status === 401 || response.status === 0)
    {
      snackbar.value.show = true;
    } else {
      snackbar.value.show = true;
      snackbar.value.message = response.title;
    }
  }
}

var snackbar = ref({
  show:false,
  timeout:6000,
  color:"danger",
  message:"Unauthorize"
})


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
  <v-snackbar v-model="snackbar.show" :timeout="snackbar.timeout" :color="snackbar.color" top>
      {{ snackbar.message }}
    </v-snackbar>
</template>
