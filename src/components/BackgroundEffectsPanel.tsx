import type { BackgroundEffects } from '../types/background';

interface BackgroundEffectsPanelProps {
  effects: BackgroundEffects;
  onChange: (effects: BackgroundEffects) => void;
}

type EffectKey = keyof BackgroundEffects;

const SLIDERS: {
  key: EffectKey;
  label: string;
  min: number;
  max: number;
}[] = [
  { key: 'asciiMix', label: 'ASCII MIX', min: 0, max: 100 },
  { key: 'intensity', label: 'INTENSITY', min: 20, max: 100 },
  { key: 'contrast', label: 'CONTRAST', min: 60, max: 160 },
  { key: 'brightness', label: 'BRIGHTNESS', min: 60, max: 160 },
  { key: 'saturation', label: 'SATURATION', min: 0, max: 200 },
];

export function BackgroundEffectsPanel({
  effects,
  onChange,
}: BackgroundEffectsPanelProps) {
  const update = (key: EffectKey, value: number) => {
    onChange({ ...effects, [key]: value });
  };

  return (
    <aside
      className="bg-controls"
      onClick={(e) => e.stopPropagation()}
      onMouseDown={(e) => e.stopPropagation()}
      aria-label="Background image controls"
    >
      <header className="bg-controls__header">VISUAL.PARAMS</header>
      {SLIDERS.map(({ key, label, min, max }) => (
        <label key={key} className="bg-controls__row">
          <span className="bg-controls__label">{label}</span>
          <input
            type="range"
            className="bg-controls__slider"
            min={min}
            max={max}
            value={effects[key]}
            onChange={(e) => update(key, Number(e.target.value))}
          />
          <span className="bg-controls__value">{effects[key]}</span>
        </label>
      ))}
    </aside>
  );
}
