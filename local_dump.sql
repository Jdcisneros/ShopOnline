--
-- PostgreSQL database dump
--

-- Dumped from database version 17.5
-- Dumped by pg_dump version 17.5

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: Category; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public."Category" (id, name, "createdAt") VALUES ('0edb4cd8-72ab-4d71-8e6a-788bd9839a9e', 'Accesorios', '2025-05-31 11:52:17.771');
INSERT INTO public."Category" (id, name, "createdAt") VALUES ('8f81a4ea-7ae1-40ef-97fb-2aa69f0e03bb', 'Remeras', '2025-05-31 11:52:17.771');
INSERT INTO public."Category" (id, name, "createdAt") VALUES ('bdf89f68-ebe2-46a9-b629-62936d36f539', 'Pantalones', '2025-05-31 11:52:17.771');
INSERT INTO public."Category" (id, name, "createdAt") VALUES ('7f9d90bc-eec9-4fec-86c6-f5a5f9db083c', 'Abrigos', '2025-05-31 11:52:17.771');


--
-- Data for Name: Color; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public."Color" (id, name, hex) VALUES ('a21377ca-6a10-4ad1-9969-38e66df9a30b', 'BLANCO', '#ffffff');
INSERT INTO public."Color" (id, name, hex) VALUES ('04b47de7-3e91-45f2-b43d-19fffe679af8', 'NEGRO', '#000000');
INSERT INTO public."Color" (id, name, hex) VALUES ('a46fb5c1-030f-4ca0-a91c-e2b7c125df4a', 'GRIS', '#d3d3d3');
INSERT INTO public."Color" (id, name, hex) VALUES ('6456bd1f-647d-424f-9ede-ecfa69a9e8eb', 'BEIGE', '#f5f5dc');
INSERT INTO public."Color" (id, name, hex) VALUES ('b484a4f1-a53d-43dd-8654-7a09bd289104', 'AZUL', '#003366');
INSERT INTO public."Color" (id, name, hex) VALUES ('6846b555-1375-4c25-8706-a81dea8eca64', 'ROJO', '#ff0000');
INSERT INTO public."Color" (id, name, hex) VALUES ('4f0d23a2-c3d5-42e2-8e08-7b421e308495', 'VERDE', '#556b2f');
INSERT INTO public."Color" (id, name, hex) VALUES ('f37f8932-3e26-45be-9bd3-6c86577ca1be', 'VERDE BOTELLA', '#006442');


