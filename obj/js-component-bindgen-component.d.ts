export type Files = [string, Uint8Array][];
export type Maps = [string, string][];
export type InstantiationMode = InstantiationModeAsync | InstantiationModeSync;
export interface InstantiationModeAsync {
  tag: 'async',
}
export interface InstantiationModeSync {
  tag: 'sync',
}
export interface GenerateOptions {
  name: string,
  noTypescript?: boolean,
  instantiation?: InstantiationMode,
  map?: Maps,
  compat?: boolean,
  noNodejsCompat?: boolean,
  base64Cutoff?: number,
  tlaCompat?: boolean,
  validLiftingOptimization?: boolean,
  tracing?: boolean,
  noNamespacedExports?: boolean,
}
export type Wit = WitSource | WitBinary | WitPath;
export interface WitSource {
  tag: 'source',
  val: string,
}
export interface WitBinary {
  tag: 'binary',
  val: Uint8Array,
}
export interface WitPath {
  tag: 'path',
  val: string,
}
export interface TypeGenerationOptions {
  wit: Wit,
  world?: string,
  tlaCompat?: boolean,
  instantiation?: InstantiationMode,
  map?: Maps,
}
/**
* # Variants
* 
* ## `"function"`
* 
* ## `"instance"`
*/
export type ExportType = 'function' | 'instance';
export interface Transpiled {
  files: Files,
  imports: string[],
  exports: [string, ExportType][],
}
import { WasiCliEnvironment } from './interfaces/wasi-cli-environment.js';
import { WasiCliExit } from './interfaces/wasi-cli-exit.js';
import { WasiCliStderr } from './interfaces/wasi-cli-stderr.js';
import { WasiCliStdin } from './interfaces/wasi-cli-stdin.js';
import { WasiCliStdout } from './interfaces/wasi-cli-stdout.js';
import { WasiCliTerminalInput } from './interfaces/wasi-cli-terminal-input.js';
import { WasiCliTerminalOutput } from './interfaces/wasi-cli-terminal-output.js';
import { WasiCliTerminalStderr } from './interfaces/wasi-cli-terminal-stderr.js';
import { WasiCliTerminalStdin } from './interfaces/wasi-cli-terminal-stdin.js';
import { WasiCliTerminalStdout } from './interfaces/wasi-cli-terminal-stdout.js';
import { WasiClocksWallClock } from './interfaces/wasi-clocks-wall-clock.js';
import { WasiFilesystemPreopens } from './interfaces/wasi-filesystem-preopens.js';
import { WasiFilesystemTypes } from './interfaces/wasi-filesystem-types.js';
import { WasiIoError } from './interfaces/wasi-io-error.js';
import { WasiIoStreams } from './interfaces/wasi-io-streams.js';
import { WasiRandomRandom } from './interfaces/wasi-random-random.js';
import { WasiSocketsTcp } from './interfaces/wasi-sockets-tcp.js';
export function generate(component: Uint8Array, options: GenerateOptions): Transpiled;
export function generateTypes(name: string, options: TypeGenerationOptions): Files;

export const $init: Promise<void>;
