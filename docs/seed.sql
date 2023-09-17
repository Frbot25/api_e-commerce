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

COMMIT;