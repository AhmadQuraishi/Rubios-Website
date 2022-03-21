#!/bin/bash
echo "Type your computer password if prompted:";
sudo chmod 400 'rubioslivedev_privatekey';
ssh -i rubioslivedev_privatekey ubuntu@dpropt.com 'sudo chown -R $USER:$USER /var/www/olo_api && exit'
scp -i rubioslivedev_privatekey -pr ../proxy_servers/olo_api/index.php ubuntu@dpropt.com:/var/www/olo_api/;
scp -i rubioslivedev_privatekey -pr ../proxy_servers/olo_api/src/Proxy.php ubuntu@dpropt.com:/var/www/olo_api/src;
ssh -i rubioslivedev_privatekey ubuntu@dpropt.com 'sudo chown -R www-data:www-data /var/www/olo_api && exit'
