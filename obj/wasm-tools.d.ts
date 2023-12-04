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
import { LocalWasmToolsTools } from './interfaces/local-wasm-tools-tools.js';
export const tools: typeof LocalWasmToolsTools;

export const $init: Promise<void>;
