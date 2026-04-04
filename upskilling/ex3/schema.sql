CREATE TABLE Users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    city VARCHAR(100) NOT NULL,
    registration_date DATE NOT NULL
);

CREATE TABLE Events (
    event_id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    city VARCHAR(100) NOT NULL,
    start_date DATETIME NOT NULL,
    end_date DATETIME NOT NULL,
    status ENUM('upcoming', 'completed', 'cancelled') NOT NULL,
    organizer_id INT,
    FOREIGN KEY (organizer_id) REFERENCES Users(user_id) ON DELETE SET NULL
);

CREATE TABLE Sessions (
    session_id INT PRIMARY KEY AUTO_INCREMENT,
    event_id INT,
    title VARCHAR(200) NOT NULL,
    speaker_name VARCHAR(100) NOT NULL,
    start_time DATETIME NOT NULL,
    end_time DATETIME NOT NULL,
    FOREIGN KEY (event_id) REFERENCES Events(event_id) ON DELETE CASCADE
);

CREATE TABLE Registrations (
    registration_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    event_id INT,
    registration_date DATE NOT NULL,
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (event_id) REFERENCES Events(event_id) ON DELETE CASCADE
);

CREATE TABLE Feedback (
    feedback_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    event_id INT,
    rating INT NOT NULL,
    comments TEXT,
    feedback_date DATE NOT NULL,
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (event_id) REFERENCES Events(event_id) ON DELETE CASCADE,
    CONSTRAINT chk_rating CHECK (rating BETWEEN 1 AND 5)
);

CREATE TABLE Resources (
    resource_id INT PRIMARY KEY AUTO_INCREMENT,
    event_id INT,
    resource_type ENUM('pdf', 'image', 'link') NOT NULL,
    resource_url VARCHAR(255) NOT NULL,
    uploaded_at DATETIME NOT NULL,
    FOREIGN KEY (event_id) REFERENCES Events(event_id) ON DELETE CASCADE
);

INSERT INTO Users (user_id, full_name, email, city, registration_date) VALUES
(1, 'Alex Vance', 'alex.vance@nexus.io', 'San Francisco', '2025-12-01'),
(2, 'Beatriz Silva', 'beatriz@nexus.io', 'Seattle', '2025-12-05'),
(3, 'Carlos Mendez', 'carlos@nexus.io', 'Austin', '2025-12-10'),
(4, 'Devon Reed', 'devon@nexus.io', 'San Francisco', '2026-01-15'),
(5, 'Elena Rostova', 'elena@nexus.io', 'Seattle', '2026-02-01');

INSERT INTO Events (event_id, title, description, city, start_date, end_date, status, organizer_id) VALUES
(1, 'Cloud Architecture Summit', 'A premier gathering for cloud computing enthusiasts.', 'San Francisco', '2026-06-10 10:00:00', '2026-06-10 16:00:00', 'upcoming', 1),
(2, 'GenAI Systems Symposium', 'Symposium on generative AI and modern LLMs.', 'Austin', '2026-05-15 09:00:00', '2026-05-15 17:00:00', 'completed', 3),
(3, 'Full-Stack Modern Web Workshop', 'Hands-on intensive workshop on cloud-native web UI.', 'Seattle', '2026-07-01 10:00:00', '2026-07-03 16:00:00', 'upcoming', 2);

INSERT INTO Sessions (session_id, event_id, title, speaker_name, start_time, end_time) VALUES
(1, 1, 'Opening Keynote: Cloud Evolution', 'Dr. Tech Leader', '2026-06-10 10:00:00', '2026-06-10 11:00:00'),
(2, 1, 'Microservices Architecture at Scale', 'Alex Vance', '2026-06-10 11:15:00', '2026-06-10 12:30:00'),
(3, 2, 'LLM Fine-tuning in Production', 'Carlos Mendez', '2026-05-15 09:30:00', '2026-05-15 11:00:00'),
(4, 3, 'Modern UI Engineering & HTML5', 'Beatriz Silva', '2026-07-01 10:00:00', '2026-07-01 12:00:00');

INSERT INTO Registrations (registration_id, user_id, event_id, registration_date) VALUES
(1, 1, 1, '2026-05-01'),
(2, 2, 1, '2026-05-02'),
(3, 3, 2, '2026-04-30'),
(4, 4, 2, '2026-04-28'),
(5, 5, 3, '2026-06-15');

INSERT INTO Feedback (feedback_id, user_id, event_id, rating, comments, feedback_date) VALUES
(1, 3, 2, 4, 'Outstanding keynotes and practical labs!', '2026-05-16'),
(2, 4, 2, 5, 'Extremely inspiring presentations.', '2026-05-16'),
(3, 2, 1, 4, 'Well coordinated discussions.', '2026-06-11');

INSERT INTO Resources (resource_id, event_id, resource_type, resource_url, uploaded_at) VALUES
(1, 1, 'pdf', 'https://nexusportal.io/resources/cloud_summit_agenda.pdf', '2026-05-01 10:00:00'),
(2, 2, 'image', 'https://nexusportal.io/resources/genai_poster.png', '2026-04-20 09:00:00'),
(3, 3, 'link', 'https://nexusportal.io/resources/web_workshop_docs', '2026-06-25 15:00:00');
