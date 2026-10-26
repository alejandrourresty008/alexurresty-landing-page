export type Orientation = 'portrait' | 'landscape';
export type MediaItem =
  | { kind: 'video'; src: string; poster: string }
  | { kind: 'image'; src: string; alt: string }
  | { kind: 'link'; href: string; poster: string; label: string };
export interface Detail {
  title: string;
  description: string[];
  category: string;
  items: MediaItem[];
  profile?: { url: string; label: string };
}
export interface Service extends Detail { id: string; short: string; includes: string }
export interface Project extends Detail {
  id: string;
  client: string;
  preview: { src: string; poster: string; width: number; height: number };
}
export interface Chapter { id: string; format: Orientation; projects: Project[] }
