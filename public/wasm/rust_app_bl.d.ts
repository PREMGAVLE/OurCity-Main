/* tslint:disable */
/* eslint-disable */
export function get_user_info(): any;
export function get_summary_data(period: string): any;
export function get_message_list(tag: string): any;
export class Feature {
  private constructor();
  free(): void;
}
export class Features {
  free(): void;
  constructor(category: string);
  get_features(): any;
}
export class Hostel {
  private constructor();
  free(): void;
}
export class HostelIncharge {
  private constructor();
  free(): void;
}
export class HostelManagement {
  free(): void;
  constructor(data: any);
  add_hostel(data: any): any;
  get_hostels(): any;
  get_hostel_incharge(search_query?: string | null): any;
}
export class Message {
  private constructor();
  free(): void;
}
export class Phone {
  free(): void;
  constructor(phone_number: string, country_code: string, otp?: string | null);
  register(): string;
  verify_otp(): string;
}
export class SendMessage {
  free(): void;
  constructor(facility_id: string, is_focus: boolean, search_query: string);
  get_list_chats(): any;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly __wbg_message_free: (a: number, b: number) => void;
  readonly __wbg_sendmessage_free: (a: number, b: number) => void;
  readonly sendmessage_new: (a: number, b: number, c: number, d: number, e: number) => number;
  readonly sendmessage_get_list_chats: (a: number) => any;
  readonly get_user_info: () => any;
  readonly get_summary_data: (a: number, b: number) => any;
  readonly get_message_list: (a: number, b: number) => any;
  readonly __wbg_hostel_free: (a: number, b: number) => void;
  readonly __wbg_hostelincharge_free: (a: number, b: number) => void;
  readonly __wbg_hostelmanagement_free: (a: number, b: number) => void;
  readonly hostelmanagement_new: (a: any) => number;
  readonly hostelmanagement_add_hostel: (a: number, b: any) => any;
  readonly hostelmanagement_get_hostels: (a: number) => any;
  readonly hostelmanagement_get_hostel_incharge: (a: number, b: number, c: number) => any;
  readonly __wbg_phone_free: (a: number, b: number) => void;
  readonly phone_new: (a: number, b: number, c: number, d: number, e: number, f: number) => number;
  readonly phone_register: (a: number) => [number, number];
  readonly phone_verify_otp: (a: number) => [number, number, number, number];
  readonly __wbg_feature_free: (a: number, b: number) => void;
  readonly __wbg_features_free: (a: number, b: number) => void;
  readonly features_new: (a: number, b: number) => number;
  readonly features_get_features: (a: number) => any;
  readonly __wbindgen_exn_store: (a: number) => void;
  readonly __externref_table_alloc: () => number;
  readonly __wbindgen_export_2: WebAssembly.Table;
  readonly __wbindgen_malloc: (a: number, b: number) => number;
  readonly __wbindgen_realloc: (a: number, b: number, c: number, d: number) => number;
  readonly __wbindgen_free: (a: number, b: number, c: number) => void;
  readonly __externref_table_dealloc: (a: number) => void;
  readonly __wbindgen_start: () => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;
/**
* Instantiates the given `module`, which can either be bytes or
* a precompiled `WebAssembly.Module`.
*
* @param {{ module: SyncInitInput }} module - Passing `SyncInitInput` directly is deprecated.
*
* @returns {InitOutput}
*/
export function initSync(module: { module: SyncInitInput } | SyncInitInput): InitOutput;

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {{ module_or_path: InitInput | Promise<InitInput> }} module_or_path - Passing `InitInput` directly is deprecated.
*
* @returns {Promise<InitOutput>}
*/
export default function __wbg_init (module_or_path?: { module_or_path: InitInput | Promise<InitInput> } | InitInput | Promise<InitInput>): Promise<InitOutput>;
