CREATE DATABASE wordpress;
use wordpress;

CREATE USER 'wordpress' IDENTIFIED BY 'password';

GRANT ALL PRIVILEGES ON wordpress.* TO 'wordpress';
