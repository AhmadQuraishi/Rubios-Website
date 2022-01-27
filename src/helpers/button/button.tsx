import { Button } from "@mui/material";
import { makeStyles } from '@mui/styles';


const useStyle = makeStyles(() => ({
    root: {
       paddingBottom: '4px'
    }
  }))


const CustomButton = (props: any) =>{
  const classes = useStyle()
    return (
        <Button variant={props.variant} fullWidth style={{marginTop: '6px'}} >
              {props.text}
        </Button>
    )
} 

export default CustomButton



