BEGIN;

DROP TABLE
    IF EXISTS "users",
    "roles",
    "sellers",
    "status",
    "tags",
    "categories",
    "orders",
    "products",
    "orders_has_products";

CREATE TABLE
    "roles"(
        id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        "type" TEXT NOT NULL UNIQUE DEFAULT 'utilisateur',
        "description" TEXT,
        created_At TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_At TIMESTAMPTZ
    );

CREATE TABLE
    "sellers"(
        id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        "name" TEXT NOT NULL UNIQUE,
        "description" TEXT,
        "siret" TEXT NOT NULL UNIQUE,
        "firstname" TEXT NOT NULL,
        "lastname" TEXT NOT NULL,
        "iban" TEXT NOT NULL,
        "bic" TEXT NOT NULL,
        "adress" TEXT NOT NULL,
        "city" TEXT NOT NULL,
        "zip_code" TEXT NOT NULL,
        "country" TEXT NOT NULL,
        "phone" TEXT NOT NULL,
        "email" TEXT NOT NULL UNIQUE,
        "image" TEXT,
        "verified" BOOLEAN NOT NULL DEFAULT FALSE,
        created_At TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_At TIMESTAMPTZ
    );

CREATE TABLE
    "status"(
        id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        "name" TEXT NOT NULL DEFAULT 'en cours',
        "description" TEXT,
        created_At TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_At TIMESTAMPTZ
    );

CREATE TABLE
    "tags"(
        id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        "name" TEXT NOT NULL UNIQUE,
        "description" TEXT,
        "color" TEXT NOT NULL,
        created_At TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_At TIMESTAMPTZ
    );

CREATE TABLE
    "categories"(
        id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        "name" TEXT NOT NULL UNIQUE,
        "description" TEXT,
        "color" TEXT NOT NULL,
        created_At TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_At TIMESTAMPTZ
    );

CREATE TABLE
    "products"(
        id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        "name" TEXT NOT NULL UNIQUE,
        "description" TEXT NOT NULL,
        "images" TEXT ARRAY,
        "price" INTEGER NOT NULL,
        "quantity" INTEGER NOT NULL,
        "weight" INTEGER NOT NULL,
        "width" INTEGER NOT NULL,
        "height" INTEGER NOT NULL,
        "length" INTEGER NOT NULL,
        "available" BOOLEAN NOT NULL DEFAULT TRUE,
        "category_id" INTEGER NOT NULL REFERENCES "categories"(id),
        "tag_id" INTEGER NOT NULL REFERENCES "tags"(id),
        "seller_id" INTEGER NOT NULL REFERENCES sellers(id),
        "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        "updated_at" TIMESTAMPTZ,
        constraint limit_images check (cardinality(images) <= 4)
    );

CREATE TABLE
    "users"(
        id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        "firstname" TEXT,
        "lastname" TEXT,
        "email" TEXT NOT NULL UNIQUE,
        "adress" TEXT,
        "city" TEXT,
        "zip_code" INTEGER,
        "country" TEXT,
        "phone" TEXT,
        "password" TEXT NOT NULL,
        "image" TEXT,
        "verified" BOOLEAN NOT NULL DEFAULT FALSE,
        "reset_password_token" TEXT,
        "reset_password_expires" TIMESTAMPTZ,
        "role_id" INTEGER NOT NULL REFERENCES "roles"(id) DEFAULT 2,
        created_At TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_At TIMESTAMPTZ
    );

CREATE TABLE
    "orders"(
        id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        "order_estimated_delivery" TIMESTAMPTZ,
        "order_delivered_carrier_date" TIMESTAMPTZ,
        "order_delivered_customer_date" TIMESTAMPTZ,
        "user_id" INTEGER NOT NULL REFERENCES "users"(id),
        "status_id" INTEGER NOT NULL REFERENCES status(id),
        created_At TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_At TIMESTAMPTZ
    );

CREATE TABLE
    orders_has_products(
        id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        "order_id" INTEGER NOT NULL REFERENCES "orders"("id") ON DELETE CASCADE,
        "product_id" INTEGER NOT NULL REFERENCES "products"("id") ON DELETE CASCADE,
        "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );

COMMIT;