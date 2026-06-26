
-- profiles: owner-only write
CREATE POLICY "Users can insert their own profile"
ON public.profiles FOR INSERT TO authenticated
WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
ON public.profiles FOR UPDATE TO authenticated
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

-- user_roles: admin-only write management
CREATE POLICY "Admins can insert roles"
ON public.user_roles FOR INSERT TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update roles"
ON public.user_roles FOR UPDATE TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete roles"
ON public.user_roles FOR DELETE TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- generator_runs: admin-only write management
CREATE POLICY "Admins can insert generator runs"
ON public.generator_runs FOR INSERT TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update generator runs"
ON public.generator_runs FOR UPDATE TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete generator runs"
ON public.generator_runs FOR DELETE TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Lock down trigger helper functions from direct API execution
REVOKE EXECUTE ON FUNCTION public.update_updated_at_column() FROM anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM anon, authenticated;
