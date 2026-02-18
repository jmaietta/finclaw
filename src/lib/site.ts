export type SiteMode = 'skills' | 'souls'

/**
 * FinClaw branding + site config
 * Souls mode is intentionally disabled (treated as "skills") to keep the repo clean.
 */

// Canonical URL for the main site (skills). Override via VITE_SITE_URL.
const DEFAULT_SITE_URL = 'https://www.finclaw.dev'

const DEFAULT_FINCLAW_NAME = 'FinClaw'
const DEFAULT_FINCLAW_DESCRIPTION =
  'a finance-first skill registry for agents, with vector search.'

/**
 * Helpers
 */
function safeUrl(value?: string | null): URL | null {
  if (!value) return null
  try {
    return new URL(value)
  } catch {
    return null
  }
}

function getHostnameFromSiteUrl(siteUrl: string): string {
  const u = safeUrl(siteUrl)
  if (u?.hostname) return u.hostname
  // If someone passes "finclaw.dev" without scheme
  return siteUrl.replace(/^https?:\/\//, '').replace(/\/.*$/, '')
}

/**
 * ✅ New, clean names
 */
export function getSkillHubSiteUrl() {
  return import.meta.env.VITE_SITE_URL ?? DEFAULT_SITE_URL
}

/**
 * Souls is disabled. Keep function for compatibility, but always return SkillHub URL.
 */
export function getSoulHubSiteUrl() {
  return getSkillHubSiteUrl()
}

/**
 * Souls is disabled. Keep function for compatibility.
 */
export function getSoulHubHost() {
  return getHostnameFromSiteUrl(getSkillHubSiteUrl())
}

/**
 * ✅ Backwards-compatible aliases
 * Keep these so other files don't break if they import legacy names.
 */
export function getClawHubSiteUrl() {
  return getSkillHubSiteUrl()
}

export function getOnlyCrabsSiteUrl() {
  return getSkillHubSiteUrl()
}

export function getOnlyCrabsHost() {
  return getHostnameFromSiteUrl(getSkillHubSiteUrl())
}

/**
 * Mode detection
 * Souls is disabled, so we always return "skills".
 */
export function detectSiteMode(_host?: string | null): SiteMode {
  return 'skills'
}

export function detectSiteModeFromUrl(_value?: string | null): SiteMode {
  return 'skills'
}

export function getSiteMode(): SiteMode {
  // Allow forcing skills explicitly; ignore souls entirely.
  const forced = import.meta.env.VITE_SITE_MODE
  if (forced === 'skills') return 'skills'
  return 'skills'
}

/**
 * Branding strings
 */
export function getSiteName(_mode: SiteMode = getSiteMode()) {
  return import.meta.env.VITE_SKILLHUB_NAME ?? DEFAULT_FINCLAW_NAME
}

export function getSiteDescription(_mode: SiteMode = getSiteMode()) {
  return import.meta.env.VITE_SKILLHUB_DESCRIPTION ?? DEFAULT_FINCLAW_DESCRIPTION
}

export function getSiteUrlForMode(_mode: SiteMode = getSiteMode()) {
  return getSkillHubSiteUrl()
}
