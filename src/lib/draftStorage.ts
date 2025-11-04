export interface DraftRating {
  id: string;
  internId: string;
  periodId: string;
  ratings: { [key: string]: number };
  strengths: string;
  improvements: string;
  comments: string;
  attachments?: string[]; // Array of file IDs
  savedAt: string;
}

const DRAFT_KEY = 'ratingDrafts';

export const saveDraft = (draft: Omit<DraftRating, 'id' | 'savedAt'>): DraftRating => {
  const drafts = getDrafts();
  const existingIndex = drafts.findIndex(
    d => d.internId === draft.internId && d.periodId === draft.periodId
  );

  const newDraft: DraftRating = {
    ...draft,
    id: existingIndex >= 0 ? drafts[existingIndex].id : String(Date.now()),
    savedAt: new Date().toISOString()
  };

  if (existingIndex >= 0) {
    drafts[existingIndex] = newDraft;
  } else {
    drafts.unshift(newDraft);
  }

  localStorage.setItem(DRAFT_KEY, JSON.stringify(drafts));
  return newDraft;
};

export const getDrafts = (): DraftRating[] => {
  try {
    const drafts = localStorage.getItem(DRAFT_KEY);
    return drafts ? JSON.parse(drafts) : [];
  } catch {
    return [];
  }
};

export const getDraft = (internId: string, periodId: string): DraftRating | null => {
  const drafts = getDrafts();
  return drafts.find(d => d.internId === internId && d.periodId === periodId) || null;
};

export const deleteDraft = (id: string) => {
  const drafts = getDrafts().filter(d => d.id !== id);
  localStorage.setItem(DRAFT_KEY, JSON.stringify(drafts));
};

export const clearDrafts = () => {
  localStorage.removeItem(DRAFT_KEY);
};
