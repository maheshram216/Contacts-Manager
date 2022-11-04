export const actionType = {
    ADD_CONTACT: "ADD_CONTACT",
    DELETE_CONTACT: "DELETE_CONTACT",
    SEARCH_CONTACT: "SEARCH_CONTACT",
    GET_USER: "GET_USER",
    CHECKED: "CHECKED",
    ADD_MARKED_CONTACT: "ADD_MARKED_CONTACT",
    REMOVE_MARKED_CONTACT: "REMOVE_MARKED_CONTACT",
}

const ContactReducer = (state, action) => {
    switch (action.type) {
      case actionType.ADD_CONTACT:
        return {
          ...state,
          contact: action.payload.contact,
        };
      case actionType.DELETE_CONTACT:
        localStorage.setItem(
          "user",
          JSON.stringify({ email: "NA", token: "NA" })
        );
        return {
          ...state,
          user: { email: "NA", token: "NA" },
        };

      case actionType.GET_USER:
        localStorage.setItem("user", JSON.stringify(action.payload.user));
        return {
          ...state,
          user: action.payload,
        };

      case actionType.SEARCH:
        const arr = [];
        state.contact.forEach((obj) => {
          if (
            obj.email.toLowerCase().includes(action.payload.key.toLowerCase())
          ) {
            arr.push(obj);
          }
        });

        return { ...state, filter: arr };
      // ??????????????????????????????  HERE IS THE CATCH  ???????????????????????????????????????????????????????????????????????
      case actionType.GET_USER:
        localStorage.setItem("user", JSON.stringify(action.payload.user));
        console.log(action.payload.user);

        return {
          ...state,
          user: action.payload.user,
        };
      case actionType.ADD_MARK:
        const newMark = state.mark;
        if (newMark[action.payload.id]) {
          delete newMark[action.payload.id];
        } else {
          newMark[action.payload.id] = 1;
        }
        // console.log(Object.keys(newMark).length, state.contact.length);
        if (Object.keys(newMark).length === state.contact.length) {
          return {
            ...state,
            mark: newMark,
            isChecked: true,
          };
        } else {
          return {
            ...state,
            mark: newMark,
            isChecked: false,
          };
        }

      case actionType.REMOVE_MARK:
        return {
          ...state,
          mark: {},
        };

      case actionType.CHECKED:
        // console.log(!state.isChecked);
        const checkMark = {};

        state.contact.forEach((ele) => {
          checkMark[ele._id] = 1;
        });
        if (state.isChecked) {
          return {
            ...state,
            mark: {},
            isChecked: !state.isChecked,
          };
        }
        return {
          ...state,
          mark: checkMark,
          isChecked: !state.isChecked,
        };

      default:
        return state;
    }
}

export default ContactReducer;