import React, {useReducer} from 'react'
import "./MainScreen.css"
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useImage } from "./ImageContext";
import DeleteIcon from "@mui/icons-material/Delete";
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import {Grid} from "@mui/material";



export default function MainScreen() {
    // const { currentImage } = useImage();
const {state, dispatch} = useImage();

    const usedIds = new Set();

    const generateUniqueId = () => {
        const min = 100; // Minimum value for the unique ID
        const max = 999; // Maximum value for the unique ID

        let uniqueId;
        do {
            uniqueId = Math.floor(Math.random() * (max - min + 1)) + min; // Generates a random number between min and max (inclusive)
        } while (usedIds.has(uniqueId)); // Check if the generated number is already used, if yes, generate a new number

        usedIds.add(uniqueId); // Add the generated number to the usedIds set
        return uniqueId.toString(); // Convert the number to a string before returning
    };

const handleMasked = (e) => {
    const uniqueId = generateUniqueId();
    dispatch({
        type:'SET_MASKED_IMAGES',
        payload:[...state.maskedImages,{file:`Masked Image ${uniqueId}`, image:state.currentImage}]})
}

    const handleOriginal = () => {
        const uniqueId = generateUniqueId();
        dispatch({
            type: 'SET_ORIGINAL_IMAGES',
            payload: [...state.originalImages, { file: `Original Image ${uniqueId}`, image: state.currentImage }]
        });
    };

    const handleWaste = () => {
        const uniqueId = generateUniqueId();
        dispatch({
            type: 'SET_WASTE_IMAGES',
            payload: [...state.wasteImages, { file: `Waste Image ${uniqueId}`, image: state.currentImage }]
        });
    };


  return (
    <div className='div'>


        <div className='div1'>
            <h3 className='h1'>Image Name</h3>
            <img className='img' src={state.currentImage} />

                <Grid container spacing={2}  justifyContent={'center'} direction="row"
                       sx={{
                           marginTop:2,
                           '@media screen and (max-width: 600px)': {
                               flexDirection: 'column',
                               display:'flex',
                               marginLeft:'25px'
                           },

                       }}>

                        <Button  sx={{color:'white',backgroundColor:'#2196F3',borderRadius:'50px',
                            '@media screen and (max-width: 600px)': {
                                width:'125px',
                                marginLeft:'60px',
                                marginTop:'10px'
                            },
                            "&:hover" : { background : 'linear-gradient(90deg, #2196F3 0.15%, rgba(255, 255, 255,0.60)99.83%)'}}}
                                variant="outlined" startIcon={<InsertPhotoIcon />} onClick={handleMasked}>Masked</Button>

                        <Button sx={{ margin:"0px 20px",color:'white',backgroundColor:'#2196F3',borderRadius:'50px',
                            '@media screen and (max-width: 600px)': {
                                width:'125px',
                                marginLeft:'60px',
                                marginTop:'10px'
                            },
                            "&:hover" : { background : 'linear-gradient(90deg, #2196F3 0.15%, rgba(255, 255, 255,0.60)99.83%)'}}}
                                variant="outlined" startIcon={<InsertPhotoIcon />} onClick={handleOriginal}>Original</Button>

                        <Button sx={{color:'white', backgroundColor:'#EF6C00',borderRadius:'50px',
                            '@media screen and (max-width: 600px)': {
                                width:'125px',
                                marginLeft:'60px',
                                marginTop:'10px'
                            },
                            "&:hover" : { background : 'linear-gradient(90deg, #EF6C00 0.15%, rgba(255, 255, 255,0.60)99.83%)'} }}
                                variant="outlined" startIcon={<DeleteIcon />} onClick={handleWaste}>Waste</Button>

                </Grid>

        </div>
    </div>
  )
}


