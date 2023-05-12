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
  const { toggle, setToggle, showChildOptions, main } = props;
  const [asIs, setAsIs] = useState<any>(null);
  const [customize, setCustomize] = useState<any>(null);
  //   const [toggle, setToggle] = useState('As is');

  useEffect(() => {
    setAsIs(main?.options[0]);
    setCustomize(main?.options[1]);
  }, [main]);
  console.log(toggle);
  console.log(asIs, 'asIs');
  console.log(customize, 'customize');
  // debugger;
  const checkOptionSelected = (
    optionId: number,
    parnetOptionID: number,
  ): boolean => {
    let isSelected = false;
    if (main.id === parnetOptionID) {
      isSelected = main.selectedOptions.includes(optionId);
    }
    // debugger;
    return isSelected;
  };
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
            color: checkOptionSelected(customize?.option?.id, main?.id)
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
          checked={
            toggle === checkOptionSelected(asIs?.option?.id, main?.id)
              ? checkOptionSelected(asIs?.option?.id, main.id)
              : checkOptionSelected(customize?.option?.id, main?.id)
          }
          onChange={() => {
            if (checkOptionSelected(asIs?.option?.id, main?.id)) {
              // setToggle(checkOptionSelected(customize?.option?.id, main.id));
              showChildOptions(
                customize?.option?.id,
                main?.id,
                customize?.dropDownValues,
                customize?.selectedValue,
              );
            } else {
              // setToggle(checkOptionSelected(asIs?.option?.id, main.id));
              showChildOptions(
                asIs?.option?.id,
                main?.id,
                asIs?.dropDownValues,
                asIs?.selectedValue,
              );
            }
          }}
        />
        <Typography
          sx={{
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '15px',
            fontFamily: 'Librefranklin-Regular !important',
            textTransform: 'uppercase',
            color: checkOptionSelected(customize?.option?.id, main?.id)
              ? '#3170b7'
              : '#98b7db',
          }}
        >
          Customize
        </Typography>
      </div>
    </>
  );
};

export default memo(ProductToggle);
