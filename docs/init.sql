BEGIN;

DROP TABLE
    IF EXISTS users,
    tags_has_items,
    roles,
    tags,
    categories,
    orders,
    items;

CREATE TABLE
    "roles"(
        id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        "type" TEXT NOT NULL UNIQUE DEFAULT 'utilisateur',
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
    "orders"(
        id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        "title" TEXT NOT NULL UNIQUE,
        "description" TEXT,
        "status" TEXT NOT NULL DEFAULT 'en cours',
        "quantity" INTEGER NOT NULL DEFAULT 1,
        "price" INTEGER NOT NULL,
        "images" TEXT ARRAY,
        constraint limit_images check (cardinality(images) <= 4),
        created_At TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_At TIMESTAMPTZ
    );

CREATE TABLE
    "users"(
        id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        "firstname" TEXT NOT NULL,
        "lastname" TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        "adress" TEXT NOT NULL,
        "city" TEXT NOT NULL,
        "zip_code" TEXT NOT NULL,
        "country" TEXT NOT NULL,
        "phone" TEXT NOT NULL,
        "password" TEXT NOT NULL,
        "avatar" TEXT,
        "verified" BOOLEAN NOT NULL DEFAULT FALSE,
        "reset_password_token" TEXT,
        "reset_password_expires" TIMESTAMPTZ,
        role_id INTEGER NOT NULL REFERENCES roles(id),
        created_At TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_At TIMESTAMPTZ
    );

CREATE TABLE
    "items"(
        id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        "name" TEXT NOT NULL UNIQUE,
        "description" TEXT NOT NULL,
        userId INTEGER NOT NULL REFERENCES users(id),
        categoryId INTEGER NOT NULL REFERENCES categories(id),
        tagId INTEGER NOT NULL REFERENCES tags(id),
        created_At TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_At TIMESTAMPTZ
    );

CREATE TABLE
    tags_has_items(
        id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        "tag_id" INTEGER NOT NULL REFERENCES "tags"("id") ON DELETE CASCADE,
        "itemId" INTEGER NOT NULL REFERENCES "items"("id") ON DELETE CASCADE,
        "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );

COMMIT;