--
-- Data for Name: Product; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public."Product" (id, name, description, price, "imageUrl", "categoryId", "createdAt", featured, "onSale", "discountPercentage", "updatedAt") VALUES ('8efabffb-7d31-4baa-9b8b-15d767c5e07a', 'Polera Wire White', '10% de descuento pagando con Transferencia o depósito', 20000, 'https://acdn-us.mitiendanube.com/stores/219/431/products/99c0e6de-638f-47f5-8a54-d8d632492a30-b67869c5ffbe40bb5017455747934094-640-0.jpg', '8f81a4ea-7ae1-40ef-97fb-2aa69f0e03bb', '2025-06-01 17:13:52.412', false, false, NULL, '2025-06-23 19:17:17.302');
INSERT INTO public."Product" (id, name, description, price, "imageUrl", "categoryId", "createdAt", featured, "onSale", "discountPercentage", "updatedAt") VALUES ('6607243b-2949-4291-b811-c829f6af0d8a', 'Remeron Balance', '10% de descuento pagando con Transferencia o depósito', 21000, 'https://acdn-us.mitiendanube.com/stores/219/431/products/c3536c86-3571-4ca2-b41c-d66c8d33a0cd-1f1863a38ba8c1005517455746087016-640-0.jpg', '8f81a4ea-7ae1-40ef-97fb-2aa69f0e03bb', '2025-05-31 14:49:24.59', false, false, NULL, '2025-06-23 19:17:17.302');
INSERT INTO public."Product" (id, name, description, price, "imageUrl", "categoryId", "createdAt", featured, "onSale", "discountPercentage", "updatedAt") VALUES ('73a3528e-38d9-4b71-b476-357013489681', 'Jean Pinzado', '10% de descuento pagando con Transferencia o depósito', 70000, 'https://acdn-us.mitiendanube.com/stores/219/431/products/d780157d-3092-428c-8edc-3b02cde3838b-d8203eee1a992990f617455774871761-640-0.jpg', 'bdf89f68-ebe2-46a9-b629-62936d36f539', '2025-05-29 15:36:34.761', false, false, NULL, '2025-06-23 19:17:17.302');
INSERT INTO public."Product" (id, name, description, price, "imageUrl", "categoryId", "createdAt", featured, "onSale", "discountPercentage", "updatedAt") VALUES ('5ffac6b8-bbac-41ec-9416-7abeecf4833f', 'Pant Kendall', '10% de descuento pagando con Transferencia o depósito', 80000, 'https://acdn-us.mitiendanube.com/stores/219/431/products/fa378c30-152f-44aa-927d-70dbc7705dc7-616695668655d2952b17455775724063-640-0.jpg', 'bdf89f68-ebe2-46a9-b629-62936d36f539', '2025-05-28 23:29:31.727', false, false, NULL, '2025-06-23 19:17:17.302');
INSERT INTO public."Product" (id, name, description, price, "imageUrl", "categoryId", "createdAt", featured, "onSale", "discountPercentage", "updatedAt") VALUES ('8f502a4e-3e27-4304-a39f-f55b3c8583ab', 'Buzo Suede Garnet', 'asdsa', 15889, 'https://acdn-us.mitiendanube.com/stores/219/431/products/2bb3347b-be9d-41ab-9b97-d55245685473-77eb92a7755084c13017455771153359-640-0.jpg', '7f9d90bc-eec9-4fec-86c6-f5a5f9db083c', '2025-06-22 23:14:17.723', false, false, NULL, '2025-06-23 19:17:17.302');
INSERT INTO public."Product" (id, name, description, price, "imageUrl", "categoryId", "createdAt", featured, "onSale", "discountPercentage", "updatedAt") VALUES ('b125de8b-b38c-4bab-bde4-6d0379d77c16', 'Cap Essential', 'descuento 10%', 15000, 'https://acdn-us.mitiendanube.com/stores/219/431/products/a13dc348-9e42-41dd-b6f1-d7452053b89d-ccb0e7ed540422b73117467349340897-640-0.jpg', '7f9d90bc-eec9-4fec-86c6-f5a5f9db083c', '2025-06-22 22:49:00.511', false, false, NULL, '2025-06-23 19:17:17.302');
INSERT INTO public."Product" (id, name, description, price, "imageUrl", "categoryId", "createdAt", featured, "onSale", "discountPercentage", "updatedAt") VALUES ('75709b46-a171-47c4-90f9-f5d06921b439', 'buzo complot', '10% de descuento pagando con Transferencia o depósito', 30000, 'https://complot.com.ar/media/catalog/product/cache/479c9cdc016090c3dba85230b5b617b2/c/o/complot_01108507_negro_1_p.jpg', '7f9d90bc-eec9-4fec-86c6-f5a5f9db083c', '2025-06-18 01:42:14.787', true, true, 20, '2025-06-23 19:17:17.302');
INSERT INTO public."Product" (id, name, description, price, "imageUrl", "categoryId", "createdAt", featured, "onSale", "discountPercentage", "updatedAt") VALUES ('1cede229-2cee-4fd3-b591-8964de722465', 'Buzo Suede Garnet', '10% de descuento pagando con Transferencia o depósito', 25000, 'https://acdn-us.mitiendanube.com/stores/219/431/products/2bb3347b-be9d-41ab-9b97-d55245685473-77eb92a7755084c13017455771153359-640-0.jpg', '7f9d90bc-eec9-4fec-86c6-f5a5f9db083c', '2025-06-01 17:27:01.042', false, false, NULL, '2025-06-23 19:17:17.302');
INSERT INTO public."Product" (id, name, description, price, "imageUrl", "categoryId", "createdAt", featured, "onSale", "discountPercentage", "updatedAt") VALUES ('5002a838-daeb-42e1-aed0-af41b1e2c704', 'Buzo Suede Off White', '10% de descuento pagando con Transferencia o depósito', 35000, 'https://acdn-us.mitiendanube.com/stores/219/431/products/dd44d08b-66ac-4e89-bb91-861e2e76d201-af8c83ef0fe97b82e017455771474813-640-0.png', '0edb4cd8-72ab-4d71-8e6a-788bd9839a9e', '2025-06-01 17:25:56.227', true, false, NULL, '2025-06-23 19:17:17.302');
INSERT INTO public."Product" (id, name, description, price, "imageUrl", "categoryId", "createdAt", featured, "onSale", "discountPercentage", "updatedAt") VALUES ('5793b6d8-683a-4e34-b008-73ceaa2f05e5', 'Remera Fear Mnky', '10% de descuento pagando con Transferencia o depósito', 20000, 'https://acdn-us.mitiendanube.com/stores/219/431/products/fed39bba-c40f-442f-8909-9a939bf463b9-d1646ea04475b9ddf917455748892920-640-0.jpg', '8f81a4ea-7ae1-40ef-97fb-2aa69f0e03bb', '2025-06-01 17:14:40.27', false, false, NULL, '2025-06-23 19:17:17.302');
INSERT INTO public."Product" (id, name, description, price, "imageUrl", "categoryId", "createdAt", featured, "onSale", "discountPercentage", "updatedAt") VALUES ('d2135b23-bf4b-4cbf-a9e1-dddaf9d077e3', 'Cap Essential', 'asdasdas', 12000, 'https://acdn-us.mitiendanube.com/stores/219/431/products/a13dc348-9e42-41dd-b6f1-d7452053b89d-ccb0e7ed540422b73117467349340897-640-0.jpg', '0edb4cd8-72ab-4d71-8e6a-788bd9839a9e', '2025-06-23 01:22:30.429', false, true, 10, '2025-06-24 01:43:27.934');


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public."User" (id, name, email, password, "isAdmin", "createdAt", "lastName", phone) VALUES ('df28456a-c6ed-4eeb-87f6-4ce93b2093dd', 'Administrador', 'admin@tienda.com', '$2b$10$PmMF.6Yq3kg5VF0I48e/QOge38vr9GS8owN.68JmioYWoLFMJEmBS', true, '2025-05-29 01:16:54.051', NULL, NULL);
INSERT INTO public."User" (id, name, email, password, "isAdmin", "createdAt", "lastName", phone) VALUES ('5850e708-71c0-42fb-ae94-35baf6eb10e2', 'jorge', 'prueba@hotmail.com', '$2b$10$skPwKjZS1Kff6oucFczVzusrTRW3HD9vP7TjaiAfevo/jB5VU64OS', false, '2025-06-01 00:44:48.011', NULL, NULL);
INSERT INTO public."User" (id, name, email, password, "isAdmin", "createdAt", "lastName", phone) VALUES ('491390b1-4517-47c2-bdd1-78e866d15ad8', 'Guillermina', 'guillerminabascoy97@hotmail.com', '$2b$10$UrbbbE.N.QDE04QN5YYvcOXue5mALTn8fPA9TPY.IvI9LkMMAYQ5q', false, '2025-06-18 01:38:31.168', NULL, NULL);


