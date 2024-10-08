/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
'use client';

import { useAIState, useActions, useUIState } from 'ai/rsc';
import { useState } from 'react';
import { SparklesIcon } from '../ui/icons';

interface SelectSeatsProps {
  summary: {
    seguradoraNome: string;
    linha: string;
    date: string;
    logoUrl: string;
  };
}

export const suggestions = [
  'Assine o plano da seguradora',
  'Falar com um atendente',
  'Cotar com outra seguradora',
];

export const SelectSeats = ({
  summary = {
    seguradoraNome: 'Porto Seguro',
    linha: 'Premium',
    date: '23 de março, 2024',
    logoUrl: 'https://play-lh.googleusercontent.com/9AXivDxUm2lyogDCW9BIe5E3sMm_jqT6T_kCTJQxZ5A6AXI1dfjOwfpu-p6jH_i9ja4',
  },
}: SelectSeatsProps) => {
  const availableSeats = ['SIM!'];
  const [aiState, setAIState] = useAIState();
  const [selectedOption, setSelectedOption] = useState('');
  const { seguradoraNome, linha, date, logoUrl } = summary;
  const [_, setMessages] = useUIState();
  const { submitUserMessage } = useActions();

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    nome: '',
    cpf: '',
    email: '',
    telefone: '',
    modeloFabricacao: '',
    modelo: '',
    placa: '',
    combustivel: '',
    selectedSeat: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => {
    setCurrentStep((prevStep) => Math.min(prevStep + 1, 4)); // max step is 4
  };

  const prevStep = () => {
    setCurrentStep((prevStep) => Math.max(prevStep - 1, 1)); // min step is 1
  };

  return (
    <div className="grid gap-4">
      <div className="grid gap-4 p-4 sm:p-6 border border-gray-200 rounded-xl bg-white shadow-md">
        <div className="flex items-center gap-4">
          <div className="size-12 shrink-0 rounded-full overflow-hidden border border-gray-300">
            <img src={logoUrl} className="object-cover size-full" />
          </div>
          <div>
            <div className="font-semibold text-lg text-gray-800">{seguradoraNome}</div>
            <div className="text-sm text-gray-500">{date}</div>
            <div className="text-sm text-gray-500">{linha}</div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {currentStep === 1 && (
            <>
              <div className="grid gap-2">
                <label className="text-gray-600">Nome</label>
                <input
                  type="text"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                />
              </div>
              <div className="grid gap-2">
                <label className="text-gray-600">CPF</label>
                <input
                  type="text"
                  name="cpf"
                  value={formData.cpf}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                />
              </div>
            </>
          )}
          {currentStep === 2 && (
            <>
              <div className="grid gap-2">
                <label className="text-gray-600">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                />
              </div>
              <div className="grid gap-2">
                <label className="text-gray-600">Celular</label>
                <input
                  type="text"
                  name="telefone"
                  value={formData.telefone}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                />
              </div>
            </>
          )}
          {currentStep === 3 && (
            <>
              <div className="grid gap-2">
                <label className="text-gray-600">Modelo de Fabricação</label>
                <input
                  type="text"
                  name="modeloFabricacao"
                  value={formData.modeloFabricacao}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                />
              </div>
              <div className="grid gap-2">
                <label className="text-gray-600">Modelo</label>
                <input
                  type="text"
                  name="modelo"
                  value={formData.modelo}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                />
              </div>
              <div className="grid gap-2">
                <label className="text-gray-600">Placa do Veículo</label>
                <input
                  type="text"
                  name="placa"
                  value={formData.placa}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500  bg-white"
                />
              </div>
              <div className="grid gap-2">
                <label className="text-gray-600">Tipo de Combustível</label>
                <input
                  type="text"
                  name="combustivel"
                  value={formData.combustivel}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                />
              </div>
            </>
          )}
          {currentStep === 4 && (
            <div className="grid gap-4 col-span-2">
              <div className="text-lg font-semibold flex items-center justify-center text-gray-700">Iniciar Cotação?</div>
              <div className="justify-center align-middle p-2 border rounded-lg bg-gray-50">
                {availableSeats.map((seat) => (
                  <div
                    key={seat}
                    className={`cursor-pointer p-4 text-center border rounded-lg ${selectedOption === seat ? 'bg-blue-500 text-white' : 'bg-white text-gray-600 border-gray-300'}`}
                    onClick={() => {
                      setSelectedOption(seat);
                      setFormData({ ...formData, selectedSeat: seat });
                      setAIState({
                        ...aiState,
                        interactions: [`Opção ${seat} selecionada! Prossiga para a UI de assinar o plano da seguradora`],
                      });
                    }}
                  >
                    {seat}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="flex justify-between mt-4">
          <button
            onClick={prevStep}
            className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition"
            disabled={currentStep === 1}
          >
            Anterior
          </button>
          <button
            onClick={nextStep}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
            disabled={currentStep === 4}
          >
            Próximo
          </button>
        </div>
      </div>
      {selectedOption !== '' && (
        <div className="flex flex-col sm:flex-row items-start gap-2 mt-4">
          {suggestions.map((suggestion) => (
            <button
              key={suggestion}
              className="flex items-center gap-2 px-3 py-2 text-sm transition-colors bg-gray-50 hover:bg-gray-100 rounded-xl cursor-pointer"
              onClick={async () => {
                const response = await submitUserMessage(suggestion, []);
                setMessages((currentMessages: any[]) => [
                  ...currentMessages,
                  response,
                ]);
              }}
            >
              <SparklesIcon />
              {suggestion}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
