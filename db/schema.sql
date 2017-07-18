DROP DATABASE IF EXISTS bellbird;
CREATE DATABASE bellbird;

\c bellbird;

CREATE TABLE alarms(
  id bigserial PRIMARY KEY,
  created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  alarm text NOT NULL CHECK(upper(alarm) = alarm)
);

CREATE TABLE upvotes(
  id bigserial PRIMARY KEY,
  alarm_id bigint NOT NULL REFERENCES alarms(id)
);


INSERT INTO alarms(alarm) VALUES ('THE BRITISH ARE COMING');
INSERT INTO alarms(alarm) VALUES ('THE BRITISH ARE COMING AGAIN');
INSERT INTO upvotes(alarm_id) VALUES (1);
INSERT INTO upvotes(alarm_id) VALUES (1);
INSERT INTO upvotes(alarm_id) VALUES (2);
