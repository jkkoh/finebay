<script lang="ts">
import { computed, type ComputedRef, defineComponent } from 'vue'
import { useRoute } from 'vue-router'
import ShopItem from '../components/ShopItem.vue'

export default defineComponent({
    components: { ShopItem },
    setup() {
        const router = useRoute()
        const itemId = computed(() => router.params.id) as ComputedRef<string>
        return { itemId }
    }  
})
</script>

<template>
    <ShopItem :item-id="parseInt(itemId)"/>
</template>