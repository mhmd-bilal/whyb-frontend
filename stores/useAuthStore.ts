import { create } from "zustand";
import { Storage } from "@ionic/storage";

const storage = new Storage();
storage.create();

interface AuthState {
  loggedIn: boolean | null;
  setLoggedIn: (value: boolean) => void;
  syncWithStorage: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  loggedIn: null,
  setLoggedIn: async (value: boolean) => {
    await storage.set("loggedIn", value);
    set({ loggedIn: value });
  },
  syncWithStorage: async () => {
    const storedStatus = await storage.get("loggedIn");
    set({ loggedIn: storedStatus });
  },
}));
