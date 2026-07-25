import { useConfig } from './states';

const CONFIG_KEY = 'hr-osc.config';

export const defaultConfig: IConfig = {
  service_type: 'stromno',
  http_server_port: 8080,
  stromno_widget_id: '',

  osc_path_connected: '/avatar/parameters/hr_connected',
  osc_path_percent: '/avatar/parameters/hr_percent',

  connected_timeout: 10,
  max_heart_rate: 200,

  osc_client_host: '127.0.0.1',
  osc_client_port: 9000,
};

export async function getConfig() {
  const read = window.localStorage.getItem(CONFIG_KEY);
  if (!read) {
    await saveConfig(defaultConfig);
    return { ...defaultConfig };
  }

  try {
    const parse = JSON.parse(read);
    return { ...defaultConfig, ...parse };
  } catch (err) {
    console.error('Could not parse saved config, using defaults:', err);
    await saveConfig(defaultConfig);
    return { ...defaultConfig };
  }
}

export async function saveConfig(config: IConfig) {
  window.localStorage.setItem(CONFIG_KEY, JSON.stringify(config));
  useConfig.getState().setConfig({ ...defaultConfig, ...config });
}

export interface IConfig {
  service_type: 'http' | 'stromno';
  http_server_port: number;
  stromno_widget_id: string;

  connected_timeout: number;
  max_heart_rate: number;

  osc_path_connected: string;
  osc_path_percent: string;

  osc_client_host: string;
  osc_client_port: number;
}
