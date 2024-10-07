"use client"

import { useState } from "react"
import { Star, CheckCircle, ArrowRight, Calendar } from "lucide-react"
import { motion } from "framer-motion"
import Image from "next/image"
import { z } from "zod"

const insurerSchema = z.object({
  nomeSeguradora: z.string(),
  avaliaçãoSeguradora: z.number().min(1).max(5),
  codigoCNPJ: z.string(),
  comment: z.string(),
  gradient: z.string(),
  logo: z.string()
});

interface Insurer {
  nomeSeguradora: string;
  avaliaçãoSeguradora: number;
  codigoCNPJ: string;
  comment: string;
  gradient: string;
  logo: string;
}

interface InsurerListProps {
  insurers: Insurer[];
}

export default function InsurerList({ insurers }: InsurerListProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className="container mx-auto p-4 sm:p-8 bg-gradient-to-br from-purple-100 to-indigo-100 min-h-screen font-sans">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        {insurers.map((insurer, index) => {
          insurerSchema.parse(insurer);
          return (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`border-b last:border-b-0 ${selected === index ? "bg-purple-50" : ""}`}
            >
              <div
                className="cursor-pointer transition-all duration-300"
                onClick={() => setSelected(index)}
              >
                <div className="p-6 flex items-center gap-4">
                  <div className="shrink-0">
                    <Image
                      src={insurer.logo}
                      alt={`${insurer.nomeSeguradora} logo`}
                      width={60}
                      height={60}
                      className="rounded-full"
                    />
                  </div>
                  <div className="grow">
                    <div className="flex justify-between items-start mb-2">
                      <h2 className="text-xl font-bold text-gray-800">{insurer.nomeSeguradora}</h2>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">CNPJ: {insurer.codigoCNPJ}</p>
                    <div className="flex items-center text-sm text-gray-600 mb-2">
                      <Calendar className="mr-1" size={14} />
                      <span>{formattedDate}</span>
                    </div>
                    <div className="flex items-center">
                      <div className="flex mr-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`${i < Math.floor(insurer.avaliaçãoSeguradora) ? 'text-yellow-400' : 'text-gray-300'}`}
                            size={16}
                            fill="currentColor"
                          />
                        ))}
                      </div>
                      <span className="bg-gray-200 text-gray-800 text-sm font-semibold px-2.5 py-0.5 rounded">
                        {insurer.avaliaçãoSeguradora}
                      </span>
                    </div>
                  </div>
                  <div className={`shrink-0 w-1/3 bg-gradient-to-r ${insurer.gradient} rounded-lg p-3`}>
                    <p className="text-sm italic text-white">&ldquo;{insurer.comment}&rdquo;</p>
                  </div>
                  <div className="shrink-0 ml-2">
                    {selected === index ? (
                      <CheckCircle className="text-green-500" size={24} />
                    ) : (
                      <ArrowRight className="text-gray-400" size={24} />
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
