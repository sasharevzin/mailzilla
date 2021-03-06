import { history } from '../index'
const token = localStorage.getItem("token")

export const getCurrentUser = () => {
  return function (dispatch) {
    if (token) {
      fetch("http://localhost:3000/api/v1/profile", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` }
      }).then(res => res.json())
        .then(data => dispatch({ type: "get_current_user", payload: data.user }))
    }
  }
}

export const getSegments = () => {
  return function (dispatch) {
    if (token) {
      fetch("http://localhost:3000/api/v1/segments", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` }
      }).then(res => res.json())
        .then(data => dispatch({ type: "get_segments", payload: data }))
    }
  }
}

export const login = userObj => {
  return function (dispatch) {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accepts: 'application/json',
      },
      body: JSON.stringify({
        user: userObj
      })
    }
    return fetch("http://localhost:3000/api/v1/login", options)
      .then(res => res.json())
      .then(data => {
        if (data.user) {
          localStorage.setItem("token", data.jwt)
          dispatch({ type: "get_current_user", payload: data.user })
          history.push("/campaigns")
        } else {
          return data
        }
      })
  }
}

export const signup = userObj => {
  return function (dispatch) {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accepts: 'application/json',
      },
      body: JSON.stringify({
        user: userObj
      })
    }
    return fetch("http://localhost:3000/api/v1/users", options)
      .then(res => res.json())
      .then(data => {
        if (data.user) {
          localStorage.setItem("token", data.jwt)
          dispatch({ type: "get_current_user", payload: data.user })
          history.push("/campaigns")
        } else {
          return data
        }
      })
  }
}

export const logout = () => {
  return function (dispatch) {
    localStorage.removeItem("token")
    dispatch({ type: "logout" })
    history.push("/")
  }
}

export const getCampaigns = () => {
  return function (dispatch) {
    const token = localStorage.getItem("token")
    fetch("http://localhost:3000/api/v1/campaigns", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => res.json())
      .then(data => dispatch({ type: "get_campaigns", payload: data }))
  }
}

export const createCampaign = campaignObj => {
  return function (dispatch) {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accepts: 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        campaign: campaignObj
      })
    }
    return fetch("http://localhost:3000/api/v1/campaigns", options)
      .then(res => res.json())
      .then(data => {
        if (data.errors) {
          return data
        } else {
          dispatch({ type: "create_campaign", payload: data })
          history.push(`/campaigns/${data.id}/edit`)
        }
      })
  }
}

export const updateCampaign = (id, field, value) => {
  return function (dispatch) {
    const options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accepts: 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        campaign: {
          [field]: value
        }
      })
    }
    return fetch(`http://localhost:3000/api/v1/campaigns/${id}`, options)
      .then(res => res.json())
      .then(data => {
        dispatch({ type: "update_campaign", payload: data })
      })
  }
}

export const getTemplates = () => {
  return function (dispatch) {
    fetch("http://localhost:3000/api/v1/campaigns/templates", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => res.json())
      .then(data => dispatch({ type: "get_templates", payload: data }))
  }
}

export const getContacts = () => {
  return function (dispatch) {
    fetch("http://localhost:3000/api/v1/contacts", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => res.json())
      .then(data => dispatch({ type: "get_contacts", payload: data }))
  }
}

export const editContact = (id, field, value) => {
  return function (dispatch) {
    const options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accepts: 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        contact: {
          [field]: value
        }
      })
    }
    return fetch(`http://localhost:3000/api/v1/contacts/${id}`, options)
      .then(res => res.json())
      .then(data => {
        dispatch({ type: "update_contact", payload: data })
      })
  }
}

export const createSegment = segmentObj => {
  return function (dispatch) {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accepts: 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        segment: segmentObj
      })
    }
    return fetch("http://localhost:3000/api/v1/segments", options)
      .then(res => res.json())
      .then(data => dispatch({ type: "create_segment", payload: data }))
  }
}

export const addSegment = (contactId, segmentObj) => {
  return function (dispatch) {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accepts: 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        segment: segmentObj
      })
    }
    return fetch("http://localhost:3000/api/v1/segments", options)
      .then(res => res.json())
      .then(data => {
        const options = {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Accepts: 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            contact: {
              segment: data
            }
          })
        }
        fetch(`http://localhost:3000/api/v1/contacts/${contactId}/add_segment`, options)
          .then(res => res.json())
          .then(data => dispatch({ type: "update_contact", payload: data }))
      })
  }
}

export const removeSegment = (contactId, segmentId) => {
  return function (dispatch) {
    const options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accepts: 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        contact: {
          segment_id: segmentId
        }
      })
    }
    fetch(`http://localhost:3000/api/v1/contacts/${contactId}/remove_segment`, options)
      .then(res => res.json())
      .then(data => dispatch({ type: "update_contact", payload: data }))
  }
}

export const sendToSegment = campaignId => {
  return function (dispatch) {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accepts: 'application/json',
        Authorization: `Bearer ${token}`
      }
    }
    return fetch(`http://localhost:3000/api/v1/campaigns/${campaignId}/send_to_segment`, options)
      .then(res => res.json())
      .then(data => dispatch({ type: "update_campaign", payload: data }))
  }
}

export const importContacts = (inputValue, userId) => {
  return function (dispatch) {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accepts: 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        contact: {
          input_value: inputValue,
          user_id: userId
        }
      })
    }
    return fetch("http://localhost:3000/api/v1/contacts", options)
      .then(res => res.json())
      .then(data => dispatch({ type: "add_contacts", payload: data }))
  }
}

export const getStats = campaignId => {
  return function (dispatch) {
    return fetch(`http://localhost:3000/api/v1/campaigns/${campaignId}/stats`)
      .then(res => res.json())
      .then(data => dispatch({ type: "get_stats", payload: data }))
  }
}
