
import { ProtocolData } from './types';

export const OCPP_DATA: ProtocolData = {
  introduction: [
    {
      id: 'intro',
      title: 'OCPP 1.6 Overview',
      content: 'The Open Charge Point Protocol (OCPP) 1.6 is the global industry standard for interoperability between EV Charging Stations and Central Systems. It defines a communication layer that allows hardware and software from different vendors to work together seamlessly.'
    },
    {
      id: 'json-websockets',
      title: 'The Move to JSON',
      content: 'OCPP 1.6 was the first version to introduce JSON over WebSockets (OCPP-J). This reduced overhead significantly compared to the older SOAP protocol and enabled push-based updates, which is vital for real-time status and smart charging.'
    }
  ],
  operations: [
    // --- CORE PROFILE ---
    {
      id: 'authorize',
      title: 'Authorize',
      profile: 'Core',
      initiator: 'Charge Point',
      description: 'Used by the Charge Point to authenticate a user identifier (RFID tag, mobile app ID) before allowing a session to start.',
      messages: ['Authorize.req', 'Authorize.conf']
    },
    {
      id: 'boot-notification',
      title: 'Boot Notification',
      profile: 'Core',
      initiator: 'Charge Point',
      description: 'Sent by the Charge Point on startup to identify itself to the Central System and request synchronization.',
      messages: ['BootNotification.req', 'BootNotification.conf']
    },
    {
      id: 'heartbeat',
      title: 'Heartbeat',
      profile: 'Core',
      initiator: 'Charge Point',
      description: 'Periodic message to inform the Central System that the Charge Point is still alive and to sync time.',
      messages: ['Heartbeat.req', 'Heartbeat.conf']
    },
    {
      id: 'status-notification',
      title: 'Status Notification',
      profile: 'Core',
      initiator: 'Charge Point',
      description: 'Reports changes in the operational status of the Charge Point or a specific connector.',
      messages: ['StatusNotification.req', 'StatusNotification.conf']
    },
    {
      id: 'start-transaction',
      title: 'Start Transaction',
      profile: 'Core',
      initiator: 'Charge Point',
      description: 'Sent when a charging session begins. Includes the initial meter value and user identity.',
      messages: ['StartTransaction.req', 'StartTransaction.conf']
    },
    {
      id: 'stop-transaction',
      title: 'Stop Transaction',
      profile: 'Core',
      initiator: 'Charge Point',
      description: 'Sent when a session ends. Includes final meter value and optional reason for stopping.',
      messages: ['StopTransaction.req', 'StopTransaction.conf']
    },
    {
      id: 'meter-values',
      title: 'Meter Values',
      profile: 'Core',
      initiator: 'Charge Point',
      description: 'Periodic transmission of energy usage, power, voltage, and other sampled values during a transaction.',
      messages: ['MeterValues.req', 'MeterValues.conf']
    },
    {
      id: 'change-availability',
      title: 'Change Availability',
      profile: 'Core',
      initiator: 'Central System',
      description: 'Central System requests a Charge Point or connector to change its availability (Operative or Inoperative).',
      messages: ['ChangeAvailability.req', 'ChangeAvailability.conf']
    },
    {
      id: 'get-configuration',
      title: 'Get Configuration',
      profile: 'Core',
      initiator: 'Central System',
      description: 'Requests current values for specific configuration keys.',
      messages: ['GetConfiguration.req', 'GetConfiguration.conf']
    },
    {
      id: 'change-config',
      title: 'Change Configuration',
      profile: 'Core',
      initiator: 'Central System',
      description: 'Updates a specific configuration setting on the Charge Point.',
      messages: ['ChangeConfiguration.req', 'ChangeConfiguration.conf']
    },
    {
      id: 'remote-start',
      title: 'Remote Start Transaction',
      profile: 'Core',
      initiator: 'Central System',
      description: 'Instructs the Charge Point to start a transaction for a specific ID Tag on a specific connector.',
      messages: ['RemoteStartTransaction.req', 'RemoteStartTransaction.conf']
    },
    {
      id: 'remote-stop',
      title: 'Remote Stop Transaction',
      profile: 'Core',
      initiator: 'Central System',
      description: 'Instructs the Charge Point to end an ongoing transaction by ID.',
      messages: ['RemoteStopTransaction.req', 'RemoteStopTransaction.conf']
    },
    {
      id: 'reset',
      title: 'Reset',
      profile: 'Core',
      initiator: 'Central System',
      description: 'Requests a Hard reset (physical reboot) or Soft reset (restart application).',
      messages: ['Reset.req', 'Reset.conf']
    },
    {
      id: 'unlock-connector',
      title: 'Unlock Connector',
      profile: 'Core',
      initiator: 'Central System',
      description: 'Remotely releases the retention lock of a connector.',
      messages: ['UnlockConnector.req', 'UnlockConnector.conf']
    },

    // --- SMART CHARGING ---
    {
      id: 'set-charging-profile',
      title: 'Set Charging Profile',
      profile: 'Smart Charging',
      initiator: 'Central System',
      description: 'Sends a charging schedule to limit power or current over time.',
      messages: ['SetChargingProfile.req', 'SetChargingProfile.conf']
    },
    {
      id: 'clear-charging-profile',
      title: 'Clear Charging Profile',
      profile: 'Smart Charging',
      initiator: 'Central System',
      description: 'Deletes one or more charging profiles stored on the Charge Point.',
      messages: ['ClearChargingProfile.req', 'ClearChargingProfile.conf']
    },
    {
      id: 'get-composite-schedule',
      title: 'Get Composite Schedule',
      profile: 'Smart Charging',
      initiator: 'Central System',
      description: 'Requests the combined power limit resulting from all active profiles.',
      messages: ['GetCompositeSchedule.req', 'GetCompositeSchedule.conf']
    },

    // --- FIRMWARE MANAGEMENT ---
    {
      id: 'update-firmware',
      title: 'Update Firmware',
      profile: 'Firmware Management',
      initiator: 'Central System',
      description: 'Provides a URL for a firmware image and coordinates the update process.',
      messages: ['UpdateFirmware.req', 'UpdateFirmware.conf']
    },
    {
      id: 'get-diagnostics',
      title: 'Get Diagnostics',
      profile: 'Firmware Management',
      initiator: 'Central System',
      description: 'Requests the Charge Point to upload system logs to a server.',
      messages: ['GetDiagnostics.req', 'GetDiagnostics.conf']
    },
    {
      id: 'diagnostics-status',
      title: 'Diagnostics Status',
      profile: 'Firmware Management',
      initiator: 'Charge Point',
      description: 'Updates the Central System on the progress of a log upload.',
      messages: ['DiagnosticsStatusNotification.req', 'DiagnosticsStatusNotification.conf']
    }
  ],
  messages: [
    {
      id: 'Authorize.req',
      name: 'Authorize.req',
      type: 'Request',
      description: 'Identifier authentication.',
      fields: [{ name: 'idTag', type: 'IdToken', cardinality: '1..1', description: 'User identifier.' }]
    },
    {
      id: 'Authorize.conf',
      name: 'Authorize.conf',
      type: 'Confirmation',
      description: 'Auth result.',
      fields: [{ name: 'idTagInfo', type: 'IdTagInfo', cardinality: '1..1', description: 'Status and parent ID.' }]
    },
    {
      id: 'MeterValues.req',
      name: 'MeterValues.req',
      type: 'Request',
      description: 'Periodic data transmission.',
      fields: [
        { name: 'connectorId', type: 'integer', cardinality: '1..1', description: 'Target connector.' },
        { name: 'transactionId', type: 'integer', cardinality: '0..1', description: 'Associated transaction.' },
        { name: 'meterValue', type: 'MeterValue[]', cardinality: '1..*', description: 'Array of sampled data.' }
      ]
    },
    {
      id: 'MeterValues.conf',
      name: 'MeterValues.conf',
      type: 'Confirmation',
      description: 'Acknowledgement of data.',
      fields: []
    },
    {
      id: 'ChangeAvailability.req',
      name: 'ChangeAvailability.req',
      type: 'Request',
      description: 'Change op status.',
      fields: [
        { name: 'connectorId', type: 'integer', cardinality: '1..1', description: '0 for all, or specific ID.' },
        { name: 'type', type: 'AvailabilityType', cardinality: '1..1', description: 'Operative or Inoperative.' }
      ]
    },
    {
      id: 'ChangeAvailability.conf',
      name: 'ChangeAvailability.conf',
      type: 'Confirmation',
      description: 'Availability result.',
      fields: [{ name: 'status', type: 'AvailabilityStatus', cardinality: '1..1', description: 'Accepted/Scheduled/Rejected.' }]
    },
    {
      id: 'StartTransaction.req',
      name: 'StartTransaction.req',
      type: 'Request',
      description: 'Initiate session.',
      fields: [
        { name: 'connectorId', type: 'integer', cardinality: '1..1', description: 'Connector ID.' },
        { name: 'idTag', type: 'IdToken', cardinality: '1..1', description: 'User ID.' },
        { name: 'meterStart', type: 'integer', cardinality: '1..1', description: 'Meter at start.' },
        { name: 'timestamp', type: 'dateTime', cardinality: '1..1', description: 'Start time.' }
      ]
    },
    {
      id: 'StartTransaction.conf',
      name: 'StartTransaction.conf',
      type: 'Confirmation',
      description: 'Start result.',
      fields: [
        { name: 'idTagInfo', type: 'IdTagInfo', cardinality: '1..1', description: 'Auth details.' },
        { name: 'transactionId', type: 'integer', cardinality: '1..1', description: 'Unique transaction ID.' }
      ]
    },
    {
      id: 'RemoteStartTransaction.req',
      name: 'RemoteStartTransaction.req',
      type: 'Request',
      description: 'CS initiates session.',
      fields: [
        { name: 'connectorId', type: 'integer', cardinality: '0..1', description: 'Specific connector.' },
        { name: 'idTag', type: 'IdToken', cardinality: '1..1', description: 'Authorized ID.' },
        { name: 'chargingProfile', type: 'ChargingProfile', cardinality: '0..1', description: 'Initial profile.' }
      ]
    },
    {
      id: 'RemoteStartTransaction.conf',
      name: 'RemoteStartTransaction.conf',
      type: 'Confirmation',
      description: 'Remote start response.',
      fields: [{ name: 'status', type: 'RemoteStartStopStatus', cardinality: '1..1', description: 'Accepted or Rejected.' }]
    }
  ],
  types: [
    {
      name: 'IdTagInfo',
      description: 'Information about the authorization status of an idTag.',
      values: [
        { value: 'status', description: 'Accepted, Blocked, Expired, Invalid, ConcurrentTx.' },
        { value: 'expiryDate', description: 'When the idTag becomes invalid.' },
        { value: 'parentIdTag', description: 'Optional group identifier.' }
      ]
    },
    {
      name: 'MeterValue',
      description: 'Contains one or more sampled values at a given time.',
      values: [
        { value: 'timestamp', description: 'Time of measurement.' },
        { value: 'sampledValue', description: 'Array of measurements (Voltage, Current, Energy, etc.).' }
      ]
    },
    {
      name: 'AvailabilityStatus',
      description: 'Result of a ChangeAvailability.req.',
      values: [
        { value: 'Accepted', description: 'Status changed successfully.' },
        { value: 'Rejected', description: 'Request denied by Charge Point.' },
        { value: 'Scheduled', description: 'Will change after transaction ends.' }
      ]
    }
  ],
  configKeys: [
    { name: 'AuthorizeRemoteTxRequests', type: 'boolean', accessibility: 'RW', description: 'Whether the Charge Point should authorize remote start requests automatically.' },
    { name: 'ChargeProfileMaxStackLevel', type: 'integer', accessibility: 'R', description: 'Maximum depth of stacked charging profiles.' },
    { name: 'HeartbeatInterval', type: 'integer', accessibility: 'RW', description: 'Interval for heartbeat messages.' },
    { name: 'MeterValueSampleInterval', type: 'integer', accessibility: 'RW', description: 'Interval for periodic meter value sampling.' },
    { name: 'StopTransactionOnEVSideDisconnect', type: 'boolean', accessibility: 'RW', description: 'End transaction if cable is removed from vehicle.' },
    { name: 'MaxChargingProfilesInstalled', type: 'integer', accessibility: 'R', description: 'Max profiles that can be stored simultaneously.' }
  ]
};
