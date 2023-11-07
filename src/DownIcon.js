import React, { useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

function DownIcon() {
    const [isOpen, setIsOpen] = useState(false);

    const handleToggleIcon = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div onClick={handleToggleIcon}>
            {isOpen ? <KeyboardArrowRightIcon sx={{ color: 'white' }} /> : <KeyboardArrowDownIcon sx={{ color: 'white' }}  />}
        </div>
    );
}

export default DownIcon;