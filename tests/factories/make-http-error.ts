import { HTTPError } from 'ky'

type MakeHTTPErrorProps = {
  responseOverride?: Partial<{
    status: number
    message: string
  }>
  requestOverride?: Partial<{
    method: string
  }>
}

const DEFAULT_HTTP_ERROR_STATUS = 500

export function makeHTTPError({
  responseOverride,
  requestOverride,
}: MakeHTTPErrorProps) {
  const response = new Response(
    JSON.stringify({
      message: responseOverride?.message ?? 'HTTP Error',
    }),
    {
      status: responseOverride?.status ?? DEFAULT_HTTP_ERROR_STATUS,
    }
  )

  const request = new Request('http://localhost:3005', {
    method: requestOverride?.method ?? 'POST',
  })

  const error = new HTTPError(response, request, {
    retry: {},
    prefix: '',
    onUploadProgress: () => {
      console.log('upload')
    },
    onDownloadProgress: () => {
      console.log('download')
    },
    method: request.method,
    context: {},
  })

  return error
}
