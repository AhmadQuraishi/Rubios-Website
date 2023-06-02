import { Switch, SwitchProps, Typography, styled } from '@mui/material';
import { useEffect, useState, memo } from 'react';

const ToggleSwitch = styled((props: SwitchProps) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 60,
  height: 26,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 11, // Adjusted padding value
    margin: -9,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(33px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: theme.palette.mode === 'dark' ? '#3170b7' : '#3170b7',
        opacity: 1,
        border: 0,
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#33cf4d',
      border: '6px solid #fff',
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color:
        theme.palette.mode === 'light'
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 22,
    height: 22,
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === 'dark' ? '#3170b7' : '#3170b7',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
  },
}));

const ProductToggle = (props: any) => {
  const { showChildOptions, main, toggleState } = props;
  const [asIs, setAsIs] = useState<any>(true);
  const [customize, setCustomize] = useState<any>(null);
  const [toggle, setToggle] = useState<boolean>(false);


  useEffect(() => {
    setAsIs(main?.options[0]);
    setCustomize(main?.options[1]);
  }, [main]);
  console.log('modifiermain:::::;', main);
  console.log(asIs, 'asIs');
  console.log(customize, 'customize');
  const checkOptionSelected = (
    optionId: number,
    parnetOptionID: number,
  ): boolean => {
    let isSelected = false;
    if (main.id === parnetOptionID) {
      isSelected = main.selectedOptions?.includes(optionId);
    }
    return isSelected;
  };


  const onChangeToggle = () => {
    setToggle(!toggle);
    // toggleState(!toggle)
  }


  return (
    <>
      <div style={{ display: 'flex', marginBottom: '20px' }}>
        <Typography
          sx={{
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '15px',
            fontFamily: 'Librefranklin-Regular !important',
            textTransform: 'uppercase',
            color: checkOptionSelected(main?.options[1]?.option?.id, main?.id)
              ? '#98b7db'
              : '#3170b7',
          }}
        >
          As is
        </Typography>
        <ToggleSwitch
          sx={{ marginLeft: '10px', marginRight: '10px' }}
          // id={asIs?.option?.id}
          // value={main.selectedOptions}
          // checked={toggle === 'As is' ? false : true}
          // checked={toggle}
          checked={
            checkOptionSelected(main.selectedOptions, main?.id)
              ? checkOptionSelected(main?.options[0]?.option?.id, main.id)
              : checkOptionSelected(main?.options[1]?.option?.id, main?.id)
          }
          // onChange={() => toggleState(!toggle)}
          onChange={() => {
            if (checkOptionSelected(main?.options[0]?.option?.id, main?.id)) {
              // setToggle(checkOptionSelected(customize?.option?.id, main.id));
              showChildOptions(main?.options[1]?.option?.id, main?.id, null, null);
            } else {
              // setToggle(checkOptionSelected(asIs?.option?.id, main.id));
              showChildOptions(main?.options[0]?.option?.id, main?.id, null, null);
            }
          }}
        />
        < Typography
          sx={{
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '15px',
            fontFamily: 'Librefranklin-Regular !important',
            textTransform: 'uppercase',
            color: checkOptionSelected(main?.options[1]?.option?.id, main?.id)
              ? '#3170b7'
              : '#98b7db',
          }}
        >
          Customize
        </Typography>
      </div >
    </>
  );
};

export default memo(ProductToggle);
