import { useEffect } from 'react';
import { connected, disconnected, sendOscHeartRate } from '../lib/service';
import { useConfig } from '../lib/states';
import { getLatestHeartRate, getWebSocketUrl } from '../lib/stromno';

let timeout: ReturnType<typeof setTimeout>;

const useWebSocket = (onReceiveHeartrate?: (heartRate: number) => void, onConnected?: () => void, onDisconnect?: () => void) => {
  const config = useConfig((state) => state.config);

  useEffect(() => {
    if (!config?.stromno_widget_id) return;

    let cancelled = false;
    let streamUrl: string | undefined;

    const update = async () => {
      try {
        if (!streamUrl) {
          streamUrl = (await getWebSocketUrl(config.stromno_widget_id)) || undefined;
          if (!streamUrl || cancelled) return;
        }

        const reading = await getLatestHeartRate(streamUrl);
        if (cancelled || reading == null) {
          clearTimeout(timeout);
          onDisconnect?.();
          void disconnected();
          return;
        }

        const age = Date.now() - reading.timestamp;
        const timeoutMs = config.connected_timeout * 1000;
        if (age < 0 || age > timeoutMs) {
          clearTimeout(timeout);
          onDisconnect?.();
          void disconnected();
          return;
        }

        clearTimeout(timeout);
        onConnected?.();
        void connected();
        onReceiveHeartrate?.(reading.heartRate);
        void sendOscHeartRate(reading.heartRate);
        timeout = setTimeout(() => {
          onDisconnect?.();
          void disconnected();
        }, timeoutMs);
      } catch (err) {
        console.error('Pulsoid update failed', err);
        streamUrl = undefined;
        clearTimeout(timeout);
        onDisconnect?.();
        void disconnected();
      }
    };

    // Start immediately, then keep retrying URL discovery and data reads.
    void update();
    const pollTimer = setInterval(update, 1000);

    return () => {
      cancelled = true;
      clearInterval(pollTimer);
      clearTimeout(timeout);
    };
  }, [config]);
};

export default useWebSocket;
