import { environment, exit as exit$1, stderr, stdin, stdout, terminalInput, terminalOutput, terminalStderr, terminalStdin, terminalStdout } from '@bytecodealliance/preview2-shim/cli';
import { preopens, types } from '@bytecodealliance/preview2-shim/filesystem';
import { error, streams } from '@bytecodealliance/preview2-shim/io';
import { random } from '@bytecodealliance/preview2-shim/random';
const { getEnvironment } = environment;
const { exit } = exit$1;
const { getStderr } = stderr;
const { getStdin } = stdin;
const { getStdout } = stdout;
const { TerminalInput } = terminalInput;
const { TerminalOutput } = terminalOutput;
const { getTerminalStderr } = terminalStderr;
const { getTerminalStdin } = terminalStdin;
const { getTerminalStdout } = terminalStdout;
const { getDirectories } = preopens;
const { Descriptor,
  DirectoryEntryStream,
  filesystemErrorCode } = types;
const { Error: Error$1 } = error;
const { InputStream,
  OutputStream } = streams;
const { getRandomBytes } = random;

const base64Compile = str => WebAssembly.compile(typeof Buffer !== 'undefined' ? Buffer.from(str, 'base64') : Uint8Array.from(atob(str), b => b.charCodeAt(0)));

class ComponentError extends Error {
  constructor (value) {
    const enumerable = typeof value !== 'string';
    super(enumerable ? `${String(value)} (see error.payload)` : value);
    Object.defineProperty(this, 'payload', { value, enumerable });
  }
}

let dv = new DataView(new ArrayBuffer());
const dataView = mem => dv.buffer === mem.buffer ? dv : dv = new DataView(mem.buffer);

const isNode = typeof process !== 'undefined' && process.versions && process.versions.node;
let _fs;
async function fetchCompile (url) {
  if (isNode) {
    _fs = _fs || await import('fs/promises');
    return WebAssembly.compile(await _fs.readFile(url));
  }
  return fetch(url).then(WebAssembly.compileStreaming);
}

function getErrorPayload(e) {
  if (e && hasOwnProperty.call(e, 'payload')) return e.payload;
  return e;
}

const hasOwnProperty = Object.prototype.hasOwnProperty;

const instantiateCore = WebAssembly.instantiate;

const resourceHandleSymbol = Symbol('resource');

const symbolDispose = Symbol.dispose || Symbol.for('dispose');

function throwUninitialized() {
  throw new TypeError('Wasm uninitialized use `await $init` first');
}

const toUint64 = val => BigInt.asUintN(64, BigInt(val));

function toUint32(val) {
  return val >>> 0;
}

const utf8Decoder = new TextDecoder();

const utf8Encoder = new TextEncoder();

let utf8EncodedLen = 0;
function utf8Encode(s, realloc, memory) {
  if (typeof s !== 'string') throw new TypeError('expected a string');
  if (s.length === 0) {
    utf8EncodedLen = 0;
    return 1;
  }
  let allocLen = 0;
  let ptr = 0;
  let writtenTotal = 0;
  while (s.length > 0) {
    ptr = realloc(ptr, allocLen, 1, allocLen += s.length * 2);
    const { read, written } = utf8Encoder.encodeInto(
    s,
    new Uint8Array(memory.buffer, ptr + writtenTotal, allocLen - writtenTotal),
    );
    writtenTotal += written;
    s = s.slice(read);
  }
  utf8EncodedLen = writtenTotal;
  return ptr;
}

let exports0;
let exports1;

function trampoline8() {
  const ret = getStderr();
  if (!(ret instanceof OutputStream)) {
    throw new Error('Resource error: Not a valid "OutputStream" resource.');
  }
  var handle0 = handleCnt2++;
  handleTable2.set(handle0, { rep: ret, own: true });
  return handle0;
}

function trampoline9(arg0) {
  let variant0;
  switch (arg0) {
    case 0: {
      variant0= {
        tag: 'ok',
        val: undefined
      };
      break;
    }
    case 1: {
      variant0= {
        tag: 'err',
        val: undefined
      };
      break;
    }
    default: {
      throw new TypeError('invalid variant discriminant for expected');
    }
  }
  exit(variant0);
}

function trampoline10() {
  const ret = getStdin();
  if (!(ret instanceof InputStream)) {
    throw new Error('Resource error: Not a valid "InputStream" resource.');
  }
  var handle0 = handleCnt1++;
  handleTable1.set(handle0, { rep: ret, own: true });
  return handle0;
}

function trampoline11() {
  const ret = getStdout();
  if (!(ret instanceof OutputStream)) {
    throw new Error('Resource error: Not a valid "OutputStream" resource.');
  }
  var handle0 = handleCnt2++;
  handleTable2.set(handle0, { rep: ret, own: true });
  return handle0;
}
let exports2;

function trampoline12(arg0) {
  const ret = getDirectories();
  var vec3 = ret;
  var len3 = vec3.length;
  var result3 = realloc0(0, 0, 4, len3 * 12);
  for (let i = 0; i < vec3.length; i++) {
    const e = vec3[i];
    const base = result3 + i * 12;var [tuple0_0, tuple0_1] = e;
    if (!(tuple0_0 instanceof Descriptor)) {
      throw new Error('Resource error: Not a valid "Descriptor" resource.');
    }
    var handle1 = handleCnt3++;
    handleTable3.set(handle1, { rep: tuple0_0, own: true });
    dataView(memory0).setInt32(base + 0, handle1, true);
    var ptr2 = utf8Encode(tuple0_1, realloc0, memory0);
    var len2 = utf8EncodedLen;
    dataView(memory0).setInt32(base + 8, len2, true);
    dataView(memory0).setInt32(base + 4, ptr2, true);
  }
  dataView(memory0).setInt32(arg0 + 4, len3, true);
  dataView(memory0).setInt32(arg0 + 0, result3, true);
}
let memory0;
let realloc0;

