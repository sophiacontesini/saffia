-- Script para atualizar o schema do Supabase para incluir nome do usuário
-- Execute este SQL no SQL Editor do Supabase

-- O nome será armazenado no user_metadata do Supabase Auth
-- Não precisa criar tabela adicional, o Supabase já gerencia isso
-- Mas vamos criar uma função para atualizar o nome do usuário

CREATE OR REPLACE FUNCTION atualizar_nome_usuario(novo_nome TEXT)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE auth.users
  SET raw_user_meta_data = jsonb_set(
    COALESCE(raw_user_meta_data, '{}'::jsonb),
    '{nome}',
    to_jsonb(novo_nome)
  )
  WHERE id = auth.uid();
END;
$$;

GRANT EXECUTE ON FUNCTION atualizar_nome_usuario TO authenticated;
