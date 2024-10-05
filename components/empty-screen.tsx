import { ExternalLink } from '@/components/external-link'

export function EmptyScreen() {
  return (
    <div className="mx-auto max-w-2xl px-4">
      <div className="flex flex-col gap-2 rounded-2xl bg-zinc-50 sm:p-8 p-4 text-sm sm:text-base">
        <h1 className="text-2xl sm:text-3xl tracking-tight font-semibold max-w-fit inline-block">
          OgiChat + Google Gemini
        </h1>
        <p className="leading-normal text-zinc-900">
          Esse é um chatbot desenvolvido para fazer cotações online de{' '}
          <ExternalLink href="https://nextjs.org">SEGUROS</ExternalLink>, Na{' '}
          <ExternalLink href="https://sdk.vercel.ai">
            Porto Seguro
          </ExternalLink>
          , e{' '}
          <ExternalLink href="https://ai.google.dev">
            Outras Seguradoras
          </ExternalLink>
          .
        </p>
        <p className="leading-normal text-zinc-900">
          Utilizamos{' '}
          <ExternalLink href="https://vercel.com/blog/ai-sdk-3-generative-ui">
            Google Gemini
          </ExternalLink>{' '}
          Para gerar respostas fáceis, e rápidas para você! Usamos UI Generativa pra melhorar a sua usabilidade!
          Quer ver? Faça sua cotação gratuita, abaixo!
        </p>
      </div>
    </div>
  )
}
