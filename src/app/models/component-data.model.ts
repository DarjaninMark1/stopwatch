export interface ComponentData {
    id: Number;
    type: 'timer' | 'stopwatch';
    durationInSeconds?: number; // Only needed for timer
    name?: string; // Only needed for timer
    color?: string; // Only needed for timer
  }
  