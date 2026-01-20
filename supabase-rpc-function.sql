-- Solução alternativa: Criar uma função RPC no Supabase para atualizar o status
-- Isso pode contornar o problema de CORS com PATCH
-- Execute este SQL no SQL Editor do Supabase

-- Função para atualizar status do orçamento
CREATE OR REPLACE FUNCTION atualizar_status_orcamento(
  orcamento_id UUID,
  novo_status TEXT
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE orcamentos
  SET 
    status = novo_status,
    updated_at = NOW()
  WHERE 
    id = orcamento_id
    AND user_id = auth.uid();
END;
$$;

-- Garantir que a função pode ser executada por usuários autenticados
GRANT EXECUTE ON FUNCTION atualizar_status_orcamento TO authenticated;
