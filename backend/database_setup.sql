DROP DATABASE polaflix;

CREATE DATABASE polaflix;

USE polaflix;

CREATE TABLE users (
  id BIGINT NOT NULL AUTO_INCREMENT,
  user_name VARCHAR(100) NOT NULL,
  first_name VARCHAR(50),
  last_name VARCHAR(50),
  password VARCHAR(100) NOT NULL,
  PRIMARY KEY (id)
) ENGINE = InnoDB;

CREATE TABLE series (
  id BIGINT NOT NULL AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  PRIMARY KEY (id)
) ENGINE = InnoDB;

CREATE TABLE managed_series (
  id BIGINT NOT NULL AUTO_INCREMENT,
  user_id BIGINT NOT NULL,
  series_id BIGINT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY fk_user_managed_series(user_id)
  REFERENCES users(id)
  ON UPDATE CASCADE
  ON DELETE RESTRICT,
  FOREIGN KEY fk_series_managed_series(series_id)
  REFERENCES series(id)
  ON UPDATE CASCADE
  ON DELETE RESTRICT
) ENGINE = InnoDB;

CREATE TABLE ongoing_series (
  id BIGINT NOT NULL,
  date_started DATE NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY fk_managed_series_ongoing_series(id)
  REFERENCES managed_series(id)
  ON UPDATE CASCADE
  ON DELETE RESTRICT
) ENGINE = InnoDB;

CREATE TABLE pending_series (
  id BIGINT NOT NULL,
  date_added DATE NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY fk_managed_series_pending_series(id)
  REFERENCES managed_series(id)
  ON UPDATE CASCADE
  ON DELETE RESTRICT
) ENGINE = InnoDB;

CREATE TABLE completed_series (
  id BIGINT NOT NULL,
  date_completed DATE NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY fk_managed_series_completed_series(id)
  REFERENCES managed_series(id)
  ON UPDATE CASCADE
  ON DELETE RESTRICT
) ENGINE = InnoDB;

INSERT INTO users(user_name, first_name, last_name, password)
VALUES
  ("A", "a", "1", "A1$aaaaa"),
  ("B", "b", "2", "B2$bbbbb"),
  ("C", "c", "3", "C3$ccccc");

INSERT INTO series(name, description)
VALUES
  ("Twin Peaks", "The body of Laura Palmer is washed up on a beach near the small Washington state town of Twin Peaks. FBI Special Agent Dale Cooper is called in to investigate her strange demise only to uncover a web of mystery that ultimately leads him deep into the heart of the surrounding woodland and his very own soul."),
  ("Breaking Bad", "When Walter White, a New Mexico chemistry teacher, is diagnosed with Stage III cancer and given a prognosis of only two years left to live, he becomes filled with a sense of fearlessness and an unrelenting desire to secure his family's financial future at any cost as he enters the dangerous world of drugs and crime."),
  ("Death Note", "Light Yagami is an ace student with great prospects—and he’s bored out of his mind. But all that changes when he finds the Death Note, a notebook dropped by a rogue Shinigami death god. Any human whose name is written in the notebook dies, and Light has vowed to use the power of the Death Note to rid the world of evil. But will Light succeed in his noble goal, or will the Death Note turn him into the very thing he fights against?"),
  ("Better Call Saul", "Six years before Saul Goodman meets Walter White. We meet him when the man who will become Saul Goodman is known as Jimmy McGill, a small-time lawyer searching for his destiny, and, more immediately, hustling to make ends meet. Working alongside, and, often, against Jimmy, is 'fixer' Mike Erhmantraut. The series will track Jimmy's transformation into Saul Goodman, the man who puts 'criminal' in 'criminal lawyer'."),
  ("House of Cards", "Set in present day Washington, D.C., House of Cards is the story of Frank Underwood, a ruthless and cunning politician, and his wife Claire who will stop at nothing to conquer everything. This wicked political drama penetrates the shadowy world of greed, sex and corruption in modern D.C. House of Cards is an adaptation of a previous BBC miniseries of the same name, which is based on the novel by Michael Dobbs."),
  ("Arrow", "Spoiled billionaire playboy Oliver Queen is missing and presumed dead when his yacht is lost at sea. He returns five years later a changed man, determined to clean up the city as a hooded vigilante armed with a bow."),
  ("Bones", "Dr. Temperance Brennan and her colleagues at the Jeffersonian's Medico-Legal Lab assist Special Agent Seeley Booth with murder investigations when the remains are so badly decomposed, burned or destroyed that the standard identification methods are useless.");

INSERT INTO managed_series(user_id, series_id)
VALUES
  (1, 1),
  (1, 2),
  (1, 3),
  (1, 4),
  (1, 5),
  (1, 6),
  (2, 2);

INSERT INTO ongoing_series(id, date_started)
VALUES
  (1, "2018-08-10"),
  (4, "2018-09-09");

INSERT INTO pending_series(id, date_added)
VALUES
  (2, "2018-08-17");

INSERT INTO completed_series(id, date_completed)
VALUES
  (3, "2018-08-25"),
  (5, "2018-09-16"),
  (6, "2018-07-01");

