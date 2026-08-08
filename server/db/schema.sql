-- Run this once in the Supabase SQL editor (or via the CLI) before starting the server.
-- It creates the single table the interview service reads/writes per request.

create table if not exists interview_sessions (
  session_id      text primary key,
  candidate       jsonb not null,
  conversation    jsonb not null default '[]',
  days_covered    jsonb not null default '[]',
  question_count  int   not null default 0,
  status          text  not null default 'IN_PROGRESS',
  feedback        jsonb,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

-- Keep updated_at fresh on every write.
create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists interview_sessions_set_updated_at on interview_sessions;
create trigger interview_sessions_set_updated_at
  before update on interview_sessions
  for each row execute function set_updated_at();
