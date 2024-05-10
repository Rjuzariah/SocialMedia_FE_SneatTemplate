<script setup>

var description = ref('');

const emit = defineEmits(['createPost'])


const postSomething = () => {
    emit('createPost', description.value)
}

</script>

<template>
  
    <VRow no-gutters>
      <VCol
        cols="12"
        sm="12"
      >
      <VCard class="text-center text-sm-start">
        <VCardItem>
          <VCardTitle class="text-md-h5 text-primary">
            Post Some Text Here 🎉
          </VCardTitle>
          <VTextField
              id="description"
              v-model="description"
              placeholder="Write Something Here"
              persistent-placeholder
            />
            <br/>
            <VBtn type="submit" @click="postSomething" :disabled="description === ''">
          Submit
        </VBtn>
        </VCardItem>
      </VCard>
        
      </VCol>
    </VRow>
</template>

<style lang="scss" scoped>
</style>
