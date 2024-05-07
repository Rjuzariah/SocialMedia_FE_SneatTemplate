<script setup>

var description = ref('');

const emit = defineEmits(['createPost'])


const postSomething = () => {
    emit('createPost', description.value)
}

</script>

<template>
  <VCard class="text-center text-sm-start">
    <VRow no-gutters>
      <VCol
        cols="12"
        sm="12"
        order="2"
        order-sm="1"
      >
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
            <VBtn type="submit" @click="postSomething" :disabled="description === ''">
          Submit
        </VBtn>
        </VCardItem>
        
        
      </VCol>
    </VRow>
  </VCard>
</template>

<style lang="scss" scoped>
</style>
