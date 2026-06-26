INSERT INTO public.user_roles (user_id, role)
VALUES ('03fe68f1-1c9a-413f-88a7-34e2278c8c13', 'admin')
ON CONFLICT (user_id, role) DO NOTHING;