'use client'

import React from 'react'
import Barcode from 'react-jsbarcode'

interface PasseSeguroProps {
  summary?: {
    nomeSeguradora?: string
    preçoCotação?: number
    date?: string
    planoOfertado?: string
    nomeUser: string
  }
}

const Card: React.FC<React.PropsWithChildren<{ className?: string }>> = ({ children, className }) => (
  <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden ${className}`}>
    {children}
  </div>
)

const CardContent: React.FC<React.PropsWithChildren<{ className?: string }>> = ({ children, className }) => (
  <div className={`p-6 ${className}`}>{children}</div>
)

const CardFooter: React.FC<React.PropsWithChildren<{ className?: string }>> = ({ children, className }) => (
  <div className={`p-6 ${className}`}>{children}</div>
)

const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, className, ...props }) => (
  <button
    className={`px-4 py-2 rounded-md font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 ${className}`}
    {...props}
  >
    {children}
  </button>
)

const IconWrapper: React.FC<React.PropsWithChildren> = ({ children }) => (
  <div className="size-6">{children}</div>
)

export default function PasseSeguro({
  summary = {
    nomeSeguradora: 'Porto Seguro',
    preçoCotação: 1000,
    date: '2024-12-25',
    planoOfertado: 'Premium',
    nomeUser: 'João Doe'
  }
}: PasseSeguroProps) {
  return (
<Card className="w-full max-w-md max-h-fit mx-auto bg-gradient-to-br from-purple-50 to-indigo-100 dark:from-purple-900 dark:to-indigo-950">
      <CardContent>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <div className="size-12 rounded-full bg-purple-500 dark:bg-purple-400 flex items-center justify-center">
              <IconWrapper>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="size-6 text-white dark:text-purple-950">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </IconWrapper>
            </div>
            <div>
              <p className="text-sm font-medium text-purple-600 dark:text-purple-300">Seguradora</p>
              <p className="text-lg font-bold text-purple-800 dark:text-purple-100">{summary.nomeSeguradora}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-purple-600 dark:text-purple-300">Plano Ofertado</p>
            <p className="text-lg font-semibold text-purple-800 dark:text-purple-100">{summary.planoOfertado}</p>
          </div>
        </div>
        <div className="space-y-6">
          <div className="bg-white dark:bg-purple-800 rounded-lg p-4 shadow-md">
            <p className="text-sm font-medium text-purple-600 dark:text-purple-300 mb-1">Account Holder</p>
            <p className="text-2xl font-bold text-purple-900 dark:text-purple-50">{summary.nomeUser}</p>
          </div>
          <div className="flex justify-between items-stretch gap-4">
            <div className="flex-1 bg-indigo-100 dark:bg-indigo-800 rounded-lg p-4 flex flex-col justify-between shadow-md">
              <IconWrapper>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="size-6 text-indigo-600 dark:text-indigo-300 mb-2">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </IconWrapper>
              <div>
                <p className="text-sm font-medium text-indigo-600 dark:text-indigo-300">Preço</p>
                <p className="text-2xl font-bold text-indigo-800 dark:text-indigo-100">R$ {summary.preçoCotação?.toFixed(2)}</p>
              </div>
            </div>
            <div className="flex-1 bg-purple-100 dark:bg-purple-800 rounded-lg p-4 flex flex-col justify-between shadow-md">
              <IconWrapper>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="size-6 text-purple-600 dark:text-purple-300 mb-2">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </IconWrapper>
              <div>
                <p className="text-sm font-medium text-purple-600 dark:text-purple-300">Data da Renovação</p>
                <p className="text-xl font-semibold text-purple-800 dark:text-purple-100">
                {summary.date ? new Date(summary.date).toLocaleDateString() : 'N/A'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-purple-200 dark:bg-purple-900">
        <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
          Confirmar Cotação
        </Button>
      </CardFooter>
    </Card>
  )
}