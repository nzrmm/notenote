<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { Plus } from 'lucide-vue-next'

import { NoteFormModal } from '@/components'
import { Button } from '@/components/ui/button'

import { cn } from '@/lib/utils'
import { COLORS } from '@/lib/constants'
import { useNoteStore } from '@/stores/note'

const noteStore = useNoteStore()
const { isViewSelectColor } = storeToRefs(noteStore)
const { setColor, setOpenFormModal, setViewSelectColor } = noteStore
</script>

<template>
  <aside class="w-20 sm:w-24 md:w-28 sticky top-0 h-screen border-r shadow-sm py-6">
    <div class="grid place-items-center">
      <p class="font-bold mb-20">Note2</p>

      <Button
        size="icon"
        :class="cn('mb-10 transition-all duration-300', { 'rotate-45': isViewSelectColor })"
        @click="setViewSelectColor(!isViewSelectColor)"
      >
        <Plus width="20" />
      </Button>

      <div v-show="isViewSelectColor" class="grid gap-6">
        <Button
          v-for="color in COLORS"
          size="icon-sm"
          :key="color"
          :class="color"
          @click="setOpenFormModal(true), setColor(color)"
        ></Button>
      </div>

      <NoteFormModal />
    </div>
  </aside>
</template>
