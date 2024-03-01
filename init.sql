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
titre varchar(32),
contenu varchar(32), 
fromation varchar(32), 
experience varchar(32), 
langue varchar(32), 
projet varchar(32)
);
