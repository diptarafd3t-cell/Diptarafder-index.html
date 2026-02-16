export interface GeneratedImage {
  imageUrl: string;
  prompt: string;
  timestamp: number;
}

export interface AppState {
  originalImage: string | null;
  generatedImage: string | null;
  prompt: string;
  isLoading: boolean;
  error: string | null;
}
