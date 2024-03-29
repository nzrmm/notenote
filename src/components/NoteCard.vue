<script setup lang="ts">
import { useRouter } from 'vue-router'
import { format, parseISO } from 'date-fns'
import { PencilLine, Star, X } from 'lucide-vue-next'

import { Button } from '@/components/ui/button'

import { cn } from '@/lib/utils'
import type { NoteType } from '@/types/note'
import { useNoteStore } from '@/stores/note'

const router = useRouter()
const noteStore = useNoteStore()
const { setColor, setOpenFormModal, setOpenShowModal, updateIsFavoriteNote, deleteNote } = noteStore

interface Props {
  data: NoteType
}

const { data } = defineProps<Props>()
</script>

<template>
  <div :class="cn('group relative h-56 rounded-lg p-4 overflow-hidden', data.color)">
    <div class="h-full flex flex-col justify-between">
      <div class="flex justify-between">
        <div
          class="cursor-pointer"
          @click="setOpenShowModal(true), router.replace({ query: { id: data.id } })"
        >
          <p class="line-clamp-5">{{ data.note }}</p>
        </div>
        <div>
          <Button size="icon-md" @click="updateIsFavoriteNote(data.id, !data.isFavorite)">
            <Star
              width="12"
              :fill="data.isFavorite ? '#F3CB51' : '#FFF'"
              :color="data.isFavorite ? '#F3CB51' : '#FFF'"
            />
          </Button>
        </div>
      </div>

      <div class="flex justify-between items-center">
        <time :dateTime="data.date">{{ format(parseISO(data.date), 'PPP') }}</time>
        <div>
          <Button
            size="icon-lg"
            @click="
              setColor(data.color),
                setOpenFormModal(true),
                router.replace({ query: { id: data.id } })
            "
          >
            <PencilLine fill="#FFF" width="14" />
          </Button>
        </div>
      </div>
    </div>

    <div
      :class="
        cn(
          'group-hover:block hidden w-10 h-10 px-2 py-1',
          'bg-rose-500 absolute top-0 left-0 rounded-br-full cursor-pointer'
        )
      "
      @click="deleteNote(data.id)"
    >
      <X width="16" color="#FFF" />
    </div>
  </div>
</template>
