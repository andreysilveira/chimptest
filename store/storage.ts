import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

class SafeStorage {
  private memoryDb: Record<string, string> = {};

  async getItem(key: string): Promise<string | null> {
    try {
      // On web, use localStorage directly if available to bypass native module issues
      if (Platform.OS === "web") {
        if (typeof window !== "undefined" && window.localStorage) {
          return window.localStorage.getItem(key);
        }
      }
      return await AsyncStorage.getItem(key);
    } catch (e) {
      console.warn("AsyncStorage.getItem failed, using memory fallback", e);
      return this.memoryDb[key] || null;
    }
  }

  async setItem(key: string, value: string): Promise<void> {
    try {
      if (Platform.OS === "web") {
        if (typeof window !== "undefined" && window.localStorage) {
          window.localStorage.setItem(key, value);
          return;
        }
      }
      await AsyncStorage.setItem(key, value);
    } catch (e) {
      console.warn("AsyncStorage.setItem failed, using memory fallback", e);
      this.memoryDb[key] = value;
    }
  }

  async removeItem(key: string): Promise<void> {
    try {
      if (Platform.OS === "web") {
        if (typeof window !== "undefined" && window.localStorage) {
          window.localStorage.removeItem(key);
          return;
        }
      }
      await AsyncStorage.removeItem(key);
    } catch (e) {
      console.warn("AsyncStorage.removeItem failed, using memory fallback", e);
      delete this.memoryDb[key];
    }
  }
}

export const safeStorage = new SafeStorage();
export default safeStorage;
