// ─────────────────────────────────────────────────────────────
//  CONTACT SETTINGS — fill these in before publishing.
//  Leave a value as an empty string ('') to hide/disable it.
//  Nothing here is invented: all channels start unconfigured.
// ─────────────────────────────────────────────────────────────

export const contactConfig = {
  /** Email that receives project requests, e.g. 'hello@yourdomain.com' */
  email: 'aecreativestudio.agency@gmail.com',

  /** Telegram username WITHOUT '@', e.g. 'ae_creative_studio' → https://t.me/ae_creative_studio */
  telegram: '',

  /** WhatsApp number in international format, digits only, e.g. '380501234567' → https://wa.me/380501234567 */
  whatsapp: '',

  /**
   * Optional form endpoint (e.g. Formspree / Getform / your own API) that accepts a JSON POST.
   * If empty, the form uses a mailto: fallback that opens the visitor's email app.
   */
  formEndpoint: '',
};

export const isConfigured = (value: string) => value.trim().length > 0;
