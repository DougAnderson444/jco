/**
 * @typedef {import("../../../types/interfaces/wasi-sockets-tcp").TcpSocket} TcpSocket
 * @typedef {import("../../../types/interfaces/wasi-sockets-udp").UdpSocket} UdpSocket
 */

// Network class privately stores capabilities
export class Network {
  #allowDnsLookup = true;
  #allowTcp = true;
  #allowUdp = true;
  /** @type {Map<number, TcpSocket} */
  #tcpSockets = new Map();
  /** @type {Map<number, UdpSocket} */
  #udpSockets = new Map();

  static _denyDnsLookup (network = defaultNetwork) {
    network.#allowDnsLookup = false;
  }
  static _denyTcp (network = defaultNetwork) {
    network.#allowTcp = false;
  }
  static _denyUdp (network = defaultNetwork) {
    network.#allowUdp = false;
  }
  static _mayDnsLookup (network = defaultNetwork) {
    return network.#allowDnsLookup;
  }
  static _mayTcp (network = defaultNetwork) {
    return network.#allowTcp;
  }
  static _mayUdp (network = defaultNetwork) {
    return network.#allowUdp;
  }
}

export const defaultNetwork = new Network();

export const denyDnsLookup = Network._denyDnsLookup;
delete Network._denyDnsLookup;

export const denyTcp = Network._denyTcp;
delete Network._denyTcp;

export const denyUdp = Network._denyUdp;
delete Network._denyUdp;

export const mayDnsLookup = Network._mayDnsLookup;
delete Network._mayDnsLookup;

export const mayTcp = Network._mayTcp;
delete Network._mayTcp;

export const mayUdp = Network._mayUdp;
delete Network._mayUdp;

export function cappedUint32(value) {
  // Note: cap the value to the highest possible BigInt value that can be represented as a
  // unsigned 32-bit integer.
  const width = 32n;
  return BigInt.asUintN(Number(width), value);
}

export function noop() {}

function tupleToIPv6(arr) {
  if (arr.length !== 8) {
    return null;
  }
  return arr.map((segment) => segment.toString(16)).join(":");
}

function tupleToIpv4(arr) {
  if (arr.length !== 4) {
    return null;
  }
  return arr.map((segment) => segment.toString(10)).join(".");
}

export function ipv6ToTuple(ipv6) {
  if (ipv6 === "::1") {
    return [0, 0, 0, 0, 0, 0, 0, 1];
  } else if (ipv6 === "::") {
    return [0, 0, 0, 0, 0, 0, 0, 0];
  } else if (ipv6.includes("::")) {
    const [head, tail] = ipv6.split("::");
    const headSegments = head.split(":").map((segment) => parseInt(segment, 16));
    const tailSegments = tail.split(":").map((segment) => parseInt(segment, 16));
    const missingSegments = 8 - headSegments.length - tailSegments.length;
    const middleSegments = Array(missingSegments).fill(0);
    return headSegments.concat(middleSegments).concat(tailSegments);
  }
  return ipv6.split(":").map((segment) => parseInt(segment, 16));
}

export function ipv4ToTuple(ipv4) {
  return ipv4.split(".").map((segment) => parseInt(segment, 10));
}

export function serializeIpAddress(addr = undefined, includePort = false) {
  if (addr === undefined) {
    return undefined;
  }

  const family = addr.tag;

  let { address } = addr.val;
  if (family === "ipv4") {
    address = tupleToIpv4(address);
  } else if (family === "ipv6") {
    address = tupleToIPv6(address);
  }

  if (includePort) {
    address = `${address}:${addr.val.port}`;
  }

  return address;
}

export function deserializeIpAddress(addr, family) {
  let address = [];
  if (family === "ipv4") {
    address = ipv4ToTuple(addr);
  } else if (family === "ipv6") {
    address = ipv6ToTuple(addr);
  }
  return address;
}

export function findUnusedLocalAddress(
  family,
  { iPv4MappedAddress = false } = {}
) {
  let address = [127, 0, 0, 1];
  if (family === "ipv6") {
    if (iPv4MappedAddress) {
      address = [0, 0, 0, 0, 0, 0xffff, 0x7f00, 0x0001];
    } else {
      address = [0, 0, 0, 0, 0, 0, 0, 1];
    }
  }
  return {
    tag: family,
    val: {
      address,
      port: 0,
    },
  };
}

export function isUnicastIpAddress(ipSocketAddress) {
  return !isMulticastIpAddress(ipSocketAddress) && !isBroadcastIpAddress(ipSocketAddress);
}

export function isMulticastIpAddress(ipSocketAddress) {
  // ipv6: [0xff00, 0, 0, 0, 0, 0, 0, 0]
  // ipv4: [224, 0, 0, 0]
  return ipSocketAddress.val.address[0] === 224 || ipSocketAddress.val.address[0] === 0xff00;
}

export function isBroadcastIpAddress(ipSocketAddress) {
  // ipv4: [255, 255, 255, 255]
  return (
    ipSocketAddress.val.address[0] === 0xff && // 255
    ipSocketAddress.val.address[1] === 0xff && // 255
    ipSocketAddress.val.address[2] === 0xff && // 255
    ipSocketAddress.val.address[3] === 0xff // 255
  );
}

export function isIPv4MappedAddress(ipSocketAddress) {
  // ipv6: [0, 0, 0, 0, 0, 0xffff, 0, 0]
  if (ipSocketAddress.val.address.length !== 8) {
    return false;
  }
  return ipSocketAddress.val.address[5] === 0xffff;
}

export function isWildcardAddress(ipSocketAddress) {
  // ipv6: [0, 0, 0, 0, 0, 0, 0, 0]
  // ipv4: [0, 0, 0, 0]
  return ipSocketAddress.val.address.every((segment) => segment === 0);
}