function trampoline13(arg0, arg1, arg2) {
  var handle1 = arg0;
  var rsc0 = handleTable3.get(handle1).rep;
  let ret;
  try {
    ret = { tag: 'ok', val: Descriptor.prototype.readViaStream.call(rsc0, BigInt.asUintN(64, arg1)) };
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  var variant4 = ret;
  switch (variant4.tag) {
    case 'ok': {
      const e = variant4.val;
      dataView(memory0).setInt8(arg2 + 0, 0, true);
      if (!(e instanceof InputStream)) {
        throw new Error('Resource error: Not a valid "InputStream" resource.');
      }
      var handle2 = handleCnt1++;
      handleTable1.set(handle2, { rep: e, own: true });
      dataView(memory0).setInt32(arg2 + 4, handle2, true);
      break;
    }
    case 'err': {
      const e = variant4.val;
      dataView(memory0).setInt8(arg2 + 0, 1, true);
      var val3 = e;
      let enum3;
      switch (val3) {
        case 'access': {
          enum3 = 0;
          break;
        }
        case 'would-block': {
          enum3 = 1;
          break;
        }
        case 'already': {
          enum3 = 2;
          break;
        }
        case 'bad-descriptor': {
          enum3 = 3;
          break;
        }
        case 'busy': {
          enum3 = 4;
          break;
        }
        case 'deadlock': {
          enum3 = 5;
          break;
        }
        case 'quota': {
          enum3 = 6;
          break;
        }
        case 'exist': {
          enum3 = 7;
          break;
        }
        case 'file-too-large': {
          enum3 = 8;
          break;
        }
        case 'illegal-byte-sequence': {
          enum3 = 9;
          break;
        }
        case 'in-progress': {
          enum3 = 10;
          break;
        }
        case 'interrupted': {
          enum3 = 11;
          break;
        }
        case 'invalid': {
          enum3 = 12;
          break;
        }
        case 'io': {
          enum3 = 13;
          break;
        }
        case 'is-directory': {
          enum3 = 14;
          break;
        }
        case 'loop': {
          enum3 = 15;
          break;
        }
        case 'too-many-links': {
          enum3 = 16;
          break;
        }
        case 'message-size': {
          enum3 = 17;
          break;
        }
        case 'name-too-long': {
          enum3 = 18;
          break;
        }
        case 'no-device': {
          enum3 = 19;
          break;
        }
        case 'no-entry': {
          enum3 = 20;
          break;
        }
        case 'no-lock': {
          enum3 = 21;
          break;
        }
        case 'insufficient-memory': {
          enum3 = 22;
          break;
        }
        case 'insufficient-space': {
          enum3 = 23;
          break;
        }
        case 'not-directory': {
          enum3 = 24;
          break;
        }
        case 'not-empty': {
          enum3 = 25;
          break;
        }
        case 'not-recoverable': {
          enum3 = 26;
          break;
        }
        case 'unsupported': {
          enum3 = 27;
          break;
        }
        case 'no-tty': {
          enum3 = 28;
          break;
        }
        case 'no-such-device': {
          enum3 = 29;
          break;
        }
        case 'overflow': {
          enum3 = 30;
          break;
        }
        case 'not-permitted': {
          enum3 = 31;
          break;
        }
        case 'pipe': {
          enum3 = 32;
          break;
        }
        case 'read-only': {
          enum3 = 33;
          break;
        }
        case 'invalid-seek': {
          enum3 = 34;
          break;
        }
        case 'text-file-busy': {
          enum3 = 35;
          break;
        }
        case 'cross-device': {
          enum3 = 36;
          break;
        }
        default: {
          if ((e) instanceof Error) {
            console.error(e);
          }
          
          throw new TypeError(`"${val3}" is not one of the cases of error-code`);
        }
      }
      dataView(memory0).setInt8(arg2 + 4, enum3, true);
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline14(arg0, arg1, arg2) {
  var handle1 = arg0;
  var rsc0 = handleTable3.get(handle1).rep;
  let ret;
  try {
    ret = { tag: 'ok', val: Descriptor.prototype.writeViaStream.call(rsc0, BigInt.asUintN(64, arg1)) };
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  var variant4 = ret;
  switch (variant4.tag) {
    case 'ok': {
      const e = variant4.val;
      dataView(memory0).setInt8(arg2 + 0, 0, true);
      if (!(e instanceof OutputStream)) {
        throw new Error('Resource error: Not a valid "OutputStream" resource.');
      }
      var handle2 = handleCnt2++;
      handleTable2.set(handle2, { rep: e, own: true });
      dataView(memory0).setInt32(arg2 + 4, handle2, true);
      break;
    }
    case 'err': {
      const e = variant4.val;
      dataView(memory0).setInt8(arg2 + 0, 1, true);
      var val3 = e;
      let enum3;
      switch (val3) {
        case 'access': {
          enum3 = 0;
          break;
        }
        case 'would-block': {
          enum3 = 1;
          break;
        }
        case 'already': {
          enum3 = 2;
          break;
        }
        case 'bad-descriptor': {
          enum3 = 3;
          break;
        }
        case 'busy': {
          enum3 = 4;
          break;
        }
        case 'deadlock': {
          enum3 = 5;
          break;
        }
        case 'quota': {
          enum3 = 6;
          break;
        }
        case 'exist': {
          enum3 = 7;
          break;
        }
        case 'file-too-large': {
          enum3 = 8;
          break;
        }
        case 'illegal-byte-sequence': {
          enum3 = 9;
          break;
        }
        case 'in-progress': {
          enum3 = 10;
          break;
        }
        case 'interrupted': {
          enum3 = 11;
          break;
        }
        case 'invalid': {
          enum3 = 12;
          break;
        }
        case 'io': {
          enum3 = 13;
          break;
        }
        case 'is-directory': {
          enum3 = 14;
          break;
        }
        case 'loop': {
          enum3 = 15;
          break;
        }
        case 'too-many-links': {
          enum3 = 16;
          break;
        }
        case 'message-size': {
          enum3 = 17;
          break;
        }
        case 'name-too-long': {
          enum3 = 18;
          break;
        }
        case 'no-device': {
          enum3 = 19;
          break;
        }
        case 'no-entry': {
          enum3 = 20;
          break;
        }
        case 'no-lock': {
          enum3 = 21;
          break;
        }
        case 'insufficient-memory': {
          enum3 = 22;
          break;
        }
        case 'insufficient-space': {
          enum3 = 23;
          break;
        }
        case 'not-directory': {
          enum3 = 24;
          break;
        }
        case 'not-empty': {
          enum3 = 25;
          break;
        }
        case 'not-recoverable': {
          enum3 = 26;
          break;
        }
        case 'unsupported': {
          enum3 = 27;
          break;
        }
        case 'no-tty': {
          enum3 = 28;
          break;
        }
        case 'no-such-device': {
          enum3 = 29;
          break;
        }
        case 'overflow': {
          enum3 = 30;
          break;
        }
        case 'not-permitted': {
          enum3 = 31;
          break;
        }
        case 'pipe': {
          enum3 = 32;
          break;
        }
        case 'read-only': {
          enum3 = 33;
          break;
        }
        case 'invalid-seek': {
          enum3 = 34;
          break;
        }
        case 'text-file-busy': {
          enum3 = 35;
          break;
        }
        case 'cross-device': {
          enum3 = 36;
          break;
        }
        default: {
          if ((e) instanceof Error) {
            console.error(e);
          }
          
          throw new TypeError(`"${val3}" is not one of the cases of error-code`);
        }
      }
      dataView(memory0).setInt8(arg2 + 4, enum3, true);
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline15(arg0, arg1) {
  var handle1 = arg0;
  var rsc0 = handleTable3.get(handle1).rep;
  let ret;
  try {
    ret = { tag: 'ok', val: Descriptor.prototype.appendViaStream.call(rsc0) };
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  var variant4 = ret;
  switch (variant4.tag) {
    case 'ok': {
      const e = variant4.val;
      dataView(memory0).setInt8(arg1 + 0, 0, true);
      if (!(e instanceof OutputStream)) {
        throw new Error('Resource error: Not a valid "OutputStream" resource.');
      }
      var handle2 = handleCnt2++;
      handleTable2.set(handle2, { rep: e, own: true });
      dataView(memory0).setInt32(arg1 + 4, handle2, true);
      break;
    }
    case 'err': {
      const e = variant4.val;
      dataView(memory0).setInt8(arg1 + 0, 1, true);
      var val3 = e;
      let enum3;
      switch (val3) {
        case 'access': {
          enum3 = 0;
          break;
        }
        case 'would-block': {
          enum3 = 1;
          break;
        }
        case 'already': {
          enum3 = 2;
          break;
        }
        case 'bad-descriptor': {
          enum3 = 3;
          break;
        }
        case 'busy': {
          enum3 = 4;
          break;
        }
        case 'deadlock': {
          enum3 = 5;
          break;
        }
        case 'quota': {
          enum3 = 6;
          break;
        }
        case 'exist': {
          enum3 = 7;
          break;
        }
        case 'file-too-large': {
          enum3 = 8;
          break;
        }
        case 'illegal-byte-sequence': {
          enum3 = 9;
          break;
        }
        case 'in-progress': {
          enum3 = 10;
          break;
        }
        case 'interrupted': {
          enum3 = 11;
          break;
        }
        case 'invalid': {
          enum3 = 12;
          break;
        }
        case 'io': {
          enum3 = 13;
          break;
        }
        case 'is-directory': {
          enum3 = 14;
          break;
        }
        case 'loop': {
          enum3 = 15;
          break;
        }
        case 'too-many-links': {
          enum3 = 16;
          break;
        }
        case 'message-size': {
          enum3 = 17;
          break;
        }
        case 'name-too-long': {
          enum3 = 18;
          break;
        }
        case 'no-device': {
          enum3 = 19;
          break;
        }
        case 'no-entry': {
          enum3 = 20;
          break;
        }
        case 'no-lock': {
          enum3 = 21;
          break;
        }
        case 'insufficient-memory': {
          enum3 = 22;
          break;
        }
        case 'insufficient-space': {
          enum3 = 23;
          break;
        }
        case 'not-directory': {
          enum3 = 24;
          break;
        }
        case 'not-empty': {
          enum3 = 25;
          break;
        }
        case 'not-recoverable': {
          enum3 = 26;
          break;
        }
        case 'unsupported': {
          enum3 = 27;
          break;
        }
        case 'no-tty': {
          enum3 = 28;
          break;
        }
        case 'no-such-device': {
          enum3 = 29;
          break;
        }
        case 'overflow': {
          enum3 = 30;
          break;
        }
        case 'not-permitted': {
          enum3 = 31;
          break;
        }
        case 'pipe': {
          enum3 = 32;
          break;
        }
        case 'read-only': {
          enum3 = 33;
          break;
        }
        case 'invalid-seek': {
          enum3 = 34;
          break;
        }
        case 'text-file-busy': {
          enum3 = 35;
          break;
        }
        case 'cross-device': {
          enum3 = 36;
          break;
        }
        default: {
          if ((e) instanceof Error) {
            console.error(e);
          }
          
          throw new TypeError(`"${val3}" is not one of the cases of error-code`);
        }
      }
      dataView(memory0).setInt8(arg1 + 4, enum3, true);
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline16(arg0, arg1) {
  var handle1 = arg0;
  var rsc0 = handleTable3.get(handle1).rep;
  let ret;
  try {
    ret = { tag: 'ok', val: Descriptor.prototype.getType.call(rsc0) };
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  var variant4 = ret;
  switch (variant4.tag) {
    case 'ok': {
      const e = variant4.val;
      dataView(memory0).setInt8(arg1 + 0, 0, true);
      var val2 = e;
      let enum2;
      switch (val2) {
        case 'unknown': {
          enum2 = 0;
          break;
        }
        case 'block-device': {
          enum2 = 1;
          break;
        }
        case 'character-device': {
          enum2 = 2;
          break;
        }
        case 'directory': {
          enum2 = 3;
          break;
        }
        case 'fifo': {
          enum2 = 4;
          break;
        }
        case 'symbolic-link': {
          enum2 = 5;
          break;
        }
        case 'regular-file': {
          enum2 = 6;
          break;
        }
        case 'socket': {
          enum2 = 7;
          break;
        }
        default: {
          if ((e) instanceof Error) {
            console.error(e);
          }
          
          throw new TypeError(`"${val2}" is not one of the cases of descriptor-type`);
        }
      }
      dataView(memory0).setInt8(arg1 + 1, enum2, true);
      break;
    }
    case 'err': {
      const e = variant4.val;
      dataView(memory0).setInt8(arg1 + 0, 1, true);
      var val3 = e;
      let enum3;
      switch (val3) {
        case 'access': {
          enum3 = 0;
          break;
        }
        case 'would-block': {
          enum3 = 1;
          break;
        }
        case 'already': {
          enum3 = 2;
          break;
        }
        case 'bad-descriptor': {
          enum3 = 3;
          break;
        }
        case 'busy': {
          enum3 = 4;
          break;
        }
        case 'deadlock': {
          enum3 = 5;
          break;
        }
        case 'quota': {
          enum3 = 6;
          break;
        }
        case 'exist': {
          enum3 = 7;
          break;
        }
        case 'file-too-large': {
          enum3 = 8;
          break;
        }
        case 'illegal-byte-sequence': {
          enum3 = 9;
          break;
        }
        case 'in-progress': {
          enum3 = 10;
          break;
        }
        case 'interrupted': {
          enum3 = 11;
          break;
        }
        case 'invalid': {
          enum3 = 12;
          break;
        }
        case 'io': {
          enum3 = 13;
          break;
        }
        case 'is-directory': {
          enum3 = 14;
          break;
        }
        case 'loop': {
          enum3 = 15;
          break;
        }
        case 'too-many-links': {
          enum3 = 16;
          break;
        }
        case 'message-size': {
          enum3 = 17;
          break;
        }
        case 'name-too-long': {
          enum3 = 18;
          break;
        }
        case 'no-device': {
          enum3 = 19;
          break;
        }
        case 'no-entry': {
          enum3 = 20;
          break;
        }
        case 'no-lock': {
          enum3 = 21;
          break;
        }
        case 'insufficient-memory': {
          enum3 = 22;
          break;
        }
        case 'insufficient-space': {
          enum3 = 23;
          break;
        }
        case 'not-directory': {
          enum3 = 24;
          break;
        }
        case 'not-empty': {
          enum3 = 25;
          break;
        }
        case 'not-recoverable': {
          enum3 = 26;
          break;
        }
        case 'unsupported': {
          enum3 = 27;
          break;
        }
        case 'no-tty': {
          enum3 = 28;
          break;
        }
        case 'no-such-device': {
          enum3 = 29;
          break;
        }
        case 'overflow': {
          enum3 = 30;
          break;
        }
        case 'not-permitted': {
          enum3 = 31;
          break;
        }
        case 'pipe': {
          enum3 = 32;
          break;
        }
        case 'read-only': {
          enum3 = 33;
          break;
        }
        case 'invalid-seek': {
          enum3 = 34;
          break;
        }
        case 'text-file-busy': {
          enum3 = 35;
          break;
        }
        case 'cross-device': {
          enum3 = 36;
          break;
        }
        default: {
          if ((e) instanceof Error) {
            console.error(e);
          }
          
          throw new TypeError(`"${val3}" is not one of the cases of error-code`);
        }
      }
      dataView(memory0).setInt8(arg1 + 1, enum3, true);
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline17(arg0, arg1) {
  var handle1 = arg0;
  var rsc0 = handleTable3.get(handle1).rep;
  let ret;
  try {
    ret = { tag: 'ok', val: Descriptor.prototype.stat.call(rsc0) };
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  var variant11 = ret;
  switch (variant11.tag) {
    case 'ok': {
      const e = variant11.val;
      dataView(memory0).setInt8(arg1 + 0, 0, true);
      var {type: v2_0, linkCount: v2_1, size: v2_2, dataAccessTimestamp: v2_3, dataModificationTimestamp: v2_4, statusChangeTimestamp: v2_5 } = e;
      var val3 = v2_0;
      let enum3;
      switch (val3) {
        case 'unknown': {
          enum3 = 0;
          break;
        }
        case 'block-device': {
          enum3 = 1;
          break;
        }
        case 'character-device': {
          enum3 = 2;
          break;
        }
        case 'directory': {
          enum3 = 3;
          break;
        }
        case 'fifo': {
          enum3 = 4;
          break;
        }
        case 'symbolic-link': {
          enum3 = 5;
          break;
        }
        case 'regular-file': {
          enum3 = 6;
          break;
        }
        case 'socket': {
          enum3 = 7;
          break;
        }
        default: {
          if ((v2_0) instanceof Error) {
            console.error(v2_0);
          }
          
          throw new TypeError(`"${val3}" is not one of the cases of descriptor-type`);
        }
      }
      dataView(memory0).setInt8(arg1 + 8, enum3, true);
      dataView(memory0).setBigInt64(arg1 + 16, toUint64(v2_1), true);
      dataView(memory0).setBigInt64(arg1 + 24, toUint64(v2_2), true);
      var variant5 = v2_3;
      if (variant5 === null || variant5=== undefined) {
        dataView(memory0).setInt8(arg1 + 32, 0, true);
      } else {
        const e = variant5;
        dataView(memory0).setInt8(arg1 + 32, 1, true);
        var {seconds: v4_0, nanoseconds: v4_1 } = e;
        dataView(memory0).setBigInt64(arg1 + 40, toUint64(v4_0), true);
        dataView(memory0).setInt32(arg1 + 48, toUint32(v4_1), true);
      }
      var variant7 = v2_4;
      if (variant7 === null || variant7=== undefined) {
        dataView(memory0).setInt8(arg1 + 56, 0, true);
      } else {
        const e = variant7;
        dataView(memory0).setInt8(arg1 + 56, 1, true);
        var {seconds: v6_0, nanoseconds: v6_1 } = e;
        dataView(memory0).setBigInt64(arg1 + 64, toUint64(v6_0), true);
        dataView(memory0).setInt32(arg1 + 72, toUint32(v6_1), true);
      }
      var variant9 = v2_5;
      if (variant9 === null || variant9=== undefined) {
        dataView(memory0).setInt8(arg1 + 80, 0, true);
      } else {
        const e = variant9;
        dataView(memory0).setInt8(arg1 + 80, 1, true);
        var {seconds: v8_0, nanoseconds: v8_1 } = e;
        dataView(memory0).setBigInt64(arg1 + 88, toUint64(v8_0), true);
        dataView(memory0).setInt32(arg1 + 96, toUint32(v8_1), true);
      }
      break;
    }
    case 'err': {
      const e = variant11.val;
      dataView(memory0).setInt8(arg1 + 0, 1, true);
      var val10 = e;
      let enum10;
      switch (val10) {
        case 'access': {
          enum10 = 0;
          break;
        }
        case 'would-block': {
          enum10 = 1;
          break;
        }
        case 'already': {
          enum10 = 2;
          break;
        }
        case 'bad-descriptor': {
          enum10 = 3;
          break;
        }
        case 'busy': {
          enum10 = 4;
          break;
        }
        case 'deadlock': {
          enum10 = 5;
          break;
        }
        case 'quota': {
          enum10 = 6;
          break;
        }
        case 'exist': {
          enum10 = 7;
          break;
        }
        case 'file-too-large': {
          enum10 = 8;
          break;
        }
        case 'illegal-byte-sequence': {
          enum10 = 9;
          break;
        }
        case 'in-progress': {
          enum10 = 10;
          break;
        }
        case 'interrupted': {
          enum10 = 11;
          break;
        }
        case 'invalid': {
          enum10 = 12;
          break;
        }
        case 'io': {
          enum10 = 13;
          break;
        }
        case 'is-directory': {
          enum10 = 14;
          break;
        }
        case 'loop': {
          enum10 = 15;
          break;
        }
        case 'too-many-links': {
          enum10 = 16;
          break;
        }
        case 'message-size': {
          enum10 = 17;
          break;
        }
        case 'name-too-long': {
          enum10 = 18;
          break;
        }
        case 'no-device': {
          enum10 = 19;
          break;
        }
        case 'no-entry': {
          enum10 = 20;
          break;
        }
        case 'no-lock': {
          enum10 = 21;
          break;
        }
        case 'insufficient-memory': {
          enum10 = 22;
          break;
        }
        case 'insufficient-space': {
          enum10 = 23;
          break;
        }
        case 'not-directory': {
          enum10 = 24;
          break;
        }
        case 'not-empty': {
          enum10 = 25;
          break;
        }
        case 'not-recoverable': {
          enum10 = 26;
          break;
        }
        case 'unsupported': {
          enum10 = 27;
          break;
        }
        case 'no-tty': {
          enum10 = 28;
          break;
        }
        case 'no-such-device': {
          enum10 = 29;
          break;
        }
        case 'overflow': {
          enum10 = 30;
          break;
        }
        case 'not-permitted': {
          enum10 = 31;
          break;
        }
        case 'pipe': {
          enum10 = 32;
          break;
        }
        case 'read-only': {
          enum10 = 33;
          break;
        }
        case 'invalid-seek': {
          enum10 = 34;
          break;
        }
        case 'text-file-busy': {
          enum10 = 35;
          break;
        }
        case 'cross-device': {
          enum10 = 36;
          break;
        }
        default: {
          if ((e) instanceof Error) {
            console.error(e);
          }
          
          throw new TypeError(`"${val10}" is not one of the cases of error-code`);
        }
      }
      dataView(memory0).setInt8(arg1 + 8, enum10, true);
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline18(arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
  var handle1 = arg0;
  var rsc0 = handleTable3.get(handle1).rep;
  if ((arg1 & 4294967294) !== 0) {
    throw new TypeError('flags have extraneous bits set');
  }
  var flags2 = {
    symlinkFollow: Boolean(arg1 & 1),
  };
  var ptr3 = arg2;
  var len3 = arg3;
  var result3 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr3, len3));
  if ((arg4 & 4294967280) !== 0) {
    throw new TypeError('flags have extraneous bits set');
  }
  var flags4 = {
    create: Boolean(arg4 & 1),
    directory: Boolean(arg4 & 2),
    exclusive: Boolean(arg4 & 4),
    truncate: Boolean(arg4 & 8),
  };
  if ((arg5 & 4294967232) !== 0) {
    throw new TypeError('flags have extraneous bits set');
  }
  var flags5 = {
    read: Boolean(arg5 & 1),
    write: Boolean(arg5 & 2),
    fileIntegritySync: Boolean(arg5 & 4),
    dataIntegritySync: Boolean(arg5 & 8),
    requestedWriteSync: Boolean(arg5 & 16),
    mutateDirectory: Boolean(arg5 & 32),
  };
  let ret;
  try {
    ret = { tag: 'ok', val: Descriptor.prototype.openAt.call(rsc0, flags2, result3, flags4, flags5) };
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  var variant8 = ret;
  switch (variant8.tag) {
    case 'ok': {
      const e = variant8.val;
      dataView(memory0).setInt8(arg6 + 0, 0, true);
      if (!(e instanceof Descriptor)) {
        throw new Error('Resource error: Not a valid "Descriptor" resource.');
      }
      var handle6 = handleCnt3++;
      handleTable3.set(handle6, { rep: e, own: true });
      dataView(memory0).setInt32(arg6 + 4, handle6, true);
      break;
    }
    case 'err': {
      const e = variant8.val;
      dataView(memory0).setInt8(arg6 + 0, 1, true);
      var val7 = e;
      let enum7;
      switch (val7) {
        case 'access': {
          enum7 = 0;
          break;
        }
        case 'would-block': {
          enum7 = 1;
          break;
        }
        case 'already': {
          enum7 = 2;
          break;
        }
        case 'bad-descriptor': {
          enum7 = 3;
          break;
        }
        case 'busy': {
          enum7 = 4;
          break;
        }
        case 'deadlock': {
          enum7 = 5;
          break;
        }
        case 'quota': {
          enum7 = 6;
          break;
        }
        case 'exist': {
          enum7 = 7;
          break;
        }
        case 'file-too-large': {
          enum7 = 8;
          break;
        }
        case 'illegal-byte-sequence': {
          enum7 = 9;
          break;
        }
        case 'in-progress': {
          enum7 = 10;
          break;
        }
        case 'interrupted': {
          enum7 = 11;
          break;
        }
        case 'invalid': {
          enum7 = 12;
          break;
        }
        case 'io': {
          enum7 = 13;
          break;
        }
        case 'is-directory': {
          enum7 = 14;
          break;
        }
        case 'loop': {
          enum7 = 15;
          break;
        }
        case 'too-many-links': {
          enum7 = 16;
          break;
        }
        case 'message-size': {
          enum7 = 17;
          break;
        }
        case 'name-too-long': {
          enum7 = 18;
          break;
        }
        case 'no-device': {
          enum7 = 19;
          break;
        }
        case 'no-entry': {
          enum7 = 20;
          break;
        }
        case 'no-lock': {
          enum7 = 21;
          break;
        }
        case 'insufficient-memory': {
          enum7 = 22;
          break;
        }
        case 'insufficient-space': {
          enum7 = 23;
          break;
        }
        case 'not-directory': {
          enum7 = 24;
          break;
        }
        case 'not-empty': {
          enum7 = 25;
          break;
        }
        case 'not-recoverable': {
          enum7 = 26;
          break;
        }
        case 'unsupported': {
          enum7 = 27;
          break;
        }
        case 'no-tty': {
          enum7 = 28;
          break;
        }
        case 'no-such-device': {
          enum7 = 29;
          break;
        }
        case 'overflow': {
          enum7 = 30;
          break;
        }
        case 'not-permitted': {
          enum7 = 31;
          break;
        }
        case 'pipe': {
          enum7 = 32;
          break;
        }
        case 'read-only': {
          enum7 = 33;
          break;
        }
        case 'invalid-seek': {
          enum7 = 34;
          break;
        }
        case 'text-file-busy': {
          enum7 = 35;
          break;
        }
        case 'cross-device': {
          enum7 = 36;
          break;
        }
        default: {
          if ((e) instanceof Error) {
            console.error(e);
          }
          
          throw new TypeError(`"${val7}" is not one of the cases of error-code`);
        }
      }
      dataView(memory0).setInt8(arg6 + 4, enum7, true);
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline19(arg0, arg1) {
  var handle1 = arg0;
  var rsc0 = handleTable3.get(handle1).rep;
  let ret;
  try {
    ret = { tag: 'ok', val: Descriptor.prototype.metadataHash.call(rsc0) };
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  var variant4 = ret;
  switch (variant4.tag) {
    case 'ok': {
      const e = variant4.val;
      dataView(memory0).setInt8(arg1 + 0, 0, true);
      var {lower: v2_0, upper: v2_1 } = e;
      dataView(memory0).setBigInt64(arg1 + 8, toUint64(v2_0), true);
      dataView(memory0).setBigInt64(arg1 + 16, toUint64(v2_1), true);
      break;
    }
    case 'err': {
      const e = variant4.val;
      dataView(memory0).setInt8(arg1 + 0, 1, true);
      var val3 = e;
      let enum3;
      switch (val3) {
        case 'access': {
          enum3 = 0;
          break;
        }
        case 'would-block': {
          enum3 = 1;
          break;
        }
        case 'already': {
          enum3 = 2;
          break;
        }
        case 'bad-descriptor': {
          enum3 = 3;
          break;
        }
        case 'busy': {
          enum3 = 4;
          break;
        }
        case 'deadlock': {
          enum3 = 5;
          break;
        }
        case 'quota': {
          enum3 = 6;
          break;
        }
        case 'exist': {
          enum3 = 7;
          break;
        }
        case 'file-too-large': {
          enum3 = 8;
          break;
        }
        case 'illegal-byte-sequence': {
          enum3 = 9;
          break;
        }
        case 'in-progress': {
          enum3 = 10;
          break;
        }
        case 'interrupted': {
          enum3 = 11;
          break;
        }
        case 'invalid': {
          enum3 = 12;
          break;
        }
        case 'io': {
          enum3 = 13;
          break;
        }
        case 'is-directory': {
          enum3 = 14;
          break;
        }
        case 'loop': {
          enum3 = 15;
          break;
        }
        case 'too-many-links': {
          enum3 = 16;
          break;
        }
        case 'message-size': {
          enum3 = 17;
          break;
        }
        case 'name-too-long': {
          enum3 = 18;
          break;
        }
        case 'no-device': {
          enum3 = 19;
          break;
        }
        case 'no-entry': {
          enum3 = 20;
          break;
        }
        case 'no-lock': {
          enum3 = 21;
          break;
        }
        case 'insufficient-memory': {
          enum3 = 22;
          break;
        }
        case 'insufficient-space': {
          enum3 = 23;
          break;
        }
        case 'not-directory': {
          enum3 = 24;
          break;
        }
        case 'not-empty': {
          enum3 = 25;
          break;
        }
        case 'not-recoverable': {
          enum3 = 26;
          break;
        }
        case 'unsupported': {
          enum3 = 27;
          break;
        }
        case 'no-tty': {
          enum3 = 28;
          break;
        }
        case 'no-such-device': {
          enum3 = 29;
          break;
        }
        case 'overflow': {
          enum3 = 30;
          break;
        }
        case 'not-permitted': {
          enum3 = 31;
          break;
        }
        case 'pipe': {
          enum3 = 32;
          break;
        }
        case 'read-only': {
          enum3 = 33;
          break;
        }
        case 'invalid-seek': {
          enum3 = 34;
          break;
        }
        case 'text-file-busy': {
          enum3 = 35;
          break;
        }
        case 'cross-device': {
          enum3 = 36;
          break;
        }
        default: {
          if ((e) instanceof Error) {
            console.error(e);
          }
          
          throw new TypeError(`"${val3}" is not one of the cases of error-code`);
        }
      }
      dataView(memory0).setInt8(arg1 + 8, enum3, true);
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline20(arg0, arg1) {
  var handle1 = arg0;
  var rsc0 = handleTable0.get(handle1).rep;
  const ret = filesystemErrorCode(rsc0);
  var variant3 = ret;
  if (variant3 === null || variant3=== undefined) {
    dataView(memory0).setInt8(arg1 + 0, 0, true);
  } else {
    const e = variant3;
    dataView(memory0).setInt8(arg1 + 0, 1, true);
    var val2 = e;
    let enum2;
    switch (val2) {
      case 'access': {
        enum2 = 0;
        break;
      }
      case 'would-block': {
        enum2 = 1;
        break;
      }
      case 'already': {
        enum2 = 2;
        break;
      }
      case 'bad-descriptor': {
        enum2 = 3;
        break;
      }
      case 'busy': {
        enum2 = 4;
        break;
      }
      case 'deadlock': {
        enum2 = 5;
        break;
      }
      case 'quota': {
        enum2 = 6;
        break;
      }
      case 'exist': {
        enum2 = 7;
        break;
      }
      case 'file-too-large': {
        enum2 = 8;
        break;
      }
      case 'illegal-byte-sequence': {
        enum2 = 9;
        break;
      }
      case 'in-progress': {
        enum2 = 10;
        break;
      }
      case 'interrupted': {
        enum2 = 11;
        break;
      }
      case 'invalid': {
        enum2 = 12;
        break;
      }
      case 'io': {
        enum2 = 13;
        break;
      }
      case 'is-directory': {
        enum2 = 14;
        break;
      }
      case 'loop': {
        enum2 = 15;
        break;
      }
      case 'too-many-links': {
        enum2 = 16;
        break;
      }
      case 'message-size': {
        enum2 = 17;
        break;
      }
      case 'name-too-long': {
        enum2 = 18;
        break;
      }
      case 'no-device': {
        enum2 = 19;
        break;
      }
      case 'no-entry': {
        enum2 = 20;
        break;
      }
      case 'no-lock': {
        enum2 = 21;
        break;
      }
      case 'insufficient-memory': {
        enum2 = 22;
        break;
      }
      case 'insufficient-space': {
        enum2 = 23;
        break;
      }
      case 'not-directory': {
        enum2 = 24;
        break;
      }
      case 'not-empty': {
        enum2 = 25;
        break;
      }
      case 'not-recoverable': {
        enum2 = 26;
        break;
      }
      case 'unsupported': {
        enum2 = 27;
        break;
      }
      case 'no-tty': {
        enum2 = 28;
        break;
      }
      case 'no-such-device': {
        enum2 = 29;
        break;
      }
      case 'overflow': {
        enum2 = 30;
        break;
      }
      case 'not-permitted': {
        enum2 = 31;
        break;
      }
      case 'pipe': {
        enum2 = 32;
        break;
      }
      case 'read-only': {
        enum2 = 33;
        break;
      }
      case 'invalid-seek': {
        enum2 = 34;
        break;
      }
      case 'text-file-busy': {
        enum2 = 35;
        break;
      }
      case 'cross-device': {
        enum2 = 36;
        break;
      }
      default: {
        if ((e) instanceof Error) {
          console.error(e);
        }
        
        throw new TypeError(`"${val2}" is not one of the cases of error-code`);
      }
    }
    dataView(memory0).setInt8(arg1 + 1, enum2, true);
  }
}

function trampoline21(arg0, arg1, arg2) {
  var handle1 = arg0;
  var rsc0 = handleTable1.get(handle1).rep;
  let ret;
  try {
    ret = { tag: 'ok', val: InputStream.prototype.read.call(rsc0, BigInt.asUintN(64, arg1)) };
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  var variant5 = ret;
  switch (variant5.tag) {
    case 'ok': {
      const e = variant5.val;
      dataView(memory0).setInt8(arg2 + 0, 0, true);
      var val2 = e;
      var len2 = val2.byteLength;
      var ptr2 = realloc0(0, 0, 1, len2 * 1);
      var src2 = new Uint8Array(val2.buffer || val2, val2.byteOffset, len2 * 1);
      (new Uint8Array(memory0.buffer, ptr2, len2 * 1)).set(src2);
      dataView(memory0).setInt32(arg2 + 8, len2, true);
      dataView(memory0).setInt32(arg2 + 4, ptr2, true);
      break;
    }
    case 'err': {
      const e = variant5.val;
      dataView(memory0).setInt8(arg2 + 0, 1, true);
      var variant4 = e;
      switch (variant4.tag) {
        case 'last-operation-failed': {
          const e = variant4.val;
          dataView(memory0).setInt8(arg2 + 4, 0, true);
          if (!(e instanceof Error$1)) {
            throw new Error('Resource error: Not a valid "Error" resource.');
          }
          var handle3 = handleCnt0++;
          handleTable0.set(handle3, { rep: e, own: true });
          dataView(memory0).setInt32(arg2 + 8, handle3, true);
          break;
        }
        case 'closed': {
          dataView(memory0).setInt8(arg2 + 4, 1, true);
          break;
        }
        default: {
          throw new TypeError(`invalid variant tag value \`${JSON.stringify(variant4.tag)}\` (received \`${variant4}\`) specified for \`StreamError\``);
        }
      }
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline22(arg0, arg1, arg2) {
  var handle1 = arg0;
  var rsc0 = handleTable1.get(handle1).rep;
  let ret;
  try {
    ret = { tag: 'ok', val: InputStream.prototype.blockingRead.call(rsc0, BigInt.asUintN(64, arg1)) };
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  var variant5 = ret;
  switch (variant5.tag) {
    case 'ok': {
      const e = variant5.val;
      dataView(memory0).setInt8(arg2 + 0, 0, true);
      var val2 = e;
      var len2 = val2.byteLength;
      var ptr2 = realloc0(0, 0, 1, len2 * 1);
      var src2 = new Uint8Array(val2.buffer || val2, val2.byteOffset, len2 * 1);
      (new Uint8Array(memory0.buffer, ptr2, len2 * 1)).set(src2);
      dataView(memory0).setInt32(arg2 + 8, len2, true);
      dataView(memory0).setInt32(arg2 + 4, ptr2, true);
      break;
    }
    case 'err': {
      const e = variant5.val;
      dataView(memory0).setInt8(arg2 + 0, 1, true);
      var variant4 = e;
      switch (variant4.tag) {
        case 'last-operation-failed': {
          const e = variant4.val;
          dataView(memory0).setInt8(arg2 + 4, 0, true);
          if (!(e instanceof Error$1)) {
            throw new Error('Resource error: Not a valid "Error" resource.');
          }
          var handle3 = handleCnt0++;
          handleTable0.set(handle3, { rep: e, own: true });
          dataView(memory0).setInt32(arg2 + 8, handle3, true);
          break;
        }
        case 'closed': {
          dataView(memory0).setInt8(arg2 + 4, 1, true);
          break;
        }
        default: {
          throw new TypeError(`invalid variant tag value \`${JSON.stringify(variant4.tag)}\` (received \`${variant4}\`) specified for \`StreamError\``);
        }
      }
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline23(arg0, arg1) {
  var handle1 = arg0;
  var rsc0 = handleTable2.get(handle1).rep;
  let ret;
  try {
    ret = { tag: 'ok', val: OutputStream.prototype.checkWrite.call(rsc0) };
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  var variant4 = ret;
  switch (variant4.tag) {
    case 'ok': {
      const e = variant4.val;
      dataView(memory0).setInt8(arg1 + 0, 0, true);
      dataView(memory0).setBigInt64(arg1 + 8, toUint64(e), true);
      break;
    }
    case 'err': {
      const e = variant4.val;
      dataView(memory0).setInt8(arg1 + 0, 1, true);
      var variant3 = e;
      switch (variant3.tag) {
        case 'last-operation-failed': {
          const e = variant3.val;
          dataView(memory0).setInt8(arg1 + 8, 0, true);
          if (!(e instanceof Error$1)) {
            throw new Error('Resource error: Not a valid "Error" resource.');
          }
          var handle2 = handleCnt0++;
          handleTable0.set(handle2, { rep: e, own: true });
          dataView(memory0).setInt32(arg1 + 12, handle2, true);
          break;
        }
        case 'closed': {
          dataView(memory0).setInt8(arg1 + 8, 1, true);
          break;
        }
        default: {
          throw new TypeError(`invalid variant tag value \`${JSON.stringify(variant3.tag)}\` (received \`${variant3}\`) specified for \`StreamError\``);
        }
      }
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline24(arg0, arg1, arg2, arg3) {
  var handle1 = arg0;
  var rsc0 = handleTable2.get(handle1).rep;
  var ptr2 = arg1;
  var len2 = arg2;
  var result2 = new Uint8Array(memory0.buffer.slice(ptr2, ptr2 + len2 * 1));
  let ret;
  try {
    ret = { tag: 'ok', val: OutputStream.prototype.write.call(rsc0, result2) };
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  var variant5 = ret;
  switch (variant5.tag) {
    case 'ok': {
      const e = variant5.val;
      dataView(memory0).setInt8(arg3 + 0, 0, true);
      break;
    }
    case 'err': {
      const e = variant5.val;
      dataView(memory0).setInt8(arg3 + 0, 1, true);
      var variant4 = e;
      switch (variant4.tag) {
        case 'last-operation-failed': {
          const e = variant4.val;
          dataView(memory0).setInt8(arg3 + 4, 0, true);
          if (!(e instanceof Error$1)) {
            throw new Error('Resource error: Not a valid "Error" resource.');
          }
          var handle3 = handleCnt0++;
          handleTable0.set(handle3, { rep: e, own: true });
          dataView(memory0).setInt32(arg3 + 8, handle3, true);
          break;
        }
        case 'closed': {
          dataView(memory0).setInt8(arg3 + 4, 1, true);
          break;
        }
        default: {
          throw new TypeError(`invalid variant tag value \`${JSON.stringify(variant4.tag)}\` (received \`${variant4}\`) specified for \`StreamError\``);
        }
      }
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline25(arg0, arg1, arg2, arg3) {
  var handle1 = arg0;
  var rsc0 = handleTable2.get(handle1).rep;
  var ptr2 = arg1;
  var len2 = arg2;
  var result2 = new Uint8Array(memory0.buffer.slice(ptr2, ptr2 + len2 * 1));
  let ret;
  try {
    ret = { tag: 'ok', val: OutputStream.prototype.blockingWriteAndFlush.call(rsc0, result2) };
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  var variant5 = ret;
  switch (variant5.tag) {
    case 'ok': {
      const e = variant5.val;
      dataView(memory0).setInt8(arg3 + 0, 0, true);
      break;
    }
    case 'err': {
      const e = variant5.val;
      dataView(memory0).setInt8(arg3 + 0, 1, true);
      var variant4 = e;
      switch (variant4.tag) {
        case 'last-operation-failed': {
          const e = variant4.val;
          dataView(memory0).setInt8(arg3 + 4, 0, true);
          if (!(e instanceof Error$1)) {
            throw new Error('Resource error: Not a valid "Error" resource.');
          }
          var handle3 = handleCnt0++;
          handleTable0.set(handle3, { rep: e, own: true });
          dataView(memory0).setInt32(arg3 + 8, handle3, true);
          break;
        }
        case 'closed': {
          dataView(memory0).setInt8(arg3 + 4, 1, true);
          break;
        }
        default: {
          throw new TypeError(`invalid variant tag value \`${JSON.stringify(variant4.tag)}\` (received \`${variant4}\`) specified for \`StreamError\``);
        }
      }
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline26(arg0, arg1) {
  var handle1 = arg0;
  var rsc0 = handleTable2.get(handle1).rep;
  let ret;
  try {
    ret = { tag: 'ok', val: OutputStream.prototype.blockingFlush.call(rsc0) };
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  var variant4 = ret;
  switch (variant4.tag) {
    case 'ok': {
      const e = variant4.val;
      dataView(memory0).setInt8(arg1 + 0, 0, true);
      break;
    }
    case 'err': {
      const e = variant4.val;
      dataView(memory0).setInt8(arg1 + 0, 1, true);
      var variant3 = e;
      switch (variant3.tag) {
        case 'last-operation-failed': {
          const e = variant3.val;
          dataView(memory0).setInt8(arg1 + 4, 0, true);
          if (!(e instanceof Error$1)) {
            throw new Error('Resource error: Not a valid "Error" resource.');
          }
          var handle2 = handleCnt0++;
          handleTable0.set(handle2, { rep: e, own: true });
          dataView(memory0).setInt32(arg1 + 8, handle2, true);
          break;
        }
        case 'closed': {
          dataView(memory0).setInt8(arg1 + 4, 1, true);
          break;
        }
        default: {
          throw new TypeError(`invalid variant tag value \`${JSON.stringify(variant3.tag)}\` (received \`${variant3}\`) specified for \`StreamError\``);
        }
      }
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline27(arg0, arg1) {
  const ret = getRandomBytes(BigInt.asUintN(64, arg0));
  var val0 = ret;
  var len0 = val0.byteLength;
  var ptr0 = realloc0(0, 0, 1, len0 * 1);
  var src0 = new Uint8Array(val0.buffer || val0, val0.byteOffset, len0 * 1);
  (new Uint8Array(memory0.buffer, ptr0, len0 * 1)).set(src0);
  dataView(memory0).setInt32(arg1 + 4, len0, true);
  dataView(memory0).setInt32(arg1 + 0, ptr0, true);
}

function trampoline28(arg0) {
  const ret = getEnvironment();
  var vec3 = ret;
  var len3 = vec3.length;
  var result3 = realloc0(0, 0, 4, len3 * 16);
  for (let i = 0; i < vec3.length; i++) {
    const e = vec3[i];
    const base = result3 + i * 16;var [tuple0_0, tuple0_1] = e;
    var ptr1 = utf8Encode(tuple0_0, realloc0, memory0);
    var len1 = utf8EncodedLen;
    dataView(memory0).setInt32(base + 4, len1, true);
    dataView(memory0).setInt32(base + 0, ptr1, true);
    var ptr2 = utf8Encode(tuple0_1, realloc0, memory0);
    var len2 = utf8EncodedLen;
    dataView(memory0).setInt32(base + 12, len2, true);
    dataView(memory0).setInt32(base + 8, ptr2, true);
  }
  dataView(memory0).setInt32(arg0 + 4, len3, true);
  dataView(memory0).setInt32(arg0 + 0, result3, true);
}

function trampoline29(arg0) {
  const ret = getTerminalStdin();
  var variant1 = ret;
  if (variant1 === null || variant1=== undefined) {
    dataView(memory0).setInt8(arg0 + 0, 0, true);
  } else {
    const e = variant1;
    dataView(memory0).setInt8(arg0 + 0, 1, true);
    if (!(e instanceof TerminalInput)) {
      throw new Error('Resource error: Not a valid "TerminalInput" resource.');
    }
    var handle0 = handleCnt6++;
    handleTable6.set(handle0, { rep: e, own: true });
    dataView(memory0).setInt32(arg0 + 4, handle0, true);
  }
}

function trampoline30(arg0) {
  const ret = getTerminalStdout();
  var variant1 = ret;
  if (variant1 === null || variant1=== undefined) {
    dataView(memory0).setInt8(arg0 + 0, 0, true);
  } else {
    const e = variant1;
    dataView(memory0).setInt8(arg0 + 0, 1, true);
    if (!(e instanceof TerminalOutput)) {
      throw new Error('Resource error: Not a valid "TerminalOutput" resource.');
    }
    var handle0 = handleCnt7++;
    handleTable7.set(handle0, { rep: e, own: true });
    dataView(memory0).setInt32(arg0 + 4, handle0, true);
  }
}

function trampoline31(arg0) {
  const ret = getTerminalStderr();
  var variant1 = ret;
  if (variant1 === null || variant1=== undefined) {
    dataView(memory0).setInt8(arg0 + 0, 0, true);
  } else {
    const e = variant1;
    dataView(memory0).setInt8(arg0 + 0, 1, true);
    if (!(e instanceof TerminalOutput)) {
      throw new Error('Resource error: Not a valid "TerminalOutput" resource.');
    }
    var handle0 = handleCnt7++;
    handleTable7.set(handle0, { rep: e, own: true });
    dataView(memory0).setInt32(arg0 + 4, handle0, true);
  }
}
let exports3;
let realloc1;
let postReturn0;
let postReturn1;
function trampoline0(handle) {
  const handleEntry = handleTable4.get(handle);
  if (!handleEntry) {
    throw new Error(`Resource error: Invalid handle ${handle}`);
  }
  handleTable4.delete(handle);
  if (handleEntry.own && handleEntry.rep[symbolDispose]) {
    handleEntry.rep[symbolDispose]();
  }
}
function trampoline1(handle) {
  const handleEntry = handleTable0.get(handle);
  if (!handleEntry) {
    throw new Error(`Resource error: Invalid handle ${handle}`);
  }
  handleTable0.delete(handle);
  if (handleEntry.own && handleEntry.rep[symbolDispose]) {
    handleEntry.rep[symbolDispose]();
  }
}
function trampoline2(handle) {
  const handleEntry = handleTable1.get(handle);
  if (!handleEntry) {
    throw new Error(`Resource error: Invalid handle ${handle}`);
  }
  handleTable1.delete(handle);
  if (handleEntry.own && handleEntry.rep[symbolDispose]) {
    handleEntry.rep[symbolDispose]();
  }
}
function trampoline3(handle) {
  const handleEntry = handleTable2.get(handle);
  if (!handleEntry) {
    throw new Error(`Resource error: Invalid handle ${handle}`);
  }
  handleTable2.delete(handle);
  if (handleEntry.own && handleEntry.rep[symbolDispose]) {
    handleEntry.rep[symbolDispose]();
  }
}
function trampoline4(handle) {
  const handleEntry = handleTable3.get(handle);
  if (!handleEntry) {
    throw new Error(`Resource error: Invalid handle ${handle}`);
  }
  handleTable3.delete(handle);
  if (handleEntry.own && handleEntry.rep[symbolDispose]) {
    handleEntry.rep[symbolDispose]();
  }
}
function trampoline5(handle) {
  const handleEntry = handleTable5.get(handle);
  if (!handleEntry) {
    throw new Error(`Resource error: Invalid handle ${handle}`);
  }
  handleTable5.delete(handle);
  if (handleEntry.own && handleEntry.rep[symbolDispose]) {
    handleEntry.rep[symbolDispose]();
  }
}
function trampoline6(handle) {
  const handleEntry = handleTable7.get(handle);
  if (!handleEntry) {
    throw new Error(`Resource error: Invalid handle ${handle}`);
  }
  handleTable7.delete(handle);
  if (handleEntry.own && handleEntry.rep[symbolDispose]) {
    handleEntry.rep[symbolDispose]();
  }
}
function trampoline7(handle) {
  const handleEntry = handleTable6.get(handle);
  if (!handleEntry) {
    throw new Error(`Resource error: Invalid handle ${handle}`);
  }
  handleTable6.delete(handle);
  if (handleEntry.own && handleEntry.rep[symbolDispose]) {
    handleEntry.rep[symbolDispose]();
  }
}

function parse(arg0) {
  if (!_initialized) throwUninitialized();
  var ptr0 = utf8Encode(arg0, realloc1, memory0);
  var len0 = utf8EncodedLen;
  const ret = exports1['local:wasm-tools/tools#parse'](ptr0, len0);
  let variant3;
  switch (dataView(memory0).getUint8(ret + 0, true)) {
    case 0: {
      var ptr1 = dataView(memory0).getInt32(ret + 4, true);
      var len1 = dataView(memory0).getInt32(ret + 8, true);
      var result1 = new Uint8Array(memory0.buffer.slice(ptr1, ptr1 + len1 * 1));
      variant3= {
        tag: 'ok',
        val: result1
      };
      break;
    }
    case 1: {
      var ptr2 = dataView(memory0).getInt32(ret + 4, true);
      var len2 = dataView(memory0).getInt32(ret + 8, true);
      var result2 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr2, len2));
      variant3= {
        tag: 'err',
        val: result2
      };
      break;
    }
    default: {
      throw new TypeError('invalid variant discriminant for expected');
    }
  }
  postReturn0(ret);
  if (variant3.tag === 'err') {
    throw new ComponentError(variant3.val);
  }
  return variant3.val;
}

function print(arg0) {
  if (!_initialized) throwUninitialized();
  var val0 = arg0;
  var len0 = val0.byteLength;
  var ptr0 = realloc1(0, 0, 1, len0 * 1);
  var src0 = new Uint8Array(val0.buffer || val0, val0.byteOffset, len0 * 1);
  (new Uint8Array(memory0.buffer, ptr0, len0 * 1)).set(src0);
  const ret = exports1['local:wasm-tools/tools#print'](ptr0, len0);
  let variant3;
  switch (dataView(memory0).getUint8(ret + 0, true)) {
    case 0: {
      var ptr1 = dataView(memory0).getInt32(ret + 4, true);
      var len1 = dataView(memory0).getInt32(ret + 8, true);
      var result1 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr1, len1));
      variant3= {
        tag: 'ok',
        val: result1
      };
      break;
    }
    case 1: {
      var ptr2 = dataView(memory0).getInt32(ret + 4, true);
      var len2 = dataView(memory0).getInt32(ret + 8, true);
      var result2 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr2, len2));
      variant3= {
        tag: 'err',
        val: result2
      };
      break;
    }
    default: {
      throw new TypeError('invalid variant discriminant for expected');
    }
  }
  postReturn0(ret);
  if (variant3.tag === 'err') {
    throw new ComponentError(variant3.val);
  }
  return variant3.val;
}

function componentNew(arg0, arg1) {
  if (!_initialized) throwUninitialized();
  var val0 = arg0;
  var len0 = val0.byteLength;
  var ptr0 = realloc1(0, 0, 1, len0 * 1);
  var src0 = new Uint8Array(val0.buffer || val0, val0.byteOffset, len0 * 1);
  (new Uint8Array(memory0.buffer, ptr0, len0 * 1)).set(src0);
  var variant5 = arg1;
  let variant5_0;
  let variant5_1;
  let variant5_2;
  if (variant5 === null || variant5=== undefined) {
    variant5_0 = 0;
    variant5_1 = 0;
    variant5_2 = 0;
  } else {
    const e = variant5;
    var vec4 = e;
    var len4 = vec4.length;
    var result4 = realloc1(0, 0, 4, len4 * 16);
    for (let i = 0; i < vec4.length; i++) {
      const e = vec4[i];
      const base = result4 + i * 16;var [tuple1_0, tuple1_1] = e;
      var ptr2 = utf8Encode(tuple1_0, realloc1, memory0);
      var len2 = utf8EncodedLen;
      dataView(memory0).setInt32(base + 4, len2, true);
      dataView(memory0).setInt32(base + 0, ptr2, true);
      var val3 = tuple1_1;
      var len3 = val3.byteLength;
      var ptr3 = realloc1(0, 0, 1, len3 * 1);
      var src3 = new Uint8Array(val3.buffer || val3, val3.byteOffset, len3 * 1);
      (new Uint8Array(memory0.buffer, ptr3, len3 * 1)).set(src3);
      dataView(memory0).setInt32(base + 12, len3, true);
      dataView(memory0).setInt32(base + 8, ptr3, true);
    }
    variant5_0 = 1;
    variant5_1 = result4;
    variant5_2 = len4;
  }
  const ret = exports1['local:wasm-tools/tools#component-new'](ptr0, len0, variant5_0, variant5_1, variant5_2);
  let variant8;
  switch (dataView(memory0).getUint8(ret + 0, true)) {
    case 0: {
      var ptr6 = dataView(memory0).getInt32(ret + 4, true);
      var len6 = dataView(memory0).getInt32(ret + 8, true);
      var result6 = new Uint8Array(memory0.buffer.slice(ptr6, ptr6 + len6 * 1));
      variant8= {
        tag: 'ok',
        val: result6
      };
      break;
    }
    case 1: {
      var ptr7 = dataView(memory0).getInt32(ret + 4, true);
      var len7 = dataView(memory0).getInt32(ret + 8, true);
      var result7 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr7, len7));
      variant8= {
        tag: 'err',
        val: result7
      };
      break;
    }
    default: {
      throw new TypeError('invalid variant discriminant for expected');
    }
  }
  postReturn0(ret);
  if (variant8.tag === 'err') {
    throw new ComponentError(variant8.val);
  }
  return variant8.val;
}

function componentWit(arg0) {
  if (!_initialized) throwUninitialized();
  var val0 = arg0;
  var len0 = val0.byteLength;
  var ptr0 = realloc1(0, 0, 1, len0 * 1);
  var src0 = new Uint8Array(val0.buffer || val0, val0.byteOffset, len0 * 1);
  (new Uint8Array(memory0.buffer, ptr0, len0 * 1)).set(src0);
  const ret = exports1['local:wasm-tools/tools#component-wit'](ptr0, len0);
  let variant3;
  switch (dataView(memory0).getUint8(ret + 0, true)) {
    case 0: {
      var ptr1 = dataView(memory0).getInt32(ret + 4, true);
      var len1 = dataView(memory0).getInt32(ret + 8, true);
      var result1 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr1, len1));
      variant3= {
        tag: 'ok',
        val: result1
      };
      break;
    }
    case 1: {
      var ptr2 = dataView(memory0).getInt32(ret + 4, true);
      var len2 = dataView(memory0).getInt32(ret + 8, true);
      var result2 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr2, len2));
      variant3= {
        tag: 'err',
        val: result2
      };
      break;
    }
    default: {
      throw new TypeError('invalid variant discriminant for expected');
    }
  }
  postReturn0(ret);
  if (variant3.tag === 'err') {
    throw new ComponentError(variant3.val);
  }
  return variant3.val;
}

function componentEmbed(arg0) {
  if (!_initialized) throwUninitialized();
  var ptr0 = realloc1(0, 0, 4, 64);
  var {binary: v1_0, witSource: v1_1, witPath: v1_2, stringEncoding: v1_3, dummy: v1_4, world: v1_5, metadata: v1_6 } = arg0;
  var variant3 = v1_0;
  if (variant3 === null || variant3=== undefined) {
    dataView(memory0).setInt8(ptr0 + 0, 0, true);
  } else {
    const e = variant3;
    dataView(memory0).setInt8(ptr0 + 0, 1, true);
    var val2 = e;
    var len2 = val2.byteLength;
    var ptr2 = realloc1(0, 0, 1, len2 * 1);
    var src2 = new Uint8Array(val2.buffer || val2, val2.byteOffset, len2 * 1);
    (new Uint8Array(memory0.buffer, ptr2, len2 * 1)).set(src2);
    dataView(memory0).setInt32(ptr0 + 8, len2, true);
    dataView(memory0).setInt32(ptr0 + 4, ptr2, true);
  }
  var variant5 = v1_1;
  if (variant5 === null || variant5=== undefined) {
    dataView(memory0).setInt8(ptr0 + 12, 0, true);
  } else {
    const e = variant5;
    dataView(memory0).setInt8(ptr0 + 12, 1, true);
    var ptr4 = utf8Encode(e, realloc1, memory0);
    var len4 = utf8EncodedLen;
    dataView(memory0).setInt32(ptr0 + 20, len4, true);
    dataView(memory0).setInt32(ptr0 + 16, ptr4, true);
  }
  var variant7 = v1_2;
  if (variant7 === null || variant7=== undefined) {
    dataView(memory0).setInt8(ptr0 + 24, 0, true);
  } else {
    const e = variant7;
    dataView(memory0).setInt8(ptr0 + 24, 1, true);
    var ptr6 = utf8Encode(e, realloc1, memory0);
    var len6 = utf8EncodedLen;
    dataView(memory0).setInt32(ptr0 + 32, len6, true);
    dataView(memory0).setInt32(ptr0 + 28, ptr6, true);
  }
  var variant9 = v1_3;
  if (variant9 === null || variant9=== undefined) {
    dataView(memory0).setInt8(ptr0 + 36, 0, true);
  } else {
    const e = variant9;
    dataView(memory0).setInt8(ptr0 + 36, 1, true);
    var val8 = e;
    let enum8;
    switch (val8) {
      case 'utf8': {
        enum8 = 0;
        break;
      }
      case 'utf16': {
        enum8 = 1;
        break;
      }
      case 'compact-utf16': {
        enum8 = 2;
        break;
      }
      default: {
        if ((e) instanceof Error) {
          console.error(e);
        }
        
        throw new TypeError(`"${val8}" is not one of the cases of string-encoding`);
      }
    }
    dataView(memory0).setInt8(ptr0 + 37, enum8, true);
  }
  var variant10 = v1_4;
  if (variant10 === null || variant10=== undefined) {
    dataView(memory0).setInt8(ptr0 + 38, 0, true);
  } else {
    const e = variant10;
    dataView(memory0).setInt8(ptr0 + 38, 1, true);
    dataView(memory0).setInt8(ptr0 + 39, e ? 1 : 0, true);
  }
  var variant12 = v1_5;
  if (variant12 === null || variant12=== undefined) {
    dataView(memory0).setInt8(ptr0 + 40, 0, true);
  } else {
    const e = variant12;
    dataView(memory0).setInt8(ptr0 + 40, 1, true);
    var ptr11 = utf8Encode(e, realloc1, memory0);
    var len11 = utf8EncodedLen;
    dataView(memory0).setInt32(ptr0 + 48, len11, true);
    dataView(memory0).setInt32(ptr0 + 44, ptr11, true);
  }
  var variant20 = v1_6;
  if (variant20 === null || variant20=== undefined) {
    dataView(memory0).setInt8(ptr0 + 52, 0, true);
  } else {
    const e = variant20;
    dataView(memory0).setInt8(ptr0 + 52, 1, true);
    var vec19 = e;
    var len19 = vec19.length;
    var result19 = realloc1(0, 0, 4, len19 * 16);
    for (let i = 0; i < vec19.length; i++) {
      const e = vec19[i];
      const base = result19 + i * 16;var [tuple13_0, tuple13_1] = e;
      var ptr14 = utf8Encode(tuple13_0, realloc1, memory0);
      var len14 = utf8EncodedLen;
      dataView(memory0).setInt32(base + 4, len14, true);
      dataView(memory0).setInt32(base + 0, ptr14, true);
      var vec18 = tuple13_1;
      var len18 = vec18.length;
      var result18 = realloc1(0, 0, 4, len18 * 16);
      for (let i = 0; i < vec18.length; i++) {
        const e = vec18[i];
        const base = result18 + i * 16;var [tuple15_0, tuple15_1] = e;
        var ptr16 = utf8Encode(tuple15_0, realloc1, memory0);
        var len16 = utf8EncodedLen;
        dataView(memory0).setInt32(base + 4, len16, true);
        dataView(memory0).setInt32(base + 0, ptr16, true);
        var ptr17 = utf8Encode(tuple15_1, realloc1, memory0);
        var len17 = utf8EncodedLen;
        dataView(memory0).setInt32(base + 12, len17, true);
        dataView(memory0).setInt32(base + 8, ptr17, true);
      }
      dataView(memory0).setInt32(base + 12, len18, true);
      dataView(memory0).setInt32(base + 8, result18, true);
    }
    dataView(memory0).setInt32(ptr0 + 60, len19, true);
    dataView(memory0).setInt32(ptr0 + 56, result19, true);
  }
  const ret = exports1['local:wasm-tools/tools#component-embed'](ptr0);
  let variant23;
  switch (dataView(memory0).getUint8(ret + 0, true)) {
    case 0: {
      var ptr21 = dataView(memory0).getInt32(ret + 4, true);
      var len21 = dataView(memory0).getInt32(ret + 8, true);
      var result21 = new Uint8Array(memory0.buffer.slice(ptr21, ptr21 + len21 * 1));
      variant23= {
        tag: 'ok',
        val: result21
      };
      break;
    }
    case 1: {
      var ptr22 = dataView(memory0).getInt32(ret + 4, true);
      var len22 = dataView(memory0).getInt32(ret + 8, true);
      var result22 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr22, len22));
      variant23= {
        tag: 'err',
        val: result22
      };
      break;
    }
    default: {
      throw new TypeError('invalid variant discriminant for expected');
    }
  }
  postReturn0(ret);
  if (variant23.tag === 'err') {
    throw new ComponentError(variant23.val);
  }
  return variant23.val;
}

function metadataShow(arg0) {
  if (!_initialized) throwUninitialized();
  var val0 = arg0;
  var len0 = val0.byteLength;
  var ptr0 = realloc1(0, 0, 1, len0 * 1);
  var src0 = new Uint8Array(val0.buffer || val0, val0.byteOffset, len0 * 1);
  (new Uint8Array(memory0.buffer, ptr0, len0 * 1)).set(src0);
  const ret = exports1['local:wasm-tools/tools#metadata-show'](ptr0, len0);
  let variant11;
  switch (dataView(memory0).getUint8(ret + 0, true)) {
    case 0: {
      var len9 = dataView(memory0).getInt32(ret + 8, true);
      var base9 = dataView(memory0).getInt32(ret + 4, true);
      var result9 = [];
      for (let i = 0; i < len9; i++) {
        const base = base9 + i * 36;
        let variant2;
        switch (dataView(memory0).getUint8(base + 0, true)) {
          case 0: {
            variant2 = undefined;
            break;
          }
          case 1: {
            var ptr1 = dataView(memory0).getInt32(base + 4, true);
            var len1 = dataView(memory0).getInt32(base + 8, true);
            var result1 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr1, len1));
            variant2 = result1;
            break;
          }
          default: {
            throw new TypeError('invalid variant discriminant for option');
          }
        }
        let variant3;
        switch (dataView(memory0).getUint8(base + 12, true)) {
          case 0: {
            variant3= {
              tag: 'module',
            };
            break;
          }
          case 1: {
            variant3= {
              tag: 'component',
              val: dataView(memory0).getInt32(base + 16, true) >>> 0
            };
            break;
          }
          default: {
            throw new TypeError('invalid variant discriminant for ModuleMetaType');
          }
        }
        var len8 = dataView(memory0).getInt32(base + 32, true);
        var base8 = dataView(memory0).getInt32(base + 28, true);
        var result8 = [];
        for (let i = 0; i < len8; i++) {
          const base = base8 + i * 16;
          var ptr4 = dataView(memory0).getInt32(base + 0, true);
          var len4 = dataView(memory0).getInt32(base + 4, true);
          var result4 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr4, len4));
          var len7 = dataView(memory0).getInt32(base + 12, true);
          var base7 = dataView(memory0).getInt32(base + 8, true);
          var result7 = [];
          for (let i = 0; i < len7; i++) {
            const base = base7 + i * 16;
            var ptr5 = dataView(memory0).getInt32(base + 0, true);
            var len5 = dataView(memory0).getInt32(base + 4, true);
            var result5 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr5, len5));
            var ptr6 = dataView(memory0).getInt32(base + 8, true);
            var len6 = dataView(memory0).getInt32(base + 12, true);
            var result6 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr6, len6));
            result7.push([result5, result6]);
          }
          result8.push([result4, result7]);
        }
        result9.push({
          name: variant2,
          metaType: variant3,
          range: [dataView(memory0).getInt32(base + 20, true) >>> 0, dataView(memory0).getInt32(base + 24, true) >>> 0],
          producers: result8,
        });
      }
      variant11= {
        tag: 'ok',
        val: result9
      };
      break;
    }
    case 1: {
      var ptr10 = dataView(memory0).getInt32(ret + 4, true);
      var len10 = dataView(memory0).getInt32(ret + 8, true);
      var result10 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr10, len10));
      variant11= {
        tag: 'err',
        val: result10
      };
      break;
    }
    default: {
      throw new TypeError('invalid variant discriminant for expected');
    }
  }
  postReturn1(ret);
  if (variant11.tag === 'err') {
    throw new ComponentError(variant11.val);
  }
  return variant11.val;
}

function metadataAdd(arg0, arg1) {
  if (!_initialized) throwUninitialized();
  var val0 = arg0;
  var len0 = val0.byteLength;
  var ptr0 = realloc1(0, 0, 1, len0 * 1);
  var src0 = new Uint8Array(val0.buffer || val0, val0.byteOffset, len0 * 1);
  (new Uint8Array(memory0.buffer, ptr0, len0 * 1)).set(src0);
  var vec7 = arg1;
  var len7 = vec7.length;
  var result7 = realloc1(0, 0, 4, len7 * 16);
  for (let i = 0; i < vec7.length; i++) {
    const e = vec7[i];
    const base = result7 + i * 16;var [tuple1_0, tuple1_1] = e;
    var ptr2 = utf8Encode(tuple1_0, realloc1, memory0);
    var len2 = utf8EncodedLen;
    dataView(memory0).setInt32(base + 4, len2, true);
    dataView(memory0).setInt32(base + 0, ptr2, true);
    var vec6 = tuple1_1;
    var len6 = vec6.length;
    var result6 = realloc1(0, 0, 4, len6 * 16);
    for (let i = 0; i < vec6.length; i++) {
      const e = vec6[i];
      const base = result6 + i * 16;var [tuple3_0, tuple3_1] = e;
      var ptr4 = utf8Encode(tuple3_0, realloc1, memory0);
      var len4 = utf8EncodedLen;
      dataView(memory0).setInt32(base + 4, len4, true);
      dataView(memory0).setInt32(base + 0, ptr4, true);
      var ptr5 = utf8Encode(tuple3_1, realloc1, memory0);
      var len5 = utf8EncodedLen;
      dataView(memory0).setInt32(base + 12, len5, true);
      dataView(memory0).setInt32(base + 8, ptr5, true);
    }
    dataView(memory0).setInt32(base + 12, len6, true);
    dataView(memory0).setInt32(base + 8, result6, true);
  }
  const ret = exports1['local:wasm-tools/tools#metadata-add'](ptr0, len0, result7, len7);
  let variant10;
  switch (dataView(memory0).getUint8(ret + 0, true)) {
    case 0: {
      var ptr8 = dataView(memory0).getInt32(ret + 4, true);
      var len8 = dataView(memory0).getInt32(ret + 8, true);
      var result8 = new Uint8Array(memory0.buffer.slice(ptr8, ptr8 + len8 * 1));
      variant10= {
        tag: 'ok',
        val: result8
      };
      break;
    }
    case 1: {
      var ptr9 = dataView(memory0).getInt32(ret + 4, true);
      var len9 = dataView(memory0).getInt32(ret + 8, true);
      var result9 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr9, len9));
      variant10= {
        tag: 'err',
        val: result9
      };
      break;
    }
    default: {
      throw new TypeError('invalid variant discriminant for expected');
    }
  }
  postReturn0(ret);
  if (variant10.tag === 'err') {
    throw new ComponentError(variant10.val);
  }
  return variant10.val;
}
const handleTable0= new Map();
let handleCnt0 = 0;
const handleTable1= new Map();
let handleCnt1 = 0;
const handleTable2= new Map();
let handleCnt2 = 0;
const handleTable3= new Map();
let handleCnt3 = 0;
const handleTable4= new Map();
let handleCnt4 = 0;
const handleTable5= new Map();
let handleCnt5 = 0;
const handleTable6= new Map();
let handleCnt6 = 0;
const handleTable7= new Map();
let handleCnt7 = 0;

let _initialized = false;
export const $init = (async() => {
  const module0 = fetchCompile(new URL('./wasm-tools.core.wasm', import.meta.url));
  const module1 = fetchCompile(new URL('./wasm-tools.core2.wasm', import.meta.url));
  const module2 = base64Compile('AGFzbQEAAAABUQxgAX8AYAN/fn8AYAJ/fwBgB39/f39/f38AYAR/f39/AGACfn8AYAJ/fwF/YAR/f39/AX9gCX9/f39/fn5/fwF/YAF/AX9gA39/fwF/YAF/AAMgHwABAQICAgMCAgEBAgQEAgUAAAAABgcHCAYGBgkGCgsEBQFwAR8fB50BIAEwAAABMQABATIAAgEzAAMBNAAEATUABQE2AAYBNwAHATgACAE5AAkCMTAACgIxMQALAjEyAAwCMTMADQIxNAAOAjE1AA8CMTYAEAIxNwARAjE4ABICMTkAEwIyMAAUAjIxABUCMjIAFgIyMwAXAjI0ABgCMjUAGQIyNgAaAjI3ABsCMjgAHAIyOQAdAjMwAB4IJGltcG9ydHMBAAqZAx8JACAAQQARAAALDQAgACABIAJBAREBAAsNACAAIAEgAkECEQEACwsAIAAgAUEDEQIACwsAIAAgAUEEEQIACwsAIAAgAUEFEQIACxUAIAAgASACIAMgBCAFIAZBBhEDAAsLACAAIAFBBxECAAsLACAAIAFBCBECAAsNACAAIAEgAkEJEQEACw0AIAAgASACQQoRAQALCwAgACABQQsRAgALDwAgACABIAIgA0EMEQQACw8AIAAgASACIANBDREEAAsLACAAIAFBDhECAAsLACAAIAFBDxEFAAsJACAAQRARAAALCQAgAEEREQAACwkAIABBEhEAAAsJACAAQRMRAAALCwAgACABQRQRBgALDwAgACABIAIgA0EVEQcACw8AIAAgASACIANBFhEHAAsZACAAIAEgAiADIAQgBSAGIAcgCEEXEQgACwsAIAAgAUEYEQYACwsAIAAgAUEZEQYACwsAIAAgAUEaEQYACwkAIABBGxEJAAsLACAAIAFBHBEGAAsNACAAIAEgAkEdEQoACwkAIABBHhELAAsALglwcm9kdWNlcnMBDHByb2Nlc3NlZC1ieQENd2l0LWNvbXBvbmVudAYwLjE5LjAAkhAEbmFtZQATEndpdC1jb21wb25lbnQ6c2hpbQH1Dx8ARWluZGlyZWN0LXdhc2k6ZmlsZXN5c3RlbS9wcmVvcGVuc0AwLjIuMC1yYy0yMDIzLTExLTEwLWdldC1kaXJlY3RvcmllcwFVaW5kaXJlY3Qtd2FzaTpmaWxlc3lzdGVtL3R5cGVzQDAuMi4wLXJjLTIwMjMtMTEtMTAtW21ldGhvZF1kZXNjcmlwdG9yLnJlYWQtdmlhLXN0cmVhbQJWaW5kaXJlY3Qtd2FzaTpmaWxlc3lzdGVtL3R5cGVzQDAuMi4wLXJjLTIwMjMtMTEtMTAtW21ldGhvZF1kZXNjcmlwdG9yLndyaXRlLXZpYS1zdHJlYW0DV2luZGlyZWN0LXdhc2k6ZmlsZXN5c3RlbS90eXBlc0AwLjIuMC1yYy0yMDIzLTExLTEwLVttZXRob2RdZGVzY3JpcHRvci5hcHBlbmQtdmlhLXN0cmVhbQROaW5kaXJlY3Qtd2FzaTpmaWxlc3lzdGVtL3R5cGVzQDAuMi4wLXJjLTIwMjMtMTEtMTAtW21ldGhvZF1kZXNjcmlwdG9yLmdldC10eXBlBUppbmRpcmVjdC13YXNpOmZpbGVzeXN0ZW0vdHlwZXNAMC4yLjAtcmMtMjAyMy0xMS0xMC1bbWV0aG9kXWRlc2NyaXB0b3Iuc3RhdAZNaW5kaXJlY3Qtd2FzaTpmaWxlc3lzdGVtL3R5cGVzQDAuMi4wLXJjLTIwMjMtMTEtMTAtW21ldGhvZF1kZXNjcmlwdG9yLm9wZW4tYXQHU2luZGlyZWN0LXdhc2k6ZmlsZXN5c3RlbS90eXBlc0AwLjIuMC1yYy0yMDIzLTExLTEwLVttZXRob2RdZGVzY3JpcHRvci5tZXRhZGF0YS1oYXNoCEhpbmRpcmVjdC13YXNpOmZpbGVzeXN0ZW0vdHlwZXNAMC4yLjAtcmMtMjAyMy0xMS0xMC1maWxlc3lzdGVtLWVycm9yLWNvZGUJRmluZGlyZWN0LXdhc2k6aW8vc3RyZWFtc0AwLjIuMC1yYy0yMDIzLTExLTEwLVttZXRob2RdaW5wdXQtc3RyZWFtLnJlYWQKT2luZGlyZWN0LXdhc2k6aW8vc3RyZWFtc0AwLjIuMC1yYy0yMDIzLTExLTEwLVttZXRob2RdaW5wdXQtc3RyZWFtLmJsb2NraW5nLXJlYWQLTmluZGlyZWN0LXdhc2k6aW8vc3RyZWFtc0AwLjIuMC1yYy0yMDIzLTExLTEwLVttZXRob2Rdb3V0cHV0LXN0cmVhbS5jaGVjay13cml0ZQxIaW5kaXJlY3Qtd2FzaTppby9zdHJlYW1zQDAuMi4wLXJjLTIwMjMtMTEtMTAtW21ldGhvZF1vdXRwdXQtc3RyZWFtLndyaXRlDVtpbmRpcmVjdC13YXNpOmlvL3N0cmVhbXNAMC4yLjAtcmMtMjAyMy0xMS0xMC1bbWV0aG9kXW91dHB1dC1zdHJlYW0uYmxvY2tpbmctd3JpdGUtYW5kLWZsdXNoDlFpbmRpcmVjdC13YXNpOmlvL3N0cmVhbXNAMC4yLjAtcmMtMjAyMy0xMS0xMC1bbWV0aG9kXW91dHB1dC1zdHJlYW0uYmxvY2tpbmctZmx1c2gPQGluZGlyZWN0LXdhc2k6cmFuZG9tL3JhbmRvbUAwLjIuMC1yYy0yMDIzLTExLTEwLWdldC1yYW5kb20tYnl0ZXMQQWluZGlyZWN0LXdhc2k6Y2xpL2Vudmlyb25tZW50QDAuMi4wLXJjLTIwMjMtMTEtMTAtZ2V0LWVudmlyb25tZW50EUdpbmRpcmVjdC13YXNpOmNsaS90ZXJtaW5hbC1zdGRpbkAwLjIuMC1yYy0yMDIzLTExLTEwLWdldC10ZXJtaW5hbC1zdGRpbhJJaW5kaXJlY3Qtd2FzaTpjbGkvdGVybWluYWwtc3Rkb3V0QDAuMi4wLXJjLTIwMjMtMTEtMTAtZ2V0LXRlcm1pbmFsLXN0ZG91dBNJaW5kaXJlY3Qtd2FzaTpjbGkvdGVybWluYWwtc3RkZXJyQDAuMi4wLXJjLTIwMjMtMTEtMTAtZ2V0LXRlcm1pbmFsLXN0ZGVychQsYWRhcHQtd2FzaV9zbmFwc2hvdF9wcmV2aWV3MS1mZF9maWxlc3RhdF9nZXQVJGFkYXB0LXdhc2lfc25hcHNob3RfcHJldmlldzEtZmRfcmVhZBYlYWRhcHQtd2FzaV9zbmFwc2hvdF9wcmV2aWV3MS1mZF93cml0ZRcmYWRhcHQtd2FzaV9zbmFwc2hvdF9wcmV2aWV3MS1wYXRoX29wZW4YJ2FkYXB0LXdhc2lfc25hcHNob3RfcHJldmlldzEtcmFuZG9tX2dldBkoYWRhcHQtd2FzaV9zbmFwc2hvdF9wcmV2aWV3MS1lbnZpcm9uX2dldBouYWRhcHQtd2FzaV9zbmFwc2hvdF9wcmV2aWV3MS1lbnZpcm9uX3NpemVzX2dldBslYWRhcHQtd2FzaV9zbmFwc2hvdF9wcmV2aWV3MS1mZF9jbG9zZRwrYWRhcHQtd2FzaV9zbmFwc2hvdF9wcmV2aWV3MS1mZF9wcmVzdGF0X2dldB0wYWRhcHQtd2FzaV9zbmFwc2hvdF9wcmV2aWV3MS1mZF9wcmVzdGF0X2Rpcl9uYW1lHiZhZGFwdC13YXNpX3NuYXBzaG90X3ByZXZpZXcxLXByb2NfZXhpdA');
  const module3 = base64Compile('AGFzbQEAAAABUQxgAX8AYAN/fn8AYAJ/fwBgB39/f39/f38AYAR/f39/AGACfn8AYAJ/fwF/YAR/f39/AX9gCX9/f39/fn5/fwF/YAF/AX9gA39/fwF/YAF/AALAASAAATAAAAABMQABAAEyAAEAATMAAgABNAACAAE1AAIAATYAAwABNwACAAE4AAIAATkAAQACMTAAAQACMTEAAgACMTIABAACMTMABAACMTQAAgACMTUABQACMTYAAAACMTcAAAACMTgAAAACMTkAAAACMjAABgACMjEABwACMjIABwACMjMACAACMjQABgACMjUABgACMjYABgACMjcACQACMjgABgACMjkACgACMzAACwAIJGltcG9ydHMBcAEfHwklAQBBAAsfAAECAwQFBgcICQoLDA0ODxAREhMUFRYXGBkaGxwdHgAuCXByb2R1Y2VycwEMcHJvY2Vzc2VkLWJ5AQ13aXQtY29tcG9uZW50BjAuMTkuMAAcBG5hbWUAFRR3aXQtY29tcG9uZW50OmZpeHVwcw');
  ({ exports: exports0 } = await instantiateCore(await module2));
  ({ exports: exports1 } = await instantiateCore(await module0, {
    wasi_snapshot_preview1: {
      environ_get: exports0['25'],
      environ_sizes_get: exports0['26'],
      fd_close: exports0['27'],
      fd_filestat_get: exports0['20'],
      fd_prestat_dir_name: exports0['29'],
      fd_prestat_get: exports0['28'],
      fd_read: exports0['21'],
      fd_write: exports0['22'],
      path_open: exports0['23'],
      proc_exit: exports0['30'],
      random_get: exports0['24'],
    },
  }));
  ({ exports: exports2 } = await instantiateCore(await module1, {
    __main_module__: {
      cabi_realloc: exports1.cabi_realloc,
    },
    env: {
      memory: exports1.memory,
    },
    'wasi:cli/environment@0.2.0-rc-2023-11-10': {
      'get-environment': exports0['16'],
    },
    'wasi:cli/exit@0.2.0-rc-2023-11-10': {
      exit: trampoline9,
    },
    'wasi:cli/stderr@0.2.0-rc-2023-11-10': {
      'get-stderr': trampoline8,
    },
    'wasi:cli/stdin@0.2.0-rc-2023-11-10': {
      'get-stdin': trampoline10,
    },
    'wasi:cli/stdout@0.2.0-rc-2023-11-10': {
      'get-stdout': trampoline11,
    },
    'wasi:cli/terminal-input@0.2.0-rc-2023-11-10': {
      '[resource-drop]terminal-input': trampoline7,
    },
    'wasi:cli/terminal-output@0.2.0-rc-2023-11-10': {
      '[resource-drop]terminal-output': trampoline6,
    },
    'wasi:cli/terminal-stderr@0.2.0-rc-2023-11-10': {
      'get-terminal-stderr': exports0['19'],
    },
    'wasi:cli/terminal-stdin@0.2.0-rc-2023-11-10': {
      'get-terminal-stdin': exports0['17'],
    },
    'wasi:cli/terminal-stdout@0.2.0-rc-2023-11-10': {
      'get-terminal-stdout': exports0['18'],
    },
    'wasi:filesystem/preopens@0.2.0-rc-2023-11-10': {
      'get-directories': exports0['0'],
    },
    'wasi:filesystem/types@0.2.0-rc-2023-11-10': {
      '[method]descriptor.append-via-stream': exports0['3'],
      '[method]descriptor.get-type': exports0['4'],
      '[method]descriptor.metadata-hash': exports0['7'],
      '[method]descriptor.open-at': exports0['6'],
      '[method]descriptor.read-via-stream': exports0['1'],
      '[method]descriptor.stat': exports0['5'],
      '[method]descriptor.write-via-stream': exports0['2'],
      '[resource-drop]descriptor': trampoline4,
      '[resource-drop]directory-entry-stream': trampoline0,
      'filesystem-error-code': exports0['8'],
    },
    'wasi:io/error@0.2.0-rc-2023-11-10': {
      '[resource-drop]error': trampoline1,
    },
    'wasi:io/streams@0.2.0-rc-2023-11-10': {
      '[method]input-stream.blocking-read': exports0['10'],
      '[method]input-stream.read': exports0['9'],
      '[method]output-stream.blocking-flush': exports0['14'],
      '[method]output-stream.blocking-write-and-flush': exports0['13'],
      '[method]output-stream.check-write': exports0['11'],
      '[method]output-stream.write': exports0['12'],
      '[resource-drop]input-stream': trampoline2,
      '[resource-drop]output-stream': trampoline3,
    },
    'wasi:random/random@0.2.0-rc-2023-11-10': {
      'get-random-bytes': exports0['15'],
    },
    'wasi:sockets/tcp@0.2.0-rc-2023-11-10': {
      '[resource-drop]tcp-socket': trampoline5,
    },
  }));
  memory0 = exports1.memory;
  realloc0 = exports2.cabi_import_realloc;
  ({ exports: exports3 } = await instantiateCore(await module3, {
    '': {
      $imports: exports0.$imports,
      '0': trampoline12,
      '1': trampoline13,
      '10': trampoline22,
      '11': trampoline23,
      '12': trampoline24,
      '13': trampoline25,
      '14': trampoline26,
      '15': trampoline27,
      '16': trampoline28,
      '17': trampoline29,
      '18': trampoline30,
      '19': trampoline31,
      '2': trampoline14,
      '20': exports2.fd_filestat_get,
      '21': exports2.fd_read,
      '22': exports2.fd_write,
      '23': exports2.path_open,
      '24': exports2.random_get,
      '25': exports2.environ_get,
      '26': exports2.environ_sizes_get,
      '27': exports2.fd_close,
      '28': exports2.fd_prestat_get,
      '29': exports2.fd_prestat_dir_name,
      '3': trampoline15,
      '30': exports2.proc_exit,
      '4': trampoline16,
      '5': trampoline17,
      '6': trampoline18,
      '7': trampoline19,
      '8': trampoline20,
      '9': trampoline21,
    },
  }));
  realloc1 = exports1.cabi_realloc;
  postReturn0 = exports1['cabi_post_local:wasm-tools/tools#component-embed'];
  postReturn1 = exports1['cabi_post_local:wasm-tools/tools#metadata-show'];
  _initialized = true;
})();
const tools = {
  componentEmbed: componentEmbed,
  componentNew: componentNew,
  componentWit: componentWit,
  metadataAdd: metadataAdd,
  metadataShow: metadataShow,
  parse: parse,
  print: print,
  
};

export { tools,  }