DROP DATABASE IF EXISTS polyfolio;    

CREATE DATABASE polyfolio;    

\c polyfolio;        

CREATE TABLE user_account(
id SERIAL PRIMARY KEY,
email varchar(32),
prenom varchar(32),
nom varchar(32),
hash varchar(128));

CREATE TABLE portfolio(
id SERIAL PRIMARY KEY,
public boolean DEFAULT false,
user_id integer,
image_nom varchar(1024),
titre varchar(1024),
contenu varchar(1024), 
formation varchar(1024), 
experience varchar(1024), 
langue varchar(1024), 
projet varchar(1024)
);
