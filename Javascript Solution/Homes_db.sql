--Create new Database --
CREATE DATABASE Homes_db

USE Homes_db

CREATE TABLE Home (

	mls_number VARCHAR(100) NOT NULL,
  address VARCHAR(1000) NOT NULL,
  city VARCHAR(100) NOT NULL,
  state VARCHAR(100) NOT NULL,
  zip VARCHAR(20) NOT NULL,
  price VARCHAR(20) NOT NULL,
  status VARCHAR(100) NOT NULL,
  type VARCHAR(100) NOT NULL,
  agent_code VARCHAR(100) NOT NULL,
  office_code VARCHAR(100) NOT NULL,
  description VARCHAR(5000)

);
--"MLS_NUMBER","ADDRESS","CITY","STATE","ZIP","PRICE","STATUS","TYPE","AGENT_CODE","OFFICE_CODE","DESC", for listing

CREATE TABLE Agent (

	agent_code VARCHAR(100) NOT NULL,
  agent_name VARCHAR(100),
  office_code VARCHAR(100) NOT NULL,
  agent_phone VARCHAR(100),
  agent_city VARCHAR(100),
  agent_state VARCHAR(100),
  agent_zip VARCHAR(15)

);
--"NAME","AGENT_CODE","OFFICE_CODE","PHONE","CITY","STATE","ZIP" for agent

CREATE TABLE Office (

	office_code VARCHAR(100) NOT NULL,
  office_name VARCHAR(150),
  office_phone VARCHAR(100),
  office_city VARCHAR(100),
  office_state VARCHAR(100),
  office_zip VARCHAR(15)

);

--"NAME","OFFICE_CODE","PHONE","CITY","STATE","ZIP", for office
--"Broker" = "Office"
