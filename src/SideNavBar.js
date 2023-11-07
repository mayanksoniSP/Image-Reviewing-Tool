import React, {useState} from 'react'
import image from './Image/SPlogo.png';
import './SideNavBar.css'
import MainScreen from "./MainScreen";
import MenuIcon from '@mui/icons-material/Menu';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import FolderIcon from '@mui/icons-material/Folder';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import {Collapse} from "@mui/material";

export default function SideNavBar() {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isCollapse, setIsCollapse] = useState(false);
    const [currentIndex, setCurrentIndex] = useState();
    const [menuItems, setMenuItems] = useState([
        {
            title: "All Images",
            icon: <FolderIcon/>,
            children: {
             newImage: '123',
            }
        },
        {
            title: "Original Images",
            icon: <FolderIcon/>,
            children: {
                newImage: '456'

            }
        },
        {
            title: "Masked Images",
            icon: <FolderIcon/>,
            children: {
                newImage: '789'

            }
        },
        {
            title: "Waste Images",
            icon: <FolderIcon/>,
            children: {
                newImage: '123'

            }
        }

    ])


    return (
        <div className='diiv'>
            <div className={
                isExpanded
                    ? 'sidediv' : 'sidediv sidediv2'
            }>
                <div className='sideheaddiv'>
                    {
                        !isExpanded ?
                            null :
                            <div className='sideheaddiv2'>
                                <img className='imga' src={image}></img>
                                <h4 style={{marginLeft: '15px', marginTop: "20px"}}>Directory Part</h4>
                            </div>
                    }

                    {
                        !isExpanded ?
                            <MenuIcon className='sidebtn' onClick={() => setIsExpanded(!isExpanded)}/>
                            :
                            <ArrowBackIosIcon className='sidebtn' onClick={() => setIsExpanded(!isExpanded)}/>
                        // <KeyboardDoubleArrowLeftIcon className='sidebtn' onClick={()=>setIsExpanded(!isExpanded)} />
                    }
                </div>

                {
                    !isExpanded ?
                        <div>
                            {menuItems.map((item) => {
                                return (
                                    <div className={'foldericon'}>
                                        {item.icon}
                                    </div>
                                )
                            })}
                        </div>
                        :
                        <div>
                            {menuItems.map((item, idx) => {
                                return (
                                    <div className={`pdiv  ${currentIndex ==idx && 'pdiv-active'} `} onClick={() => {
                                        if (idx === currentIndex) {
                                            setCurrentIndex()
                                        } else {
                                            setCurrentIndex(idx)
                                        }

                                    }}>
                                        <p className='p'>{item.icon} {item.title}

                                            <KeyboardArrowDownIcon  className={'downkeyword'}
                                             />
                                        </p>

                                        <Collapse in={idx == currentIndex}>
                                            <p className='subpara' >{item?.children?.newImage}</p>
                                        </Collapse>
                                    </div>
                                )
                            })}

                        </div>
                }
            </div>
            <div>
                <MainScreen/>
            </div>
        </div>
    );
}