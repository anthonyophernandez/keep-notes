import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    notes: [
      {
        id: 1,
        title: 'Title 1',
        content: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vitae, officia! Repudiandae exercitationem hic voluptates facere in est, aliquid inventore, quia quidem dolores, quos enim explicabo. Adipisci ea expedita dignissimos quas. Nam aliquid enim nulla sed praesentium nesciunt, exercitationem iste eveniet, beatae a, impedit fuga? Quis nisi, ullam sint fuga delectus assumenda voluptatum quam commodi, modi error quibusdam consequuntur facere soluta? Doloremque quod suscipit, laudantium nisi, quis dolorem a atque soluta illo voluptatum eaque quos minus explicabo ab corrupti adipisci voluptatem, illum modi qui? Consequuntur possimus repellendus eius, aspernatur optio accusamus.',
        tags: ['label 1', 'label 2', 'label 3'],
        isPinned: false,
        currentColor: 'bg-green-600',
        selectedIndexColor: 5
      },
      {
        id: 2,
        title: 'Title 2',
        content: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vitae, officia! Repudiandae exercitationem hic voluptates facere in est, aliquid inventore, quia quidem dolores, quos enim explicabo. Adipisci ea expedita dignissimos quas. Nam aliquid enim nulla sed praesentium nesciunt, exercitationem iste eveniet, beatae a, impedit fuga? Quis nisi, ullam sint fuga delectus assumenda voluptatum quam commodi, modi error quibusdam consequuntur facere soluta? Doloremque quod suscipit, laudantium nisi, quis dolorem a atque soluta illo voluptatum eaque quos minus explicabo ab corrupti adipisci voluptatem, illum modi qui? Consequuntur possimus repellendus eius, aspernatur optio accusamus.',
        tags: ['label 1'],
        isPinned: false,
        currentColor: 'bg-black',
        selectedIndexColor: 1
      },
      {
        id: 3,
        title: 'Title 3',
        content: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vitae, officia! Repudiandae exercitationem hic voluptates facere in est, aliquid inventore, quia quidem dolores, quos enim explicabo. Adipisci ea expedita dignissimos quas. Nam aliquid enim nulla sed praesentium nesciunt, exercitationem iste eveniet, beatae a, impedit fuga? Quis nisi, ullam sint fuga delectus assumenda voluptatum quam commodi, modi error quibusdam consequuntur facere soluta? Doloremque quod suscipit, laudantium nisi, quis dolorem a atque soluta illo voluptatum eaque quos minus explicabo ab corrupti adipisci voluptatem, illum modi qui? Consequuntur possimus repellendus eius, aspernatur optio accusamus.',
        tags: ['label 1'],
        isPinned: false,
        currentColor: 'bg-black',
        selectedIndexColor: 1
      },
      {
        id: 4,
        title: 'Title 4',
        content: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vitae, officia! Repudiandae exercitationem hic voluptates facere in est, aliquid inventore, quia quidem dolores, quos enim explicabo. Adipisci ea expedita dignissimos quas. Nam aliquid enim nulla sed praesentium nesciunt, exercitationem iste eveniet, beatae a, impedit fuga? Quis nisi, ullam sint fuga delectus assumenda voluptatum quam commodi, modi error quibusdam consequuntur facere soluta? Doloremque quod suscipit, laudantium nisi, quis dolorem a atque soluta illo voluptatum eaque quos minus explicabo ab corrupti adipisci voluptatem, illum modi qui? Consequuntur possimus repellendus eius, aspernatur optio accusamus.',
        tags: ['label 1', 'label 2'],
        isPinned: false,
        currentColor: 'bg-black',
        selectedIndexColor: 1
      },
      {
        id: 5,
        title: 'Title 5',
        content: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vitae, officia! Repudiandae exercitationem hic voluptates facere in est, aliquid inventore, quia quidem dolores, quos enim explicabo. Adipisci ea expedita dignissimos quas. Nam aliquid enim nulla sed praesentium nesciunt, exercitationem iste eveniet, beatae a, impedit fuga? Quis nisi, ullam sint fuga delectus assumenda voluptatum quam commodi, modi error quibusdam consequuntur facere soluta? Doloremque quod suscipit, laudantium nisi, quis dolorem a atque soluta illo voluptatum eaque quos minus explicabo ab corrupti adipisci voluptatem, illum modi qui? Consequuntur possimus repellendus eius, aspernatur optio accusamus.',
        tags: [],
        isPinned: false,
        currentColor: 'bg-black',
        selectedIndexColor: 1
      },
      {
        id: 6,
        title: 'Title 6',
        content: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vitae, officia! Repudiandae exercitationem hic voluptates facere in est, aliquid inventore, quia quidem dolores, quos enim explicabo. Adipisci ea expedita dignissimos quas. Nam aliquid enim nulla sed praesentium nesciunt, exercitationem iste eveniet, beatae a, impedit fuga? Quis nisi, ullam sint fuga delectus assumenda voluptatum quam commodi, modi error quibusdam consequuntur facere soluta? Doloremque quod suscipit, laudantium nisi, quis dolorem a atque soluta illo voluptatum eaque quos minus explicabo ab corrupti adipisci voluptatem, illum modi qui? Consequuntur possimus repellendus eius, aspernatur optio accusamus.',
        tags: ['label 1', 'label 2', 'label 3'],
        isPinned: false,
        currentColor: 'bg-black',
        selectedIndexColor: 1
      },
      {
        id: 7,
        title: 'Title 7',
        content: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vitae, officia! Repudiandae exercitationem hic voluptates facere in est, aliquid inventore, quia quidem dolores, quos enim explicabo. Adipisci ea expedita dignissimos quas. Nam aliquid enim nulla sed praesentium nesciunt, exercitationem iste eveniet, beatae a, impedit fuga? Quis nisi, ullam sint fuga delectus assumenda voluptatum quam commodi, modi error quibusdam consequuntur facere soluta? Doloremque quod suscipit, laudantium nisi, quis dolorem a atque soluta illo voluptatum eaque quos minus explicabo ab corrupti adipisci voluptatem, illum modi qui? Consequuntur possimus repellendus eius, aspernatur optio accusamus.',
        tags: ['label 1', 'label 3'],
        isPinned: false,
        currentColor: 'bg-black',
        selectedIndexColor: 1
      },
      {
        id: 8,
        title: 'Title 8',
        content: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vitae, officia! Repudiandae exercitationem hic voluptates facere in est, aliquid inventore, quia quidem dolores, quos enim explicabo. Adipisci ea expedita dignissimos quas. Nam aliquid enim nulla sed praesentium nesciunt, exercitationem iste eveniet, beatae a, impedit fuga? Quis nisi, ullam sint fuga delectus assumenda voluptatum quam commodi, modi error quibusdam consequuntur facere soluta? Doloremque quod suscipit, laudantium nisi, quis dolorem a atque soluta illo voluptatum eaque quos minus explicabo ab corrupti adipisci voluptatem, illum modi qui? Consequuntur possimus repellendus eius, aspernatur optio accusamus.',
        tags: ['label 2', 'label 3'],
        isPinned: false,
        currentColor: 'bg-black',
        selectedIndexColor: 1
      },
      {
        id: 9,
        title: 'Title 9',
        content: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vitae, officia! Repudiandae exercitationem hic voluptates facere in est, aliquid inventore, quia quidem dolores, quos enim explicabo. Adipisci ea expedita dignissimos quas. Nam aliquid enim nulla sed praesentium nesciunt, exercitationem iste eveniet, beatae a, impedit fuga? Quis nisi, ullam sint fuga delectus assumenda voluptatum quam commodi, modi error quibusdam consequuntur facere soluta? Doloremque quod suscipit, laudantium nisi, quis dolorem a atque soluta illo voluptatum eaque quos minus explicabo ab corrupti adipisci voluptatem, illum modi qui? Consequuntur possimus repellendus eius, aspernatur optio accusamus.',
        tags: ['label 2'],
        isPinned: false,
        currentColor: 'bg-black',
        selectedIndexColor: 1
      },
      {
        id: 10,
        title: 'Title 10',
        content: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vitae, officia! Repudiandae exercitationem hic voluptates facere in est, aliquid inventore, quia quidem dolores, quos enim explicabo. Adipisci ea expedita dignissimos quas. Nam aliquid enim nulla sed praesentium nesciunt, exercitationem iste eveniet, beatae a, impedit fuga? Quis nisi, ullam sint fuga delectus assumenda voluptatum quam commodi, modi error quibusdam consequuntur facere soluta? Doloremque quod suscipit, laudantium nisi, quis dolorem a atque soluta illo voluptatum eaque quos minus explicabo ab corrupti adipisci voluptatem, illum modi qui? Consequuntur possimus repellendus eius, aspernatur optio accusamus.',
        tags: ['label 1', 'label 2', 'label 3'],
        isPinned: false,
        currentColor: 'bg-black',
        selectedIndexColor: 1
      },
      {
        id: 11,
        title: 'Title 11',
        content: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vitae, officia! Repudiandae exercitationem hic voluptates facere in est, aliquid inventore, quia quidem dolores, quos enim explicabo. Adipisci ea expedita dignissimos quas. Nam aliquid enim nulla sed praesentium nesciunt, exercitationem iste eveniet, beatae a, impedit fuga? Quis nisi, ullam sint fuga delectus assumenda voluptatum quam commodi, modi error quibusdam consequuntur facere soluta? Doloremque quod suscipit, laudantium nisi, quis dolorem a atque soluta illo voluptatum eaque quos minus explicabo ab corrupti adipisci voluptatem, illum modi qui? Consequuntur possimus repellendus eius, aspernatur optio accusamus.',
        tags: [],
        isPinned: false,
        currentColor: 'bg-black',
        selectedIndexColor: 1
      },
      {
        id: 12,
        title: 'Title 12',
        content: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vitae, officia! Repudiandae exercitationem hic voluptates facere in est, aliquid inventore, quia quidem dolores, quos enim explicabo. Adipisci ea expedita dignissimos quas. Nam aliquid enim nulla sed praesentium nesciunt, exercitationem iste eveniet, beatae a, impedit fuga? Quis nisi, ullam sint fuga delectus assumenda voluptatum quam commodi, modi error quibusdam consequuntur facere soluta? Doloremque quod suscipit, laudantium nisi, quis dolorem a atque soluta illo voluptatum eaque quos minus explicabo ab corrupti adipisci voluptatem, illum modi qui? Consequuntur possimus repellendus eius, aspernatur optio accusamus.',
        tags: ['label 1'],
        isPinned: false,
        currentColor: 'bg-black',
        selectedIndexColor: 1
      },
      {
        id: 13,
        title: 'Title 13',
        content: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vitae, officia! Repudiandae exercitationem hic voluptates facere in est, aliquid inventore, quia quidem dolores, quos enim explicabo. Adipisci ea expedita dignissimos quas. Nam aliquid enim nulla sed praesentium nesciunt, exercitationem iste eveniet, beatae a, impedit fuga? Quis nisi, ullam sint fuga delectus assumenda voluptatum quam commodi, modi error quibusdam consequuntur facere soluta? Doloremque quod suscipit, laudantium nisi, quis dolorem a atque soluta illo voluptatum eaque quos minus explicabo ab corrupti adipisci voluptatem, illum modi qui? Consequuntur possimus repellendus eius, aspernatur optio accusamus.',
        tags: ['label 3'],
        isPinned: false,
        currentColor: 'bg-black',
        selectedIndexColor: 1
      },
      {
        id: 14,
        title: 'Title 14',
        content: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vitae, officia! Repudiandae exercitationem hic voluptates facere in est, aliquid inventore, quia quidem dolores, quos enim explicabo. Adipisci ea expedita dignissimos quas. Nam aliquid enim nulla sed praesentium nesciunt, exercitationem iste eveniet, beatae a, impedit fuga? Quis nisi, ullam sint fuga delectus assumenda voluptatum quam commodi, modi error quibusdam consequuntur facere soluta? Doloremque quod suscipit, laudantium nisi, quis dolorem a atque soluta illo voluptatum eaque quos minus explicabo ab corrupti adipisci voluptatem, illum modi qui? Consequuntur possimus repellendus eius, aspernatur optio accusamus.',
        tags: [],
        isPinned: false,
        currentColor: 'bg-black',
        selectedIndexColor: 1
      },
      {
        id: 15,
        title: 'Title 15',
        content: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vitae, officia! Repudiandae exercitationem hic voluptates facere in est, aliquid inventore, quia quidem dolores, quos enim explicabo. Adipisci ea expedita dignissimos quas. Nam aliquid enim nulla sed praesentium nesciunt, exercitationem iste eveniet, beatae a, impedit fuga? Quis nisi, ullam sint fuga delectus assumenda voluptatum quam commodi, modi error quibusdam consequuntur facere soluta? Doloremque quod suscipit, laudantium nisi, quis dolorem a atque soluta illo voluptatum eaque quos minus explicabo ab corrupti adipisci voluptatem, illum modi qui? Consequuntur possimus repellendus eius, aspernatur optio accusamus.',
        tags: ['label 2'],
        isPinned: false,
        currentColor: 'bg-black',
        selectedIndexColor: 1
      }
    ]
  },
  mutations: {
    DELETE_NOTE (state, note) {
      state.notes = state.notes.filter(n => n.id !== note.id)
    }
  },
  actions: {
    deleteNote ({ commit }, note) {
      commit('DELETE_NOTE', note)
      console.log('Deleted note: ' + note.id)
    }
  },
  modules: {
  }
})
