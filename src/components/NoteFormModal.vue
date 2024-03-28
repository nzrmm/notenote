<script setup lang="ts">
import * as z from 'zod'
import { format } from 'date-fns'
import { storeToRefs } from 'pinia'
import { useForm } from 'vee-validate'
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

const noteStore = useNoteStore()
const { noteFormModal } = storeToRefs(noteStore)
const { createNote, setNoteFormModal } = noteStore

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
  createNote({
    ...values,
    color: noteFormModal.value.color,
    date: format(values.date, 'PPP')
  })

  setNoteFormModal('', false)
})
</script>

<template>
  <Dialog :open="noteFormModal.isOpen" @update:open="(open) => setNoteFormModal('', open)">
    <DialogContent class="w-[88%] sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Create Note</DialogTitle>
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
          <Button type="submit">Create</Button>
        </div>
      </form>
    </DialogContent>
  </Dialog>
</template>
