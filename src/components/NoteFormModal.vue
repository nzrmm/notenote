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
import { COLORS } from '@/lib/constants'
import { useNoteStore } from '@/stores/note'

const route = useRoute()
const router = useRouter()
const noteStore = useNoteStore()
const { note, color, isOpenFormModal } = storeToRefs(noteStore)
const { getNoteById, createNote, editNote, setColor, setOpenFormModal } = noteStore

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
        color: color.value,
        date: new Date(values.date).toISOString()
      })
    : createNote({
        ...values,
        color: color.value,
        date: new Date(values.date).toISOString()
      })

  setColor('')
  setOpenFormModal(false)
  router.replace({ query: undefined })
})
</script>

<template>
  <Dialog
    :open="isOpenFormModal"
    @update:open="
      (open) => {
        setColor('')
        setOpenFormModal(open)
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
        <div class="grid gap-4 mb-8">
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

        <div v-if="route.query.id" class="flex gap-2 mb-4">
          <Button
            v-for="c in COLORS"
            :key="c"
            type="button"
            size="icon-sm"
            :class="
              cn(c, {
                'border-2 border-slate-500': color ? color === c : note.color === c
              })
            "
            @click="setColor(c)"
          ></Button>
        </div>

        <div class="flex justify-end">
          <Button type="submit">{{ route.query.id ? 'Edit' : 'Create' }}</Button>
        </div>
      </form>
    </DialogContent>
  </Dialog>
</template>
