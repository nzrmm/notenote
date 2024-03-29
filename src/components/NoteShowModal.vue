<script setup lang="ts">
import { watch } from 'vue'
import { storeToRefs } from 'pinia'
import { Star } from 'lucide-vue-next'
import { format, parseISO } from 'date-fns'
import { useRoute, useRouter } from 'vue-router'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogContent,
  DialogDescription
} from '@/components/ui/dialog'

import { cn } from '@/lib/utils'
import { useNoteStore } from '@/stores/note'

const route = useRoute()
const router = useRouter()
const noteStore = useNoteStore()
const { note, isOpenShowModal } = storeToRefs(noteStore)
const { getNoteById, updateIsFavoriteNote, setOpenShowModal } = noteStore

watch(
  () => route.query.id,
  async (newId) => {
    if (newId) getNoteById(newId as string)
  }
)
</script>

<template>
  <Dialog
    :open="isOpenShowModal"
    @update:open="
      (open) => {
        setOpenShowModal(open)
        router.replace({ query: undefined })
      }
    "
  >
    <DialogContent :class="cn('w-[88%] sm:max-w-80 flex flex-col justify-between', note.color)">
      <DialogHeader class="hidden">
        <DialogTitle></DialogTitle>
        <DialogDescription></DialogDescription>
      </DialogHeader>

      <div class="mb-4">
        <p class="line-clamp-5">{{ note.note }}</p>
      </div>

      <div class="flex justify-between items-center">
        <time :dateTime="note.date">{{ format(parseISO(note.date), 'PPP') }}</time>
        <div>
          <Button size="icon-md" @click="updateIsFavoriteNote(note.id, !note.isFavorite)">
            <Star
              width="12"
              :fill="note.isFavorite ? '#F3CB51' : '#FFF'"
              :color="note.isFavorite ? '#F3CB51' : '#FFF'"
            />
          </Button>
        </div>
      </div>
    </DialogContent>
  </Dialog>
</template>
