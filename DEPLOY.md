# Deploying to a VPS with a Custom Domain

This guide will walk you through deploying your SCW Portfolio Marketplace to a Linux VPS (Ubuntu recommended).

## 1. Prepare your VPS

Connect to your server via SSH:
```bash
ssh root@your_vps_ip
```

Update your system and install Node.js (Version 20+):
```bash
sudo apt update
sudo apt upgrade -y
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
```

Install Git and PM2 (Process Manager):
```bash
sudo apt install git -y
sudo npm install -g pm2
```

## 2. Clone and Setup the Project

```bash
cd /var/www
git clone <your-repo-url> marketplace
cd marketplace
npm install
```

Create a `.env` file and add your environment variables:
```bash
nano .env
```
Add your keys:
```env
GEMINI_API_KEY=your_key_here
# Add any other Firebase or API keys used in your app
```

## 3. Build and Start the App

```bash
npm run build
pm2 start npm --name "scw-marketplace" -- start
pm2 save
pm2 startup
```

## 4. Configure Nginx (Reverse Proxy)

Install Nginx:
```bash
sudo apt install nginx -y
```

Create a new configuration file:
```bash
sudo nano /etc/nginx/sites-available/yourdomain.com
```

Add the following configuration:
```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable the configuration and restart Nginx:
```bash
sudo ln -s /etc/nginx/sites-available/yourdomain.com /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

## 5. Setup SSL (HTTPS)

Use Certbot to get a free SSL certificate from Let's Encrypt:
```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

Follow the prompts to finish the setup. Your site will now be accessible via `https://yourdomain.com`.

---

**Note:** For the easiest deployment experience, this app is also pre-configured for **Firebase App Hosting**. You can simply connect your GitHub repository to a Firebase project in the Firebase Console.