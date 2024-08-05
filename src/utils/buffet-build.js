const tryParse = (data) => {
  try {
    return JSON.parse(data)
  } catch (error) {
    return data
  }
}

// 序列化value
export const stringify = (data) => Object.entries(data).reduce((sum, [k, v]) => {
  sum[k] = JSON.stringify(v)
  return sum
}, {})

// 反序列化value
export const parse = (data) => Object.entries(data).reduce((sum, [k, v]) => {
  sum[k] = tryParse(v)
  return sum
}, {})

export const stringifyBuffetData = ({globalQuestions = {}, sampleQuestions = [] } = {}) => {
  return {
    globalQuestions: JSON.stringify(globalQuestions), 
    sampleQuestions: JSON.stringify(sampleQuestions),
    // sampleQuestions: sampleQuestions.map(JSON.stringify)
  }
}

export const parseBuffetData = ({globalQuestions = {}, sampleQuestions = [] } = {}) => {
  return {
    globalQuestions: tryParse(globalQuestions), 
    sampleQuestions: tryParse(sampleQuestions),
    // sampleQuestions: sampleQuestions.map(tryParse)
  }
}