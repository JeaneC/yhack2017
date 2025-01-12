export const updateMessage = (message) => {
  return {
    type: 'UPDATE_MESSAGE',
    payload: message
  }
}

export const updateVal = (val) => ({ type: 'UPDATE_VAL', payload: val })

export const loginFacebook = (data) => ({ type: 'UPDATE_LOGIN', payload: data })

export const storeToken = (token) => ({ type: "UPDATE_TOKEN", payload: token})

export const updateEvents = (events) => ({ type: "UPDATE_EVENTS", payload: events})

export const updateEventId = (eventId) => ({ type: "UPDATE_EVENT_ID", payload: eventId})

export const updateEventTurns = (turns) => ({ type: "UPDATE_EVENT_TURNS", payload: turns})

export const updateCategory = (category) => ({ type: "UPDATE_CATEGORY", payload: category})

export const updateResults = (results) => ({ type: "UPDATE_RESULTS", payload: results})

export const updateRegion = (region) => ({ type: "UPDATE_REGION", payload: region})
