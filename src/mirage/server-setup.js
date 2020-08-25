import { Server } from 'miragejs'
import notesJSON from './notes.json'

export default function () {
  const server = new Server()

  server.namespace = 'api'

  server.get('/notes', ({ db }, request) => db.notes)

  server.db.loadData({ notes: notesJSON })
}
