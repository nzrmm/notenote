<script setup lang="ts">
import * as z from 'zod'
import { format } from 'date-fns'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { Calendar as CalendarIcon } from 'lucide-vue-next'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

import { cn } from '@/lib/utils'
import { useNoteStore } from '@/stores/note'

const noteStore = useNoteStore()
const { createNote, setCloseFormModal } = noteStore

const formSchema = toTypedSchema(
  z.object({
    title: z.string().min(1).max(50),
    date: z.date()
  })
)

const form = useForm({
  validationSchema: formSchema
})

const onSubmit = form.handleSubmit((values) => {
  createNote({
    title: values.title,
    date: format(values.date, 'PPP')
  })

  setCloseFormModal()
})
</script>

<template>
  <form @submit="onSubmit">
    <div class="grid gap-4 mb-4">
      <FormField v-slot="{ componentField }" name="title">
        <FormItem>
          <FormLabel>Title</FormLabel>

          <FormControl>
            <Input type="text" placeholder="Create title..." v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField, value }" name="date">
        <FormItem>
          <FormLabel>Date</FormLabel>

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
</template>
