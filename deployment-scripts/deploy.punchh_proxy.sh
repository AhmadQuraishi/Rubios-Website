#!/bin/bash
echo "Type your computer password if prompted:";
sudo chmod 400 'rubioslivedev_privatekey';
ssh -i rubioslivedev_privatekey ubuntu@dpropt.com 'sudo chown -R $USER:$USER /var/www/punchh_api && exit'
scp -i rubioslivedev_privatekey -pr ../proxy_servers/punchh_api/index.php ubuntu@dpropt.com:/var/www/punchh_api/;
scp -i rubioslivedev_privatekey -pr ../proxy_servers/punchh_api/src/Proxy.php ubuntu@dpropt.com:/var/www/punchh_api/src;
ssh -i rubioslivedev_privatekey ubuntu@dpropt.com 'sudo chown -R www-data:www-data /var/www/punchh_api && exit'
