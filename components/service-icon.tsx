// Trazados originales: Tabler Icons (MIT), https://tabler.io/icons
const paths: Record<string, string[]> = {
  "corporativo": [
    "M15 10l4.553 -2.276a1 1 0 0 1 1.447 .894v6.764a1 1 0 0 1 -1.447 .894l-4.553 -2.276v-4",
    "M3 8a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2l0 -8"
  ],
  "redes": [
    "M6 5a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2v-14",
    "M11 4h2",
    "M12 17v.01"
  ],
  "streaming": [
    "M18.364 19.364a9 9 0 1 0 -12.728 0",
    "M15.536 16.536a5 5 0 1 0 -7.072 0",
    "M11 13a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"
  ],
  "podcast": [
    "M9 5a3 3 0 0 1 3 -3a3 3 0 0 1 3 3v5a3 3 0 0 1 -3 3a3 3 0 0 1 -3 -3l0 -5",
    "M5 10a7 7 0 0 0 14 0",
    "M8 21l8 0",
    "M12 17l0 4"
  ]
};
export function ServiceIcon({ id }: { id: string }) {
  return <svg className="service-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" data-service-icon={id}>{(paths[id] || []).map(path => <path key={path} d={path} />)}</svg>;
}
