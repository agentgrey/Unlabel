import { create } from 'zustand'

export const useAppStore = create((set) => ({
  currentScan: null,
  setCurrentScan: (scan) => set({ currentScan: scan }),
  clearScan: () => set({ currentScan: null }),
}))