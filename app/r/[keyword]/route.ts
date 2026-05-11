export const dynamic = 'force-dynamic'

import { createServiceClient } from '@/lib/supabase'

const TENANT_ID = process.env.KORVU_TENANT_ID ?? '00000000-0000-0000-0000-000000000001'

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ keyword: string }> }
) {
  const { keyword } = await params

  const supabase = createServiceClient()

  const { data, error } = await supabase
    .from('documents')
    .select('file_url')
    .eq('tenant_id', TENANT_ID)
    .eq('keyword', keyword.toLowerCase())
    .eq('active', true)
    .maybeSingle()

  if (error || !data) {
    return new Response('Document not found', { status: 404 })
  }

  return Response.redirect(data.file_url, 302)
}