--
-- Data for Name: Favorite; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public."Favorite" (id, "userId", "productId", "createdAt") VALUES ('077e3117-29b6-4cb8-b3c2-274bd976693e', '5850e708-71c0-42fb-ae94-35baf6eb10e2', 'd2135b23-bf4b-4cbf-a9e1-dddaf9d077e3', '2025-06-23 02:54:17.496');
INSERT INTO public."Favorite" (id, "userId", "productId", "createdAt") VALUES ('d5bfd8fa-f477-4708-a81f-2b13a6d98758', '5850e708-71c0-42fb-ae94-35baf6eb10e2', 'b125de8b-b38c-4bab-bde4-6d0379d77c16', '2025-06-23 02:55:27.072');
INSERT INTO public."Favorite" (id, "userId", "productId", "createdAt") VALUES ('3e452e2d-2ada-4189-959c-8fc71aa8933d', '5850e708-71c0-42fb-ae94-35baf6eb10e2', '75709b46-a171-47c4-90f9-f5d06921b439', '2025-06-23 02:55:56.232');
INSERT INTO public."Favorite" (id, "userId", "productId", "createdAt") VALUES ('c944fe5f-5626-4389-8fb0-260fa6143930', '5850e708-71c0-42fb-ae94-35baf6eb10e2', '1cede229-2cee-4fd3-b591-8964de722465', '2025-06-23 02:56:05.173');
INSERT INTO public."Favorite" (id, "userId", "productId", "createdAt") VALUES ('917c5b70-6f03-4550-89fc-4dc159f13029', '5850e708-71c0-42fb-ae94-35baf6eb10e2', '8f502a4e-3e27-4304-a39f-f55b3c8583ab', '2025-06-23 03:02:22.345');


