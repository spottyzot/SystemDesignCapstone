
\c postgres;

DROP DATABASE IF EXISTS products;
CREATE DATABASE products;

\c products;


CREATE TABLE products (
    id INT PRIMARY KEY,
    name TEXT,
    slogan TEXT,
    description TEXT,
    category TEXT,
    default_price INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE features (
    feature_id INT PRIMARY KEY,
    product_id INTEGER,
    feature TEXT,
    value TEXT
);

CREATE TABLE styles (
    style_id INT PRIMARY KEY,
    productId INTEGER,
    name TEXT,
    sale_price TEXT,
    original_price INTEGER,
    default_style BOOLEAN
);

CREATE TABLE photos (
    photo_id INT PRIMARY KEY,
    styleId INTEGER,
    url TEXT,
    thumbnail_url TEXT
);

CREATE TABLE skus (
    sku_id INT PRIMARY KEY,
    styleId INTEGER,
    size TEXT,
    quantity SMALLINT
);

CREATE TABLE related_products (
    related_id INT PRIMARY KEY,
    current_product_id INTEGER NOT NULL,
    related_product_id INTEGER NOT NULL
);
