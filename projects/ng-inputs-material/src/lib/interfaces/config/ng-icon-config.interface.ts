export interface INgIconConfig {
  icon: string;
  className?: string;
  disabled?: boolean;
  color?: string;
  click?: (
    event: Event,
    input: any,
    icon: INgIconConfig,
    position?: 'left' | 'right' | 'loading'
  ) => void;
  hidden?: boolean;
}
export interface NgIconPositionsConfig {
  left?: INgIconConfig;
  right?: INgIconConfig;
  loading?: INgIconConfig;
}
