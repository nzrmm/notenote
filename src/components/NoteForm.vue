<script setup lang="ts">
import * as z from 'zod'
import { format } from 'date-fns'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { Calendar as CalendarIcon } from 'lucide-vue-next'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import {
  Select,
  SelectItem,
  SelectValue,
  SelectGroup,
  SelectContent,
  SelectTrigger
} from '@/components/ui/select'

import { cn } from '@/lib/utils'
import { NOTE_COLOR } from '@/lib/constants'
import { useNoteStore } from '@/stores/note'

const noteStore = useNoteStore()
const { createNote, setCloseFormModal } = noteStore

const formSchema = toTypedSchema(
  z.object({
    note: z.string().min(1, { message: 'Description must be filled!' }),
    date: z.date(),
    color: z.string().min(1)
  })
)

const form = useForm({
  validationSchema: formSchema
})

const onSubmit = form.handleSubmit((values) => {
  createNote({
    ...values,
    date: format(values.date, 'PPP')
  })

  setCloseFormModal()
})
</script>

<template>
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

      <FormField v-slot="{ componentField }" name="color">
        <FormItem>
          <FormLabel class="text-slate-700">Select Color</FormLabel>

          <Select v-bind="componentField">
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select color" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectGroup>
                <SelectItem
                  v-for="noteColor in NOTE_COLOR"
                  :key="noteColor.name"
                  :value="noteColor.color"
                >
                  <div class="flex items-center justify-between gap-2">
                    <span>{{ noteColor.name }}</span>
                    <div :class="cn('w-2 h-2 rounded-full', noteColor.color)"></div>
                  </div>
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      </FormField>
    </div>

    <div class="flex justify-end">
      <Button type="submit">Create</Button>
    </div>
  </form>
</template>
