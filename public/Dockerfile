FROM php:8.1-apache-buster

COPY . /var/www/html

RUN echo "ServerName localhost" >> /etc/apache2/apache2.conf
RUN a2enmod rewrite
RUN a2enmod headers

RUN service apache2 restart
