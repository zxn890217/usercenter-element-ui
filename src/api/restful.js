import request from '@/utils/request'

export function fetchQuery(url, query) {
  return request({
    url: url,
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data: query
  })
}


export function fetchSave(url, dict) {
  return request({
    url: url,
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data: dict
  })
}

export function fetchGet(url) {
  return request({
    url: url,
    method: 'get'
  })
}

export function fetchUpdate(url, dict) {
  return request({
    url: url,
    method: 'put',
    headers: {
      'Content-Type': 'application/json'
    },
    data: dict
  })
}

export function fetchDelete(url) {
  console.log(url);
  return request({
    url: url,
    method: 'delete'
  })
}
