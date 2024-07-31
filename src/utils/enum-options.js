// 使用Symbol避免覆盖
export const SYMBOL_KEY = Symbol('key')
export const SYMBOL_VALUE = Symbol('value')
export const SYMBOL_REF_KEY = Symbol('refKey')

const defaultKeys = [SYMBOL_KEY, SYMBOL_VALUE, SYMBOL_REF_KEY]

class EnumOptions {
  // data 格式 [[key, value, refKey, ...]...]，refKey为绑定到 this 上的字段名，this[refKey] = key
  constructor(data = [], keys = []) {
    if (Array.isArray(keys)) {
      keys = defaultKeys.concat(keys)
    } else {
      keys = keys?.split(',') ?? defaultKeys
    }
    if (keys.length < 3) {
      keys = keys.concat(defaultKeys.slice(keys.length))
    }

    const symbolMap = keys.reduce((obj, key, i) => {
      obj[key] = defaultKeys[i]
      return obj
    }, {})

    this.mappedData = new Map(
      data.map((item) => {
        const key = item[0]
        // value形式为[value, objValue]
        const value = [
          item[1],
          keys.reduce((obj, k, i) => {
            if (symbolMap[k]) obj[symbolMap[k]] = item[i]
            obj[k] = item[i]
            return obj
          }, {}),
        ]
        return [key, value]
      }),
    )

    data.forEach(([key, , refKey]) => {
      if (refKey) {
        Object.defineProperty(this, refKey, {
          get() {
            return key
          },
          set() {
            console.warn('enumeration type could not be change')
          },
        })
      }
    })
  }

  get(key) {
    return this.mappedData.get(key)?.[0]
  }

  getObj(key) {
    return this.mappedData.get(key)?.[1]
  }

  toArray(key, valueKey, isObjectValue) {
    const origin = [...this.mappedData]
    if (!key) return origin
    return origin.map(([optionKey, optionValue]) => ({
      [key]: optionKey,
      [valueKey]: isObjectValue ? optionValue[1] : optionValue[0],
    }))
  }

  toObjectArray() {
    return [...this.mappedData].map(([, optionValue]) => optionValue[1])
  }

  toObject(isObjectValue) {
    const origin = [...this.mappedData]
    return origin.reduce((obj, [optionKey, optionValue]) => {
      obj[optionKey] = isObjectValue ? optionValue[1] : optionValue[0]
      return obj
    }, {})
  }

  random() {
    const keys = this.keys()
    const index = Math.floor(Math.random() * keys.length)
    return keys[index]
  }

  keys() {
    return [...this.mappedData.keys()]
  }

  setMappedData(data) {
    this.mappedData = data
  }

  filter(predicate) {
    if (!predicate) return this
    const newEnum = new EnumOptions()
    const newData = new Map(
      [...this.mappedData.entries()].filter((item) =>
        predicate(item[0], ...item[1]),
      ),
    )
    newEnum.setMappedData(newData)
    return newEnum
  }
}

export default EnumOptions
