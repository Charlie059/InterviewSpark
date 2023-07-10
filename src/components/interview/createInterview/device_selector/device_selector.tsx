import { MenuItem, Select, SelectChangeEvent } from '@mui/material'
import React, { useState, useEffect } from 'react'

type DeviceSelectorProps = {
  deviceType: 'videoinput' | 'audioinput' | 'audiooutput'
  onChange: (deviceId: string) => void
  defaultDevice: string
}

const DeviceSelector: React.FC<DeviceSelectorProps> = ({ deviceType, onChange, defaultDevice }) => {
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([])
  const [selectedDeviceId, setSelectedDeviceId] = useState(defaultDevice)

  useEffect(() => {
    const getDevices = async () => {
      const mediaDevices = await navigator.mediaDevices.enumerateDevices()

      const filteredDevices = mediaDevices.filter(device => device.kind === deviceType)
      setDevices(filteredDevices)

      if (filteredDevices.length > 0 && !selectedDeviceId) {
        setSelectedDeviceId(filteredDevices[0].deviceId)
        onChange(filteredDevices[0].deviceId)
      }
    }
    getDevices()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deviceType])

  const handleChange = (event: SelectChangeEvent<string>) => {
    setSelectedDeviceId(event.target.value as string)
    onChange(event.target.value as string)
  }

  return (
    <Select value={selectedDeviceId} sx={{ width: '100%' }} onChange={handleChange}>
      {devices.map(device => (
        <MenuItem key={device.deviceId} value={device.deviceId}>
          {device.label}
        </MenuItem>
      ))}
    </Select>
  )
}

export default DeviceSelector
