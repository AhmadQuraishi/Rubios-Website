
import { Grid, Typography, Card, CardMedia, CardContent, Button } from '@mui/material'
import FoodMenuCard from '../../components/foodMenuCard'

const FoodItem = () => {

    const menuItems1 = [
        {
          "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUAKpRxf2AActPwZQg__oUrjxb7K2od0nJug0zkYc94NePv_wFW5suC8nIiXBNQRzYw3s&usqp=CAU",
          "name": "Chips",
        },
        {
          "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUAKpRxf2AActPwZQg__oUrjxb7K2od0nJug0zkYc94NePv_wFW5suC8nIiXBNQRzYw3s&usqp=CAU",
          "name": "Maxicon Rice",
        },
        {
            "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUAKpRxf2AActPwZQg__oUrjxb7K2od0nJug0zkYc94NePv_wFW5suC8nIiXBNQRzYw3s&usqp=CAU",
            "name": "Citrus Rice",
          },
          {
            "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUAKpRxf2AActPwZQg__oUrjxb7K2od0nJug0zkYc94NePv_wFW5suC8nIiXBNQRzYw3s&usqp=CAU",
            "name": "Fresh Greens",
          },
      ]
      const menuItems2 = [
        {
          "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUAKpRxf2AActPwZQg__oUrjxb7K2od0nJug0zkYc94NePv_wFW5suC8nIiXBNQRzYw3s&usqp=CAU",
          "name": "Chips",
        },
        {
          "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUAKpRxf2AActPwZQg__oUrjxb7K2od0nJug0zkYc94NePv_wFW5suC8nIiXBNQRzYw3s&usqp=CAU",
          "name": "Maxicon Rice",
        },
        {
            "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUAKpRxf2AActPwZQg__oUrjxb7K2od0nJug0zkYc94NePv_wFW5suC8nIiXBNQRzYw3s&usqp=CAU",
            "name": "Citrus Rice",
          },
          {
            "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUAKpRxf2AActPwZQg__oUrjxb7K2od0nJug0zkYc94NePv_wFW5suC8nIiXBNQRzYw3s&usqp=CAU",
            "name": "Fresh Greens",
          },
      ]
      const drinks = [
        {
          "image": "https://cdnprod.mafretailproxy.com/sys-master-root/hc0/h47/9843100844062/46332_main.jpg_480Wx480H",
          "name": "Pepsi",
        },
        {
          "image": "https://cdnprod.mafretailproxy.com/sys-master-root/hc0/h47/9843100844062/46332_main.jpg_480Wx480H",
          "name": "Sprite",
        },
        {
            "image": "https://cdnprod.mafretailproxy.com/sys-master-root/hc0/h47/9843100844062/46332_main.jpg_480Wx480H",
            "name": "Coke",
          },
          {
            "image": "https://cdnprod.mafretailproxy.com/sys-master-root/hc0/h47/9843100844062/46332_main.jpg_480Wx480H",
            "name": "7up",
          },
      ]
    return (
        <>
            <Grid container>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Grid container >
                        <Grid item xs={12} sm={12} md={12} lg={6}>
                            <Typography variant='caption' style={{ color: 'blue' }}>PICK UP YOUR</Typography>
                            <Typography variant='h5'>Maxican Street Toca Plate </Typography>
                            <Typography variant="subtitle1"></Typography>

                            <Typography component="div">
                                <Typography variant='caption' style={{ color: "blue" }}>1000 Cal</Typography>
                                <Typography variant='caption'>$9.69</Typography>
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={6}>

                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={10} sm={10} md={10} lg={5}>
                            <Card elevation={6}>
                                <Grid container>
                                     <Grid item xs={8} sm={8} md={8} lg={5}>
                                     <CardMedia
                                    component="img"
                                    sx={{ width: 200 }}
                                    image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUAKpRxf2AActPwZQg__oUrjxb7K2od0nJug0zkYc94NePv_wFW5suC8nIiXBNQRzYw3s&usqp=CAU"
                                    alt="Live from space album cover"
                                />
                                     </Grid>
                                <Grid item xs={8} sm={8} md={8} lg={5} >
                                <CardContent sx={{ flex: '1 0 auto' }}>
                                    <Typography variant="caption" color='blue'> TACO ONE </Typography>
                                    <Typography variant="h6"> MAXICAN STREET CORN SHRIMP TACO  </Typography>
                                    <Typography variant="caption" color='blue'> CLICK TO CUSTOMIZE </Typography>
                                </CardContent>
                                </Grid>
                                </Grid>
                            </Card>
                        </Grid>
                        <Grid item xs={10} sm={10} md={10} lg={5}>
                            <Card elevation={6}>
                                <Grid container>
                                     <Grid item xs={8} sm={8} md={8} lg={5}>
                                     <CardMedia
                                    component="img"
                                    sx={{ width: 200 }}
                                    image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUAKpRxf2AActPwZQg__oUrjxb7K2od0nJug0zkYc94NePv_wFW5suC8nIiXBNQRzYw3s&usqp=CAU"
                                    alt="Live from space album cover"
                                />
                                     </Grid>
                                     <Grid item xs={8} sm={8} md={8} lg={5} >
                                <CardContent sx={{ flex: '1 0 auto' }}>
                                    <Typography variant="caption" color='blue'> TACO TWO </Typography>
                                    <Typography variant="h6"> MAXICAN STREET CORN SHRIMP TACO  </Typography>
                                    <Typography variant="caption" color='blue'> CLICK TO CUSTOMIZE </Typography>
                                </CardContent>
                                </Grid>
                                </Grid>
                            </Card>
                        </Grid>
                    </Grid>
                    <Typography variant='h6'>SELECT SIDE ONE</Typography>
                       <FoodMenuCard  menuItems={menuItems1} />
                        <Typography variant='h6'>SELECT SIDE TWO</Typography>
                        <FoodMenuCard  menuItems={menuItems2} />
                        <Typography variant='h6'>ADD A DRINK</Typography>
                    <FoodMenuCard  menuItems={drinks} />
                    <br />
                    <br />
                    {/* <Typography component='div' textAlign='center'>
                         <Typography variant='caption'>QUANTITY</Typography>
                         <Card>

                         </Card>
                         <Button variant='contained'>ADD TO BOX</Button>
                    </Typography> */}
                </Grid>
            </Grid>
        </>
    )

}

export default FoodItem