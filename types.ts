
export type FeatureProfile = 'Core' | 'Firmware Management' | 'Local Auth List Management' | 'Reservation' | 'Smart Charging' | 'Remote Trigger';

export interface Field {
  name: string;
  type: string;
  cardinality: string;
  description: string;
  required?: boolean;
}

export interface Message {
  id: string;
  name: string;
  type: 'Request' | 'Confirmation';
  description: string;
  fields: Field[];
}

export interface Operation {
  id: string;
  title: string;
  profile: FeatureProfile;
  initiator: 'Charge Point' | 'Central System';
  description: string;
  messages: string[]; // IDs of related messages
}

export interface Section {
  id: string;
  title: string;
  content?: string;
  subsections?: Section[];
}

export interface ProtocolData {
  introduction: Section[];
  operations: Operation[];
  messages: Message[];
  types: any[];
  configKeys: any[];
}
