To deploy a Flask app to a production server using Gunicorn and Nginx, follow these steps:

### 1. Create a Non-Root User
- **Create a new user**: `adduser username`
- **Set a password** and **fill out the optional information**.
- **Give sudo privileges**: `usermod -aG sudo username`

### 2. SSH Configuration (Optional)
- **Edit SSH config**: `sudo nano /etc/ssh/sshd_config`
- **Enable password authentication** by finding and modifying or adding the `PasswordAuthentication yes` directive.
- **Restart SSH service**: `sudo systemctl restart sshd`

## Obtaining an SSL Certificate with Let's Encrypt:
- Install Certbot and the Nginx plugin: `sudo apt install certbot python3-certbot-nginx`
- Obtain the certificate: `sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com`
- Follow the prompts. Certbot will modify your Nginx configuration to use the SSL certificate and set up automatic renewal.

### 3. Clone Your Flask App
- **Clone your repository**: `git clone <repository-url>`
- **Navigate to your project directory**: `cd <project-directory>`

### 4. Set Up Python Virtual Environment
- **Create a virtual environment**: `python3 -m venv <env-name>`
- **Activate the virtual environment**: `source <env-name>/bin/activate`
- **Install Flask**: `pip install flask`

### 5. Install and Configure Gunicorn
- **Install Gunicorn**: `pip install gunicorn`
- **Create a Gunicorn systemd service file**: `sudo nano /etc/systemd/system/<your-service-name>.service`
- **Paste the systemd service configuration**:
    ```ini
    [Unit]
    Description=Gunicorn instance to serve myapp
    After=network.target

    [Service]
    User=myuser
    Group=www-data
    WorkingDirectory=/home/myuser/myapp
    Environment="PATH=/home/myuser/myapp/<env-name>/bin"
    ExecStart=/home/myuser/myapp/<env-name>/bin/gunicorn --workers 3 --bind unix:myapp.sock -m 007 wsgi:app

    [Install]
    WantedBy=multi-user.target
    ```
- **Start and enable the Gunicorn service**: `sudo systemctl start <your-service-name>` and `sudo systemctl enable <your-service-name>`

### 6. Install and Configure Nginx
- **Install Nginx**: `sudo apt install nginx`
- **Configure Nginx to proxy requests to Gunicorn**: `sudo nano /etc/nginx/sites-available/myapp`
- **Paste the Nginx server block configuration**:
    ```nginx
    # Redirect HTTP to HTTPS
    server {
        listen 80;
        server_name mydomain.com www.mydomain.com;

        # Redirect all HTTP requests to HTTPS
        return 301 https://$server_name$request_uri;
    }

    # HTTPS server configuration
    server {
        # Listen on port 443 for SSL connections
        listen 443 ssl;
        server_name mydomain.com www.mydomain.com;

        # SSL certificate and private key paths
        ssl_certificate /etc/letsencrypt/live/mydomain.com/fullchain.pem;
        ssl_certificate_key /etc/letsencrypt/live/mydomain.com/privkey.pem;

        # Recommended SSL settings for security
        ssl_protocols TLSv1.2 TLSv1.3;
        ssl_ciphers HIGH:!aNULL:!MD5;
        ssl_prefer_server_ciphers on;

        # Proxy all requests to the Flask application
        location / {
            include proxy_params;
            proxy_pass http://unix:/home/myuser/myapp/myapp.sock;
        }
    }
    ```
- **Enable the Nginx server block**: `sudo ln -s /etc/nginx/sites-available/myapp /etc/nginx/sites-enabled`
- **Test Nginx configuration**: `sudo nginx -t`
- **Restart Nginx**: `sudo systemctl restart nginx`

### 7. Adjust the Firewall
- **Allow Nginx through the firewall**: 
`sudo ufw allow 'Nginx Full'`
`sudo ufw delete allow 'Nginx HTTP'`

### 8. Access Your Site
- **Visit your domain**: Open your web browser and navigate to your domain.

This guide assumes you have a domain pointing to your server's IP and a Flask app ready for deployment.
