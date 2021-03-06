import { combineReducers } from 'redux'

const defaultState = {
  campaigns: null,
  currentUser: null,
  templates: [],
  contacts: null,
  segments: null,
  stats: null
}

function userReducer(state = defaultState.currentUser, action) {
  switch (action.type) {
    case "get_current_user":
      return action.payload
    case "logout":
      return null
    default:
      return state
  }
}

function campaignsReducer(state = defaultState.campaigns, action) {
  switch (action.type) {
    case "get_campaigns":
      return action.payload
    case "create_campaign":
      return [...state, action.payload]
    case "update_campaign":
      const newArray = state.filter(campaign => campaign.id !== action.payload.id)
      return [...newArray, action.payload]
    default:
      return state
  }
}

function templatesReducer(state = defaultState.templates, action) {
  switch (action.type) {
    case "get_templates":
      return action.payload
    default:
      return state
  }
}

function contactsReducer(state = defaultState.contacts, action) {
  switch (action.type) {
    case "get_contacts":
      return action.payload
    case "update_contact":
      const newArray = state.filter(contact => contact.id !== action.payload.id)
      return [...newArray, action.payload]
    case "add_contacts":
      return [state, action.payload]
    default:
      return state
  }
}

function segmentsReducer(state = defaultState.segments, action) {
  switch (action.type) {
    case "get_segments":
      return action.payload
    case "create_segment":
      return [...state, action.payload]
    default:
      return state
  }
}

function statsReducer(state = defaultState.stats, action) {
  switch (action.type) {
    case "get_stats":
      return action.payload
    default:
      return state
  }
}

const rootReducer = combineReducers({
  campaigns: campaignsReducer,
  currentUser: userReducer,
  templates: templatesReducer,
  contacts: contactsReducer,
  segments: segmentsReducer,
  stats: statsReducer,
})

export default rootReducer
