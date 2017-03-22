## Serveri setup
---
Alustuseks, installi omale VirtualBox ja sinna sisse vaikeseadetega Ubuntu Server 16.04

Pane VM tööle ja jooksuta järgmised käsud: 

`sudo apt-get update`

`sudo apt-get install build-essential nodejs npm git nginx openssh-server`.

Vali (macil) virtualboxi Devices menüüst "Mount guest additions CD image". Ubuntus:

`mount /dev/cdrom /media/cdrom`.

Navigeeri ja installi image:

`cd /media/cdrom && sudo sh ./VBoxLinuxAdditions.run`

Sule virtuaalmasin. Lisa jagatud kaust - esmalt virtualBoxi pool - settings, shared folders, add. Vali auto-mount. Tee oma causa uus kaust nimega www.
Minu oma asetseb desktopil ja on nimega "mets".
Forwardi pordid 22 -> 3022 ja 80 -> 3080



Käivita virtuaalmasin. Peaksid nüüd saama masinasse SSH-da järgmiselt:

ssh -p 3022 sinuVMikasutajanimi@localhost. Kui sisse loginud/ssh-nud oled, jooksuta järgmised käsud et süsteemil vboxi jagatud kaustale ligipääs oleks:

`cd /media`

`Sudo usermod -a -G vboxsf SINUKASUTAJANIMI`

Relogi: 

`su - $USER`


Eemaldame default kausta: 

`sudo rm -rf /var/www`

..ja loome lingi: 

`sudo ln -s /media/sf_mets/www /var`

Lisame www-data kasutaja vboxsf gruppi et server kaustale ligi saaks.


`usermod -a -G vboxsf www-data`

Failisysteem on nyyd korras! …vist!

Serveri konf:

`sudo nano /etc/nginx/sites-available/default`


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

ctrl+o salvestamiseks, ctrl+x sulgemiseks.

Kiire serveri restart:

    `sudo service nginx restart`

Mine nüüd tagasi host-arvutisse ja loo sinukaust/www/app/public kausta index.html.

Siis navigeeri browseris http://localhost:3080

Kas said tööle? Kui ei, vaata sammud veel korra üle ja konsulteeri Veljoga.
