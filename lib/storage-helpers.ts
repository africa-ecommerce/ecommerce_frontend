// storage-helpers.ts
import { toast } from "@/hooks/use-toast";

// Define max history entries to prevent localStorage from growing too large
const MAX_HISTORY_SIZE = 30;

// Storage keys
export const STORAGE_KEYS = {
  CONFIG: "theme-customizer-config",
  HISTORY: "theme-customizer-history",
  HISTORY_INDEX: "theme-customizer-history-index",
  SELECTED_PAGE: "theme-customizer-selected-page",
};

// Check if localStorage is available and has enough space
export function isStorageAvailable() {
  try {
    const test = "__storage_test__";
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (e) {
    return false;
  }
}

// Estimate size of data in bytes (rough estimation)
export function getApproximateSize(data: any): number {
  return JSON.stringify(data).length * 2; // UTF-16 chars are 2 bytes each
}

// Check if we have enough space remaining (5MB is typical localStorage limit)
export function hasEnoughSpace(data: any, buffer = 500000): boolean {
  try {
    const totalSize = getApproximateSize(data);
    // Typical localStorage limit is 5MB (5,242,880 bytes)
    // Leave a buffer for other data
    return totalSize + buffer < 5242880;
  } catch (e) {
    return false;
  }
}

// Helper to save data to localStorage with error handling
export function saveToStorage(key: string, data: any): boolean {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error(`Error saving to localStorage (${key}):`, error);
    return false;
  }
}

// Helper to load data from localStorage with error handling
export function loadFromStorage<T>(key: string, defaultValue: T): T {
  try {
    const savedData = localStorage.getItem(key);
    return savedData ? JSON.parse(savedData) : defaultValue;
  } catch (error) {
    console.error(`Error loading from localStorage (${key}):`, error);
    return defaultValue;
  }
}

// Trim history to maintain proper size
export function trimHistory<T>(history: T[], maxSize = MAX_HISTORY_SIZE): T[] {
  if (history.length <= maxSize) return history;
  
  // Keep the first entry (initial state) and the most recent entries
  return [history[0], ...history.slice(-(maxSize - 1))];
}

// Main function to save all theme customizer data
export function saveThemeCustomizerData({
  config,
  history,
  historyIndex,
  selectedPage,
  showToast = false,
}: {
  config: any;
  history: any[];
  historyIndex: number;
  selectedPage: string;
  showToast?: boolean;
}): boolean {
  if (!isStorageAvailable()) {
    if (showToast) {
      toast({
        title: "Storage unavailable",
        description: "Local storage is not available in your browser",
        variant: "destructive",
      });
    }
    return false;
  }

  // First trim history to keep size manageable
  const trimmedHistory = trimHistory(history);
  
  // Adjust history index if the history was trimmed
  const adjustedIndex = history.length !== trimmedHistory.length
    ? Math.max(0, trimmedHistory.length - (history.length - historyIndex))
    : historyIndex;

  // Check if we have enough space
  const allData = { config, history: trimmedHistory };
  if (!hasEnoughSpace(allData)) {
    if (showToast) {
      toast({
        title: "Storage limit reached",
        description: "Your customizations are too large to save locally",
        variant: "destructive",
      });
    }
    return false;
  }

  // Save each piece separately so if one fails we might still have others
  const configSaved = saveToStorage(STORAGE_KEYS.CONFIG, config);
  const historySaved = saveToStorage(STORAGE_KEYS.HISTORY, trimmedHistory);
  const indexSaved = saveToStorage(STORAGE_KEYS.HISTORY_INDEX, adjustedIndex);
  const pageSaved = saveToStorage(STORAGE_KEYS.SELECTED_PAGE, selectedPage);

  return configSaved && historySaved && indexSaved && pageSaved;
}

// Load all theme customizer data
export function loadThemeCustomizerData(defaultConfig: any) {
  if (!isStorageAvailable()) {
    return {
      config: defaultConfig,
      history: [defaultConfig],
      historyIndex: 0,
      selectedPage: "index",
    };
  }

  return {
    config: loadFromStorage(STORAGE_KEYS.CONFIG, defaultConfig),
    history: loadFromStorage(STORAGE_KEYS.HISTORY, [defaultConfig]),
    historyIndex: loadFromStorage(STORAGE_KEYS.HISTORY_INDEX, 0),
    selectedPage: loadFromStorage(STORAGE_KEYS.SELECTED_PAGE, "index"),
  };
}

// Clear all theme customizer data
export function clearThemeCustomizerData(): boolean {
  try {
    localStorage.removeItem(STORAGE_KEYS.CONFIG);
    localStorage.removeItem(STORAGE_KEYS.HISTORY);
    localStorage.removeItem(STORAGE_KEYS.HISTORY_INDEX);
    localStorage.removeItem(STORAGE_KEYS.SELECTED_PAGE);
    return true;
  } catch (error) {
    console.error("Error clearing localStorage:", error);
    return false;
  }
}

// Create a compact version of history entries by stripping unnecessary data
export function createCompactHistoryEntry(config: any): any {
  // Only store the fields that have actually changed
  // This is a simplified example - you may want to customize this
  // based on what data is most important to preserve
  return {
    templateId: config.templateId,
    styles: config.styles,
    // You could store a subset of content if it's large
    content: config.content,
    // Metadata is usually small so keep it
    metadata: config.metadata,
  };
}

// Add entry to history with size management
export function addToHistory(
  history: any[],
  historyIndex: number, 
  newConfig: any
): { newHistory: any[], newIndex: number } {
  // Create a more compact history entry
  const compactEntry = createCompactHistoryEntry(newConfig);
  
  // If we're in the middle of history, truncate
  let newHistory = historyIndex < history.length - 1 
    ? [...history.slice(0, historyIndex + 1), compactEntry]
    : [...history, compactEntry];
  
  // Keep history at manageable size
  newHistory = trimHistory(newHistory);
  
  // Adjust index if history was trimmed
  const newIndex = Math.min(newHistory.length - 1, newHistory.length - (history.length - historyIndex));
  
  return { newHistory, newIndex };
}