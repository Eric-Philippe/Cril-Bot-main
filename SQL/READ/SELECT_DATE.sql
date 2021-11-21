SELECT U.id_user, R.t_date, R.c_date, R.remind, R.id_reminder
FROM Users as U, Reminder as R, Concerner as C
WHERE U.id_user = C.id_user
AND C.id_reminder = R.id_reminder
AND R.t_date <?;
