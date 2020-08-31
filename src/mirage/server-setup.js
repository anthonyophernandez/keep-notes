import { Server, JSONAPISerializer, Model, hasMany } from 'miragejs'
import { camelCase } from 'lodash'
import notesJSON from './notes.json'
import tagsJSON from './tags.json'

export default function () {
  const server = new Server({
    serializers: {
      application: JSONAPISerializer,
      note: JSONAPISerializer.extend({
        include: ['tags'],
        keyForAttribute (attr) {
          return camelCase(attr)
        }
      }),
      tag: JSONAPISerializer.extend({
        include: ['notes'],
        keyForAttribute (attr) {
          return camelCase(attr)
        }
      })
    },
    models: {
      note: Model.extend({
        tags: hasMany()
      }),
      tag: Model.extend({
        notes: hasMany()
      })
    },
    fixtures: {
      notes: notesJSON,
      tags: tagsJSON
    }
  })

  server.namespace = 'api'

  server.get('/notes')
  server.delete('/notes/:id')
  server.put('/notes/:id', function () {
    return new Response(200)
  })
  server.post('/notes', (schema, request) => {
    const json = JSON.parse(request.requestBody)
    const response = schema.notes.create(json)
    return response
  })

  server.get('/tags')
  server.delete('/tags/:id')
  server.post('/tags', (schema, request) => {
    const json = JSON.parse(request.requestBody)
    const response = schema.tags.create(json)
    return response
  })

  server.post('/note_tags', function () {
    return new Response(201)
  })
  server.post('/note_tags/delete', function () {
    return new Response(200)
  })
}
