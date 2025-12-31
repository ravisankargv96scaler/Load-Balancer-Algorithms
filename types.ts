
export enum AlgorithmTab {
  INTRO = 'intro',
  ROUND_ROBIN = 'round_robin',
  WEIGHTED_RR = 'weighted_rr',
  IP_HASH = 'ip_hash',
  LEAST_CONN = 'least_conn',
  SUMMARY = 'summary'
}

export interface Server {
  id: string;
  name: string;
  weight: number;
  connections: number;
  requestCount: number;
}

export interface RequestPacket {
  id: number;
  targetServerId: string;
  color: string;
}
