create table cart_items (
	CONSTRAINT cart_id FOREIGN KEY (id) REFERENCES carts(id),
	product_id uuid,
	count integer,
)