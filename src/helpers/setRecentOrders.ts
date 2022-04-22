import moment from 'moment';

export function setRecentOrders(orderObj: any, basketid: string) {
  let recentorders = localStorage.getItem('recentorders');
  if (recentorders) {
    let recentordersList = JSON.parse(recentorders);
    const order = {
      orderid: orderObj.oloid,
      orderref: orderObj.orderref,
      basketid: basketid,
      date: moment(new Date()).format('DD/MM/YYYY'),
      isMarkFav: false,
    };
    recentordersList.push(order);
    localStorage.setItem('recentorders', JSON.stringify(recentordersList));
  } else {
    const items = [
      {
        orderid: orderObj.oloid,
        orderref: orderObj.orderref,
        basketid: basketid,
        date: moment(new Date()).format('DD/MM/YYYY'),
        isMarkFav: false,
      },
    ];
    localStorage.setItem('recentorders', JSON.stringify(items));
  }
}

export function markOrderAsFav(id: any) {
  let recentorders = localStorage.getItem('recentorders');
  if (recentorders) {
    let recentordersList = JSON.parse(recentorders);
    let order = recentordersList.find((x: any) => x.basketid === id);
    if (order) {
      order.isMarkFav = false;
      localStorage.setItem('recentorders', JSON.stringify(recentordersList));
    }
  }
}

export function updateLocalRecentOrdersList() {
  let recentorders = localStorage.getItem('recentorders');
  var d = new Date();
  d.setDate(d.getDate() - 5);
  if (recentorders) {
    let recentordersList = JSON.parse(recentorders);
    let newList: any[] = [];
    recentordersList.map((x: any) => {
      if (x.date !== moment(d).format('DD/MM/YYYY')) {
        newList.push(x);
      }
    });
    localStorage.setItem('recentorders', JSON.stringify(newList));
  }
}
