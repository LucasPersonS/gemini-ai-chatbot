/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
'use client';

import { useAIState, useActions, useUIState } from 'ai/rsc';
import { useState } from 'react';
import { SparklesIcon } from '../ui/icons';
import InputMask from 'react-input-mask';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

interface FormularioProps {
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


export const Formulario = ({
  summary = {
    seguradoraNome: 'Porto Seguro',
    linha: 'Premium',
    date: '23 de março, 2024',
    logoUrl: 'https://play-lh.googleusercontent.com/9AXivDxUm2lyogDCW9BIe5E3sMm_jqT6T_kCTJQxZ5A6AXI1dfjOwfpu-p6jH_i9ja4',
  },
}: FormularioProps) => {
  const availableSeats = ['SIM!'];
  const [aiState, setAIState] = useAIState();
  const [selectedOption, setSelectedOption] = useState('');
  const { seguradoraNome, linha, date, logoUrl } = summary;
  const [_, setMessages] = useUIState();
  const { submitUserMessage } = useActions();
  const [validations, setValidations] = useState({
    cpf: false, cep: false,
  });
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    nome: '',
    cpf: '',
    dataNascimento: '',
    cep: '',
    street: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: '',
    email: '',
    telefone: '',
    modeloFabricacao: '',
    anoFabricacao: '',
    modelo: '',
    anoModelo: '',
    placa: '',
    combustivel: '',
    selectedSeat: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const verificarCEP = async (cep: string) => {
    try {
      const response = await fetch(`https://brasilapi.com.br/api/cep/v1/${cep}`);
      if (response.ok) {
        const data = await response.json();
        setFormData((prevFormData) => ({
          ...prevFormData,
          street: data.street || '',      // Auto-fill the street field
          neighborhood: data.neighborhood || '',  // Auto-fill the neighborhood field
          city: data.city || '',          // Auto-fill the city field
          state: data.state || '', 
        }));
        setValidations((prev) => ({ ...prev, cep: true }));
        console.log('CEP válido');
      } else {
        setValidations((prev) => ({ ...prev, cep: false })); 
        console.log('CEP inválido');
      }
    } catch (error) {
      console.error('Erro ao verificar o CEP:', error);
      setValidations((prev) => ({ ...prev, cep: false })); 
    }
  };
  
  const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData({ ...formData, cep: value });
  
    const cleanCep = value.replace(/\D/g, '');
    if (cleanCep.length === 8) {
      verificarCEP(cleanCep);
      setValidations((prev) => ({ ...prev, cep: true })); // Set to true if the API response is OK
    } else {
      setValidations((prev) => ({ ...prev, cep: false })); // Invalid if length is not 8
      console.log('CEP inválido');
    }
  };
  const handlePlacaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData({ ...formData, placa: value });
  
