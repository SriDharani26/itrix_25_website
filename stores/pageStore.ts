import { create } from 'zustand'

type Value = {
  name: string
  path: string
}

type PageStoreType = {
  store: Value[]
  update: (name: string, path: string) => void
}

const usePageStore = create<PageStoreType>((set) => ({
  store: [{ name: 'Home', path: '/' }],

  update: (name, path) =>
    set((state) => {
      const exists = state.store.some((item) => item.path === path)

      if (exists) return state

      return {
        store: [...state.store, { name, path }],
      }
    }),
}))

export default usePageStore