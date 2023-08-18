export function NOOP() { }

export const NO = () => false

export const extend = Object.assign

const hasOwnProperty = Object.prototype.hasOwnProperty

export function hasOwn(val: object,
  key: string | symbol): key is keyof typeof val {
  return hasOwnProperty.call(val, key)
}

export function isMap(val: unknown): val is Map<any, any> {
  return toTypeString(val) === '[object Map]'
}

export function isSet(val: unknown): val is Set<any> {
  return toTypeString(val) === '[object Set]'
}

export function isDate(val: unknown): val is Date {
  return toTypeString(val) === '[object Date]'
}

export function isRegExp(val: unknown): val is RegExp {
  return toTypeString(val) === '[object RegExp]'
}

export function isFunction(val: unknown): val is Function {
  return typeof val === 'function'
}

export function isObject(val: unknown): val is Record<any, any> {
  return val !== null && typeof val === 'object'
}

export function isPromise<T = any>(val: unknown): val is Promise<T> {
  return (
    (isObject(val) || isFunction(val))
    && isFunction((val as any).then)
    && isFunction((val as any).catch)
  )
}

export const isArray = Array.isArray
export const isString = (val: unknown): val is string => typeof val === 'string'
export const isSymbol = (val: unknown): val is symbol => typeof val === 'symbol'

export const objectToString = Object.prototype.toString

export function toTypeString(value: unknown): string {
  return objectToString.call(value)
}

export function toRawType(value: unknown): string {
  return toTypeString(value).slice(8, -1)
}

export function isPlainObject(val: unknown): val is object {
  return toTypeString(val) === '[object Object]'
}

export function isIntegerKey(key: unknown) {
  return isString(key)
    && key !== 'NaN'
    && key[0] !== '-'
    && `${Number.parseInt(key, 10)}` === key
}

export function hasChanged(value: any, oldValue: any): boolean {
  return !Object.is(value, oldValue)
}

export function def(obj: object, key: string | symbol, value: any) {
  Object.defineProperty(obj, key, {
    configurable: true,
    enumerable: false,
    value,
  })
}

let _globalThis: any
export function getGlobalThis(): any {
  return (
    _globalThis || (_globalThis
      = typeof globalThis !== 'undefined'
        ? globalThis
        : typeof self !== 'undefined'
          ? self
          : typeof window !== 'undefined'
            ? window
            : typeof global !== 'undefined'
              ? global
              : {})
  )
}
