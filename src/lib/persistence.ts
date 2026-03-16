
import { get, set } from 'idb-keyval';
import { projects as initialProjects, Project } from './projects';
import { PlaceHolderImages as initialAssets, ImagePlaceholder } from './placeholder-images';

// Stable keys for IndexedDB
const PROJECTS_KEY = 'scw_projects_v5';
const ASSETS_KEY = 'scw_assets_v5';
const SETTINGS_KEY = 'scw_settings_v5';

export interface SiteSettings {
  usdtAddress: string;
  qrUrl: string;
  logoUrl?: string;
}

export async function getPersistentProjects(): Promise<Project[]> {
  if (typeof window === 'undefined') return initialProjects;
  const stored = await get(PROJECTS_KEY);
  if (!stored) {
    await set(PROJECTS_KEY, initialProjects);
    return initialProjects;
  }
  return stored as Project[];
}

export async function savePersistentProjects(projects: Project[]): Promise<boolean> {
  if (typeof window === 'undefined') return false;
  try {
    await set(PROJECTS_KEY, projects);
    window.dispatchEvent(new Event('storage_update'));
    return true;
  } catch (e) {
    console.error('IndexedDB write failed:', e);
    return false;
  }
}

export async function getPersistentAssets(): Promise<ImagePlaceholder[]> {
  if (typeof window === 'undefined') return initialAssets;
  const stored = await get(ASSETS_KEY);
  if (!stored) {
    await set(ASSETS_KEY, initialAssets);
    return initialAssets;
  }
  return stored as ImagePlaceholder[];
}

export async function savePersistentAssets(assets: ImagePlaceholder[]): Promise<boolean> {
  if (typeof window === 'undefined') return false;
  try {
    await set(ASSETS_KEY, assets);
    window.dispatchEvent(new Event('storage_update'));
    return true;
  } catch (e) {
    console.error('Asset storage failed:', e);
    return false;
  }
}

export async function getPersistentSettings(): Promise<SiteSettings> {
  const defaultQr = initialAssets.find(img => img.id === 'usdt-qr')?.imageUrl || '';
  const defaultSettings: SiteSettings = {
    usdtAddress: '0x6cdeb76a8901dfb1a90cf2bf0923e638bb3e10d7',
    qrUrl: defaultQr,
    logoUrl: '',
  };

  if (typeof window === 'undefined') return defaultSettings;
  const stored = await get(SETTINGS_KEY);
  if (!stored) return defaultSettings;
  return stored as SiteSettings;
}

export async function savePersistentSettings(settings: SiteSettings): Promise<boolean> {
  if (typeof window === 'undefined') return false;
  try {
    await set(SETTINGS_KEY, settings);
    window.dispatchEvent(new Event('storage_update'));
    return true;
  } catch (e) {
    console.error('Settings storage failed:', e);
    return false;
  }
}
