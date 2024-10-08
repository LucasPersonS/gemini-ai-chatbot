'use client'

/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { useState } from 'react'
import { useActions, useUIState } from 'ai/rsc'
import { Star } from 'lucide-react'

interface Flight {
  id: number
  avaliacao: string
  seguradoraNome: string
  tempoCotacaoFinal: string
  CNPJ: string
  logoUrl: string
}

interface ListFlightsProps {
  summary: {
    linha: string
    grupo: string
    date: string
    logoUrl: string
  }
}

export const ListFlights = ({
  summary = {
    linha: 'Premium',
    grupo: 'Porto Seguro',
    date: '2024-10-31',
    logoUrl: 'https://play-lh.googleusercontent.com/9AXivDxUm2lyogDCW9BIe5E3sMm_jqT6T_kCTJQxZ5A6AXI1dfjOwfpu-p6jH_i9ja4'
  }
}: ListFlightsProps) => {
  const { linha, grupo, date } =
    summary
  const { submitUserMessage } = useActions()
  const [_, setMessages] = useUIState()

  const flights = [
    {
      id: 1,
      avaliacao: '5.0 estrelas',
      seguradoraNome: 'Porto Seguros',
      CNPJ: '61.198.164/0001-60',
      logoUrl: 'https://play-lh.googleusercontent.com/9AXivDxUm2lyogDCW9BIe5E3sMm_jqT6T_kCTJQxZ5A6AXI1dfjOwfpu-p6jH_i9ja4'
    },
    {
      id: 2,
      avaliacao: '4.7 estrelas',
      seguradoraNome: 'Azul Seguros',
      CNPJ: '33.448.150/0001-11',
      logoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRlyS8fiNCY-_tnAlDF4Eh_Ou-qIxfKNnXRA&s'
    },
    {
      id: 3,
      avaliacao: '4.3 estrelas',
      seguradoraNome: 'Itaú Seguros',
      CNPJ: '61.557.039/0001-07',
      logoUrl: 'https://seeklogo.com/images/I/Itau-logo-C9E851CC19-seeklogo.com.png'
    },
    {
      id: 4,
      avaliacao: '4.1 estrelas',
      seguradoraNome: 'Mitsui Seguros',
      CNPJ: '33.016.221/0001-07',
      logoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcv84wDzCxNmIeZLFKvBsvibk_W8DFHl3yVg&s'
    }
  ]

  return (
    <div className="grid gap-2 rounded-2xl border border-zinc-200 bg-white p-4 sm:p-4">
      <div className="grid gap-2 sm:flex sm:flex-row justify-between border-b p-2 bg-gradient-to-r from-purple-500 to-purple-700 rounded-lg">
        <div className="sm:basis-1/4">
          <div className="text-xs text-white">Grupo</div>
          <div className="font-medium text-white">{grupo}</div>
        </div>
        <div className="sm:basis-1/4">
          <div className="text-xs text-white">Linha</div>
          <div className="font-medium text-white">{linha}</div>
        </div>
        <div className="sm:basis-1/2">
          <div className="sm:text-right text-xs text-white">Data</div>
          <div className="sm:text-right font-medium text-white">{date}</div>
        </div>
      </div>
      <div className="grid gap-3">
        {flights &&
          flights.map(flight => (
<div
  key={flight.id}
  className="flex cursor-pointer flex-row items-start sm:items-center gap-4 rounded-xl p-3 hover:bg-zinc-50 group relative"
  onClick={async () => {
    const response = await submitUserMessage(
      `O usuário escolheu a seguradora com a avalição de ${flight.avaliacao}, com o nome ${flight.seguradoraNome} e o número de registro CNPJ de: ${flight.CNPJ}. Agora por favor, mostre a UI de formulário ao usuário.`
    )
    setMessages((currentMessages: any[]) => [
      ...currentMessages,
      response
    ])
  }}
>
  <div className="w-10 sm:w-12 shrink-0 aspect-square rounded-lg bg-zinc-50 overflow-hidden">
    <img
      src={flight.logoUrl}
      className="object-cover aspect-square"
      alt={`${flight.avaliacao} logo`}
    />
  </div>
  <div className="grid gap-2 sm:grid-cols-4 items-center sm:gap-1 flex-1">
    <div className="col-span-2">
      <div className="font-medium">{flight.seguradoraNome}</div>
      <div className="flex items-center text-sm text-zinc-600">
        {flight.avaliacao}
        <Star className="ml-1 size-4 text-yellow-500" fill="currentColor" />
      </div>
    </div>
    <div>
      <div className="font-medium">Grupo</div>
      <div className="text-sm text-zinc-600">{grupo}</div>
    </div>
    <div className="flex flex-col items-center">
      <div
        className="sm:text-center font-mono text-md truncate max-w-[100px] overflow-hidden relative transition-all duration-300 ease-in-out hover:max-w-full hover:overflow-visible"
      >
        {flight.CNPJ}
        <div className="absolute top-0 left-0 mt-6 w-auto px-2 py-1 bg-gray-100 text-black text-sm rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {flight.CNPJ}
        </div>
      </div>
      <div className="sm:text-center text-xs text-zinc-600">CNPJ</div>
    </div>
  </div>
</div>
          ))}
      </div>
    </div>
  )
}
