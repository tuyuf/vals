"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Mood = number; // 1-100
export type MoodAfter = number; // 1-100

export interface SectionData {
  placeName: string;
  photo: string | null;
  description: string;
  confirmed: boolean;
  documented: boolean;
}

interface QuestStore {
  currentStep: number;
  mood: Mood | null;
  moodAfter: MoodAfter | null;
  sections: Record<string, SectionData>;

  setMood: (mood: Mood) => void;
  setMoodAfter: (mood: MoodAfter) => void;
  setPlace: (section: string, place: string) => void;
  setPhoto: (section: string, photo: string) => void;
  setDescription: (section: string, desc: string) => void;
  confirmArrival: (section: string) => void;
  markDocumented: (section: string) => void;
  nextStep: () => void;
  prevStep: () => void;
  reset: () => void;
}

const createInitialSections = (): Record<string, SectionData> => ({
  photobox: { placeName: "", photo: null, description: "", confirmed: false, documented: false },
  secret: { placeName: "Nomu Space", photo: null, description: "", confirmed: false, documented: false },
  dinner: { placeName: "", photo: null, description: "", confirmed: false, documented: false },
  dessert: { placeName: "", photo: null, description: "", confirmed: false, documented: false },
});

export const useQuestStore = create<QuestStore>()(
  persist(
    (set) => ({
      currentStep: 0,
      mood: null,
      moodAfter: null,
      sections: createInitialSections(),

      setMood: (mood) => set({ mood }),
      setMoodAfter: (moodAfter) => set({ moodAfter }),

      setPlace: (section, place) =>
        set((state) => ({
          sections: {
            ...state.sections,
            [section]: { ...state.sections[section], placeName: place },
          },
        })),

      setPhoto: (section, photo) =>
        set((state) => ({
          sections: {
            ...state.sections,
            [section]: { ...state.sections[section], photo },
          },
        })),

      setDescription: (section, desc) =>
        set((state) => ({
          sections: {
            ...state.sections,
            [section]: { ...state.sections[section], description: desc },
          },
        })),

      confirmArrival: (section) =>
        set((state) => ({
          sections: {
            ...state.sections,
            [section]: { ...state.sections[section], confirmed: true },
          },
        })),

      markDocumented: (section) =>
        set((state) => ({
          sections: {
            ...state.sections,
            [section]: { ...state.sections[section], documented: true },
          },
        })),

      nextStep: () => set((state) => ({ currentStep: state.currentStep + 1 })),
      prevStep: () => set((state) => ({ currentStep: Math.max(0, state.currentStep - 1) })),

      reset: () =>
        set({
          currentStep: 0,
          mood: null,
          moodAfter: null,
          sections: createInitialSections(),
        }),
    }),
    {
      name: "valentine-quest",
    }
  )
);

