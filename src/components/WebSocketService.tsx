import useWebSocket from '../hooks/useWebSocket';
import { ServiceProps } from '../lib/service';

const WebSocketService = ({ setConnected, setHeartRate }: ServiceProps) => {
  useWebSocket(
    (heartRate) => setHeartRate(heartRate),
    () => setConnected(true),
    () => {
      setConnected(false);
      setHeartRate(0);
    }
  );
  return <></>;
};

export default WebSocketService;
