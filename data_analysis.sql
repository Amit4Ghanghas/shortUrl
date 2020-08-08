--
-- PostgreSQL database dump
--

-- Dumped from database version 12.2 (Ubuntu 12.2-2.pgdg18.04+1)
-- Dumped by pg_dump version 12.2 (Ubuntu 12.2-2.pgdg18.04+1)

-- Started on 2020-08-08 19:34:32 IST

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
-- TOC entry 205 (class 1259 OID 24620)
-- Name: data_analysis; Type: TABLE; Schema: public; Owner: amit
--

CREATE TABLE public.data_analysis (
    data_id bigint NOT NULL,
    request text,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.data_analysis OWNER TO amit;

--
-- TOC entry 204 (class 1259 OID 24618)
-- Name: data_analysis_data_id_seq; Type: SEQUENCE; Schema: public; Owner: amit
--

CREATE SEQUENCE public.data_analysis_data_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.data_analysis_data_id_seq OWNER TO amit;

--
-- TOC entry 2942 (class 0 OID 0)
-- Dependencies: 204
-- Name: data_analysis_data_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: amit
--

ALTER SEQUENCE public.data_analysis_data_id_seq OWNED BY public.data_analysis.data_id;


--
-- TOC entry 2807 (class 2604 OID 24623)
-- Name: data_analysis data_id; Type: DEFAULT; Schema: public; Owner: amit
--

ALTER TABLE ONLY public.data_analysis ALTER COLUMN data_id SET DEFAULT nextval('public.data_analysis_data_id_seq'::regclass);


--
-- TOC entry 2810 (class 2606 OID 24628)
-- Name: data_analysis data_analysis_pkey; Type: CONSTRAINT; Schema: public; Owner: amit
--

ALTER TABLE ONLY public.data_analysis
    ADD CONSTRAINT data_analysis_pkey PRIMARY KEY (data_id);


-- Completed on 2020-08-08 19:34:32 IST

--
-- PostgreSQL database dump complete
--

