export interface FilterPreset {
  id: string;
  name: string;
  filters: {
    department?: string;
    status?: string;
    searchQuery?: string;
  };
  createdAt: string;
}

const FILTER_PRESETS_KEY = 'filterPresets';

export const saveFilterPreset = (preset: Omit<FilterPreset, 'id' | 'createdAt'>): FilterPreset => {
  const presets = getFilterPresets();
  const newPreset: FilterPreset = {
    ...preset,
    id: String(Date.now()),
    createdAt: new Date().toISOString(),
  };
  
  presets.unshift(newPreset);
  localStorage.setItem(FILTER_PRESETS_KEY, JSON.stringify(presets.slice(0, 10))); // Keep last 10
  
  return newPreset;
};

export const getFilterPresets = (): FilterPreset[] => {
  try {
    const presets = localStorage.getItem(FILTER_PRESETS_KEY);
    return presets ? JSON.parse(presets) : [];
  } catch {
    return [];
  }
};

export const deleteFilterPreset = (id: string) => {
  const presets = getFilterPresets().filter(p => p.id !== id);
  localStorage.setItem(FILTER_PRESETS_KEY, JSON.stringify(presets));
};
