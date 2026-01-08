export interface Story {
  id: number;
  image: string;
  title: string;
  description: string;
  date?: string;
  quote?: string;
  stats: {
    label: string;
    value: number; // 1-100
    color: string;
  }[];
}

export interface FloatingWord {
  id: number;
  text: string;
  x: number;
  y: number;
}