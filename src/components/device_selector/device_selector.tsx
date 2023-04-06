
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React, { useState, useEffect} from 'react';


type DeviceSelectorProps = {
  deviceType: 'videoinput' | 'audioInput' | 'audioOutput';
  onChange: (deviceId: string) => void;
}

const DeviceSelector: React.FC<DeviceSelectorProps> = ({ deviceType, onChange }) => {
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState('');

  useEffect(() => {
    const getDevices = async () => {
      const mediaDevices = await navigator.mediaDevices.enumerateDevices();


      const filteredDevices = mediaDevices.filter(device => device.kind === deviceType);
      setDevices(filteredDevices);

      if (filteredDevices.length > 0) {
        //setSelectedDeviceId(filteredDevices[0].deviceId);
        //onChange(filteredDevices[0].deviceId);
      }
    };
    getDevices();
  }, [deviceType, onChange]);

  const handleDeviceChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const deviceId = event.target.value as string;
    console.log(deviceId);
    setSelectedDeviceId(deviceId);
    onChange(deviceId);
  };

  return (
    <FormControl>
      <Select value={selectedDeviceId} label={deviceType} onChange={handleDeviceChange}>
        {devices.map(device => (
          <MenuItem key={device.deviceId} value={device.deviceId}>
            {device.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default DeviceSelector