
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, ArrowLeft, FileText } from "lucide-react";

const Confirmation = () => {
  const [clientData, setClientData] = useState<any>(null);

  useEffect(() => {
    const data = localStorage.getItem("clientData");
    if (data) {
      setClientData(JSON.parse(data));
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="mb-6">
          <Link to="/" className="inline-flex items-center text-green-600 hover:text-green-800 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar ao início
          </Link>
        </div>

        <Card className="shadow-xl">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <CheckCircle className="h-16 w-16 text-green-600" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">
              Formulário Enviado com Sucesso!
            </CardTitle>
            <CardDescription className="text-lg">
              Em breve entraremos em contato
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <FileText className="h-5 w-5 text-green-600 mr-2" />
                <h3 className="font-semibold text-gray-900">Dados Enviados</h3>
              </div>
              
              {clientData && (
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Nome:</span>
                    <span className="text-gray-900">{clientData.nomeCompleto}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Data de Nascimento:</span>
                    <span className="text-gray-900">{new Date(clientData.dataNascimento).toLocaleDateString('pt-BR')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">CPF:</span>
                    <span className="text-gray-900">{clientData.cpf}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Estado Civil:</span>
                    <span className="text-gray-900 capitalize">{clientData.estadoCivil}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Gênero:</span>
                    <span className="text-gray-900 capitalize">{clientData.genero}</span>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-2">Próximos Passos:</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Nosso corretor entrará em contato em até 24 horas</li>
                <li>• Você receberá propostas personalizadas</li>
                <li>• Todas as dúvidas serão esclarecidas</li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/client-form" className="flex-1">
                <Button variant="outline" className="w-full">
                  Novo Formulário
                </Button>
              </Link>
              <Link to="/" className="flex-1">
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  Página Inicial
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Confirmation;
