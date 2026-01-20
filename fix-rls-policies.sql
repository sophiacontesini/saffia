-- Script para corrigir as políticas RLS no Supabase
-- Execute este SQL no SQL Editor do Supabase se o UPDATE não estiver funcionando

-- Primeiro, vamos remover as políticas antigas (se existirem)
DROP POLICY IF EXISTS "Users can view own orcamentos" ON orcamentos;
DROP POLICY IF EXISTS "Users can insert own orcamentos" ON orcamentos;
DROP POLICY IF EXISTS "Users can update own orcamentos" ON orcamentos;
DROP POLICY IF EXISTS "Users can delete own orcamentos" ON orcamentos;

-- Agora vamos criar as políticas novamente com a sintaxe correta
CREATE POLICY "Users can view own orcamentos"
  ON orcamentos
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own orcamentos"
  ON orcamentos
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own orcamentos"
  ON orcamentos
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own orcamentos"
  ON orcamentos
  FOR DELETE
  USING (auth.uid() = user_id);

-- Verificar se RLS está habilitado
ALTER TABLE orcamentos ENABLE ROW LEVEL SECURITY;
