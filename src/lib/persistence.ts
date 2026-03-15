
import { projects as initialProjects, Project } from './projects';
import { PlaceHolderImages as initialAssets, ImagePlaceholder } from './placeholder-images';

const PROJECTS_KEY = 'scw_projects_v1';
const ASSETS_KEY = 'scw_assets_v1';
const SETTINGS_KEY = 'scw_settings_v1';

export interface SiteSettings {
  usdtAddress: string;
  qrUrl: string;
}

export function getPersistentProjects(): Project[] {
  if (typeof window === 'undefined') return initialProjects;
  const stored = localStorage.getItem(PROJECTS_KEY);
  return stored ? JSON.parse(stored) : initialProjects;
}

export function savePersistentProjects(projects: Project[]) {
  localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
}

export function getPersistentAssets(): ImagePlaceholder[] {
  if (typeof window === 'undefined') return initialAssets;
  const stored = localStorage.getItem(ASSETS_KEY);
  return stored ? JSON.parse(stored) : initialAssets;
}

export function savePersistentAssets(assets: ImagePlaceholder[]) {
  localStorage.setItem(ASSETS_KEY, JSON.stringify(assets));
}

export function getPersistentSettings(): SiteSettings {
  const defaultQr = initialAssets.find(img => img.id === 'usdt-qr')?.imageUrl || '';
  const defaultSettings: SiteSettings = {
    usdtAddress: '0x6cdeb76a8901dfb1a90cf2bf0923e638bb3e10d7',
    qrUrl: defaultQr,
  };

  if (typeof window === 'undefined') return defaultSettings;
  const stored = localStorage.getItem(SETTINGS_KEY);
  return stored ? JSON.parse(stored) : defaultSettings;
}

export function savePersistentSettings(settings: SiteSettings) {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}
