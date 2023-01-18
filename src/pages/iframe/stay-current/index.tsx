import { Opacity } from '@mui/icons-material';
import { Button, Grid } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';

import './stay-current.css';
const StayCurrentIframe = () => {
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState({ msg: '', type: '' });
  const [loading, setLoading] = useState(false);
  const submitEmail = () => {
    setMsg({ msg: '', type: '' });
    var pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    if (email.trim() != '') {
      if (email.match(pattern)) {
        setLoading(true);
        try {
          const url =
            process.env.REACT_APP_PUNCHH_API + '/api2/dashboard/eclub_guests';
          const config = {
            headers: {
              'Content-Type': 'application/json'
            },
          };

          const promise = axios.post(
            url || '',
            {
              store_number: process.env.REACT_APP_ECLUB_STORE_ID,
              user: {
                email: email,
                marketing_email_subscription: 'True',
              },
            },
            config,
          );
          promise
            .then((response: any) => {
              setLoading(false);
              if (response) {
                setMsg({
                  msg: "Thanks for signing up! We'll be in touch soon.",
                  type: 'success',
                });
              }
            })
            .catch(() => {
              setLoading(false);
              setMsg({
                msg: 'Email submission is unscussessful. Please try again later',
                type: 'error',
              });
            });
        } catch (error) {
          setLoading(false);
          throw error;
        }
      } else {
        setLoading(false);
        setMsg({
          msg: 'Please enter a valid email',
          type: 'error',
        });
      }
    }
  };
  return (
    <Grid container className="stay-connect-bg" sx={{padding: {xs:"0px", md: "0px", sm: "0px", lg:"30px 152px 30px 152px"}}} >
      <Grid item xs={11.75} sm={5.75} md={5.75} lg={5.75} className="stay-connect-actions" sx={{flexDirection: "column"}}>
        <Grid style={{ width: '100%' }}>
          <h2 aria-label="stay current">Stay Current</h2>
        </Grid>
        <Grid className="panel-cc">
          <p>
            You're craving even more, we get it. Sign up today for the latest Rubio's news, menu items, special offers and more.
          </p>
        </Grid>
        </Grid>
        <Grid item xs={0.5}>

        </Grid>
        <Grid item xs={11.75} sm={5.75} md={5.75} lg={5.75} className="panel-sxc" sx={{display: "inline-grid"}}>
          <Grid className="email-action-panel">
            <input
              type="email"
              name="name"
              id="name"
              value={email}

              onChange={(e) => {
                setMsg({ msg: '', type: '' });
                setEmail(e.target.value);
              }}
              onKeyDown={(evt: any) => {
                const keyCode = evt
                  ? evt.which
                    ? evt.which
                    : evt.keyCode
                  : evt.keyCode;
                if (keyCode == 13) {
                  submitEmail();
                }
              }}
              placeholder="Enter your email"
              autoComplete="off"
              aria-label="Enter your email"
            />
            <a
              role="button"
              style={{ marginLeft: "5px" }}
            >
              {loading ? (
                <img
                  aria-label="Click To Submit Your Email"
                  onClick={() => submitEmail()}
                  style={{ cursor: "pointer", marginLeft: "5px", opacity: "0.4", height: 'inherit', display: 'block', borderRadius: "5px" }}
                  src={require('../../../assets/imgs/btn.png')}
                  alt="Arrow Icon"
                />
              ) : (
                <img
                  aria-label="Click To Submit Your Email"
                  onClick={() => submitEmail()}
                  style={{ cursor: "pointer", marginLeft: "5px", opacity: "1", height: 'inherit', display: 'block', borderRadius: "5px" }}
                  src={require('../../../assets/imgs/btn.png')}
                  alt="Arrow Icon"
                />
              )}
            </a>
          </Grid>
          <div className={`msg-status ${msg.type}`}>{msg.msg}</div>
        </Grid>
    </Grid>
  );
};

export default StayCurrentIframe;
