import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase'

const TENANT_ID = process.env.KORVU_TENANT_ID!

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ keyword: string }> }
) {
  const { keyword } = await params
  const normalised = keyword.toLowerCase().trim()

  const supabase = createServiceClient()

  const { data, error } = await supabase
    .from('documents')
    .select('file_url, title')
    .eq('tenant_id', TENANT_ID)
    .eq('keyword', normalised)
    .eq('active', true)
    .limit(1)
    .single()

  if (error || !data) {
    return new NextResponse('Documento não encontrado.', { status: 404 })
  }

  return NextResponse.redirect(data.file_url as string, { status: 307 })
}