    if (validarPlaca(value)) {
      console.log('Placa válida');
      buscarInformacoesVeiculo(value); 
    } else {
      console.log('Placa inválida');
    }
  };

  const buscarInformacoesVeiculo = async (placa: string) => {
    try {
      const response = await fetch(`https://brasilapi.com.br/api/fipe/preco/v1/{codigoFipe}`);
      if (!response.ok) {
        throw new Error('Placa não encontrada');
      }
      const data = await response.json();
  
      // Preencher o formulário com as informações retornadas
      setFormData((prevFormData) => ({
        ...prevFormData,
        modelo: data.modelo || '',
        anoFabricacao: data.ano_fabricacao || '',
        combustivel: data.combustivel || '',
        anoModelo: data.anoModelo || '',
      }));
  
      console.log('Informações do veículo obtidas com sucesso:', data);
    } catch (error) {
      console.error('Erro ao buscar informações do veículo:', error);
    }
  };
  
  
  const validarPlaca = (placa: string): boolean => {
    const regexPlacaAntiga = /^[A-Z]{3}-\d{4}$/;
    const regexPlacaNova = /^[A-Z]{3}-\d[A-Z0-9]\d{2}$/;
  
    return regexPlacaAntiga.test(placa) || regexPlacaNova.test(placa);
  };

  

  const handlePhoneChange = (value: string) => {
    setFormData({ ...formData, telefone: value });
  };

  const validarCPF = (cpf: string) => {
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;
  
    let sum = 0;
    let remainder;
  
    for (let i = 1; i <= 9; i++) {
      sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }
    remainder = (sum * 10) % 11;
  
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cpf.substring(9, 10))) return false;
  
    sum = 0;
    for (let i = 1; i <= 10; i++) {
      sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }
    remainder = (sum * 10) % 11;
  
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cpf.substring(10, 11))) return false;
  
    return true;
  };
  
  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData({ ...formData, cpf: value });
  
    const cleanCpf = value.replace(/\D/g, '');
    const isValidCpf = cleanCpf.length === 11 && validarCPF(cleanCpf);
    setValidations((prev) => ({ ...prev, cpf: isValidCpf }));
  
    if (isValidCpf) {
      console.log('CPF válido');
    } else {
      console.log('CPF inválido');
    }
  };
  
  const nextStep = () => {
    setCurrentStep((prevStep) => Math.min(prevStep + 1, 5)); // max step is now 5
  };

  const prevStep = () => {
    setCurrentStep((prevStep) => Math.max(prevStep - 1, 1)); // min step is 1
  };

  const generateYearOptions = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
  
    // Generate past years (30 years back)
    for (let i = currentYear - 30; i <= currentYear; i++) {
      years.push(<option key={i} value={i}>{i}</option>);
    }
  
    // Generate future years (up to 2030)
    for (let i = currentYear + 1; i <= 2030; i++) {
      years.push(<option key={i} value={i}>{i}</option>);
    }
  
    return years;
  };

  const steps = [
    { number: 1, title: 'Dados Pessoais' },
    { number: 2, title: 'Endereço' },
    { number: 3, title: 'Contato' },
    { number: 4, title: 'Veículo' },
    { number: 5, title: 'Confirmação' },
  ];

  return (
    <div className="grid gap-6 bg-gradient-to-br from-purple-500 to-purple-700 p-6 rounded-2xl shadow-lg">
      <div className="grid gap-6 p-6 border border-gray-200 rounded-xl bg-white shadow-sm">
        <div className="flex items-center gap-4">
          <div className="size-16 shrink-0 rounded-full overflow-hidden border border-gray-300 shadow-sm">
            <img src={logoUrl} className="object-cover size-full" />
          </div>
          <div>
            <div className="font-bold text-xl text-gray-800">{seguradoraNome}</div>
            <div className="text-sm text-gray-500">{date}</div>
            <div className="text-sm font-medium text-blue-600">{linha}</div>
          </div>
        </div>

        <div className="flex justify-between mb-6">
          {steps.map((step) => (
            <div key={step.number} className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= step.number ? 'bg-purple-500 text-white' : 'bg-gray-200 text-gray-500'}`}>
                {step.number}
              </div>
              <div className="text-xs mt-2 text-gray-500">{step.title}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {currentStep === 1 && (
            <>
              <div className="grid gap-2">
                <label className="text-gray-700 font-medium">Nome</label>
                <input
                  type="text"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white transition-shadow"
                />
              </div>
              <div className="grid gap-2">
                <label className="text-gray-700 font-medium">CPF</label>
                <InputMask
                  mask="999.999.999-99"
                  value={formData.cpf}
                  onChange={handleCpfChange}
                  className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white transition-shadow"
                  name="cpf"
                />
              </div>
              <div className="grid gap-2">
                <label className="text-gray-700 font-medium">Data de Nascimento</label>
                <InputMask
                  mask="99/99/9999"
                  value={formData.dataNascimento}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white transition-shadow"
                  name="dataNascimento"
                />
              </div>
            </>
          )}
          {currentStep === 2 && (
            <>
              <div className="grid gap-2">
                <label className="text-gray-700 font-medium">CEP de Pernoite</label>
                <InputMask
                  mask="99999-999"
                  value={formData.cep}
                  onChange={handleCepChange}
                  className={`border rounded-lg p-2 focus:outline-none focus:ring-2 ${
                    validations.cep ? 'border-green-500 focus:ring-green-500' : 'border-red-500 focus:ring-red-500'
                  } bg-white transition-shadow`}
                  name="cep"
                />
                 {!validations.cep && formData.cep && <span className="text-red-500 text-sm">CEP inválido</span>}
              </div>
              <div className="grid gap-2">
                <label className="text-gray-700 font-medium">Rua</label>
                <input
                  type="text"
                  name="street"
                  value={formData.street}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white transition-shadow"
                />
              </div>
              <div className="grid gap-2">
                <label className="text-gray-700 font-medium">Número</label>
                <input
                  type="text"
                  name="number"
                  value={formData.number}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white transition-shadow"
                />
              </div>
              <div className="grid gap-2">
                <label className="text-gray-700 font-medium">Complemento</label>
                <input
                  type="text"
                  name="complement"
                  value={formData.complement}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white transition-shadow"
                />
              </div>
              <div className="grid gap-2">
                <label className="text-gray-700 font-medium">Bairro</label>
                <input
                  type="text"
                  name="neighborhood"
                  value={formData.neighborhood}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white transition-shadow"
                />
              </div>
              <div className="grid gap-2">
                <label className="text-gray-700 font-medium">Cidade</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white transition-shadow"
                />
              </div>
              <div className="grid gap-2">
                <label className="text-gray-700 font-medium">Estado</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white transition-shadow"
                />
              </div>
            </>
          )}
          {currentStep === 3 && (
            <>
              <div className="grid gap-2">
                <label className="text-gray-700 font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white transition-shadow"
                />
              </div>
              <div className="grid gap-2">
                <label className="text-gray-700 font-medium">Celular</label>
                <PhoneInput
                  country={'br'}
                  value={formData.telefone}
                  onChange={handlePhoneChange}
                  inputStyle={{
                    width: '100%',
                    height: '40px',
                    fontSize: '16px',
                    borderRadius: '0.5rem',
                  
                  }}
                  containerStyle={{
                    width: '100%',
                  }}
                />
              </div>
            </>
          )}
          {currentStep === 4 && (
            <>
                <div className="grid gap-2">
                <label className="text-gray-700 font-medium">Placa do Veículo</label>
                <InputMask
                  mask="aaa-9*99"
                  formatChars={{
                    'a': '[A-Za-z]',
                    '9': '[0-9]',
                    '*': '[A-Za-z0-9]'
                  }}
                  value={formData.placa}
                  onChange={handlePlacaChange}
                  className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white transition-shadow"
                  name="placa"
                />
              </div>
              <div className="grid gap-2">
                <label className="text-gray-700 font-medium">Ano de Fabricação</label>
                <select
                  name="anoFabricacao"
                  value={formData.anoFabricacao}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white transition-shadow"
                >
                  <option value="">Selecione o ano</option>
                  {generateYearOptions()}
                </select>
              </div>
              <div className="grid gap-2">
                <label className="text-gray-700 font-medium">Modelo</label>
                <input
                  type="text"
                  name="modelo"
                  value={formData.modelo}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white transition-shadow"
                />
              </div>
              <div className="grid gap-2">
                <label className="text-gray-700 font-medium">Ano do Modelo</label>
                <select
                  name="anoModelo"
                  value={formData.anoModelo}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white transition-shadow"
                >
                  <option value="">Selecione o ano</option>
                  {generateYearOptions()}
                </select>
              </div>
              <div className="grid gap-2">
                <label className="text-gray-700 font-medium">Tipo de Combustível</label>
                <select
                  name="combustivel"
                  value={formData.combustivel}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white transition-shadow"
                >
                  <option value="">Selecione o combustível</option>
                  <option value="gasolina">Gasolina</option>
                  <option value="etanol">Etanol</option>
                  <option value="diesel">Diesel</option>
                  <option value="flex">Flex</option>
                  <option value="eletrico">Elétrico</option>
                  <option value="hibrido">Híbrido</option>
                </select>
              </div>
            </>
          )}
          {currentStep === 5 && (
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
            className="bg-gray-500 text-white py-2 px-6 rounded-lg hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={currentStep === 1}
          >
            Anterior
          </button>
          <button
            onClick={nextStep}
            className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={currentStep === 5}
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