--
-- Data for Name: Order; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public."Order" (id, "userId", "createdAt", total, address, "paymentMethod") VALUES ('942fcc3c-d1ef-41e7-b44c-f1505c3be80b', '5850e708-71c0-42fb-ae94-35baf6eb10e2', '2025-06-01 21:26:26.278', 150000, NULL, NULL);
INSERT INTO public."Order" (id, "userId", "createdAt", total, address, "paymentMethod") VALUES ('285dee8d-4a7f-42cc-8133-ee3c29003236', '5850e708-71c0-42fb-ae94-35baf6eb10e2', '2025-06-01 21:28:56.64', 150, NULL, NULL);
INSERT INTO public."Order" (id, "userId", "createdAt", total, address, "paymentMethod") VALUES ('2d8b9c7b-997b-49c2-9090-2a2493beda81', '5850e708-71c0-42fb-ae94-35baf6eb10e2', '2025-06-01 21:33:05.042', 40, NULL, NULL);
INSERT INTO public."Order" (id, "userId", "createdAt", total, address, "paymentMethod") VALUES ('490696d9-9ac5-438b-9aa9-15cf7721c29e', '5850e708-71c0-42fb-ae94-35baf6eb10e2', '2025-06-01 21:34:07.66', 150000, NULL, NULL);
INSERT INTO public."Order" (id, "userId", "createdAt", total, address, "paymentMethod") VALUES ('7f47eef4-27c2-49a8-949c-2cc20e223cf3', '5850e708-71c0-42fb-ae94-35baf6eb10e2', '2025-06-01 21:41:59.504', 150000, NULL, NULL);
INSERT INTO public."Order" (id, "userId", "createdAt", total, address, "paymentMethod") VALUES ('a7442ec8-1e7a-4fed-bede-d5abccb303f5', '5850e708-71c0-42fb-ae94-35baf6eb10e2', '2025-06-01 23:23:15.404', 40, NULL, NULL);
INSERT INTO public."Order" (id, "userId", "createdAt", total, address, "paymentMethod") VALUES ('7081d52a-b3ce-4d2a-b8c2-af9a8886dac7', '5850e708-71c0-42fb-ae94-35baf6eb10e2', '2025-06-01 23:29:03.342', 40, NULL, NULL);
INSERT INTO public."Order" (id, "userId", "createdAt", total, address, "paymentMethod") VALUES ('cmbzh96500001udd4xi5uta70', '5850e708-71c0-42fb-ae94-35baf6eb10e2', '2025-06-16 19:18:33.26', 300000, NULL, NULL);
INSERT INTO public."Order" (id, "userId", "createdAt", total, address, "paymentMethod") VALUES ('cmc85ckt00001ud78u05jjduu', 'df28456a-c6ed-4eeb-87f6-4ce93b2093dd', '2025-06-22 20:55:12.466', 149, NULL, NULL);
INSERT INTO public."Order" (id, "userId", "createdAt", total, address, "paymentMethod") VALUES ('cmc8haw5l0001ud1g0p7cz35z', '5850e708-71c0-42fb-ae94-35baf6eb10e2', '2025-06-23 02:29:49.257', 35000, 'sadasdas', 'credit_card');
INSERT INTO public."Order" (id, "userId", "createdAt", total, address, "paymentMethod") VALUES ('cmc8hc1il0003ud1gxqleu12t', '5850e708-71c0-42fb-ae94-35baf6eb10e2', '2025-06-23 02:30:42.862', 65000, 'asdasda', 'credit_card');


