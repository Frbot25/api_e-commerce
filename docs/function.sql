BEGIN;

-- create a new products

CREATE OR REPLACE FUNCTION NEW_PRODUCT(DATA JSON) RETURNS 
INT AS $$ 
	INSERT INTO
	    products (
	        'name',
	        'description',
	        'images',
	        'price',
	        'quantity',
	        'weight',
	        'width',
	        'height',
	        'length',
	        'available',
	        'category_id',
	        'tag_id',
	        'seller_id'
	    )
	VALUES (
	        data ->> 'name',
	        data ->> 'description',
	        data ->> 'images',
	        data ->> 'price',
	        data ->> 'quantity',
	        data ->> 'weight',
	        data ->> 'width',
	        data ->> 'height',
	        data ->> 'length',
	        data ->> 'available',
           (data ->> 'category_id'):: INT,
           (data ->> 'tag_id'):: INT,
           (data ->> 'seller_id'):: INT
	    ) RETURNING id $$ LANGUAGE SQL STRICT;
COMMIT;