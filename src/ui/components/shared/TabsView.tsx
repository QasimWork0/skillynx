import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { styled } from '@mui/material';

const StyledTabs = styled(Tabs)(({ theme }) => ({
    zIndex: '9999',
    '.MuiTabs-flexContainer': {
        display: 'flex',
        width: '100%',
        justifyContent: 'space-evenly',
    },
    // '.css-k008qs': {
    //     display: 'flex',
    //     width: '100%',
    //     justifyContent: 'space-evenly'
    // }
}))

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
            style={{ width: '100%', height: '100%', padding: '1rem' }}
        >
            {value === index && (
                children
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const TabsView = ({ menu }: { menu: { label: string, component: React.ReactNode }[] }) => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%', height: 'calc(100% - 3rem)' }}>
            <Box sx={theme => ({ backgroundColor: theme.palette.common.white, margin: '0 2px', boxShadow: '2px 2px 8px rgba(0,0,0,0.2)' })}>
                <StyledTabs value={value} onChange={handleChange} aria-label="basic tabs" indicatorColor='secondary'>
                    {menu.map((item, key) => (
                        <Tab label={<b>{item.label}</b>} {...a11yProps(key)} key={key} />
                    ))}
                </StyledTabs>
            </Box>
            {menu.map((item, key) => (
                <CustomTabPanel value={value} index={key}>
                    {item.component}
                </CustomTabPanel>
            ))}
        </Box>
    );
}

export default TabsView