export interface BackgroundEffects {
  asciiMix: number;
  contrast: number;
  brightness: number;
  saturation: number;
  intensity: number;
}

export const DEFAULT_BACKGROUND_EFFECTS: BackgroundEffects = {
  asciiMix: 0,
  contrast: 100,
  brightness: 100,
  saturation: 110,
  intensity: 88,
};
