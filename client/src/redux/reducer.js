import { combineReducers } from 'redux'

const defaultState = {
  campaigns: [],
  currentUser: {},
  // newCampaign: {},
  redirectTo: null
}

function userReducer(state = defaultState.currentUser, action) {
  switch (action.type) {
    case "get_current_user":
      return action.payload
    default:
      return state
  }
}

function redirectReducer(state = defaultState.redirectTo, action) {
  switch (action.type) {
    case "redirect":
      return action.payload
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
      return state
    default:
      return state
  }
}

// function newCampaignReducer(state = defaultState.newCampaign, action) {
//   switch (action.type) {
//     case "update_campaign":
//       return action.payload
//     default:
//       return state
//   }
// }

const rootReducer = combineReducers({
  campaigns: campaignsReducer,
  currentUser: userReducer,
  // newCampaign: newCampaignReducer,
  redirectTo: redirectReducer
})

export default rootReducer