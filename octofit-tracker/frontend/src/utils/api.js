export function getApiBaseUrl() {
  const codespaceName =
    typeof import.meta.env.VITE_CODESPACE_NAME === 'string'
      ? import.meta.env.VITE_CODESPACE_NAME.trim()
      : '';

  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev`;
  }

  return 'http://localhost:8000';
}

export function buildApiUrl(resource = '') {
  const cleanResource = String(resource || '').replace(/^\/+/, '').replace(/\/+$/, '');

  if (!cleanResource) {
    return `${getApiBaseUrl()}/api/`;
  }

  return `${getApiBaseUrl()}/api/${cleanResource}/`;
}

export function normalizeDataResponse(payload) {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (payload && Array.isArray(payload.data)) {
    return payload.data;
  }

  if (payload && Array.isArray(payload.results)) {
    return payload.results;
  }

  if (payload && Array.isArray(payload.items)) {
    return payload.items;
  }

  if (payload && Array.isArray(payload.entries)) {
    return payload.entries;
  }

  return [];
}
