import { Server } from 'miragejs'
import notesJSON from './notes.json'

export default function () {
  const server = new Server()

  server.namespace = 'api'

  server.get('/notes', ({ db }, request) => db.notes)

  server.post('/notes', (schema, request) => {
    const note = JSON.parse(request.requestBody)

    return schema.db.notes.insert(note)
  })

  server.delete('/notes/:id', (schema, request) => {
    return schema.db.notes.remove(request.params.id)
  })

  server.put('/notes/:id', function () {
    return new Response(200)
  })

  server.db.loadData({ notes: notesJSON })
}
