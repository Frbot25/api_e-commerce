BEGIN;

INSERT INTO "roles" ("type") VALUES ('admin');

INSERT INTO "roles" ("type") VALUES ('utilisateur');

INSERT INTO
    "tags" ("name", "description", "color")
VALUES ('nouveau', 'nouveau', 'blue');

INSERT INTO
    "tags" ("name", "description", "color")
VALUES (
        'solde',
        'En solde !',
        'orange'
    );

INSERT INTO
    "tags" ("name", "description", "color")
VALUES (
        'destockage',
        'produit en destockage',
        'red'
    );

INSERT INTO
    "categories" ("name", "description", "color")
VALUES (
        'vetements',
        'vetements',
        'blue'
    );

INSERT INTO
    "categories" ("name", "description", "color")
VALUES (
        'chaussures',
        'chaussures',
        'orange'
    );

INSERT INTO
    "categories" ("name", "description", "color")
VALUES (
        'accessoires',
        'accessoires',
        'red'
    );

INSERT INTO
    "sellers" (
        "name",
        "description",
        "siret",
        "firstname",
        "lastname",
        "iban",
        "bic",
        "adress",
        "city",
        "zip_code",
        "country",
        "phone",
        "email",
        "image"
    )
VALUES (
        'Dupont SAS',
        'entreprise de vente de vetements',
        '123456789',
        'Dupont',
        'Eric',
        'FR7630001007941234567890185',
        'BDFEFR2T',
        '8 rue du lavoir',
        'Lyon',
        '69000',
        'France',
        '0381000000',
        'email@dupont.com',
        'https://picsum.photos/100/200'
    );

INSERT INTO
    "products" (
        "name",
        "description",
        "price",
        "quantity",
        "weight",
        "width",
        "height",
        "length",
        "available",
        "category_id",
        "tag_id",
        "seller_id"
    )
VALUES (
        't-shirt',
        't-shirt',
        10,
        50,
        100,
        100,
        100,
        100,
        TRUE,
        1,
        1,
        1
    );

INSERT INTO
    "products" (
        "name",
        "description",
        "price",
        "quantity",
        "weight",
        "width",
        "height",
        "length",
        "category_id",
        "tag_id",
        "seller_id"
    )
VALUES (
        'pantalon',
        'pantalon',
        10,
        50,
        100,
        100,
        100,
        100,
        1,
        1,
        1
    );

COMMIT;