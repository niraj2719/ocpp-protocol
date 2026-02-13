
import { ProtocolData } from './types';

export const OCPP_DATA: ProtocolData = {
  introduction: [
    {
      id: 'intro',
      title: 'OCPP 1.6 Overview',
      content: 'The Open Charge Point Protocol (OCPP) is an open standard for communication between Electric Vehicle (EV) charging stations (Charge Points) and a central management system (Central System). Version 1.6 is the industry workhorse, featuring support for Smart Charging, JSON/WebSockets, and advanced diagnostics.'
    },
    {
      id: 'transport',
      title: 'OCPP-J vs OCPP-S',
      content: 'While OCPP 1.6 supports both SOAP (OCPP-S) and JSON (OCPP-J) over WebSockets, the industry has almost entirely shifted to OCPP-J for its efficiency, lower latency, and support for push-based communication without complex polling.'
    },
    {
      id: 'profiles-desc',
      title: 'Functional Profiles',
      content: 'The specification is organized into functional profiles. A Charge Point must support the Core profile, while others like Smart Charging or Firmware Management are optional but highly recommended for managed networks.'
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
      description: 'Queries the values of specific configuration keys from the Charge Point.',
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
      id: 'remote-start',
      title: 'Remote Start Transaction',
      profile: 'Core',
      initiator: 'Central System',
      description: 'Allows the Central System to remotely start a charging session.',
      messages: ['RemoteStartTransaction.req', 'RemoteStartTransaction.conf']
    },
    {
      id: 'remote-stop',
      title: 'Remote Stop Transaction',
      profile: 'Core',
      initiator: 'Central System',
      description: 'Instructs the Charge Point to stop an ongoing transaction.',
      messages: ['RemoteStopTransaction.req', 'RemoteStopTransaction.conf']
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
    {
      id: 'clear-cache',
      title: 'Clear Cache',
      profile: 'Core',
      initiator: 'Central System',
      description: 'Removes all identifiers from the local authorization cache.',
      messages: ['ClearCache.req', 'ClearCache.conf']
    },
    {
      id: 'data-transfer',
      title: 'Data Transfer',
      profile: 'Core',
      initiator: 'Charge Point',
      description: 'A custom message for vendor-specific data transfer.',
      messages: ['DataTransfer.req', 'DataTransfer.conf']
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
    {
      id: 'get-composite-schedule',
      title: 'Get Composite Schedule',
      profile: 'Smart Charging',
      initiator: 'Central System',
      description: 'Calculates the combined power limit of all active charging profiles.',
      messages: ['GetCompositeSchedule.req', 'GetCompositeSchedule.conf']
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
    {
      id: 'get-diagnostics',
      title: 'Get Diagnostics',
      profile: 'Firmware Management',
      initiator: 'Central System',
      description: 'Instructs the Charge Point to upload its logs to a specific location.',
      messages: ['GetDiagnostics.req', 'GetDiagnostics.conf']
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
    // --- CORE MESSAGES ---
    {
      id: 'Authorize.req',
      name: 'Authorize.req',
      type: 'Request',
      description: 'Sent by Charge Point to authenticate a user.',
      fields: [{ name: 'idTag', type: 'IdToken', cardinality: '1..1', description: 'Identifier of the user.' }]
    },
    {
      id: 'Authorize.conf',
      name: 'Authorize.conf',
      type: 'Confirmation',
      description: 'Central System response with auth status.',
      fields: [{ name: 'idTagInfo', type: 'IdTagInfo', cardinality: '1..1', description: 'Status and expiry details.' }]
    },
    {
      id: 'BootNotification.req',
      name: 'BootNotification.req',
      type: 'Request',
      description: 'Station identification on startup.',
      fields: [
        { name: 'chargePointModel', type: 'CiString20Type', cardinality: '1..1', description: 'Station model.' },
        { name: 'chargePointVendor', type: 'CiString20Type', cardinality: '1..1', description: 'Station vendor.' },
        { name: 'firmwareVersion', type: 'CiString50Type', cardinality: '0..1', description: 'Current firmware.' }
      ]
    },
    {
      id: 'BootNotification.conf',
      name: 'BootNotification.conf',
      type: 'Confirmation',
      description: 'Registration response.',
      fields: [
        { name: 'currentTime', type: 'dateTime', cardinality: '1..1', description: 'CS current time.' },
        { name: 'interval', type: 'integer', cardinality: '1..1', description: 'Heartbeat interval.' },
        { name: 'status', type: 'RegistrationStatus', cardinality: '1..1', description: 'Accepted/Pending/Rejected.' }
      ]
    },
    {
      id: 'Heartbeat.req',
      name: 'Heartbeat.req',
      type: 'Request',
      description: 'Check connectivity.',
      fields: []
    },
    {
      id: 'Heartbeat.conf',
      name: 'Heartbeat.conf',
      type: 'Confirmation',
      description: 'Keep-alive confirmation.',
      fields: [{ name: 'currentTime', type: 'dateTime', cardinality: '1..1', description: 'CS current time.' }]
    },
    {
      id: 'StatusNotification.req',
      name: 'StatusNotification.req',
      type: 'Request',
      description: 'Informs CS of status change.',
      fields: [
        { name: 'connectorId', type: 'integer', cardinality: '1..1', description: 'Connector ID (0 for station).' },
        { name: 'errorCode', type: 'ChargePointErrorCode', cardinality: '1..1', description: 'Error state.' },
        { name: 'status', type: 'ChargePointStatus', cardinality: '1..1', description: 'Current operational state.' }
      ]
    },
    {
      id: 'StatusNotification.conf',
      name: 'StatusNotification.conf',
      type: 'Confirmation',
      description: 'Acknowledgement of status.',
      fields: []
    },
    {
      id: 'StartTransaction.req',
      name: 'StartTransaction.req',
      type: 'Request',
      description: 'Begins a transaction.',
      fields: [
        { name: 'connectorId', type: 'integer', cardinality: '1..1', description: 'Connector used.' },
        { name: 'idTag', type: 'IdToken', cardinality: '1..1', description: 'Authorized ID.' },
        { name: 'meterStart', type: 'integer', cardinality: '1..1', description: 'Initial meter value.' },
        { name: 'timestamp', type: 'dateTime', cardinality: '1..1', description: 'Start time.' }
      ]
    },
    {
      id: 'StartTransaction.conf',
      name: 'StartTransaction.conf',
      type: 'Confirmation',
      description: 'Transaction start response.',
      fields: [
        { name: 'idTagInfo', type: 'IdTagInfo', cardinality: '1..1', description: 'ID details.' },
        { name: 'transactionId', type: 'integer', cardinality: '1..1', description: 'Unique transaction ID.' }
      ]
    },
    {
      id: 'StopTransaction.req',
      name: 'StopTransaction.req',
      type: 'Request',
      description: 'Ends a transaction.',
      fields: [
        { name: 'meterStop', type: 'integer', cardinality: '1..1', description: 'Final meter value.' },
        { name: 'timestamp', type: 'dateTime', cardinality: '1..1', description: 'Stop time.' },
        { name: 'transactionId', type: 'integer', cardinality: '1..1', description: 'ID of transaction.' }
      ]
    },
    {
      id: 'StopTransaction.conf',
      name: 'StopTransaction.conf',
      type: 'Confirmation',
      description: 'End acknowledgement.',
      fields: [{ name: 'idTagInfo', type: 'IdTagInfo', cardinality: '0..1', description: 'Updated ID status.' }]
    },
    {
      id: 'GetConfiguration.req',
      name: 'GetConfiguration.req',
      type: 'Request',
      description: 'Queries config keys.',
      fields: [{ name: 'key', type: 'string[]', cardinality: '0..*', description: 'Keys to query.' }]
    },
    {
      id: 'GetConfiguration.conf',
      name: 'GetConfiguration.conf',
      type: 'Confirmation',
      description: 'Returns key values.',
      fields: [
        { name: 'configurationKey', type: 'KeyValue[]', cardinality: '0..*', description: 'Retrieved keys.' },
        { name: 'unknownKey', type: 'string[]', cardinality: '0..*', description: 'Unrecognized keys.' }
      ]
    },
    {
      id: 'ChangeConfiguration.req',
      name: 'ChangeConfiguration.req',
      type: 'Request',
      description: 'Updates a config key.',
      fields: [
        { name: 'key', type: 'string', cardinality: '1..1', description: 'Key name.' },
        { name: 'value', type: 'string', cardinality: '1..1', description: 'New value.' }
      ]
    },
    {
      id: 'ChangeConfiguration.conf',
      name: 'ChangeConfiguration.conf',
      type: 'Confirmation',
      description: 'Update result.',
      fields: [{ name: 'status', type: 'ConfigurationStatus', cardinality: '1..1', description: 'Accepted/Rejected/etc.' }]
    },
    {
      id: 'RemoteStartTransaction.req',
      name: 'RemoteStartTransaction.req',
      type: 'Request',
      description: 'Remotely triggers a transaction.',
      fields: [
        { name: 'connectorId', type: 'integer', cardinality: '0..1', description: 'Connector ID.' },
        { name: 'idTag', type: 'IdToken', cardinality: '1..1', description: 'User ID.' }
      ]
    },
    {
      id: 'RemoteStartTransaction.conf',
      name: 'RemoteStartTransaction.conf',
      type: 'Confirmation',
      description: 'Trigger acknowledgement.',
      fields: [{ name: 'status', type: 'RemoteStartStopStatus', cardinality: '1..1', description: 'Accepted/Rejected.' }]
    },
    {
      id: 'RemoteStopTransaction.req',
      name: 'RemoteStopTransaction.req',
      type: 'Request',
      description: 'Stops a transaction remotely.',
      fields: [{ name: 'transactionId', type: 'integer', cardinality: '1..1', description: 'ID to stop.' }]
    },
    {
      id: 'RemoteStopTransaction.conf',
      name: 'RemoteStopTransaction.conf',
      type: 'Confirmation',
      description: 'Stop result.',
      fields: [{ name: 'status', type: 'RemoteStartStopStatus', cardinality: '1..1', description: 'Accepted/Rejected.' }]
    },
    {
      id: 'Reset.req',
      name: 'Reset.req',
      type: 'Request',
      description: 'Reboot instruction.',
      fields: [{ name: 'type', type: 'ResetType', cardinality: '1..1', description: 'Hard or Soft reset.' }]
    },
    {
      id: 'Reset.conf',
      name: 'Reset.conf',
      type: 'Confirmation',
      description: 'Reset status.',
      fields: [{ name: 'status', type: 'ResetStatus', cardinality: '1..1', description: 'Accepted/Rejected.' }]
    },
    {
      id: 'UnlockConnector.req',
      name: 'UnlockConnector.req',
      type: 'Request',
      description: 'Unlock retention lock.',
      fields: [{ name: 'connectorId', type: 'integer', cardinality: '1..1', description: 'Connector to unlock.' }]
    },
    {
      id: 'UnlockConnector.conf',
      name: 'UnlockConnector.conf',
      type: 'Confirmation',
      description: 'Unlock result.',
      fields: [{ name: 'status', type: 'UnlockStatus', cardinality: '1..1', description: 'Unlocked/Failed/NotSupported.' }]
    },
    {
      id: 'ClearCache.req',
      name: 'ClearCache.req',
      type: 'Request',
      description: 'Clear local cache.',
      fields: []
    },
    {
      id: 'ClearCache.conf',
      name: 'ClearCache.conf',
      type: 'Confirmation',
      description: 'Clear result.',
      fields: [{ name: 'status', type: 'ClearCacheStatus', cardinality: '1..1', description: 'Accepted/Rejected.' }]
    },
    {
      id: 'DataTransfer.req',
      name: 'DataTransfer.req',
      type: 'Request',
      description: 'Vendor custom data.',
      fields: [
        { name: 'vendorId', type: 'string', cardinality: '1..1', description: 'Unique vendor ID.' },
        { name: 'messageId', type: 'string', cardinality: '0..1', description: 'Custom message ID.' },
        { name: 'data', type: 'string', cardinality: '0..1', description: 'Custom payload.' }
      ]
    },
    {
      id: 'DataTransfer.conf',
      name: 'DataTransfer.conf',
      type: 'Confirmation',
      description: 'Custom response.',
      fields: [
        { name: 'status', type: 'DataTransferStatus', cardinality: '1..1', description: 'Accepted/Unknown/etc.' },
        { name: 'data', type: 'string', cardinality: '0..1', description: 'Custom data response.' }
      ]
    },

    // --- SMART CHARGING MESSAGES ---
    {
      id: 'SetChargingProfile.req',
      name: 'SetChargingProfile.req',
      type: 'Request',
      description: 'Update charging schedule.',
      fields: [
        { name: 'connectorId', type: 'integer', cardinality: '1..1', description: 'Target connector.' },
        { name: 'csChargingProfiles', type: 'ChargingProfile', cardinality: '1..1', description: 'The profile.' }
      ]
    },
    {
      id: 'SetChargingProfile.conf',
      name: 'SetChargingProfile.conf',
      type: 'Confirmation',
      description: 'Profile set status.',
      fields: [{ name: 'status', type: 'ChargingProfileStatus', cardinality: '1..1', description: 'Accepted/Rejected/etc.' }]
    },
    {
      id: 'ClearChargingProfile.req',
      name: 'ClearChargingProfile.req',
      type: 'Request',
      description: 'Remove profile.',
      fields: [{ name: 'id', type: 'integer', cardinality: '0..1', description: 'Profile ID.' }]
    },
    {
      id: 'ClearChargingProfile.conf',
      name: 'ClearChargingProfile.conf',
      type: 'Confirmation',
      description: 'Clear status.',
      fields: [{ name: 'status', type: 'ClearChargingProfileStatus', cardinality: '1..1', description: 'Accepted/Unknown.' }]
    },
    {
      id: 'GetCompositeSchedule.req',
      name: 'GetCompositeSchedule.req',
      type: 'Request',
      description: 'Calculate power limit.',
      fields: [
        { name: 'connectorId', type: 'integer', cardinality: '1..1', description: 'Target connector.' },
        { name: 'duration', type: 'integer', cardinality: '1..1', description: 'Calculation duration.' }
      ]
    },
    {
      id: 'GetCompositeSchedule.conf',
      name: 'GetCompositeSchedule.conf',
      type: 'Confirmation',
      description: 'Schedule result.',
      fields: [
        { name: 'status', type: 'GetCompositeScheduleStatus', cardinality: '1..1', description: 'Accepted/Rejected.' },
        { name: 'chargingSchedule', type: 'ChargingSchedule', cardinality: '0..1', description: 'Calculated schedule.' }
      ]
    },

    // --- FIRMWARE MGMT MESSAGES ---
    {
      id: 'UpdateFirmware.req',
      name: 'UpdateFirmware.req',
      type: 'Request',
      description: 'Start firmware update.',
      fields: [
        { name: 'location', type: 'anyURI', cardinality: '1..1', description: 'Image URL.' },
        { name: 'retrieveDate', type: 'dateTime', cardinality: '1..1', description: 'Retraction time.' }
      ]
    },
    {
      id: 'UpdateFirmware.conf',
      name: 'UpdateFirmware.conf',
      type: 'Confirmation',
      description: 'Update start acknowledgement.',
      fields: []
    },
    {
      id: 'DiagnosticsStatusNotification.req',
      name: 'DiagnosticsStatusNotification.req',
      type: 'Request',
      description: 'Upload progress report.',
      fields: [{ name: 'status', type: 'DiagnosticsStatus', cardinality: '1..1', description: 'Uploading, Idle, etc.' }]
    },
    {
      id: 'DiagnosticsStatusNotification.conf',
      name: 'DiagnosticsStatusNotification.conf',
      type: 'Confirmation',
      description: 'Report acknowledgement.',
      fields: []
    },
    {
      id: 'GetDiagnostics.req',
      name: 'GetDiagnostics.req',
      type: 'Request',
      description: 'Request log upload.',
      fields: [{ name: 'location', type: 'anyURI', cardinality: '1..1', description: 'Target upload URL.' }]
    },
    {
      id: 'GetDiagnostics.conf',
      name: 'GetDiagnostics.conf',
      type: 'Confirmation',
      description: 'Diagnostics response.',
      fields: [{ name: 'fileName', type: 'string', cardinality: '0..1', description: 'Log filename.' }]
    },

    // --- RESERVATION MESSAGES ---
    {
      id: 'ReserveNow.req',
      name: 'ReserveNow.req',
      type: 'Request',
      description: 'Request reservation.',
      fields: [
        { name: 'connectorId', type: 'integer', cardinality: '1..1', description: 'Target connector.' },
        { name: 'expiryDate', type: 'dateTime', cardinality: '1..1', description: 'Expiration.' },
        { name: 'idTag', type: 'IdToken', cardinality: '1..1', description: 'User identifier.' }
      ]
    },
    {
      id: 'ReserveNow.conf',
      name: 'ReserveNow.conf',
      type: 'Confirmation',
      description: 'Reservation result.',
      fields: [{ name: 'status', type: 'ReservationStatus', cardinality: '1..1', description: 'Accepted/Faulted/Occupied.' }]
    },
    {
      id: 'CancelReservation.req',
      name: 'CancelReservation.req',
      type: 'Request',
      description: 'Stop reservation.',
      fields: [{ name: 'reservationId', type: 'integer', cardinality: '1..1', description: 'Unique ID.' }]
    },
    {
      id: 'CancelReservation.conf',
      name: 'CancelReservation.conf',
      type: 'Confirmation',
      description: 'Cancel result.',
      fields: [{ name: 'status', type: 'CancelReservationStatus', cardinality: '1..1', description: 'Accepted/Rejected.' }]
    },

    // --- LOCAL AUTH MESSAGES ---
    {
      id: 'SendLocalList.req',
      name: 'SendLocalList.req',
      type: 'Request',
      description: 'Transfer auth list.',
      fields: [
        { name: 'listVersion', type: 'integer', cardinality: '1..1', description: 'New list version.' },
        { name: 'updateType', type: 'UpdateType', cardinality: '1..1', description: 'Full or Differential.' }
      ]
    },
    {
      id: 'SendLocalList.conf',
      name: 'SendLocalList.conf',
      type: 'Confirmation',
      description: 'Transfer result.',
      fields: [{ name: 'status', type: 'UpdateStatus', cardinality: '1..1', description: 'Accepted/Failed.' }]
    },
    {
      id: 'GetLocalListVersion.req',
      name: 'GetLocalListVersion.req',
      type: 'Request',
      description: 'Check list version.',
      fields: []
    },
    {
      id: 'GetLocalListVersion.conf',
      name: 'GetLocalListVersion.conf',
      type: 'Confirmation',
      description: 'Return version.',
      fields: [{ name: 'listVersion', type: 'integer', cardinality: '1..1', description: 'Current list version.' }]
    },

    // --- REMOTE TRIGGER MESSAGES ---
    {
      id: 'TriggerMessage.req',
      name: 'TriggerMessage.req',
      type: 'Request',
      description: 'Force specific message.',
      fields: [
        { name: 'requestedMessage', type: 'MessageTrigger', cardinality: '1..1', description: 'BootNotification, etc.' },
        { name: 'connectorId', type: 'integer', cardinality: '0..1', description: 'Connector constraint.' }
      ]
    },
    {
      id: 'TriggerMessage.conf',
      name: 'TriggerMessage.conf',
      type: 'Confirmation',
      description: 'Trigger result.',
      fields: [{ name: 'status', type: 'TriggerMessageStatus', cardinality: '1..1', description: 'Accepted/Rejected.' }]
    }
  ],
  types: [
    {
      name: 'ChargePointStatus',
      description: 'Main operational states of a connector.',
      values: [
        { value: 'Available', description: 'Station is ready for a session.' },
        { value: 'Preparing', description: 'User/Cable detected but session not started.' },
        { value: 'Charging', description: 'Active energy delivery.' },
        { value: 'SuspendedEV', description: 'EV side stopped charging.' },
        { value: 'SuspendedEVSE', description: 'Station side stopped charging.' },
        { value: 'Finishing', description: 'Session ended, cable still connected.' },
        { value: 'Reserved', description: 'Unavailable to general users.' },
        { value: 'Unavailable', description: 'Station offline for maintenance.' },
        { value: 'Faulted', description: 'Station in error state.' }
      ]
    },
    {
      name: 'RegistrationStatus',
      description: 'Central System acceptance status of a Charge Point.',
      values: [
        { value: 'Accepted', description: 'Charge Point is fully authorized.' },
        { value: 'Pending', description: 'CS is processing, retry with Heartbeats.' },
        { value: 'Rejected', description: 'CS explicitly rejects this station.' }
      ]
    }
  ],
  configKeys: [
    { name: 'AuthorizeRemoteTxRequests', type: 'boolean', accessibility: 'RW', description: 'Authorize remote start requests automatically.' },
    { name: 'ClockAlignedDataInterval', type: 'integer', accessibility: 'RW', description: 'Seconds between clock-aligned samples.' },
    { name: 'ConnectionTimeOut', type: 'integer', accessibility: 'RW', description: 'Time before auto-cancel on inactivity.' },
    { name: 'HeartbeatInterval', type: 'integer', accessibility: 'RW', description: 'Seconds between heartbeats.' },
    { name: 'MeterValueSampleInterval', type: 'integer', accessibility: 'RW', description: 'Seconds between meter samples.' },
    { name: 'StopTransactionOnEVSideDisconnect', type: 'boolean', accessibility: 'RW', description: 'End transaction if EV is unplugged.' },
    { name: 'UnlockConnectorOnEVSideDisconnect', type: 'boolean', accessibility: 'RW', description: 'Unlock retention lock on unplug.' },
    { name: 'LocalAuthListEnabled', type: 'boolean', accessibility: 'RW', description: 'Enable/Disable local authorization list.' }
  ]
};