--
-- Data for Name: Size; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public."Size" (id, name) VALUES ('bf1e6f2d-6748-4429-8094-39c0a9d831d8', 'XS');
INSERT INTO public."Size" (id, name) VALUES ('97c205ea-cabc-4ec2-af9d-9bb5dd8aafe1', 'S');
INSERT INTO public."Size" (id, name) VALUES ('76b9a063-d7d6-44d9-b84a-9dcc951e68f3', 'M');
INSERT INTO public."Size" (id, name) VALUES ('5786a203-cf71-4cc7-b136-977cf6c59e5c', 'L');
INSERT INTO public."Size" (id, name) VALUES ('c5b5079e-bf15-49c0-9c16-3278a6380cf3', 'XL');
INSERT INTO public."Size" (id, name) VALUES ('17f6f93d-c85e-486e-a656-8c0bd1811260', '36');
INSERT INTO public."Size" (id, name) VALUES ('7af23bf0-7600-4111-8303-744071a08c89', '37');
INSERT INTO public."Size" (id, name) VALUES ('0e988840-e593-4e5d-9a55-c29487a89e0e', '38');
INSERT INTO public."Size" (id, name) VALUES ('6a7c43cd-0603-4499-b6e3-58254aca1a73', '39');
INSERT INTO public."Size" (id, name) VALUES ('d436d942-acbe-4257-9122-87d09bd9b6ac', '40');
INSERT INTO public."Size" (id, name) VALUES ('80197932-2080-4a56-9881-bd151e6d5e0a', '41');
INSERT INTO public."Size" (id, name) VALUES ('95dd3216-c510-4ee2-a2ed-131595b580d5', '42');
INSERT INTO public."Size" (id, name) VALUES ('bb5d509a-fd4e-47e8-a122-7e21b5b6fb18', '43');
INSERT INTO public."Size" (id, name) VALUES ('fd2db845-1e81-4faa-8e1d-7461844b98ea', '44');
INSERT INTO public."Size" (id, name) VALUES ('7412776d-4d31-44ca-9248-ea9635b92e57', '45');
INSERT INTO public."Size" (id, name) VALUES ('bdf6088a-f7a3-40ba-944d-49d10e2e32e6', '46');
INSERT INTO public."Size" (id, name) VALUES ('6db9b480-ed69-43bb-bb43-55d3e80e1038', '47');
INSERT INTO public."Size" (id, name) VALUES ('60041327-5d9f-48b5-b6b1-df0612122d57', '48');


