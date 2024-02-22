export const dataParse = (data: string) => {
  try {
    return JSON.parse(data);
  } catch {
    return null;
  }
}

export const dataStringify = (type: string, params: object) => {
  return JSON.stringify({
    type, data: JSON.stringify(params), id: 0
  })
}