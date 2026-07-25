import { fetch } from '@tauri-apps/plugin-http';
import { v4 as uuidv4 } from 'uuid';

type GetWidgetResponse = {
  id: string;
  jsonrpc: string;
  result: {
    ramielUrl: string;
  };
  error?: {};
};

export const getWebSocketUrl = async (widgetId: string) => {
  const normalizedWidgetId = normalizeWidgetId(widgetId);
  if (!normalizedWidgetId) return '';

  const response = await fetch('https://api.stromno.com/v1/api/public/rpc', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      id: uuidv4(),
      jsonrpc: '2.0',
      method: 'getWidget',
      params: { widgetId: normalizedWidgetId },
    }),
  });

  if (response.status !== 200) return '';
  const data = (await response.json()) as GetWidgetResponse;
  if (data.error || !data.result?.ramielUrl) {
    return '';
  }

  return data.result.ramielUrl;
};

export const getLatestHeartRate = async (websocketUrl: string) => {
  const url = new URL(websocketUrl);
  url.protocol = 'https:';
  url.pathname = '/api/v1/data/heart_rate/latest';

  const response = await fetch(url.toString());
  if (response.status !== 200) return undefined;

  const data = (await response.json()) as {
    timestamp?: number;
    data?: { heartRate?: number; heart_rate?: number };
  };
  const heartRate = data.data?.heartRate ?? data.data?.heart_rate;
  const rawTimestamp = Number(data.timestamp);
  if (typeof heartRate !== 'number' || !Number.isFinite(heartRate) || !Number.isFinite(rawTimestamp)) {
    return undefined;
  }

  return { heartRate, timestamp: rawTimestamp < 1_000_000_000_000 ? rawTimestamp * 1000 : rawTimestamp };
};

function normalizeWidgetId(value: string) {
  const input = value.trim();
  if (!input) return '';

  try {
    const url = new URL(input.includes('://') ? input : `https://${input}`);
    const pathParts = url.pathname.split('/').filter(Boolean);
    if (url.hostname === 'pulsoid.net' && pathParts.length > 0) {
      return pathParts[pathParts.length - 1];
    }
  } catch {
    // Treat non-URL input as a raw widget ID below.
  }

  return input;
}
