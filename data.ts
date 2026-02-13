
import { ProtocolData } from './types';

export const OCPP_DATA: ProtocolData = {
  introduction: [
    {
      id: 'intro',
      title: 'OCPP 1.6 Overview',
      content: 'The Open Charge Point Protocol (OCPP) is an open standard for communication between Electric Vehicle (EV) charging stations and a central management system. Version 1.6 is the industry workhorse, featuring support for Smart Charging, JSON/WebSockets, and advanced diagnostics.'
    },
    {
      id: 'transport',
      title: 'OCPP-J vs OCPP-S',
      content: 'While OCPP 1.6 supports both SOAP (OCPP-S) and JSON (OCPP-J) over WebSockets, the industry has almost entirely shifted to OCPP-J for its efficiency, lower latency, and support for push-based communication without complex polling.'
    }
  ],
  operations: [
    // --- CORE PROFILE ---
    {
      id: 'authorize',
      title: 'Authorize',
      profile: 'Core',
      initiator: 'Charge Point',
      description: 'Used by the Charge Point to authenticate a user identifier (RFID, App ID) before allowing a transaction.',
      messages: ['Authorize.req', 'Authorize.conf']
    },
    {
      id: 'boot-notification',
      title: 'Boot Notification',
      profile: 'Core',
      initiator: 'Charge Point',
      description: 'The first message sent upon power-up. Informs the Central System of the hardware details and firmware version.',
      messages: ['BootNotification.req', 'BootNotification.conf']
    },
    {
      id: 'heartbeat',
      title: 'Heartbeat',
      profile: 'Core',
      initiator: 'Charge Point',
      description: 'Sent periodically to maintain the connection and synchronize the internal clock.',
      messages: ['Heartbeat.req', 'Heartbeat.conf']
    },
    {
      id: 'status-notification',
      title: 'Status Notification',
      profile: 'Core',
      initiator: 'Charge Point',
      description: 'Notifies state changes (Available, Preparing, Charging, Faulted) for specific connectors.',
      messages: ['StatusNotification.req', 'StatusNotification.conf']
    },
    {
      id: 'start-transaction',
      title: 'Start Transaction',
      profile: 'Core',
      initiator: 'Charge Point',
      description: 'Marks the formal beginning of energy delivery and billing.',
      messages: ['StartTransaction.req', 'StartTransaction.conf']
    },
    {
      id: 'stop-transaction',
      title: 'Stop Transaction',
      profile: 'Core',
      initiator: 'Charge Point',
      description: 'Ends a charging session, providing final meter readings and optional reason for stopping.',
      messages: ['StopTransaction.req', 'StopTransaction.conf']
    },
    {
      id: 'get-configuration',
      title: 'Get Configuration',
      profile: 'Core',
      initiator: 'Central System',
      description: 'Allows the Central System to query the values of specific configuration keys from the Charge Point.',
      messages: ['GetConfiguration.req', 'GetConfiguration.conf']
    },
    {
      id: 'change-config',
      title: 'Change Configuration',
      profile: 'Core',
      initiator: 'Central System',
      description: 'Requests the Charge Point to change its configuration parameters.',
      messages: ['ChangeConfiguration.req', 'ChangeConfiguration.conf']
    },
    {
      id: 'reset',
      title: 'Reset',
      profile: 'Core',
      initiator: 'Central System',
      description: 'Instructs the Charge Point to perform a Hard or Soft reset.',
      messages: ['Reset.req', 'Reset.conf']
    },
    {
      id: 'unlock-connector',
      title: 'Unlock Connector',
      profile: 'Core',
      initiator: 'Central System',
      description: 'Remotely releases a charging cable if the user is unable to disconnect.',
      messages: ['UnlockConnector.req', 'UnlockConnector.conf']
    },
    // --- SMART CHARGING ---
    {
      id: 'set-charging-profile',
      title: 'Set Charging Profile',
      profile: 'Smart Charging',
      initiator: 'Central System',
      description: 'Sends a charging profile to manage load, setting power or current limits for specific time intervals.',
      messages: ['SetChargingProfile.req', 'SetChargingProfile.conf']
    },
    {
      id: 'clear-charging-profile',
      title: 'Clear Charging Profile',
      profile: 'Smart Charging',
      initiator: 'Central System',
      description: 'Removes active charging profiles, reverting the station to default behavior.',
      messages: ['ClearChargingProfile.req', 'ClearChargingProfile.conf']
    },
    // --- FIRMWARE MGMT ---
    {
      id: 'update-firmware',
      title: 'Update Firmware',
      profile: 'Firmware Management',
      initiator: 'Central System',
      description: 'Sends a URL for a new firmware image to be downloaded and installed.',
      messages: ['UpdateFirmware.req', 'UpdateFirmware.conf']
    },
    {
      id: 'diagnostics-status',
      title: 'Diagnostics Status',
      profile: 'Firmware Management',
      initiator: 'Charge Point',
      description: 'Informs the Central System about the progress of a log upload.',
      messages: ['DiagnosticsStatusNotification.req', 'DiagnosticsStatusNotification.conf']
    },
    // --- RESERVATION ---
    {
      id: 'reserve-now',
      title: 'Reserve Now',
      profile: 'Reservation',
      initiator: 'Central System',
      description: 'Reserves a specific connector for a user until a certain expiry time.',
      messages: ['ReserveNow.req', 'ReserveNow.conf']
    },
    {
      id: 'cancel-reservation',
      title: 'Cancel Reservation',
      profile: 'Reservation',
      initiator: 'Central System',
      description: 'Cancels an existing reservation for a connector.',
      messages: ['CancelReservation.req', 'CancelReservation.conf']
    },
    // --- LOCAL AUTH LIST MGMT ---
    {
      id: 'send-local-list',
      title: 'Send Local List',
      profile: 'Local Auth List Management',
      initiator: 'Central System',
      description: 'Sends a full or partial list of authorized idTags to be stored locally for offline use.',
      messages: ['SendLocalList.req', 'SendLocalList.conf']
    },
    {
      id: 'get-local-list-version',
      title: 'Get Local List Version',
      profile: 'Local Auth List Management',
      initiator: 'Central System',
      description: 'Queries the version of the Local Authorization List currently stored.',
      messages: ['GetLocalListVersion.req', 'GetLocalListVersion.conf']
    },
    // --- REMOTE TRIGGER ---
    {
      id: 'trigger-message',
      title: 'Trigger Message',
      profile: 'Remote Trigger',
      initiator: 'Central System',
      description: 'Requests the Charge Point to send a specific status or diagnostic message immediately.',
      messages: ['TriggerMessage.req', 'TriggerMessage.conf']
    }
  ],
  messages: [
    {
      id: 'Authorize.req',
      name: 'Authorize.req',
      type: 'Request',
      description: 'User authentication request.',
      fields: [{ name: 'idTag', type: 'IdToken', cardinality: '1..1', description: 'Identifier of the user.' }]
    },
    {
      id: 'Authorize.conf',
      name: 'Authorize.conf',
      type: 'Confirmation',
      description: 'Authentication result.',
      fields: [{ name: 'idTagInfo', type: 'IdTagInfo', cardinality: '1..1', description: 'Expiry, status, and parent ID.' }]
    },
    {
      id: 'BootNotification.req',
      name: 'BootNotification.req',
      type: 'Request',
      description: 'Device identity on startup.',
      fields: [
        { name: 'chargePointModel', type: 'CiString20Type', cardinality: '1..1', description: 'Model of the station.' },
        { name: 'chargePointVendor', type: 'CiString20Type', cardinality: '1..1', description: 'Manufacturer name.' },
        { name: 'chargeBoxSerialNumber', type: 'CiString25Type', cardinality: '0..1', description: 'Physical serial number.' }
      ]
    },
    {
      id: 'BootNotification.conf',
      name: 'BootNotification.conf',
      type: 'Confirmation',
      description: 'Central System response to boot.',
      fields: [
        { name: 'currentTime', type: 'dateTime', cardinality: '1..1', description: 'Current system time.' },
        { name: 'interval', type: 'integer', cardinality: '1..1', description: 'Heartbeat interval (seconds).' },
        { name: 'status', type: 'RegistrationStatus', cardinality: '1..1', description: 'Accepted, Pending, or Rejected.' }
      ]
    },
    {
      id: 'ReserveNow.req',
      name: 'ReserveNow.req',
      type: 'Request',
      description: 'Request to reserve a connector.',
      fields: [
        { name: 'connectorId', type: 'integer', cardinality: '1..1', description: 'Connector to reserve (0 for any).' },
        { name: 'expiryDate', type: 'dateTime', cardinality: '1..1', description: 'Time reservation expires.' },
        { name: 'idTag', type: 'IdToken', cardinality: '1..1', description: 'The user identifier.' },
        { name: 'reservationId', type: 'integer', cardinality: '1..1', description: 'Unique ID for this reservation.' }
      ]
    },
    {
      id: 'ReserveNow.conf',
      name: 'ReserveNow.conf',
      type: 'Confirmation',
      description: 'Result of reservation request.',
      fields: [{ name: 'status', type: 'ReservationStatus', cardinality: '1..1', description: 'Accepted, Faulted, Occupied, Rejected, or Unavailable.' }]
    },
    {
      id: 'SendLocalList.req',
      name: 'SendLocalList.req',
      type: 'Request',
      description: 'Update local auth list.',
      fields: [
        { name: 'listVersion', type: 'integer', cardinality: '1..1', description: 'Version number of the list.' },
        { name: 'localAuthorizationList', type: 'AuthorizationData[]', cardinality: '0..*', description: 'Array of idTags and info.' },
        { name: 'updateType', type: 'UpdateType', cardinality: '1..1', description: 'Differential or Full update.' }
      ]
    },
    {
      id: 'SendLocalList.conf',
      name: 'SendLocalList.conf',
      type: 'Confirmation',
      description: 'Result of auth list update.',
      fields: [{ name: 'status', type: 'UpdateStatus', cardinality: '1..1', description: 'Accepted, Failed, or NotSupported.' }]
    },
    {
      id: 'Heartbeat.req',
      name: 'Heartbeat.req',
      type: 'Request',
      description: 'Keep-alive message.',
      fields: []
    },
    {
      id: 'Heartbeat.conf',
      name: 'Heartbeat.conf',
      type: 'Confirmation',
      description: 'Response with time sync.',
      fields: [{ name: 'currentTime', type: 'dateTime', cardinality: '1..1', description: 'Central System time.' }]
    },
    {
      id: 'StatusNotification.req',
      name: 'StatusNotification.req',
      type: 'Request',
      description: 'State update.',
      fields: [
        { name: 'connectorId', type: 'integer', cardinality: '1..1', description: 'Connector ID.' },
        { name: 'errorCode', type: 'ChargePointErrorCode', cardinality: '1..1', description: 'Current error status.' },
        { name: 'status', type: 'ChargePointStatus', cardinality: '1..1', description: 'Operational status.' }
      ]
    }
  ],
  types: [
    {
      name: 'ChargePointStatus',
      description: 'Main operational states.',
      values: [
        { value: 'Available', description: 'Ready for charging.' },
        { value: 'Preparing', description: 'EV connected, awaiting session start.' },
        { value: 'Charging', description: 'Active energy transfer.' },
        { value: 'SuspendedEV', description: 'EV paused transfer.' },
        { value: 'SuspendedEVSE', description: 'Station paused transfer (e.g. Smart Charging limit).' },
        { value: 'Finishing', description: 'Session ended, cable still in.' },
        { value: 'Reserved', description: 'Held for a specific user.' },
        { value: 'Unavailable', description: 'Manually put offline.' },
        { value: 'Faulted', description: 'Hardware or software error.' }
      ]
    },
    {
      name: 'RegistrationStatus',
      description: 'Response to BootNotification.',
      values: [
        { value: 'Accepted', description: 'CS accepts the station.' },
        { value: 'Pending', description: 'CS is processing, retry later.' },
        { value: 'Rejected', description: 'Station is unknown or banned.' }
      ]
    },
    {
      name: 'ChargePointErrorCode',
      description: 'Error types in StatusNotification.',
      values: [
        { value: 'NoError', description: 'System healthy.' },
        { value: 'ConnectorLockFailure', description: 'Lock mechanism jammed.' },
        { value: 'EVCommunicationError', description: 'Protocol error with vehicle.' },
        { value: 'GroundFailure', description: 'GFCI trip or ground missing.' },
        { value: 'OverCurrentFailure', description: 'Current exceeded limit.' },
        { value: 'PowerLoss', description: 'Utility power dropped.' }
      ]
    }
  ],
  configKeys: [
    { name: 'AuthorizeRemoteTxRequests', type: 'boolean', accessibility: 'RW', description: 'Authorize remote start automatically.' },
    { name: 'ClockAlignedDataInterval', type: 'integer', accessibility: 'RW', description: 'Seconds between clock-aligned samples.' },
    { name: 'ConnectionTimeOut', type: 'integer', accessibility: 'RW', description: 'Time before auto-cancel on inactivity.' },
    { name: 'HeartbeatInterval', type: 'integer', accessibility: 'RW', description: 'Seconds between heartbeats.' },
    { name: 'MeterValueSampleInterval', type: 'integer', accessibility: 'RW', description: 'Seconds between meter samples.' },
    { name: 'StopTransactionOnEVSideDisconnect', type: 'boolean', accessibility: 'RW', description: 'End transaction if EV is unplugged.' },
    { name: 'UnlockConnectorOnEVSideDisconnect', type: 'boolean', accessibility: 'RW', description: 'Unlock retention lock on unplug.' },
    { name: 'LocalAuthListEnabled', type: 'boolean', accessibility: 'RW', description: 'Enable/Disable local authorization list.' }
  ]
};
