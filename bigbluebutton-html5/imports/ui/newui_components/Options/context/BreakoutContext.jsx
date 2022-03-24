import { createContext, useReducer } from "react"
import BreakoutReducer from "./BreakoutReducer";

const INITIAL_STATE = {
    numberOfRooms: 2,
    seletedId: '',
    users: [],
    durationTime: 15,
    freeJoin: false,
    roomNameDuplicatedIsValid: false,
    formFillLevel: 1,
    roomNamesChanged: [],
    roomSelected: 0,
    preventClosing: true,
    leastOneUserIsValid: true,
    numberOfRoomsIsValid: true,
    roomNameDuplicatedIsValid: true,
    roomNameEmptyIsValid: true,
    record: false,
    durationIsValid: true,
    breakoutJoinedUsers: null,
    WantCreate: true,
    selectedUsers: 0
}

export const BreakoutContext = createContext(INITIAL_STATE);

export const BreakoutContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(BreakoutReducer, INITIAL_STATE);
    return (
        <BreakoutContext.Provider
            value={{
                numberOfRooms: state.numberOfRooms,
                seletedId: state.seletedId,
                users: state.users,
                durationTime: state.durationTime,
                freeJoin: state.freeJoin,
                roomNameDuplicatedIsValid: state.roomNameDuplicatedIsValid,
                formFillLevel: state.formFillLevel,
                roomNamesChanged: state.roomNamesChanged,
                roomSelected: state.roomSelected,
                preventClosing: state.preventClosing,
                leastOneUserIsValid: state.leastOneUserIsValid,
                numberOfRoomsIsValid: state.numberOfRoomsIsValid,
                roomNameDuplicatedIsValid: state.roomNameDuplicatedIsValid,
                roomNameEmptyIsValid: state.roomNameEmptyIsValid,
                record: state.record,
                durationIsValid: state.durationIsValid,
                breakoutJoinedUsers: state.breakoutJoinedUsers,
                WantCreate: state.WantCreate,
                selectedUsers: state.selectedUsers,
                dispatch,
            }}>
            {children}
        </BreakoutContext.Provider>
    )
}