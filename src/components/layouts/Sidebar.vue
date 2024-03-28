<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { Plus } from 'lucide-vue-next'

import { NoteForm } from '@/components'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogTrigger,
  DialogContent,
  DialogDescription
} from '@/components/ui/dialog'

import { useNoteStore } from '@/stores/note'

const noteStore = useNoteStore()
const { isOpenFormModal } = storeToRefs(noteStore)
</script>

<template>
  <aside class="w-20 sm:w-24 md:w-28 sticky top-0 h-screen border-r shadow-sm py-6">
    <div class="grid place-items-center">
      <p class="font-bold mb-20">Note2</p>

      <Dialog :open="isOpenFormModal" @update:open="(open) => (isOpenFormModal = open)">
        <DialogTrigger as-child>
          <Button size="icon">
            <Plus width="20" />
          </Button>
        </DialogTrigger>

        <DialogContent class="w-[88%] sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create Note</DialogTitle>
            <DialogDescription>
              Create your daily note in here. Enjoy your day :)
            </DialogDescription>
          </DialogHeader>

          <NoteForm />
        </DialogContent>
      </Dialog>
    </div>
  </aside>
</template>
