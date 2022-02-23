#!/bin/bash
echo "Type your computer password if prompted:";
sudo chmod 400 'rubioslivedev_privatekey';
rm -rf '../build';
#rm -rf '../node_modules'
#npm install
npm run build.prod;
ssh -i rubioslivedev_privatekey ubuntu@dpropt.com 'sudo chown -R $USER:$USER /var/www/dpropt.com && exit'
scp -i rubioslivedev_privatekey -pr ../build/* ubuntu@dpropt.com:/var/www/dpropt.com;
ssh -i rubioslivedev_privatekey ubuntu@dpropt.com 'sudo chown -R www-data:www-data /var/www/dpropt.com && exit'
