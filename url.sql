--
-- PostgreSQL database dump
--

-- Dumped from database version 12.2 (Ubuntu 12.2-2.pgdg18.04+1)
-- Dumped by pg_dump version 12.2 (Ubuntu 12.2-2.pgdg18.04+1)

-- Started on 2020-08-08 19:34:08 IST

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 203 (class 1259 OID 24608)
-- Name: url; Type: TABLE; Schema: public; Owner: amit
--

CREATE TABLE public.url (
    url_id bigint NOT NULL,
    short_url text,
    big_url text,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.url OWNER TO amit;

--
-- TOC entry 202 (class 1259 OID 24606)
-- Name: url_url_id_seq; Type: SEQUENCE; Schema: public; Owner: amit
--

CREATE SEQUENCE public.url_url_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.url_url_id_seq OWNER TO amit;

--
-- TOC entry 2942 (class 0 OID 0)
-- Dependencies: 202
-- Name: url_url_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: amit
--

ALTER SEQUENCE public.url_url_id_seq OWNED BY public.url.url_id;


--
-- TOC entry 2807 (class 2604 OID 24611)
-- Name: url url_id; Type: DEFAULT; Schema: public; Owner: amit
--

ALTER TABLE ONLY public.url ALTER COLUMN url_id SET DEFAULT nextval('public.url_url_id_seq'::regclass);


--
-- TOC entry 2810 (class 2606 OID 24632)
-- Name: url url_pkey; Type: CONSTRAINT; Schema: public; Owner: amit
--

ALTER TABLE ONLY public.url
    ADD CONSTRAINT url_pkey PRIMARY KEY (url_id);


-- Completed on 2020-08-08 19:34:10 IST

--
-- PostgreSQL database dump complete
--

