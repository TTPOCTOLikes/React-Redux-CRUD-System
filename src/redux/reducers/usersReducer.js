import * as actionTypes from "../types.js";
import User from "../../Objects/User"

let initialState = [
    new User("Henry", "Kavill", 40),
    new User("John", "Licro", 45)
];

const usersList = JSON.parse(localStorage.getItem("usersList"));
if (usersList?.length) {
    initialState = usersList;
}

export const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_USER:
        {
            const newUser = action.payload;
            const newState = [...state, newUser];
            localStorage.setItem("usersList", JSON.stringify(newState));
            return newState;
        }

        case actionTypes.DELETE_USER_BY_ID:
        {
            const userIdToDelete = action.payload;
            const newState = state.filter((user, id) => id !== userIdToDelete);
            localStorage.setItem("usersList", JSON.stringify(newState));
            return newState;
        }

        case actionTypes.EDIT_USER_BY_ID:
        {
            const {id, changes: {name, surname, age, ownedCarsIds}} = action.payload;
            const newState = state.map((user, i) => {
                if (id === i) {
                    return new User(name, surname, age, ownedCarsIds);
                }
                return user;
            })
            localStorage.setItem("usersList", JSON.stringify(newState));
            return newState;
        }

        case actionTypes.DELETE_ALL_USERS:
        {
            localStorage.removeItem("usersList");
            return [];
        }

        case actionTypes.ADD_CAR_TO_USER:
        {
            const {userId, carId} = action.payload;
            const newState = state.map((user, i) => {
                if (userId === i) {
                    user.ownedCarsIds = [...user.ownedCarsIds, carId];
                }
                return user;
            })
            localStorage.setItem("usersList", JSON.stringify(newState));

            return newState;
        }

        case actionTypes.DELETE_CAR_FROM_USER:
        {
            const {userId, carId} = action.payload;
            const newState = state.map((user, i) => {
                if (userId === i) {
                    user.ownedCarsIds = user.ownedCarsIds.filter((ownedCar) => {
                        if(ownedCar === carId) {
                            return false;
                        }
                        return ownedCar;
                    });
                }
                return user;
            })
            localStorage.setItem("usersList", JSON.stringify(newState));

            return newState;
        }

        default:
            if (state) {
                localStorage.setItem("usersList", JSON.stringify(state));
            }
            return state;
    }
}