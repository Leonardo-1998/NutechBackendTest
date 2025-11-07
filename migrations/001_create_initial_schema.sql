-- DROP SCHEMA public;

CREATE SCHEMA public AUTHORIZATION pg_database_owner;

-- DROP SEQUENCE "Banners_id_seq";

CREATE SEQUENCE "Banners_id_seq"
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;
-- DROP SEQUENCE records_id_seq;

CREATE SEQUENCE records_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;
-- DROP SEQUENCE services_id_seq;

CREATE SEQUENCE services_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;
-- DROP SEQUENCE users_id_seq;

CREATE SEQUENCE users_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;-- public.banners definition

-- Drop table

-- DROP TABLE banners;

CREATE TABLE banners (
	id int4 DEFAULT nextval('"Banners_id_seq"'::regclass) NOT NULL,
	banner_name varchar NOT NULL,
	banner_image varchar NOT NULL,
	description varchar NOT NULL,
	CONSTRAINT "Banners_pkey" PRIMARY KEY (id)
);


-- public.records definition

-- Drop table

-- DROP TABLE records;

CREATE TABLE records (
	id serial4 NOT NULL,
	invoice_number varchar NULL,
	transaction_type varchar NULL,
	description varchar NULL,
	total_amount int4 NULL,
	created_on date NULL,
	email varchar NULL,
	CONSTRAINT records_pkey PRIMARY KEY (id)
);


-- public.services definition

-- Drop table

-- DROP TABLE services;

CREATE TABLE services (
	id serial4 NOT NULL,
	service_code varchar NULL,
	service_name varchar NULL,
	service_icon varchar NULL,
	service_tariff varchar NULL,
	CONSTRAINT services_pk PRIMARY KEY (id)
);


-- public.users definition

-- Drop table

-- DROP TABLE users;

CREATE TABLE users (
	id serial4 NOT NULL,
	email varchar NOT NULL,
	first_name varchar NOT NULL,
	last_name varchar NOT NULL,
	"password" varchar NOT NULL,
	profile_image varchar NOT NULL,
	balance int4 NOT NULL,
	CONSTRAINT users_pkey PRIMARY KEY (id)
);