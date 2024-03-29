# Cloud and DevOps for JS developers

### Installation
```
git clone git@github.com:staspiletski/epam-cloud-devops-js.git
cd epam-cloud-devops-js
yarn / npm install
```

### Create .env file in the root directory, example is .env.example

```
NODE_ENV=development
APP_PORT=8000
```

### Run script in dev mode

```
yarn start:dev / npm run start:dev
```

### NGINX
Using Nginx locally on macOS. Root of the project: ~/epam-cloud-devops-js
```
1) Place files nginx.conf, gzip.conf, mime.types into NGINX catalog '/usr/local/etc/nginx'
2) Place files from ssl folder into NGINX catalog '/usr/local/etc'
3) Add ssl/localhost.cert into Keychain Access / Certificates
4) Start NGINX using brew: sudo brew services start nginx
5) Start NodeJS: yarn start:dev
6) Start point: https://localhost/
7) http://localhost:8080 redirect to https://localhost/
```
See http://localhost:8000 for details and all available application routes

### Open terminal and go to /script folder
list of available commands
```
./db.sh or ./db.sh help
```

### AWS
create a new email template
```
./create-template.sh
```
update existing email template
```
./update-notification-email-template.sh
```
update lambda
```
./update-notification-email-template.sh
```
Send email notification with a quote use the page below.
Email was sent to verified email address and saved in s3 bucket. 
```
http://localhost:4200/api/aws/new-quote
```

### AWS EC2
start an instance
```
./scripts/aws-ec2/start.sh
```
stop the instance
```
./scripts/aws-ec2/stop.sh
```

### AWS EC2 Update the project
Develop new features and commit to gitHub project repository

connect to the instance
```
ssh my-ec2
```
go to the project root
```
cd ~/epam-cloud-devops-js
```
pull the latest changes and build the project
```
git pull && yarn && yarn build
```
start the project
```
pm2 start main
```

Open https://ec2-3-66-224-113.eu-central-1.compute.amazonaws.com