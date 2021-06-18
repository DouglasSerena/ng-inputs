export interface NgIconConfig {
  class: string;
  disabled?: boolean;
  color?: string;
  click?: (
    event: Event,
    input: any,
    icon: NgIconConfig,
    position?: 'left' | 'right'
  ) => void;
  hidden?: boolean;
}
export interface NgIconPositionsConfig {
  left?: NgIconConfig;
  right?: NgIconConfig;
  loading?: NgIconConfig;
}
