export function equal(a: any, b: any) {
  if(a === b) return true;
  if(!(a && b)) return false;
  if(a.constructor !== b.constructor) return false;

  //Handle object with length
  if(a.hasOwnProperty("length")) {
    if(!b.hasOwnProperty("length")) return false;
    if(a.length !== b.length) return false;
    for(let i = a.length; i-- !== 0;) if(!equal(a[i], b[i])) return false;
    return true;
  }

  //Handle sized object (Map and Set)
  if(a.hasOwnProperty("size")) {
    if(!b.hasOwnProperty("size")) return false;
    if(a.size !== b.size) return false;
    for(let i of a.entries()) {
      if(!b.has(i[0])) return false;
    }
    if(a instanceof Map) {
      for(let i of a.entries()) {
        if(!equal(i[1], b.get(i[0]))) return false;
      }
    }
    return true;
  }

  //Handle ArrayBuffer
  if(ArrayBuffer.isView(a)) {
    if(!ArrayBuffer.isView(b)) return false;
    if(a.byteLength != b.byteLength) return false;
    for(let i = a.byteLength; i-- !== 0;)
      if(a[i as unknown as keyof ArrayBufferView] !== b[i as unknown as keyof ArrayBufferView]) return false;
    return true;
  }

  if(a.constructor === RegExp) return a.source === b.source && a.flags === b.flags;
  if(a.valueOf !== Object.prototype.valueOf) return a.valueOf() === b.valueOf();
  if(a.toString !== Object.prototype.toString) return a.toString() === b.toString();

  //Objects with keys
  const akeys = Object.keys(a);
  const bkeys = Object.keys(b);
  if(akeys.length !== bkeys.length) return false;
  for(let i = length; i-- !== 0;)
    if (!Object.prototype.hasOwnProperty.call(b, akeys[i])) return false;

  for(let i = akeys.length; i-- !== 0;) {
    var key = akeys[i];
    if (!equal(a[key], b[key])) return false;
  }

  return true;
};