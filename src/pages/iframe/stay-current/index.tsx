import { Button } from '@mui/material';
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
              'Content-Type': 'application/json',
              Authorization: `7zaX6XnEA3Qeu5Av-A6`,
            },
          };

          const promise = axios.post(
            url || '',
            {
              store_number: '19791',
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
                  msg: 'Thank you for getting in touch! We appreciate you contacting us',
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
    <div className="stay-connect-bg">
      <div style={{ width: '100%' }}>
        <h2 aria-label="stay current">Stay Current</h2>
      </div>
      <div className="stay-connect-actions">
        <div className="panel-cc" style={{ paddingRight: '15px' }}>
          <p>
            Sign up to be the first to hear about new menu items, special
            offers, and all things Rubio’s.
          </p>
        </div>
        <div className="panel-cc">
          <div className="email-action-panel">
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
              placeholder="Enter Your Email"
              autoComplete="off"
              aria-label="Enter Your Email"
            />
            <Button
              disabled={loading}
              variant="contained"
              className="button-right"
              aria-label="Click To Submit Your Email"
              onClick={() => submitEmail()}
            >
              &#8594;
            </Button>
          </div>
          <div className={`msg-status ${msg.type}`}>{msg.msg}</div>
        </div>
      </div>
    </div>
  );
};

export default StayCurrentIframe;