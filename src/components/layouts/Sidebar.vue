<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { Plus } from 'lucide-vue-next'

import { NoteFormModal } from '@/components'
import { Button } from '@/components/ui/button'

import { cn } from '@/lib/utils'
import { NOTE_COLOR } from '@/lib/constants'
import { useNoteStore } from '@/stores/note'

const noteStore = useNoteStore()
const { isViewSelectColor } = storeToRefs(noteStore)
const { setNoteFormModal, setViewSelectColor } = noteStore
</script>

<template>
  <aside class="w-20 sm:w-24 md:w-28 sticky top-0 h-screen border-r shadow-sm py-6">
    <div class="grid place-items-center">
      <p class="font-bold mb-20">Note2</p>

      <Button
        size="icon"
        :class="cn('mb-12 transition-all duration-300', { 'rotate-45': isViewSelectColor })"
        @click="setViewSelectColor(!isViewSelectColor)"
      >
        <Plus width="20" />
      </Button>

      <div v-show="isViewSelectColor" class="grid gap-6">
        <Button
          v-for="noteColor in NOTE_COLOR"
          size="icon-sm"
          :key="noteColor.name"
          :class="noteColor.color"
          @click="setNoteFormModal(noteColor.color, true)"
        ></Button>
      </div>

      <NoteFormModal />
    </div>
  </aside>
</template>
