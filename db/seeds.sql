INSERT INTO department (department_name)
VALUES ('Logic'),
        ('Phenomenology'),
        ('Empiricism'),
        ('Nihilism'),
        ('Epistemology'),
        ('Existentialism');

INSERT INTO role (salary, title, department_id)
VALUES (3000.00, 'Logician Extraordinaire', 1),
        (3000.00, 'Phenomena Specialist', 2),
        (2000.00, 'Experienced Overseer', 3),
        (2000.00, 'Powerful Denier', 4),
        (2000.00, 'Reality Thinker', 5),
        (3000.00, 'Existence Surveyor', 6);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ('Immanuel', 'Kant', 1),
        ('Martin', 'Heidegger', 2),
        ('David', 'Hume', 3),
        ('Friedrich', 'Nietzsche', 4),
        ('Rene', 'Descartes', 5),
        ('Jean-Paul', 'Sartre', 6);