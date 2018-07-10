import request from '@/utils/request'

export function fetchPage(query) {
  return request({
    url: '/dict/page',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data: query
  })
}


export function fetchSave(dict) {
  return request({
    url: '/dict',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data: dict
  })
}

export function fetchGet(id) {
  return request({
    url: '/dict/' + id,
    method: 'get'
  })
}

export function fetchUpdate(dict) {
  return request({
    url: '/dict/' + dict.id,
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data: dict
  })
}

export function fetchDelete(id) {
  return request({
    url: '/dict/' + id,
    method: 'delete'
  })
}
