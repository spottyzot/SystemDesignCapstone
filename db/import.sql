\c products;

\copy products(product_id, name, slogan, description, category, default_price) FROM '/root/hackreactor/SystemDesignCapstone/data/product.csv' DELIMITER ',' CSV HEADER;

\copy features(feature_id, product_id, feature, value) FROM '/root/hackreactor/SystemDesignCapstone/data/features.csv' DELIMITER ',' CSV HEADER;

\copy styles(style_id, product_id, name, sale_price, original_price, default_style) FROM '/root/hackreactor/SystemDesignCapstone/data/styles.csv' DELIMITER ',' CSV HEADER;

\copy photos(photo_id, style_id, url, thumbnail_url) FROM '/root/hackreactor/SystemDesignCapstone/data/photos.csv' DELIMITER ',' CSV HEADER;

\copy skus(sku_id, style_id, size, quantity) FROM '/root/hackreactor/SystemDesignCapstone/data/skus.csv' DELIMITER ',' CSV HEADER;

\copy related_products(related_id, current_product_id, related_product_id) FROM '/root/hackreactor/SystemDesignCapstone/data/related.csv' DELIMITER ',' CSV HEADER;