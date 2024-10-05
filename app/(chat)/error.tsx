'use client'

export default function Error({
  error
}: {
  error: Error & { digest?: string }
}) {
  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <h1 className="text-lg font-semibold mb-2">
        Opa, algo deu errado!
      </h1>
      <p>
        {error.message || 'Limite de AI usado, tente novamente mais tarde.'}
      </p>
      <p>Digest: {error.digest}</p>
    </div>
  )
}
