export async function GET(
  request: Request,
  { params }: { params: Promise<{ keyword: string }> }
) {
  const { keyword } = await params
  return Response.json({ keyword, status: 'ok' })
}
