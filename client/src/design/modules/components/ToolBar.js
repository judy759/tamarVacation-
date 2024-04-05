import { styled } from '@mui/material/styles';
import MuiToolbar from '@mui/material/Toolbar';

const Toolbar = styled(MuiToolbar)(({ theme }) => ({
  height: 64,
  //color: "#ff3366",
  fontcolor:"#f36;",
  backgroundColor:"#28282a",
  [theme.breakpoints.up('sm')]: {
    //height: 70,color: "#ff3366"
  },
}));

export default Toolbar;