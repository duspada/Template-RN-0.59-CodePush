export const Types = {
  NAVIGATE_REQUEST: 'navigate/NAVIGATE_REQUEST',
};

const initialState = {
  where: '',
};

export default function navigate(state = initialState, action) {
  switch (action.type) {
    case Types.NAVIGATE_REQUEST:
      return {
        where: action.payload.where,
      };
    default:
      return state;
  }
}

export const Creators = {
  getNavigationRequest: (where) => ({
    type: Types.NAVIGATE_REQUEST,
    payload: {
      where,
    },
  }),
};
