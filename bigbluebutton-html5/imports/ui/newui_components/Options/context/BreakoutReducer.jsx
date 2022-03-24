const BreakoutReducer = (state, actions) => {
    switch (actions.type) {
        case "UPDATE_STATE":
            return {
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
            };
        case "RESET_STATE":
            return {
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
            };
        default:
            return state;
    }
}
export default BreakoutReducer;