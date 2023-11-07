import React, {useContext, useReducer, useState} from 'react';

const initialState = {
    allImages: [],
    maskedImages: [],
    originalImages: [],
    wasteImages: [],
    currentImage:'',
}
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_MASKED_IMAGES':
            console.log('Action', action.payload)
            return {
                ...state,
                maskedImages: action.payload
            }
        case 'SET_ORIGINAL_IMAGES':
            return {
                ...state,
                originalImages: action.payload
            };
        case 'SET_WASTE_IMAGES':
            return {
                ...state,
                wasteImages: action.payload
            };
        case 'SET_CURRENT_IMAGES':return {
            ...state,
            currentImage: action.payload
        }
        default :return state
    }
}
const ImageContext = React.createContext(initialState);

export const useImage = () => {
    return useContext(ImageContext);
};

export const ImageProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const value={state, dispatch}

    return (
        <ImageContext.Provider value={value} >
            {children}
        </ImageContext.Provider>
    );
};
