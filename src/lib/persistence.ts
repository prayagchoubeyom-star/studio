
import { projects as initialProjects, Project } from './projects';
import { PlaceHolderImages as initialAssets, ImagePlaceholder } from './placeholder-images';

const PROJECTS_KEY = 'scw_projects_v3';
const ASSETS_KEY = 'scw_assets_v3';
const SETTINGS_KEY = 'scw_settings_v3';

export interface SiteSettings {
  usdtAddress: string;
  qrUrl: string;
  logoUrl?: string;
}

export function getPersistentProjects(): Project[] {
  if (typeof window === 'undefined') return initialProjects;
  const stored = localStorage.getItem(PROJECTS_KEY);
  if (!stored) {
    localStorage.setItem(PROJECTS_KEY, JSON.stringify(initialProjects));
    return initialProjects;
  }
  try {
    return JSON.parse(stored);
  } catch (e) {
    return initialProjects;
  }
}

export function savePersistentProjects(projects: Project[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
  window.dispatchEvent(new Event('storage_update'));
}

export function getPersistentAssets(): ImagePlaceholder[] {
  if (typeof window === 'undefined') return initialAssets;
  const stored = localStorage.getItem(ASSETS_KEY);
  if (!stored) {
    localStorage.setItem(ASSETS_KEY, JSON.stringify(initialAssets));
    return initialAssets;
  }
  try {
    return JSON.parse(stored);
  } catch (e) {
    return initialAssets;
  }
}

export function savePersistentAssets(assets: ImagePlaceholder[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(ASSETS_KEY, JSON.stringify(assets));
  window.dispatchEvent(new Event('storage_update'));
}

export function getPersistentSettings(): SiteSettings {
  const defaultQr = initialAssets.find(img => img.id === 'usdt-qr')?.imageUrl || '';
  const defaultSettings: SiteSettings = {
    usdtAddress: '0x6cdeb76a8901dfb1a90cf2bf0923e638bb3e10d7',
    qrUrl: defaultQr,
    logoUrl: '',
  };

  if (typeof window === 'undefined') return defaultSettings;
  const stored = localStorage.getItem(SETTINGS_KEY);
  if (!stored) return defaultSettings;
  try {
    return JSON.parse(stored);
  } catch (e) {
    return defaultSettings;
  }
}

export function savePersistentSettings(settings: SiteSettings) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  window.dispatchEvent(new Event('storage_update'));
}
