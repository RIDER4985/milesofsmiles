-- Create a table for website content
create table website_content (
  id bigint primary key generated always as identity,
  content jsonb not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table website_content enable row level security;

-- Create a policy that allows anyone to read the content
create policy "Public Read Access"
  on website_content for select
  using (true);

-- Create a policy that allows authenticated users (admin) to update
-- For simplicity in this starter, we'll allow anon updates if they have the key,
-- but in production you should restrict this to authenticated users only.
create policy "Allow updates"
  on website_content for insert
  with check (true);

create policy "Allow updates"
  on website_content for update
  using (true);
