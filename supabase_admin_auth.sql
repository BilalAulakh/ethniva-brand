-- ==============================================================================
-- ADMIN LOGIN CREDENTIALS (run ONCE in Supabase: SQL Editor -> New Query -> Run)
-- ==============================================================================
-- Stores a single admin email + bcrypt-hashed password. The table is locked by
-- RLS (no policies), so the browser can never read it. The website only talks to
-- it through the two SECURITY DEFINER functions below.
-- ==============================================================================

CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA extensions;

CREATE TABLE IF NOT EXISTS public.admin_credentials (
  id INTEGER PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  email TEXT NOT NULL,
  password_hash TEXT NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.admin_credentials ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.admin_credentials FROM anon, authenticated;

-- Initial login (same as the old one). Change it from the admin panel afterwards
-- using the "Change Login" button. Existing credentials are never overwritten.
INSERT INTO public.admin_credentials (id, email, password_hash)
VALUES (1, 'ethnivabrand@gmail.com', extensions.crypt('ethniva2026', extensions.gen_salt('bf')))
ON CONFLICT (id) DO NOTHING;


-- Returns true when email + password are correct.
CREATE OR REPLACE FUNCTION public.admin_login(p_email TEXT, p_password TEXT)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, extensions
AS $$
DECLARE
  r public.admin_credentials;
BEGIN
  SELECT * INTO r FROM public.admin_credentials WHERE id = 1;
  IF NOT FOUND OR p_email IS NULL OR p_password IS NULL THEN
    RETURN FALSE;
  END IF;
  RETURN lower(trim(p_email)) = lower(r.email)
     AND r.password_hash = crypt(p_password, r.password_hash);
END;
$$;


-- Changes the admin email and/or password after verifying the current password.
-- Pass NULL / empty p_new_email to keep the current email.
-- Returns: 'ok' | 'invalid_current' | 'invalid_email' | 'weak_password'
CREATE OR REPLACE FUNCTION public.admin_change_credentials(
  p_current_password TEXT,
  p_new_email TEXT,
  p_new_password TEXT
)
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, extensions
AS $$
DECLARE
  r public.admin_credentials;
  v_email TEXT;
BEGIN
  SELECT * INTO r FROM public.admin_credentials WHERE id = 1;
  IF NOT FOUND OR p_current_password IS NULL
     OR r.password_hash <> crypt(p_current_password, r.password_hash) THEN
    RETURN 'invalid_current';
  END IF;

  v_email := lower(trim(coalesce(p_new_email, '')));
  IF v_email = '' THEN
    v_email := r.email;
  ELSIF v_email !~ '^[^@\s]+@[^@\s]+\.[^@\s]+$' THEN
    RETURN 'invalid_email';
  END IF;

  IF p_new_password IS NULL OR length(p_new_password) < 8 THEN
    RETURN 'weak_password';
  END IF;

  UPDATE public.admin_credentials
     SET email = v_email,
         password_hash = crypt(p_new_password, gen_salt('bf')),
         updated_at = now()
   WHERE id = 1;

  RETURN 'ok';
END;
$$;

GRANT EXECUTE ON FUNCTION public.admin_login(TEXT, TEXT) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.admin_change_credentials(TEXT, TEXT, TEXT) TO anon, authenticated;
