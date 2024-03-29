<script setup lang="ts">
import { format, parseISO } from 'date-fns'
import { PencilLine, Star } from 'lucide-vue-next'

import { Button } from '@/components/ui/button'

import { cn } from '@/lib/utils'
import type { NoteType } from '@/types/note'
import { useNoteStore } from '@/stores/note'

const noteStore = useNoteStore()
const { updateIsFavoriteNote } = noteStore

interface Props {
  data: NoteType
}

const { data } = defineProps<Props>()
</script>

<template>
  <div :class="cn('h-56 flex flex-col justify-between rounded-lg p-4', data.color)">
    <div class="flex justify-between">
      <p>{{ data.note }}</p>
      <div>
        <Button size="icon-md" @click="updateIsFavoriteNote(data.id, !data.isFavorite)">
          <Star
            width="14"
            :fill="data.isFavorite ? '#F3CB51' : '#FFF'"
            :color="data.isFavorite ? '#F3CB51' : '#FFF'"
          />
        </Button>
      </div>
    </div>

    <div class="flex justify-between items-center">
      <time :dateTime="data.date">{{ format(parseISO(data.date), 'PPP') }}</time>
      <div>
        <Button size="icon-lg" @click="() => {}">
          <PencilLine fill="#FFF" width="18" />
        </Button>
      </div>
    </div>
  </div>
</template>
