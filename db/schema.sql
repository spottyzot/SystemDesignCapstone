
\c postgres;

DROP DATABASE IF EXISTS products;
CREATE DATABASE products;

\c products;


CREATE TABLE products (
    id INT PRIMARY KEY,
    name VARCHAR(50),
    slogan VARCHAR(150),
    description TEXT,
    category VARCHAR(30),
    default_price INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE features (
    feature_id INT PRIMARY KEY,
    product_id INTEGER,
    feature VARCHAR(40),
    value VARCHAR(40)
);

CREATE TABLE styles (
    style_id INT PRIMARY KEY,
    product_id INTEGER,
    name VARCHAR(40),
    sale_price VARCHAR(5),
    original_price VARCHAR(10),
    default_style BOOLEAN
);

CREATE TABLE photos (
    photo_id INT PRIMARY KEY,
    style_id INTEGER,
    url TEXT,
    thumbnail_url TEXT
);

CREATE TABLE skus (
    sku_id INT PRIMARY KEY,
    style_id INTEGER,
    size VARCHAR(10),
    quantity SMALLINT
);

CREATE TABLE related_products (
    related_id INT PRIMARY KEY,
    current_product_id INTEGER NOT NULL,
    related_product_id INTEGER NOT NULL
);


/* create indexes */

CREATE INDEX idx_features_pid ON features(product_id);
CREATE INDEX idx_styles_pid ON styles(product_id);
CREATE INDEX idx_skus_sid ON skus(style_id);
CREATE INDEX idx_related_pid ON related_products(current_product_id);


/* load */
