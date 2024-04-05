import React from 'react';
import { Link } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import AddTaskIcon from '@mui/icons-material/AddTask';

const AnimatedIconButton = animated(IconButton);

const ButtonWithEffect = ({ to, label, icon: Icon, color }) => {
  const [style, set] = useSpring(() => ({
    backgroundColor: color,
    boxShadow: '0 0 15px 0 rgba(0, 0, 0, 0.1)',
    transform: 'scale(1)',
    config: { tension: 300, friction: 10 },
  }));

  return (
    <Link to={to} style={{ textDecoration: 'none' }}>
      <AnimatedIconButton
        onMouseOver={() => set({ transform: 'scale(1.1)', boxShadow: '0 0 20px 0 rgba(0, 0, 0, 0.2)' })}
        onMouseLeave={() => set({ transform: 'scale(1)', boxShadow: '0 0 15px 0 rgba(0, 0, 0, 0.1)' })}
        style={style}
        aria-label={label}
      >
        <Icon />
      </AnimatedIconButton>
    </Link>
  );
};

const IconButtons = () => {
  return (
    <Stack direction="row" spacing={2}>
      <ButtonWithEffect to="/add-task" label="Add Task" icon={AddTaskIcon} color="#4caf50" />
      <ButtonWithEffect to="/delete" label="Delete" icon={DeleteIcon} color="#f44336" />
      {/* You can add other buttons here */}
    </Stack>
  );
};

export default IconButtons;
