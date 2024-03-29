<script setup lang="ts">
import * as z from 'zod'
import { watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useForm } from 'vee-validate'
import { format, parseISO } from 'date-fns'
import { useRoute, useRouter } from 'vue-router'
import { toTypedSchema } from '@vee-validate/zod'
import { Calendar as CalendarIcon } from 'lucide-vue-next'

import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
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
const { note, noteFormModal } = storeToRefs(noteStore)
const { getNoteById, createNote, editNote, setNoteFormModal } = noteStore

watch(
  () => route.query.id,
  async (newId) => {
    if (newId) {
      getNoteById(newId as string)

      form.resetForm({
        values: {
          note: note?.value?.note,
          date: new Date(parseISO(note.value?.date as string))
        }
      })
    }
  }
)

const formSchema = toTypedSchema(
  z.object({
    note: z.string().min(1, { message: 'Description must be filled!' }),
    date: z.date()
  })
)

const form = useForm({
  validationSchema: formSchema
})

const onSubmit = form.handleSubmit((values) => {
  route.query.id
    ? editNote(route.query.id as string, {
        ...note.value,
        ...values,
        date: new Date(values.date).toISOString()
      })
    : createNote({
        ...values,
        color: noteFormModal.value.color,
        date: new Date(values.date).toISOString()
      })

  setNoteFormModal('', false)
  router.replace({ query: undefined })
})
</script>

<template>
  <Dialog
    :open="noteFormModal.isOpen"
    @update:open="
      (open) => {
        setNoteFormModal('', open)
        router.replace({ query: undefined })
      }
    "
  >
    <DialogContent class="w-[88%] sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>{{ route.query.id ? 'Edit Note' : 'Create Note' }}</DialogTitle>
        <DialogDescription> Create your daily note in here. Enjoy your day :) </DialogDescription>
      </DialogHeader>

      <form @submit="onSubmit">
        <div class="grid gap-4 mb-4">
          <FormField v-slot="{ componentField }" name="note">
            <FormItem>
              <FormLabel class="text-slate-700">Note</FormLabel>

              <FormControl>
                <Textarea placeholder="Create note..." v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField, value }" name="date">
            <FormItem>
              <FormLabel class="text-slate-700">Date</FormLabel>

              <Popover>
                <PopoverTrigger as-child>
                  <FormControl>
                    <Button
                      variant="outline"
                      :class="cn('w-full ps-3 font-normal', !value && 'text-muted-foreground')"
                    >
                      <span>{{ value ? format(value, 'PPP') : 'Pick a date' }}</span>
                      <CalendarIcon class="ms-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>

                <PopoverContent class="p-0">
                  <Calendar v-bind="componentField" />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          </FormField>
        </div>

        <div class="flex justify-end">
          <Button type="submit">{{ route.query.id ? 'Edit' : 'Create' }}</Button>
        </div>
      </form>
    </DialogContent>
  </Dialog>
</template>