--
-- Data for Name: ProductVariant; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public."ProductVariant" (id, "productId", "sizeId", "colorId", stock) VALUES ('1ba5c283-3ba5-4313-b51f-2c7a722daff4', '75709b46-a171-47c4-90f9-f5d06921b439', '5786a203-cf71-4cc7-b136-977cf6c59e5c', '04b47de7-3e91-45f2-b43d-19fffe679af8', 3);
INSERT INTO public."ProductVariant" (id, "productId", "sizeId", "colorId", stock) VALUES ('ea57eb04-804f-471f-919d-00263406552c', '1cede229-2cee-4fd3-b591-8964de722465', '5786a203-cf71-4cc7-b136-977cf6c59e5c', '6846b555-1375-4c25-8706-a81dea8eca64', 3);
INSERT INTO public."ProductVariant" (id, "productId", "sizeId", "colorId", stock) VALUES ('7d52dbdc-ed17-4293-9eb4-94e55ca0198b', '5002a838-daeb-42e1-aed0-af41b1e2c704', '5786a203-cf71-4cc7-b136-977cf6c59e5c', 'a21377ca-6a10-4ad1-9969-38e66df9a30b', 1);
INSERT INTO public."ProductVariant" (id, "productId", "sizeId", "colorId", stock) VALUES ('248fc310-8f36-4b5e-8588-7bd0d41796e8', '5793b6d8-683a-4e34-b008-73ceaa2f05e5', '76b9a063-d7d6-44d9-b84a-9dcc951e68f3', '04b47de7-3e91-45f2-b43d-19fffe679af8', 0);
INSERT INTO public."ProductVariant" (id, "productId", "sizeId", "colorId", stock) VALUES ('811fbc7e-1f8e-4651-9d57-f47be311103a', '8efabffb-7d31-4baa-9b8b-15d767c5e07a', '76b9a063-d7d6-44d9-b84a-9dcc951e68f3', 'a21377ca-6a10-4ad1-9969-38e66df9a30b', 2);
INSERT INTO public."ProductVariant" (id, "productId", "sizeId", "colorId", stock) VALUES ('5d886d76-bd53-4e83-b322-1d5f6072dc09', '6607243b-2949-4291-b811-c829f6af0d8a', '76b9a063-d7d6-44d9-b84a-9dcc951e68f3', 'a21377ca-6a10-4ad1-9969-38e66df9a30b', 3);
INSERT INTO public."ProductVariant" (id, "productId", "sizeId", "colorId", stock) VALUES ('af557d11-f40e-49e6-99cd-b1d4e02f135d', '73a3528e-38d9-4b71-b476-357013489681', 'd436d942-acbe-4257-9122-87d09bd9b6ac', 'b484a4f1-a53d-43dd-8654-7a09bd289104', 5);
INSERT INTO public."ProductVariant" (id, "productId", "sizeId", "colorId", stock) VALUES ('35d677cd-6ee8-4f12-bc04-7f92c16824db', '5ffac6b8-bbac-41ec-9416-7abeecf4833f', '95dd3216-c510-4ee2-a2ed-131595b580d5', '04b47de7-3e91-45f2-b43d-19fffe679af8', 4);
INSERT INTO public."ProductVariant" (id, "productId", "sizeId", "colorId", stock) VALUES ('8e1638ad-37d7-442e-8cae-5f29cb8bee5e', '8f502a4e-3e27-4304-a39f-f55b3c8583ab', '60041327-5d9f-48b5-b6b1-df0612122d57', '6846b555-1375-4c25-8706-a81dea8eca64', 1);
INSERT INTO public."ProductVariant" (id, "productId", "sizeId", "colorId", stock) VALUES ('e75745a5-d60d-4f07-9295-245ef8d6811e', 'b125de8b-b38c-4bab-bde4-6d0379d77c16', '5786a203-cf71-4cc7-b136-977cf6c59e5c', '04b47de7-3e91-45f2-b43d-19fffe679af8', 4);
INSERT INTO public."ProductVariant" (id, "productId", "sizeId", "colorId", stock) VALUES ('a81b7e7f-fba3-431b-9ef6-719e64818ab4', 'b125de8b-b38c-4bab-bde4-6d0379d77c16', '5786a203-cf71-4cc7-b136-977cf6c59e5c', '6846b555-1375-4c25-8706-a81dea8eca64', 4);
INSERT INTO public."ProductVariant" (id, "productId", "sizeId", "colorId", stock) VALUES ('5df2aa75-4e35-4056-b3d2-875dd8013e60', 'b125de8b-b38c-4bab-bde4-6d0379d77c16', '76b9a063-d7d6-44d9-b84a-9dcc951e68f3', '04b47de7-3e91-45f2-b43d-19fffe679af8', 4);
INSERT INTO public."ProductVariant" (id, "productId", "sizeId", "colorId", stock) VALUES ('6e53f6af-52e6-4bdd-869a-f005d2ab40c7', 'b125de8b-b38c-4bab-bde4-6d0379d77c16', '76b9a063-d7d6-44d9-b84a-9dcc951e68f3', '6846b555-1375-4c25-8706-a81dea8eca64', 4);
INSERT INTO public."ProductVariant" (id, "productId", "sizeId", "colorId", stock) VALUES ('b288d7ba-6077-4bf5-9a2e-ddea4b3ba0d0', 'd2135b23-bf4b-4cbf-a9e1-dddaf9d077e3', '76b9a063-d7d6-44d9-b84a-9dcc951e68f3', 'a46fb5c1-030f-4ca0-a91c-e2b7c125df4a', 0);
INSERT INTO public."ProductVariant" (id, "productId", "sizeId", "colorId", stock) VALUES ('32a5f951-a7ec-4471-a523-fff4279536e6', 'd2135b23-bf4b-4cbf-a9e1-dddaf9d077e3', '76b9a063-d7d6-44d9-b84a-9dcc951e68f3', '6846b555-1375-4c25-8706-a81dea8eca64', 1);
INSERT INTO public."ProductVariant" (id, "productId", "sizeId", "colorId", stock) VALUES ('c3894c2d-d1eb-4997-9854-c2af3b409f48', 'd2135b23-bf4b-4cbf-a9e1-dddaf9d077e3', '5786a203-cf71-4cc7-b136-977cf6c59e5c', 'a46fb5c1-030f-4ca0-a91c-e2b7c125df4a', 3);
INSERT INTO public."ProductVariant" (id, "productId", "sizeId", "colorId", stock) VALUES ('670448d3-1fc4-417b-bde7-ad3528e4de73', 'd2135b23-bf4b-4cbf-a9e1-dddaf9d077e3', '5786a203-cf71-4cc7-b136-977cf6c59e5c', '6846b555-1375-4c25-8706-a81dea8eca64', 0);


