import React, {useState} from 'react';
import {styled, useTheme} from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PermMediaIcon from '@mui/icons-material/PermMedia';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CropOriginalIcon from '@mui/icons-material/CropOriginal';
import DeleteIcon from '@mui/icons-material/Delete';
import MainScreen from "./MainScreen";
import {Collapse, Grid} from "@mui/material";
import image from './Image/Naturalimage1.jpg'
import {useImage} from "./ImageContext";
import image1 from './Image/Naturalimage2.jpg';
import image2 from './Image/road.png';
import splogo from './Image/SPlogo.png';
import './MainScreen.css';



const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    backgroundColor: '#1C212E',
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
    }),
    [theme.breakpoints.down('sm')]:{
        width:'100%'
    },
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    backgroundColor:'#1C212E',
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({theme, open}) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, {shouldForwardProp: (prop) => prop !== 'open'})(
    ({theme, open}) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),

        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

export default function MiniDrawer() {
    const theme = useTheme();
    const {state, dispatch} = useImage();
    console.log('State', state)
    const [open, setOpen] = React.useState(false);
    const allImages = [image, image2, image1]


    const [currentItem, setCurrentItem] = useState('');

    function handleClick(image) {
        dispatch({type: 'SET_CURRENT_IMAGES', payload: image})
    }

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    function downIcon() {
        if (open) {
            return <KeyboardArrowDownIcon sx={{color:'white'}} />
        }
        return null
    }

    function renderIcon(value) {
        if (value === 'Trash') {
            return <DeleteIcon/>
        } else if (value === 'Original images') {
            return <CropOriginalIcon />
        } else if (value === 'Masked images') {
            return <CropOriginalIcon />
        }
        else if (value === 'Waste images') {
            return <DeleteIcon />
        }
    }

    return (
        <Box sx={{display: 'flex'}}>
            <CssBaseline />


            {/*Header*/}


            <Drawer variant="permanent" open={open}
                    sx={{ backgroundColor:'#1C212E' }}
            >

                <DrawerHeader sx={{backgroundColor:'#1C212E', justifyContent:'flex-start', position:'relative'}}>
                    {!open ?         <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="center"
                        sx={{

                            ...(open && {display: 'none'}),
                            "&:hover": {
                                backgroundColor:'white',color:'black'}
                        }}
                    >
                        <MenuIcon sx={{color:'#fff',
                        "&:hover": {
                            color:'black'
                        } }} />
                    </IconButton> : <Grid container justifyContent={'center'}>
                        <img src={splogo}
                             className='drawerimg' />

                        <IconButton sx={{backgroundColor:'#1C212E', position:'absolute', right:0,
                            "&:hover": {
                                backgroundColor:'white',color:'black'}}} onClick={handleDrawerClose}>
                            {theme.direction === 'rtl' ? <ChevronRightIcon/> : <ChevronLeftIcon sx={{color:'white',
                                '@media screen and (max-width: 600px)': {
                                marginRight:'10px',
                                    marginTop:'10px'
                                },
                                "&:hover": {color:'black'}}}/>}
                        </IconButton></Grid>}

                </DrawerHeader>
                <Divider sx={{color: 'white', backgroundColor:'white'}} />


                {/*All Images*/}

                <List >


                    <ListItem disablePadding sx={{display: 'block'}}>
                        <ListItemButton
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5,
                                "&:hover": {
                                background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.22) 0%, rgba(217, 217, 217, 0.00) 100%)'}
                            }}
                            onClick={() => {
                                if (currentItem == 'All images') {
                                    setCurrentItem()
                                } else {
                                    setCurrentItem('All images')
                                }
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                }}
                            >
                                <PermMediaIcon sx={{color:'white'}} />
                                {/*{index % 2 === 0 ? <PermMediaIcon /> : <CropOriginalIcon />}*/}

                            </ListItemIcon>
                            <ListItemText primary={'All Images'} sx={{opacity: open ? 1 : 0, color:'white'}}/>
                            {downIcon()}
                        </ListItemButton>

                        <Collapse in={currentItem == 'All images'}>
                            {allImages.map((image, index) => (
                                <IconButton  onClick={() => {
                                    handleClick(image);
                                    handleDrawerClose();
                                }}  sx={{ width:'100%', padding:open?'0px 40px':'auto',display:'flex',flexWrap:'nowrap', "&:focus":{outline:'none'}, justifyContent:open?'flex-start':'center'}} alignItems={'center'}>
                                    <CropOriginalIcon sx={{color:'#fff'}}/>
                                    <Typography variant={'body1'} sx={{
                                        color:'white',
                                        padding:'5px',
                                        cursor:'pointer',
                                        display:open?'block':'none',
                                        backgroundColor:'#1C212E',
                                        "&:hover": {
                                            fontStyle:'italic',
                                            background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.22) 0%, rgba(217, 217, 217, 0.00) 100%)'}
                                    }}

                                    >Image &nbsp;{index} </Typography>
                                </IconButton>
                            ))}
                        </Collapse>
                    </ListItem>

                </List>
                <Divider sx={{color: 'white', backgroundColor:'white'}}/>


                {/*Masked Images*/}

                <List sx={{backgroundColor:'#1C212E'}} >
                    {/*{['Masked images', 'Original images', 'Trash'].map((text, index) => (*/}
                    <ListItem disablePadding sx={{display: 'block'}}>
                        <ListItemButton
                            sx={{
                                backgroundColor:'#1C212E',
                                minHeight: 48,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5,
                                "&:hover": {
                                    background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.22) 0%, rgba(217, 217, 217, 0.00) 100%)'}
                            }}
                            onClick={() => {

                                if (currentItem == 'Masked images') {
                                    setCurrentItem()
                                } else {
                                    setCurrentItem('Masked images')
                                }
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    color:'white',
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                }}
                            >
                                {renderIcon('Masked images')}
                            </ListItemIcon>
                            <ListItemText primary={'Masked Images'} sx={{opacity: open ? 1 : 0, color:'white'}}/>
                            {downIcon()}
                        </ListItemButton>

                        <Collapse in={currentItem == 'Masked images'} sx={{backgroundColor:'#1C212E'}} >
                            {state.maskedImages?.map(item => (
                                <Typography variant={'body1'} onClick={()=>{
                                    dispatch({type:'SET_CURRENT_IMAGES', payload:item?.image});
                                    handleDrawerClose();
                                }} sx={{ backgroundColor:'#1C212E',
                                    color:'white',
                                    padding:'5px',
                                    "&:hover": {
                                        fontStyle:'italic',
                                        background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.22) 0%, rgba(217, 217, 217, 0.00) 100%)'}
                                }} style={{cursor: 'pointer', marginLeft: '40px'}}>
                                    {item?.file}
                                    {console.log('Masked', item)}</Typography>
                            ))}
                        </Collapse>

                    </ListItem>


                    {/*Original images*/}

                    <ListItem disablePadding sx={{display: 'block'}}>
                        <ListItemButton
                            sx={{
                                backgroundColor:'#1C212E',
                                minHeight: 48,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5,
                            "&:hover": {
                            background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.22) 0%, rgba(217, 217, 217, 0.00) 100%)'}}}
                            // ... (your ListItemButton code)
                            onClick={() => {
                                if (currentItem === 'Original images') {
                                    setCurrentItem();
                                } else {
                                    setCurrentItem('Original images');
                                }
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    color:'white',
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',

                                }}
                            >
                                {renderIcon('Original images')}
                            </ListItemIcon>
                            <ListItemText primary={'Original Images'} sx={{opacity: open ? 1 : 0, color:'white'}}/>
                            {downIcon()}
                        </ListItemButton>

                        <Collapse in={currentItem === 'Original images'} sx={{backgroundColor:'#1C212E'}}>
                            {state.originalImages?.map(item => (
                                <Typography variant={'body1'} onClick={() => {
                                    dispatch({type: 'SET_CURRENT_IMAGES', payload: item?.image});
                                    handleDrawerClose();
                                }} sx={{
                                    color:'white',
                                    padding:'5px',
                                    "&:hover": {
                                        fontStyle:'italic',
                                        background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.22) 0%, rgba(217, 217, 217, 0.00) 100%)'}
                                }} style={{cursor: 'pointer', marginLeft: '40px'}}>
                                    {item?.file}
                                </Typography>
                            ))}
                        </Collapse>
                    </ListItem>


                    {/* Waste Images */}

                    <ListItem disablePadding sx={{display: 'block'}}>
                        <ListItemButton
                            sx={{
                                backgroundColor:'#1C212E',
                                minHeight: 48,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5,
                            "&:hover": {
                            background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.22) 0%, rgba(217, 217, 217, 0.00) 100%)'}}}
                            // ... (your ListItemButton code)
                            onClick={() => {
                                if (currentItem === 'Waste images') {
                                    setCurrentItem();
                                } else {
                                    setCurrentItem('Waste images');
                                }
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    color:'white',
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                }}
                            >
                                {renderIcon('Waste images')}
                            </ListItemIcon>
                            <ListItemText primary={'Waste Images'} sx={{opacity: open ? 1 : 0, color:'white'}}/>
                            {downIcon()}
                        </ListItemButton>

                        <Collapse in={currentItem === 'Waste images'} sx={{backgroundColor:'#1C212E'}} >
                            {state.wasteImages?.map(item => (
                                <Typography variant={'body1'} onClick={() => {
                                    dispatch({type: 'SET_CURRENT_IMAGES', payload: item?.image});
                                    handleDrawerClose();
                                }} sx={{backgroundColor:'#1C212E',
                                    color:'white',
                                    padding:'5px',
                                    "&:hover": {
                                        fontStyle:'italic',
                                        background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.22) 0%, rgba(217, 217, 217, 0.00) 100%)'}
                                }} style={{cursor: 'pointer', marginLeft: '40px'}}>
                                    {item?.file}
                                </Typography>
                            ))}
                        </Collapse>
                    </ListItem>
                    {/*))}*/}
                </List>
            </Drawer>
            <Box component="main" sx={{flexGrow: 1, background:'#2f3441'}}>
                <Grid container  sx={{backgroundColor:'#13234d',height:'65px',
                        '@media screen and (max-width: 600px)': {
                    height:'58px'
                        }
                }}>

                        <Typography variant="h5" noWrap component="div"
                                    sx={{color:'white',padding:'14px'}}>
                            SurePass Reviewing Tool
                        </Typography>
                </Grid>
                <MainScreen/>
            </Box>
        </Box>
    );
}
