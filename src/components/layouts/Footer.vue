<script setup lang="ts">
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
</script>

<template>
  <footer class="fixed bottom-0 inset-x-0 py-4">
    <div class="flex justify-end w-[88%] mx-auto lg:max-w-4xl">
      <Dialog>
        <DialogTrigger as-child>
          <Button size="icon">
            <Plus width="20" />
          </Button>
        </DialogTrigger>

        <DialogContent class="sm:max-w-[425px]">
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
  </footer>
</template>
