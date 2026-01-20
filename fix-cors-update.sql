-- Script para corrigir o problema de CORS/UPDATE
-- Execute este SQL no SQL Editor do Supabase

-- 1. Remover TODAS as políticas existentes
DROP POLICY IF EXISTS "Users can view own orcamentos" ON orcamentos;
DROP POLICY IF EXISTS "Users can insert own orcamentos" ON orcamentos;
DROP POLICY IF EXISTS "Users can update own orcamentos" ON orcamentos;
DROP POLICY IF EXISTS "Users can delete own orcamentos" ON orcamentos;
DROP POLICY IF EXISTS "Users can manage own orcamentos" ON orcamentos;

-- 2. Garantir que RLS está habilitado
ALTER TABLE orcamentos ENABLE ROW LEVEL SECURITY;

-- 3. Criar uma política única usando FOR ALL (mais simples e eficaz)
CREATE POLICY "Users can manage own orcamentos"
  ON orcamentos
  FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- 4. Verificar se funcionou (opcional - você verá os resultados)
SELECT 
  policyname,
  cmd,
  qual,
  with_check
FROM pg_policies 
WHERE tablename = 'orcamentos';
