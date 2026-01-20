-- Script para verificar e corrigir configurações do Supabase
-- Execute este SQL no SQL Editor do Supabase

-- 1. Verificar se a tabela existe e tem RLS habilitado
SELECT 
  tablename, 
  rowsecurity as rls_enabled
FROM pg_tables 
WHERE schemaname = 'public' AND tablename = 'orcamentos';

-- 2. Verificar todas as políticas existentes
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies 
WHERE tablename = 'orcamentos';

-- 3. Remover TODAS as políticas (para começar do zero)
DROP POLICY IF EXISTS "Users can view own orcamentos" ON orcamentos;
DROP POLICY IF EXISTS "Users can insert own orcamentos" ON orcamentos;
DROP POLICY IF EXISTS "Users can update own orcamentos" ON orcamentos;
DROP POLICY IF EXISTS "Users can delete own orcamentos" ON orcamentos;

-- 4. Garantir que RLS está habilitado
ALTER TABLE orcamentos ENABLE ROW LEVEL SECURITY;

-- 5. Criar políticas usando FOR ALL (mais permissivo para UPDATE)
CREATE POLICY "Users can manage own orcamentos"
  ON orcamentos
  FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- OU criar políticas separadas (mais específicas):
-- CREATE POLICY "Users can view own orcamentos"
--   ON orcamentos FOR SELECT
--   USING (auth.uid() = user_id);

-- CREATE POLICY "Users can insert own orcamentos"
--   ON orcamentos FOR INSERT
--   WITH CHECK (auth.uid() = user_id);

-- CREATE POLICY "Users can update own orcamentos"
--   ON orcamentos FOR UPDATE
--   USING (auth.uid() = user_id)
--   WITH CHECK (auth.uid() = user_id);

-- CREATE POLICY "Users can delete own orcamentos"
--   ON orcamentos FOR DELETE
--   USING (auth.uid() = user_id);
