import {useState} from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, useTheme } from '@mui/material';
import FlexBetween from '@/components/FlexBetween';
import SavingsIcon from '@mui/icons-material/Savings';

const Navbar = () => {
    const { palette } = useTheme();
    const [selected, setSelected] = useState("dashboard");
    return (
    <FlexBetween marginBottom="0.25rem" padding="0.5rem 0rem" color={palette.grey[300]}>
        <FlexBetween gap="0.75rem">
            <SavingsIcon sx={{fontSize:"28px"}}/>
            <Typography variant="h3" fontSize="16px">Finance Dashboard</Typography>
        </FlexBetween>

        <FlexBetween gap="2rem">
            <Box sx={{ "&:hover": {color: palette.primary[300]}}}>
                <Link to="/" onClick={() => setSelected("dashboard")} style={{color: selected === "dashboard" ? "inherit" : palette.grey[600], textDecoration:"inherit"}}>Dashboard</Link>
            </Box>
            <Box sx={{ "&:hover": {color: palette.primary[300]}}}>
                <Link to="/predictions" onClick={() => setSelected("predictions")} style={{color: selected === "predictions" ? "inherit" : palette.grey[600], textDecoration:"inherit"}} >Predictions</Link>
            </Box>
        </FlexBetween>
    </FlexBetween>
    );
};

export default Navbar;