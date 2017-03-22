# Serveri setup

Alustuseks, installi omale VirtualBox ja sinna sisse vaikeseadetega Ubuntu Server 16.04.
Kui installatsioon lõppenud, sule virtuaalmasin. Lisa jagatud kaust - esmalt virtualBoxi pool - settings, shared folders, add. Read-only ja auto mount. 
Tee oma kausta uus kaust nimega www, sinna sisse app, appi sisse public ja publicu sisse index.html.
Minu oma asetseb desktopil ja on nimega "mets" - näited on selle peale samamoodi üles ehitatud.
Forwardi pordid 3022->22 ja 3080->80

1) Käivita virtuaalmasin uuesti.

2) `sudo apt-get update && sudo apt-get install openssh-server`

3) **!!!Veendu, et virtualbox guest additions on mounted!!!** Host-masinast, käsurealt (windowsis Putty kaudu):

`ssh -p 3022 mets@localhost`

4) logi oma parooliga (siin näitel "mets") sisse ja jooksuta korraga järgmine käsk:
```
sudo apt-get update && sudo apt-get install nodejs npm &&
sudo npm cache clean -f && sudo npm install -g n && sudo n stable &&
sudo apt-get install git nginx && sudo mount /dev/cdrom /media/cdrom &&
sudo sh /media/cdrom/VBoxLinuxAdditions.run &&
sudo usermod -a -G vboxsf www-data && sudo usermod -a -G vboxsf mets &&
sudo reboot
```

Vahepeal küsitakse Sult su parooli ja palutakse "Y" vajutada.

5) Kui masin uuesti üles buudib, ssh uuesti sisse ja
```
sudo rm -rf /var/www &&
sudo ln -s /media/sf_mets/www /var &&
sudo mv /etc/nginx/sites-available/default /etc/nginx/sites-available/default-backup &&
sudo nano /etc/nginx/sites-available/default
```

6) Copy-paste avanenud tekstiredaktoriaknasse:

```
server {
    listen 80;

    root /var/www/app/public;

    server_name localhost;
    index index.html index.html;

    location / {
        try_files $uri $uri/ =404;
        autoindex off;
        sendfile off;
    }

    location /api {
        proxy_pass http://localhost:3000;
    }
}
```

7) Peale seda ctrl+o, enter, ctrl+x ja

`sudo service nginx restart`

Siis navigeeri browseris http://localhost:3080

MongoDB-d puudutav osa ei ole veel lisatud aga lisandub lähiajal.
