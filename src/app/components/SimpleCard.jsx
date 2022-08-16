import { Card } from '@mui/material';
import { Box, styled } from '@mui/system';

const CardRoot = styled(Card)(() => ({
  height: '100%',
  padding: '20px 24px',
}));

const CardTitle = styled('div')(({ subtitle }) => ({
  fontSize: '1rem',
  fontWeight: '500',
  textTransform: 'capitalize',
  marginBottom: !subtitle && '16px',
}));

const SimpleCard = ({ children, title, subtitle, icon, button }) => {
  return (
    <CardRoot elevation={6}>
      <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
        <CardTitle subtitle={subtitle}>{title}</CardTitle>
        {subtitle && <Box sx={{ mb: 2 }}>{subtitle}</Box>}
        {button}
      </div>
      {children}
    </CardRoot>
  );
};

export default SimpleCard;