--
-- Data for Name: OrderItem; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public."OrderItem" (id, "orderId", "productId", quantity, price, "variantId") VALUES ('146f11d9-ecd1-4f1c-91c6-a28d27f0b0ab', '285dee8d-4a7f-42cc-8133-ee3c29003236', '5002a838-daeb-42e1-aed0-af41b1e2c704', 1, 150, NULL);
INSERT INTO public."OrderItem" (id, "orderId", "productId", quantity, price, "variantId") VALUES ('16d0a066-3009-49bf-ba07-ee73d6a9c813', '2d8b9c7b-997b-49c2-9090-2a2493beda81', '8efabffb-7d31-4baa-9b8b-15d767c5e07a', 1, 40, NULL);
INSERT INTO public."OrderItem" (id, "orderId", "productId", quantity, price, "variantId") VALUES ('c1e74184-a800-4a0e-b030-bd0d631de2eb', 'a7442ec8-1e7a-4fed-bede-d5abccb303f5', '8efabffb-7d31-4baa-9b8b-15d767c5e07a', 1, 40, NULL);
INSERT INTO public."OrderItem" (id, "orderId", "productId", quantity, price, "variantId") VALUES ('d9f5d359-3f31-4e6e-b7f0-d51adadfe745', '7081d52a-b3ce-4d2a-b8c2-af9a8886dac7', '8efabffb-7d31-4baa-9b8b-15d767c5e07a', 1, 40, NULL);
INSERT INTO public."OrderItem" (id, "orderId", "productId", quantity, price, "variantId") VALUES ('cmbzh96500003udd4aa8dhznj', 'cmbzh96500001udd4xi5uta70', '1cede229-2cee-4fd3-b591-8964de722465', 1, 150000, NULL);
INSERT INTO public."OrderItem" (id, "orderId", "productId", quantity, price, "variantId") VALUES ('5dc618c1-efdb-4405-a341-a6100de9ff8a', 'cmc85ckt00001ud78u05jjduu', '5002a838-daeb-42e1-aed0-af41b1e2c704', 1, 149, NULL);
INSERT INTO public."OrderItem" (id, "orderId", "productId", quantity, price, "variantId") VALUES ('d3d6b6da-b3cf-4a76-beaf-c5a9fab559b0', 'cmc8haw5l0001ud1g0p7cz35z', '5002a838-daeb-42e1-aed0-af41b1e2c704', 1, 35000, '7d52dbdc-ed17-4293-9eb4-94e55ca0198b');
INSERT INTO public."OrderItem" (id, "orderId", "productId", quantity, price, "variantId") VALUES ('7d0da5fa-a38f-4929-8ac7-f003f8a5ff5e', 'cmc8hc1il0003ud1gxqleu12t', '5002a838-daeb-42e1-aed0-af41b1e2c704', 1, 35000, '7d52dbdc-ed17-4293-9eb4-94e55ca0198b');
INSERT INTO public."OrderItem" (id, "orderId", "productId", quantity, price, "variantId") VALUES ('e65afcc0-8f0e-4330-a881-0a9d5c9ab8b4', 'cmc8hc1il0003ud1gxqleu12t', '75709b46-a171-47c4-90f9-f5d06921b439', 1, 30000, '1ba5c283-3ba5-4313-b51f-2c7a722daff4');


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('a2c2bef3-ef60-4851-9a21-5941456d590f', 'fd5348e9df9c34bb52ac506bd51f76b58f13a969816bc1742af5f17e855b2c14', '2025-05-28 20:25:53.702084-03', '20250528232553_init', NULL, NULL, '2025-05-28 20:25:53.677208-03', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('93797a01-f80b-4090-84e4-a25e08bd4c0f', '2d3423a5a50359111838fe3fe6e72b21a989c85c795428cbd64c5cbec3858517', '2025-05-31 11:52:17.778269-03', '20250531145217_add_unique_to_category', NULL, NULL, '2025-05-31 11:52:17.769318-03', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('ba7ed21b-cd22-4977-8c26-10702925e915', '44f11e1f91ee832dfd806ab2bffb3edfc0f7c899fa36295cef1a4c48a48ed0e6', '2025-05-31 22:11:24.502696-03', '20250601011123_add_favorites_relations', NULL, NULL, '2025-05-31 22:11:24.48491-03', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('18572883-ea68-4f6b-bd38-49113384bc36', '6df7965094e33980c0ddcf2d7152a0f2f3b9fd508c758c6b3b2281d2cdaa1c21', '2025-06-01 22:49:56.656854-03', '20250602014956_add_featured_to_product', NULL, NULL, '2025-06-01 22:49:56.622765-03', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('403700e2-26c9-4a2c-9c26-5a6ff58f059a', '45a9b920e29ba5e6f4c5a66b8ab2bea7e907ec67183c0e4c29ab9f2c52718753', '2025-06-08 20:32:54.947961-03', '20250608233254_add_onsale_to_product', NULL, NULL, '2025-06-08 20:32:54.937759-03', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('509db3e3-68d4-4317-a8c3-8219d6595563', 'f9ffb6be7f0206601f154d2148300fb7fc4a230200f5bb2ac9aa004f5049b0a6', '2025-06-17 20:03:54.064584-03', '20250617230353_add_discount_percentage', NULL, NULL, '2025-06-17 20:03:54.060797-03', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('12471373-12f0-48c5-bf63-13366840c421', '637dea5be997cd2ca4de5703679e0fb603b76d3f4e39f2f63924342c9d698324', '2025-06-17 22:02:05.601109-03', '20250618010205_add_lastname_and_phone', NULL, NULL, '2025-06-17 22:02:05.5979-03', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('6a608614-7cdb-4e11-8732-9e0f43f68242', '02a7e701116e353389f6f70288d9e2d013f0ca85dd994f8d88b5014c17785b7e', '2025-06-22 12:55:53.904194-03', '20250622155553_add_variants', NULL, NULL, '2025-06-22 12:55:53.876704-03', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('9d67efac-5ca1-414e-82e8-728b84321c08', 'c11b10e9cb98e4a2bfea41a6014abf8ed1041fd8397d7eeff7e4e88811f83c7d', '2025-06-22 16:27:47.908696-03', '20250622192747_add_variant_to_orderitem', NULL, NULL, '2025-06-22 16:27:47.90316-03', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('bad4ca7f-0187-4ddb-ba08-4e6880ffd0a5', 'e2f23848f168e972fa54155f88d7bfd1bf05fc0866504e2f9fd3644233d62710', '2025-06-22 22:19:50.852021-03', '20250623011950_add_variant_to_orderitem', NULL, NULL, '2025-06-22 22:19:50.847915-03', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('5814d131-3a02-420d-9cb2-9cca5830e442', '7e32f9e1215edebba242994a6c88adf7267453838e0a634dad737969c2da47da', '2025-06-23 19:17:17.30587-03', '20250623221609_add_updated_at_to_product', NULL, NULL, '2025-06-23 19:17:17.300122-03', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('be8edafd-4bb7-4c14-9683-f1330c5b312a', '44afe665807d88f848d6eefec4847c826c831fd82827f0c6bd55684ef05c412b', '2025-06-23 19:17:30.708764-03', '20250623221730_', NULL, NULL, '2025-06-23 19:17:30.694729-03', 1);


--
-- PostgreSQL database dump complete
--

